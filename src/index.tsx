import React from 'react';
import ReactDOM from 'react-dom';
import { FocusStyleManager } from '@blueprintjs/core';
import App from './components/App';
import './index.less';
import './i18n';

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(<App />, document.getElementById('root'));
