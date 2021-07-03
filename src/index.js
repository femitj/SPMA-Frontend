import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-hold-on/src/css/react-hold-on.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
