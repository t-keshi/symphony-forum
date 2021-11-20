import { IconButton, TextFieldProps, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';
import { AutocompleteProps } from '@material-ui/lab';
import React from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { useToggle } from '../../../utility/hooks/useToggle';
import { FormAutocomplete } from '../FormTextField/FormAutocomplete';
import { YesOrNoButton } from '../YesOrNoButton/YesOrNoButton';

interface Props<TFieldValues, TOption> {
  defaultValue: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  errorMessage: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (...args: any) => void;
  autocompleteProps: Omit<
    AutocompleteProps<TOption, boolean, boolean, boolean>,
    'renderInput'
  >;
  textFieldProps: Partial<TextFieldProps>;
}

const useStyles = makeStyles((theme) => ({
  textFieldWrapper: {
    display: 'flex',
  },
  editButton: {
    marginLeft: theme.spacing(2),
  },
  yesOrNoButtonWrapper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export const TextEditableComplete = <
  TFieldValues extends FieldValues,
  // eslint-disable-next-line @typescript-eslint/ban-types
  TOption extends {},
>({
  defaultValue,
  register,
  name,
  errorMessage,
  onSubmit,
  autocompleteProps,
  textFieldProps,
}: Props<TFieldValues, TOption> & TextFieldProps): React.ReactElement => {
  const classes = useStyles();
  const [isEditMode, handleIsEditMode] = useToggle(false);

  if (!isEditMode) {
    return (
      <div className={classes.textFieldWrapper}>
        <Typography variant="body2" color="textSecondary">
          {defaultValue}
        </Typography>
        <IconButton
          className={classes.editButton}
          size="small"
          onClick={() => handleIsEditMode(true)}
        >
          <Edit />
        </IconButton>
      </div>
    );
  }

  return (
    <>
      <div className={classes.textFieldWrapper}>
        <FormAutocomplete
          register={register}
          name={name}
          errorMessage={errorMessage}
          autocompleteProps={autocompleteProps}
          textFieldProps={{
            ...textFieldProps,
          }}
        />
      </div>
      <div className={classes.yesOrNoButtonWrapper}>
        <YesOrNoButton
          yesLabel="保存"
          yesButtonProps={{
            onClick: () => {
              onSubmit();
            },
          }}
          noLabel="キャンセル"
          noButtonProps={{ onClick: () => handleIsEditMode(false) }}
        />
      </div>
    </>
  );
};
