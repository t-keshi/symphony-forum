import { Box, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountBox } from '@material-ui/icons';
import React from 'react';
import musicNote from '../assets/musicNote.png';
import { Layout } from '../components/layout/Layout';
import { ConcertAccess } from '../components/ui/ConcertAccess/ConcertAccess';
import { ConcertDetailInfo } from '../components/ui/ConcertDetailInfo/ConcertDetailInfo';
import { ConcertFlyer } from '../components/ui/ConcertFlyer/ConcertFlyer';
import { ConcertProgram } from '../components/ui/ConcertProgram/ConcertProgram';
import { ConcertReactionButtons } from '../components/ui/ConcertReactionButtons/ConcertReactionButtons';
import { ConcertSummary } from '../components/ui/ConcertSummary/ConcertSummary';
import { useFetchConcert } from '../containers/controllers/concert/useFetchConcert';
import { useFetchParticipants } from '../containers/controllers/participation/useFetchParticipants';
import { ROUTE_PATHS } from '../routes/type';
import { useRouter } from '../utility/hooks/useRouter';
import { useTitle } from '../utility/hooks/useTitle';

const useStyles = makeStyles((theme) => ({
  orchestraLink: {
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export const ConcertDetail: React.VFC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  useTitle('SymphonyForum | 大阪大学吹奏楽団');
  const { data } = useFetchConcert();
  const { data: participantsData } = useFetchParticipants();

  return (
    <Layout noPadding hideAppBar>
      {data !== undefined && (
        <ConcertReactionButtons
          isUserLike={data.isUserLike}
          likesCount={data.likesCount}
          isUserParticipants={participantsData?.isUserParticipants ?? false}
          participantsCount={data.participantsCount}
          concert={data}
        />
      )}
      <ConcertFlyer title={data?.title} image={musicNote} />
      <Container maxWidth={false}>
        <Box py={2} position="relative">
          <ConcertSummary orchestraName="大阪大学吹奏楽団" />
          {data !== undefined && (
            <>
              <Box mt={4} />
              <ConcertDetailInfo
                location="兵庫県尼崎市あましんアルカイックホール"
                date={data.date}
                startAt={data.startAt}
                openAt={data.openAt}
                closeAt={data.closeAt}
              />
              <Box mt={4} />
              <ConcertProgram />
              <Box mt={4} />
              <ConcertAccess />
              <div className={classes.orchestraLink}>
                <Button
                  variant="text"
                  color="default"
                  startIcon={<AccountBox color="primary" />}
                  onClick={() =>
                    history.push(
                      `/${ROUTE_PATHS.楽団詳細.split('/')[1]}/${data.id}`,
                    )
                  }
                >
                  楽団情報を見る
                </Button>
              </div>
            </>
          )}
        </Box>
      </Container>
    </Layout>
  );
};
