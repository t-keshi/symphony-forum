import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { ROUTE_PATHS } from '../../../routes/type';
import { useRouter } from '../../../utility/hooks/useRouter';

interface Props {
  handleClose: () => void;
  anchorEl: null | HTMLButtonElement;
}

export const HeaderMenu: React.VFC<Props> = ({ handleClose, anchorEl }) => {
  const { history } = useRouter();
  const headerNavItems = [
    {
      label: '近日中のコンサート',
      link: ROUTE_PATHS.近日中のコンサート,
    },
    {
      label: '新着のコンサート',
      link: ROUTE_PATHS.新着のコンサート,
    },
    {
      label: '楽団リスト',
      link: ROUTE_PATHS.楽団リスト,
    },
    {
      label: '楽団運営',
      link: ROUTE_PATHS.楽団運営,
    },
  ];

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {headerNavItems.map((navItem) => (
        <MenuItem
          key={navItem.label}
          onClick={() => history.push(navItem.link)}
        >
          {navItem.label}
        </MenuItem>
      ))}
    </Menu>
  );
};
