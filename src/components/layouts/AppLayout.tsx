import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alignment,
  Button,
  Classes,
  IconName,
  Navbar,
  NavbarGroup,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { remote } from 'electron';
import { withRouter } from 'react-router';

const { BrowserWindow } = remote;

// @ts-ignore
const AppLayout: React.FC = ({ children, history }) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Navbar>
        <NavbarGroup align={Alignment.RIGHT}>
          <Button
            className={Classes.MINIMAL}
            icon={IconNames.LOG_IN}
            text="Login"
            onClick={() => {
              const win = new BrowserWindow({
                height: 300,
                width: 400,
                useContentSize: true,
                title: 'Log in',
                resizable: false,
                minimizable: false,
                maximizable: false,
                webPreferences: {
                  nodeIntegration: true,
                  webSecurity: false,
                  devTools: false,
                },
              });
              win.loadURL('http://localhost:3000/#login');
            }}
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

export default withRouter(AppLayout);
