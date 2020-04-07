import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import { Button, ControlGroup, InputGroup } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { useTranslation } from 'react-i18next';

function onChange(newValue: any) {
  console.log('change', newValue);
}

const Editor: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <ControlGroup fill={true}>
        {/*<select>*/}
        {/*  <option>fdsf</option>*/}
        {/*</select>*/}
        <InputGroup large placeholder="Find tags" />
      </ControlGroup>
      <Button intent="success" text={t('savechanges')} />
      <h3>React</h3>
      <AceEditor
        mode="java"
        theme="github"
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </>
  );
};

export default Editor;
