import React, { Fragment } from 'react';
import {
  Callout,
  Checkbox,
  Classes,
  FormGroup,
  InputGroup,
  Button,
  Intent,
  IDialogProps,
} from '@blueprintjs/core';
import { remote } from 'electron';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { clientLogin, fetchUserInfo } from '../../store/routines';
import * as Yup from 'yup';

const { getCurrentWindow } = remote;

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const initialValues = {
  name: '',
  password: '',
};

const Login: React.FC<Pick<IDialogProps, 'onClose'>> = ({ onClose }) => {
  const { t } = useTranslation();
  const [showPassword, togglePassword] = React.useState(false);
  // @ts-ignore
  const { loading, error, authorized } = useSelector(({ login }) => login);
  const dispatch = useDispatch();
  const { values, errors, handleSubmit, handleChange, isValid, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit({ username, password }) {
      dispatch(clientLogin({ username, password }));
    },
  });
  React.useEffect(() => {
    if (!!authorized) {
      if (onClose) {
        onClose();
      }
      dispatch(fetchUserInfo());
    }
  }, [authorized]);
  const handleClose = () => {
    const window = getCurrentWindow();
    window.close();
  };
  return (
    <>
      {/*// <div*/}
      {/*//   className={Classes.DIALOG}*/}
      {/*//   style={{*/}
      {/*//     width: window.innerWidth,*/}
      {/*//     margin: 0,*/}
      {/*//     boxShadow: 'none',*/}
      {/*//     borderRadius: 0,*/}
      {/*//   }}*/}
      {/*// >*/}
      <div className={Classes.DIALOG_BODY}>
        {error && (
          <>
            <Callout intent="danger">
              {error.message.split('\n').map((text: string, i: number) => (
                <Fragment key={`${text}-${i}`}>
                  {text}
                  <br />
                </Fragment>
              ))}
            </Callout>
            <br />
          </>
        )}
        <FormGroup
          label={t('userlogin-yourname')}
          labelFor="yourname"
          disabled={loading}
          intent={touched && errors.username ? 'danger' : 'none'}
          helperText={touched && errors.username}
        >
          <InputGroup
            id="yourname"
            placeholder={t('userlogin-yourname-ph')}
            intent={touched && errors.username ? 'danger' : 'none'}
            name="username"
            value={values.username}
            onChange={handleChange}
            disabled={loading}
          />
        </FormGroup>
        <FormGroup
          label={t('userlogin-yourpassword')}
          labelFor="yourpassword"
          disabled={loading}
          intent={touched && errors.password ? 'danger' : 'none'}
          helperText={touched && errors.password}
        >
          <InputGroup
            id="yourpassword"
            type={showPassword ? 'text' : 'password'}
            intent={touched && errors.password ? 'danger' : 'none'}
            placeholder={t('userlogin-yourpassword-ph')}
            name="password"
            value={values.password}
            onChange={handleChange}
            disabled={loading}
            rightElement={
              <Button
                icon={touched && showPassword ? 'unlock' : 'lock'}
                minimal
                intent="warning"
                onClick={() => togglePassword(!showPassword)}
              />
            }
          />
        </FormGroup>
        <Checkbox label={t('userlogin-remembermypassword')} disabled={loading} />
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={handleClose}>{t('feedback-cancel')}</Button>
          <Button
            intent={Intent.PRIMARY}
            onClick={() => handleSubmit()}
            loading={loading}
            disabled={!isValid}
          >
            {t('pt-login-button')}
          </Button>
        </div>
      </div>
      {/*// </div>*/}
    </>
  );
};

export default Login;
