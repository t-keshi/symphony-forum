import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, IconButtonProps, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useFetchUserInfo } from '../../../../containers/controllers/user/useFetchUserInfo';
import { useUpdateUserInfo } from '../../../../containers/controllers/user/useUpdateUserInfo';
import { partOptions } from '../../../../containers/entities/partOptions';
import { useToggle } from '../../../../utility/hooks/useToggle';
import { textTruncate } from '../../../../utility/textTruncate';
import { yupLocaleJP } from '../../../../utility/yupLocaleJP';
import { LinkCustom } from '../../../helpers/LinkCustom/LinkCustom';
import { FacebookIconButton } from '../../../helpers/OAuthButtons/FacebookIconButton';
import { TwitterIconButton } from '../../../helpers/OAuthButtons/TwitterIconButton';
import { TextEditable } from '../../../helpers/TextEditable/TextEditable';
import { TextEditableComplete } from '../../../helpers/TextEditable/TextEditableComplete';
import { ProfileFormDialog } from './ProfileFormDialog';

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    marginTop: theme.spacing(2),
    display: 'flex',
  },
  homePage: {
    marginLeft: theme.spacing(1),
  },
}));
interface FormValues {
  part?: string;
  profile?: string;
}

yup.setLocale(yupLocaleJP);

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  part: yup.string().min(1).max(30),
  profile: yup.string().min(1).max(250),
});

export const ProfileForm: React.VFC<IconButtonProps> = () => {
  const classes = useStyles();
  const { data } = useFetchUserInfo();
  const [isOpen, setIsOpen] = useToggle(false);
  const twitterUserLink = data?.twitterUserLink ?? undefined;
  const facebookUserLink = data?.facebookUserLink ?? undefined;
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const { mutate: updateUserInfo } = useUpdateUserInfo();
  const onSubmit = handleSubmit((formData) => {
    updateUserInfo({ profile: formData.profile, part: formData.part });
  });

  return (
    <>
      <form>
        <Typography variant="h6" gutterBottom>
          パート
        </Typography>
        <TextEditableComplete<FormValues, string>
          register={register}
          onSubmit={onSubmit}
          name="part"
          defaultValue={data?.part ?? ''}
          autocompleteProps={{
            options: partOptions,
            getOptionLabel: (innerOption: string) => innerOption,
            fullWidth: true,
            onChange: (e: unknown, innerOption: string | string[] | null) => {
              if (innerOption !== null) {
                setValue('part', innerOption as string);
              }
              setValue(
                'part',
                (e as { target: { value: string } }).target.value,
              );
            },
          }}
          textFieldProps={{
            margin: 'normal',
          }}
          errorMessage={errors.part?.message}
        />
        <Box mt={2} />
        <Typography variant="h6" gutterBottom>
          自己紹介
        </Typography>
        <TextEditable
          control={control}
          onSubmit={onSubmit}
          name="profile"
          defaultValue={data?.profile ?? ''}
          margin="normal"
          multiline
          rows={8}
          errorMessage={errors.profile?.message}
        />
        <div className={classes.buttonWrapper}>
          <TwitterIconButton
            component="a"
            color={twitterUserLink ? 'primary' : 'default'}
            href={twitterUserLink ?? ''}
            disabled={twitterUserLink === undefined}
            target="_blank"
            rel="noopener"
            edge="start"
          />
          <FacebookIconButton
            component="a"
            color={facebookUserLink ? 'primary' : 'default'}
            href={facebookUserLink ?? ''}
            disabled={facebookUserLink === undefined}
            target="_blank"
            rel="noopener"
          />
          <LinkCustom className={classes.homePage} href={data?.homePage ?? ''}>
            {textTruncate(data?.homePage ?? '', 20)}
          </LinkCustom>
        </div>
        <Button onClick={() => setIsOpen(true)}>リンクを追加</Button>
      </form>
      <ProfileFormDialog open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
