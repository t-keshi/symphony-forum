import { Container } from '@material-ui/core';
import React from 'react';
import image from '../assets/imageNotFound.jpeg';
import { Layout } from '../components/layout/Layout';
import { ConcertFlyer } from '../components/ui/ConcertFlyer/ConcertFlyer';
import { ProfileForm } from '../components/ui/ProfileForm/ProfileForm';
import { useTitle } from '../utility/hooks/useTitle';

export const ProfileSetting: React.VFC = () => {
  useTitle('SymphonyForum | プロフィール');

  return (
    <Layout noPadding>
      <div>
        <ConcertFlyer title="profile" image={image} />
        <Container maxWidth={false}>
          <ProfileForm />
        </Container>
      </div>
    </Layout>
  );
};
