import React from 'react';
import { useHistory, withRouter } from 'react-router';
import { Classes, FormGroup, InputGroup } from '@blueprintjs/core';

const Login: React.FC = () => {
  const history = useHistory();
  return (
    <div
      className={Classes.DIALOG}
      style={{
        width: 400,
        margin: 0,
        boxShadow: 'none',
        borderRadius: 0,
      }}
    >
      <div className={Classes.DIALOG_BODY}>
        <FormGroup label={'Label'} labelFor="text-input" labelInfo={'(required)'}>
          <InputGroup id="text-input" placeholder="Placeholder text" />
        </FormGroup>
        <FormGroup label={'Label'} labelFor="text-input" labelInfo={'(required)'}>
          <InputGroup id="text-input" placeholder="Placeholder text" />
        </FormGroup>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        fdfgfgfdg dfgfdgdf df gfdgdf dfgfdg dfgdfgf
      </div>
    </div>
  );
};

export default withRouter(Login);
