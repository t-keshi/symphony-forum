import { Box, Button, Container, Paper, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormTextField } from '../../components/helpers/FormTextField/FormTextField';
import { TopLayout } from '../../components/layout/TopLayout';
import { ROUTE_PATHS } from '../../routes/type';
import { useRouter } from '../../utility/hooks/useRouter';
import { useTitle } from '../../utility/hooks/useTitle';

interface FormValue {
  email: string;
}

export const ForgetPassword: React.VFC = () => {
  const { history } = useRouter();
  const {
    control,
    formState: { errors },
  } = useForm<FormValue>();

  useTitle('SymphonyForum | パスワード再発行');

  return (
    <TopLayout>
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
              <Typography variant="body1" align="center" paragraph>
                ご登録のメールアドレス宛にパスワード再発行メールを送信します。
              </Typography>
              <FormTextField
                control={control}
                name="email"
                margin="normal"
                label="メールアドレス"
                fullWidth
                errorMessage={errors.email?.message}
              />
              <Box mt={3} />
              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="text"
                  color="secondary"
                  startIcon={<ChevronLeft />}
                  onClick={() => history.push(ROUTE_PATHS.ログイン)}
                >
                  戻る
                </Button>
                <Button
                  onClick={() => history.push(ROUTE_PATHS.近日中のコンサート)}
                >
                  送信
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </TopLayout>
  );
};
