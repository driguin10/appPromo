
import * as React from 'react';
import {createStackNavigator } from "react-navigation";
import Login from './components/login';
import Inicio from './components/inicio';
import Captura from './components/captura';
import Resultado from './components/resultado';
import CadastroPromo from './components/cadastroPromo';
import ListaPromo from './components/listaPromo';
import Compartilhar from './components/compartilhar'
import Icon from 'react-native-vector-icons/FontAwesome';


 export const rootNavigation =createStackNavigator ({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Inicio: {
    screen: Inicio,
    navigationOptions: {
      header: null,
    },
  },
  Captura: {
    screen: Captura,
    navigationOptions: {
      header: null,
    },
  },
  Resultado: {
    screen: Resultado,
    navigationOptions: {
      header: null,
    },
  },
  CadastroPromo: {
    screen: CadastroPromo,
    navigationOptions: {
      header: null,
    },
  },
    ListaPromo: {
      screen: ListaPromo,
      navigationOptions: {
        header: null,
      },
},
Compartilhar: {
  screen: Compartilhar,
  navigationOptions: {
    header: null,
  },
}},
{
    headerMode: 'none',
    initialRouteName: 'Login'
});


