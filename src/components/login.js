import * as React from 'react';
import { View, Text,TouchableOpacity ,StyleSheet,ImageBackground,Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation'
import { TextInput,Divider } from 'react-native-paper';
import { modEmail,modSenha } from '../actions/ActionLogin';
import { setLoading } from '../actions/ActionLoading';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from './utils/loader';
import { BaseManager } from "../database/index";
const manager = null;
class Login extends React.Component {


    async componentWillMount(){
      
        this.manager =  await new BaseManager();
        this.manager.criarTabelaPromocoes()
        .then(val => {
            console.log("tabela criada")
        })
        .catch(err => {
            console.log("tabela criada")
        });
    }


    abrirPricipal = () =>{
        this.props.setLoading(true);
        
       var timer = setTimeout(() => {
                this.props.setLoading(false);
                this.props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName:'Inicio',params:{}}),
                    ],
                }))
                this.props.setLoading(false);
        }, 0);
         
    }

    novaConta = ()=>{
       
    }

    esqueciSenha = () =>{
       
    }


    render(){
        return(     
            <ImageBackground source={require('../resources/1.jpg')} style={{width: '100%', height: '100%'}}>
                <Loader loading={this.props.isLoading}/>
                <View style={style.containerLogo}>
                    <Image source={require('../resources/sanca.png')} style={{width: 200, height: 200}} />
                </View>
                
                <View style={style.containerCampos}>
                
                    <TextInput
                        style={style.inputs}
                        label='Email'
                        value={this.props.email}
                        onChangeText={text => this.props.modEmail(text)}
                        mode="flat"
                        textContentType="emailAddress"
                        underlineColor='#000'
                        theme={{
                            colors: { 
                                placeholder: '#000',
                                background: 'transparent',
                                text: '#000',
                                primary: '#000' ,
                                
                            }
                        }}
                    />

                    <TextInput
                        style={style.inputs}
                        label='Senha'
                        value={this.props.senha}
                        secureTextEntry={true}
                        onChangeText={text => this.props.modSenha(text)}
                        mode="flat"
                        textContentType="password"
                        underlineColor='#000'
                        theme={{
                            colors: { 
                                placeholder: '#000',
                                background: 'transparent',
                                text: '#000',
                                primary: '#000' 
                            }
                        }}
                    />
                    <View style={{width:'100%',alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={()=>this.esqueciSenha()}>
                                <Text style={style.textoBotaoFundo}>Esqueci a Senha!</Text> 
                        </TouchableOpacity> 
                    </View>
                </View>
                <View style={style.containerBotoes}>
                    <TouchableOpacity style={style.botao} onPress={()=>this.abrirPricipal()}>
                        <Text style={style.textoBotao}>Entrar</Text>
                    </TouchableOpacity>
                    <Divider />
                    <View style={style.containerBotoesFundo}>
                        <TouchableOpacity onPress={()=>this.novaConta()}>
                            <Text style={style.textoBotaoFundo}>Criar nova Conta</Text>  
                        </TouchableOpacity>     
                    </View>
                        

                </View>
            </ImageBackground>
        );
    }
}


const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#656565',
        color:'#fff'
    },
    containerLogo:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    containerCampos:{
        flex:1,
        marginLeft:10,
        marginRight:10,  
    },
    inputs:{
        marginBottom:10,
        borderRadius:10,
        fontSize:30
    },
    containerBotoes:{
       marginBottom:30,
       marginLeft:10,
       marginRight:10, 
       zIndex:1
    },
    botao:{
        height:50,
        borderRadius:10,
        backgroundColor:'#25203c',
        borderColor:"#2E284C",
        borderStyle:"solid",
        alignItems: 'center',
        borderWidth :1,
        elevation:2
    },
    textoBotao:{
        height:100,
        color:'#DAE1E7',
        marginTop:5,
        flex:1,
        fontSize:25
    },
    containerBotoesFundo:{
        flexDirection:'row',
        justifyContent:'center',
        marginLeft:10,
        marginRight:10,
        marginTop:20
    },
    textoBotaoFundo:{
        color:'#000'
    }
})



const mapStateToProps = state => ({
    email: state.ReducerLogin.email,
    senha: state.ReducerLogin.senha,
    isLoading: state.ReducerLoading.isLoading,
});

export default connect(mapStateToProps, {modEmail,modSenha,setLoading})(Login);

