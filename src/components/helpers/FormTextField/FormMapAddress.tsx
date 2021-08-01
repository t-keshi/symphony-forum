/* eslint-disable react/jsx-props-no-spreading */
import { Grid, TextField, TextFieldProps, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LocationOn } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import {
  GoogleMapLocation,
  useSearchAccess,
} from '../../../containers/controllers/concert/useSearchAccess';
import { useDebounceInput } from '../../../utility/hooks/useDebounceInput';

interface Props<TFieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errorMessage: string | undefined;
}

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
    paddingTop: '4px',
  },
}));

export const FormMapLocation = <TFieldValues extends FieldValues>({
  control,
  name,
  errorMessage,
  ...typographyProps
}: Props<TFieldValues> & Partial<TextFieldProps>): React.ReactElement => {
  const classes = useStyles();
  const { value, debounceValue, setValue } = useDebounceInput();
  const { data, isLoading } = useSearchAccess(debounceValue);
  const renderOption = (option: GoogleMapLocation) => {
    const matches = match(option.address, value);
    const parts = parse(option.address, matches);

    return (
      <Grid container alignItems="center">
        <Grid item>
          <LocationOn className={classes.icon} />
        </Grid>
        <Grid item xs>
          <Typography variant="body1" color="textSecondary">
            {parts.map((part, index) => {
              if (part.highlight) {
                return (
                  <Typography
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    component="span"
                    style={{ fontWeight: 700 }}
                  >
                    {part.text}
                  </Typography>
                );
              }

              return part.text;
            })}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          freeSolo
          autoHighlight
          autoComplete
          autoSelect
          blurOnSelect
          loading={isLoading}
          loadingText="読み込み中..."
          options={data ?? []}
          getOptionLabel={(option?) => option.address ?? ''}
          getOptionSelected={() => data !== undefined}
          defaultValue={null}
          value={field.value as GoogleMapLocation}
          onChange={(_, newValue: string | GoogleMapLocation | null) => {
            field.onChange(newValue);
          }}
          inputValue={value}
          onInputChange={(_, newInputValue) => setValue(newInputValue)}
          renderOption={renderOption}
          renderInput={(renderInputProps) => (
            <TextField
              {...renderInputProps}
              {...typographyProps}
              error={Boolean(errorMessage)}
              helperText={
                errorMessage ?? 'キーワードを入力後、住所を選択してください'
              }
            />
          )}
        />
      )}
    />
  );
};
