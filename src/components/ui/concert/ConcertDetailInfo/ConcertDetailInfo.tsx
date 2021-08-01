import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Event, LocationOn, Schedule } from '@material-ui/icons';
import React from 'react';
import { dateFormat } from '../../../../utility/dateFormat';
import { SubHeading } from '../../../helpers/SubHeading/SubHeading';

interface Props {
  date: Date;
  location: string;
  openAt: Date;
  startAt: Date;
  closeAt: Date;
}

export const ConcertDetailInfo: React.VFC<Props> = ({
  location,
  date,
  openAt,
  startAt,
  closeAt,
}) => (
  <div>
    <SubHeading variant="h5" paragraph>
      コンサート情報
    </SubHeading>
    <List>
      <ListItem dense>
        <ListItemIcon>
          <Event fontSize="small" />
        </ListItemIcon>
        <ListItemText secondary={dateFormat(date)} />
      </ListItem>
      <ListItem dense>
        <ListItemIcon>
          <Schedule fontSize="small" />
        </ListItemIcon>
        <ListItemText
          secondary={`${dateFormat(openAt, 'time')} 開場（${dateFormat(
            startAt,
            'time',
          )}  開演）`}
        />
      </ListItem>
      <ListItem dense>
        <ListItemIcon>
          <Schedule fontSize="small" />
        </ListItemIcon>
        <ListItemText secondary={`${dateFormat(closeAt, 'time')} 終演予定`} />
      </ListItem>
      <ListItem dense>
        <ListItemIcon>
          <LocationOn fontSize="small" />
        </ListItemIcon>
        <ListItemText secondary={location} />
      </ListItem>
    </List>
  </div>
);
