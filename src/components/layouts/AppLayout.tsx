import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarGroup,
  Colors,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { remote } from 'electron';

const { BrowserWindow, getCurrentWindow } = remote;

const AppLayout: React.FC = ({ children }) => {
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
    <>
      <Navbar>
        <NavbarGroup align={Alignment.RIGHT}>
          <Button
            className={Classes.MINIMAL}
            icon={IconNames.LOG_IN}
            text={t('login')}
            onClick={handleLoginClick}
          />
          <Button
            className={Classes.MINIMAL}
            icon={IconNames.USER}
            rightIcon={IconNames.CARET_DOWN}
            text="Files"
          />
        </NavbarGroup>
      </Navbar>
      {children}
    </>
  );
};

export default AppLayout;
