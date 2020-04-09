import {
  Button,
  ButtonGroup,
  Dialog,
  Divider,
  Navbar,
  NavbarGroup,
  Popover,
} from '@blueprintjs/core';
import React, { Suspense } from 'react';
import UserMenu from './UserMenu';
import { useTranslation } from 'react-i18next';
import { remote } from 'electron';
import { useSelector } from 'react-redux';

const Login = React.lazy(() => import('../login'));

const { BrowserWindow, getCurrentWindow } = remote;

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [show, toggle] = React.useState(false);
  const handleLoginClick = () => {
    toggle(true);
    // const win = new BrowserWindow({
    //   height: 300,
    //   width: 400,
    //   backgroundColor: Colors.LIGHT_GRAY4,
    //   modal: true,
    //   parent: getCurrentWindow(),
    //   useContentSize: true,
    //   resizable: false,
    //   minimizable: false,
    //   maximizable: false,
    //   webPreferences: {
    //     nodeIntegration: true,
    //     webSecurity: false,
    //     devTools: false,
    //   },
    // });
    // win.loadURL(`${window.location.origin}#login`);
  };

  const handleClose = React.useCallback(() => {
    toggle(false);
  }, [show]);

  // @ts-ignore
  const { authorized, data } = useSelector(({ userInfo, login: { authorized } }) => ({
    ...userInfo,
    authorized,
  }));

  return (
    <Navbar>
      <NavbarGroup>
        <ButtonGroup>
          <Button icon="insert" intent="primary" text={t('create')} />
          <Button icon="caret-down" intent="primary" />
        </ButtonGroup>
      </NavbarGroup>
      <NavbarGroup align="right">
        {authorized && (
          <>
            <Button minimal icon="notifications" />
            <Button minimal icon="inbox" />
            <Divider />
          </>
        )}
        <Button minimal icon="comment" text={t('anontalk')} />
        {!authorized ? (
          <>
            <Button minimal icon="log-in" text={t('login')} onClick={handleLoginClick} />
            <Dialog icon="log-in" onClose={handleClose} title={t('login')} isOpen={show}>
              <Suspense fallback={<div>Загрузка...</div>}>
                <Login onClose={handleClose} />
              </Suspense>
            </Dialog>
          </>
        ) : (
          <Popover content={<UserMenu />} position="bottom-right">
            <Button minimal icon="user" rightIcon="caret-down" text={data.name} />
          </Popover>
        )}
      </NavbarGroup>
    </Navbar>
  );
};

export default Header;
