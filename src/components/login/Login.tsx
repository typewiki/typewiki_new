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
import { useTranslation } from 'react-i18next';

const { getCurrentWindow } = remote;

const initialValues = {
  name: '',
  password: '',
};

const Login: React.FC = () => {
  const { t } = useTranslation();
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
        <FormGroup label={t('userlogin-yourname')} labelFor="yourname">
          <InputGroup id="yourname" placeholder={t('userlogin-yourname-ph')} />
        </FormGroup>
        <FormGroup label={t('userlogin-yourpassword')} labelFor="yourpassword">
          <InputGroup id="yourpassword" placeholder={t('userlogin-yourpassword-ph')} />
        </FormGroup>
        <Checkbox label={t('userlogin-remembermypassword')} />
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={handleClose}>{t('feedback-cancel')}</Button>
          <Button intent={Intent.PRIMARY} onClick={() => handleSubmit()}>
            {t('pt-login-button')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
