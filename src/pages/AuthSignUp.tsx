import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ButtonProgress } from '../components/helpers/ButtonProgress/ButtonProgress';
import { DividerWithText } from '../components/helpers/DividerWithText/DividerWithText';
import { FormTextField } from '../components/helpers/FormTextField/FormTextField';
import { FacebookButton } from '../components/helpers/OAuthButtons/FacebookButton';
import { GoogleButton } from '../components/helpers/OAuthButtons/GoogleButton';
import { TwitterButton } from '../components/helpers/OAuthButtons/TwitterButton';
import { TopLayout } from '../components/layout/TopLayout';
import { useSignUp } from '../containers/controllers/authentication/useSignUp';
import { useSocialLogIn } from '../containers/controllers/authentication/useSocialLogIn';
import { useUpdateUserProfile } from '../containers/controllers/user/useUpdateUserProfile';
import { ROUTE_PATHS } from '../routes/type';
import { asyncDelay } from '../utility/asyncDelay';
import { useRouter } from '../utility/hooks/useRouter';
import { useTitle } from '../utility/hooks/useTitle';
import { yupLocaleJP } from '../utility/yupLocaleJP';

interface FormValues {
  displayName: string;
  email: string;
  password: string;
}

yup.setLocale(yupLocaleJP);

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  displayName: yup.string().min(1).max(30).required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
});

const useStyles = makeStyles((theme) => ({
  oauthWrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 2),
    margin: theme.spacing(2, 0),
    justifyContent: 'center',
    rowGap: theme.spacing(2),
  },
}));

export const AuthSignup: React.VFC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { mutateAsync: profileUpdate } = useUpdateUserProfile({ retry: 10 });
  const { mutateAsync, isLoading } = useSignUp();
  const { mutate: socialLogIn } = useSocialLogIn();
  const onSubmit = async (formValues: FormValues) => {
    const { user } = await mutateAsync(formValues);
    // NOTE: cloudFunction ??????????????????
    await asyncDelay(1000);
    await profileUpdate({
      uid: user?.uid ?? undefined,
      displayName: formValues.displayName,
      newUser: true,
    });
  };

  useTitle('SymphonyForum | ????????????');

  return (
    <TopLayout>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="80vh"
        >
          <Container maxWidth="sm">
            <Paper variant="outlined">
              <Box p={3}>
                <Typography variant="h6" align="center" paragraph>
                  Symphony Forum
                </Typography>
                <FormTextField
                  control={control}
                  name="displayName"
                  margin="normal"
                  label="??????(?????????????????????)"
                  fullWidth
                  errorMessage={errors.displayName?.message}
                />
                <Box mt={1} />
                <FormTextField
                  control={control}
                  type="email"
                  name="email"
                  margin="normal"
                  label="?????????????????????"
                  fullWidth
                  errorMessage={errors.email?.message}
                />
                <Box mt={1} />
                <FormTextField
                  control={control}
                  type="password"
                  name="password"
                  margin="normal"
                  label="???????????????"
                  fullWidth
                  errorMessage={errors.password?.message}
                />
                <Box mt={3} />
                <Box mb={2} display="flex" justifyContent="space-between">
                  <Button
                    variant="text"
                    color="secondary"
                    startIcon={<ChevronLeft />}
                    onClick={() => history.push(ROUTE_PATHS.????????????)}
                  >
                    ????????????
                  </Button>
                  <ButtonProgress isLoading={isLoading} type="submit">
                    ????????????
                  </ButtonProgress>
                </Box>
                <DividerWithText>OR</DividerWithText>
                <div className={classes.oauthWrapper}>
                  <GoogleButton onClick={() => socialLogIn('google')}>
                    Google????????????????????????
                  </GoogleButton>
                  <FacebookButton onClick={() => socialLogIn('facebook')}>
                    Facebook????????????????????????
                  </FacebookButton>
                  <TwitterButton onClick={() => socialLogIn('twitter')}>
                    twitter????????????????????????
                  </TwitterButton>
                </div>
              </Box>
            </Paper>
          </Container>
        </Box>
      </form>
    </TopLayout>
  );
};
