import React from 'react';
import { useHistory, withRouter } from 'react-router';
import {
  Checkbox,
  Classes,
  FormGroup,
  InputGroup,
  Button,
  Intent,
} from '@blueprintjs/core';
import { remote } from 'electron';
import { useFormik } from 'formik';

const { getCurrentWindow } = remote;

const initialValues = {
  name: '',
  password: '',
};

const Login: React.FC = () => {
  const { values, handleSubmit } = useFormik({
    initialValues,
    onSubmit({ name, password }) {
      console.log({ name, password });
    },
  });
  const handleClose = () => {
    const window = getCurrentWindow();
    window.close();
  };
  return (
    <div
      className={Classes.DIALOG}
      style={{
        width: window.innerWidth,
        margin: 0,
        boxShadow: 'none',
        borderRadius: 0,
      }}
    >
      <div className={Classes.DIALOG_BODY}>
        <FormGroup label={'Username'} labelFor="text-input">
          <InputGroup id="text-input" placeholder="Placeholder text" />
        </FormGroup>
        <FormGroup label={'Password'} labelFor="text-input">
          <InputGroup id="text-input" placeholder="Placeholder text" />
        </FormGroup>
        <Checkbox label="Keep me logged in (for up to 365 days)" />
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={handleClose}>Close</Button>
          <Button intent={Intent.PRIMARY} onClick={() => handleSubmit()}>
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
