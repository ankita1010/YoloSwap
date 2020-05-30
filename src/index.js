import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import reducer from './reducers';
import App from './components/layouts/App';
import Widget from './components/layouts/Widget';
import rootSaga from './sagas';
import * as serviceWorker from './serviceWorker';
import envConfig from './config/env';

const sagaMiddleware = createSagaMiddleware();

let middleware = [sagaMiddleware];
if (process.env.REACT_APP_ENV === 'local') {
  middleware = [...middleware, logger]
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

sagaMiddleware.run(rootSaga);

const routing = (
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
			
          <Route exact path="/swap/yolo1/:srcSymbol-:destSymbol/" component={App} />
		  <Route exact path="/swap/yolo2/:srcSymbol-:destSymbol/" component={App} />
          <Route exact path="/widget" component={Widget} />
		  <Route path="/swap/yolo1" component={() => <Redirect to="/swap/yolo1/:srcSymbol-:destSymbol/"/>}/>
		  <Route path="/swap/yolo2" component={() => <Redirect to="/swap/yolo2/:srcSymbol-:destSymbol/"/>}/>
          <Redirect to={`/swap/yolo1/eos-${envConfig.TOKENS[1].symbol.toLowerCase()}`}/>
        </Switch>
      </div>
    </Router>
  </Provider>
);

render(routing, document.getElementById('root'));

serviceWorker.unregister();
