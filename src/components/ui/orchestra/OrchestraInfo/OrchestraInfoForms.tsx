import { Box } from '@material-ui/core';
import React from 'react';
import { Orchestra } from '../../../../containers/controllers/orchestra/useFetchOrchestra';
import { OrchestraDescriptionForm } from '../OrchestraDescription/OrchestraDescriptionForm';
import { OrchestraDetailInfoForm } from '../OrchestraDetailInfo/OrchestraDetailInfoForm';
import { OrchestraNotificationForm } from '../OrchestraNotification/OrchestraNotificationForm';

interface Props {
  orchestra: Orchestra;
}

export const OrchestraInfoForms: React.VFC<Props> = ({ orchestra }) => (
  <>
    <OrchestraDescriptionForm
      orchestraId={orchestra.id}
      description={orchestra.description}
    />
    <Box mt={5} />
    <OrchestraNotificationForm
      orchestraId={orchestra.id}
      notifications={orchestra.notifications}
    />
    <Box mt={5} />
    <OrchestraDetailInfoForm
      orchestraId={orchestra.id}
      membersCount={orchestra.membersCount}
      conductor={orchestra.conductor}
      subConductor={orchestra.subConductor}
      homePage={orchestra.homePage}
    />
  </>
);
