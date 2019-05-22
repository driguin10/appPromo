import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import {rootNavigation} from './src/Routes';
import reducers from './src/reducers';
import { createAppContainer } from "react-navigation";


const RootNavigation = createAppContainer(rootNavigation);


export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <RootNavigation />
      </Provider>
    );
  }
}