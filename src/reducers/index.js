import { combineReducers } from 'redux';
import ReducerPrincipal from './ReducerPrincipal'
import ReducerLogin from './ReducerLogin'
import ReducerLoading from './ReducerLoading'
import ReducerPromo from './ReducerPromo'


export default combineReducers({
    ReducerPrincipal : ReducerPrincipal,
    ReducerLogin:ReducerLogin,
    ReducerLoading:ReducerLoading,
    ReducerPromo:ReducerPromo
});