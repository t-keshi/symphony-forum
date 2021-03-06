import {
  Box,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Event, LocationOn, QueueMusic } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import musicNote from '../../../../assets/musicNote.png';
import { ConcertType } from '../../../../types';
import { dateFormat } from '../../../../utility/dateFormat';
import { StyledLink } from '../../../helpers/StyledLink/StyledLink';
import { TextLabel } from '../../../helpers/TextLabel/TextLabel';

const IMAGE_SIZE = 120;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    columnGap: theme.spacing(3),
  },
  image: {
    objectFit: 'contain',
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    contentVisibility: 'auto',
    containIntrinsicSize: IMAGE_SIZE,
  },
  icon: {
    minWidth: 32,
  },
}));

interface Props {
  concert: ConcertType | undefined;
  link: string;
}

export const ConcertListItem: React.VFC<Props> = ({ concert, link }) => {
  const classes = useStyles();

  if (concert === undefined) {
    return (
      <Box className={classes.root}>
        <Hidden xsDown implementation="css">
          <Skeleton className={classes.image} variant="rect" />
        </Hidden>
        <Box>
          <Skeleton width={100}>
            <TextLabel gutterBottom />
          </Skeleton>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Hidden xsDown implementation="css">
        <img className={classes.image} alt="musicNote" src={musicNote} />
      </Hidden>
      <Box>
        <TextLabel gutterBottom>{concert.orchestra.name}</TextLabel>
        <Typography
          component={StyledLink}
          to={link}
          variant="h6"
          color="textPrimary"
          underline="always"
          display="block"
        >
          {concert.title}
        </Typography>
        <List>
          <ListItem dense>
            <ListItemIcon className={classes.icon}>
              <Event fontSize="small" />
            </ListItemIcon>
            <ListItemText secondary={dateFormat(concert.date)} />
          </ListItem>
          <ListItem dense>
            <ListItemIcon className={classes.icon}>
              <LocationOn fontSize="small" />
            </ListItemIcon>
            <ListItemText secondary={concert.address} />
          </ListItem>
          <ListItem dense>
            <ListItemIcon className={classes.icon}>
              <QueueMusic fontSize="small" />
            </ListItemIcon>
            <ListItemText secondary={concert.symphonies.join(' ')} />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
