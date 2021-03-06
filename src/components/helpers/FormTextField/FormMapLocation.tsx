/* eslint-disable react/jsx-props-no-spreading */
import { Grid, TextField, TextFieldProps, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LocationOn } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import parse from 'autosuggest-highlight/parse';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useSearchMap } from '../../../containers/controllers/concert/useSearchMap';
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
    paddingTop: theme.spacing(0.5),
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
  const { data: mapData, isLoading } = useSearchMap(debounceValue);
  const renderOption = (option: google.maps.places.AutocompletePrediction) => {
    const matches = option.structured_formatting.main_text_matched_substrings;
    const parts = parse(
      option.structured_formatting.main_text,
      matches.map((match: google.maps.places.PredictionSubstring) => [
        match.offset,
        match.offset + match.length,
      ]),
    );

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
          loadingText="???????????????..."
          options={mapData?.predictions ?? []}
          getOptionLabel={(option?) =>
            option.structured_formatting.main_text ?? ''
          }
          getOptionSelected={() => mapData !== undefined}
          value={field.value as google.maps.places.AutocompletePrediction}
          onChange={(
            _,
            newValue: string | google.maps.places.AutocompletePrediction | null,
          ) => {
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
                errorMessage ?? '???????????????????????????????????????????????????????????????'
              }
            />
          )}
        />
      )}
    />
  );
};
