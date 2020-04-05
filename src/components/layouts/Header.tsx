import { Button, ButtonGroup, Colors, Divider, Navbar, NavbarGroup, Popover } from '@blueprintjs/core';
import React from 'react';
import UserMenu from './UserMenu';
import { useTranslation } from 'react-i18next';
import { remote } from 'electron';

const { BrowserWindow, getCurrentWindow } = remote;

const Header: React.FC = () => {
  const { t } = useTranslation();
  const handleLoginClick = () => {
    const win = new BrowserWindow({
      height: 300,
      width: 400,
      backgroundColor: Colors.LIGHT_GRAY4,
      modal: true,
      parent: getCurrentWindow(),
      useContentSize: true,
      resizable: false,
      minimizable: false,
      maximizable: false,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        devTools: false,
      },
    });
    win.loadURL(`${window.location.origin}#login`);
  };
  return (
    <Navbar>
      <NavbarGroup>
        <ButtonGroup>
          <Button icon="insert" intent="primary" text={t('create')} />
          <Button icon="caret-down" intent="primary" />
        </ButtonGroup>
      </NavbarGroup>
      <NavbarGroup align="right">
        <Button minimal icon="notifications" />
        <Button minimal icon="inbox" />
        <Divider />
        <Button minimal icon="comment" text={t('anontalk')} />
        <Button minimal icon="log-in" text={t('login')} onClick={handleLoginClick} />
        <Popover content={<UserMenu />} position="bottom-right">
          <Button minimal icon="user" rightIcon="caret-down" text="Files" />
        </Popover>
      </NavbarGroup>
    </Navbar>
  );
};

export default Header;
