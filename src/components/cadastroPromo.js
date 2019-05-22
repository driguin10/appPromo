import * as React from 'react';
import { View, Text,StyleSheet,TouchableOpacity,ScrollView,Dimensions,DatePickerAndroid,} from 'react-native';
import { connect } from 'react-redux';
import Header from './utils/header'
import { TextInput,Snackbar  } from 'react-native-paper';
import { atualizaPromo } from '../actions/ActionPromo';
import QRCode from 'react-native-qrcode-svg';
import { BaseManager } from "../database/index";
import moment from "moment"
import {makeid} from "./utils/utilidades"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { TextInputMask } from 'react-native-masked-text'




var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const manager = null;

const dataAtual = moment().format("DD-MM-YYYY")

       

class CadastroPromo extends React.Component {


    async componentWillMount(){
     
        this.manager =  await new BaseManager();
        const { params } = this.props.navigation.state;
        if(params!=null){
            this.getTable(params.idPromo);
        }
        else
        {
            this.props.atualizaPromo({campo:'nome',valor:""})
            this.props.atualizaPromo({campo:'descricao',valor:""})
            this.props.atualizaPromo({campo:'descricao',valor:""})
            this.props.atualizaPromo({campo:'codigo',valor:makeid()})
            this.props.atualizaPromo({campo:'desconto',valor:"0"})
            this.props.atualizaPromo({campo:'data',valor:dataAtual})
            this.props.atualizaPromo({campo:'vencimento',valor:dataAtual})
            this.props.atualizaPromo({campo:'valor',valor:"0,00"})
            this.props.atualizaPromo({campo:'status',valor:"1"})
        }
    }

    componentWillReceiveProps(){
        console.log(this.props.valor)
    }


    getTable(id) {
      
        this.manager.listarPromocao(id).then(val => {
                this.props.atualizaPromo({campo:'id',valor:val[0].id})
                this.props.atualizaPromo({campo:'nome',valor:val[0].nome})
                this.props.atualizaPromo({campo:'descricao',valor:val[0].descricao})
                this.props.atualizaPromo({campo:'descricao',valor:val[0].descricao})
                this.props.atualizaPromo({campo:'codigo',valor:val[0].codigo})
                this.props.atualizaPromo({campo:'desconto',valor:val[0].desconto})
                this.props.atualizaPromo({campo:'data',valor:val[0].data})
                this.props.atualizaPromo({campo:'vencimento',valor:val[0].vencimento})
                this.props.atualizaPromo({campo:'valor',valor:val[0].valor})
                this.props.atualizaPromo({campo:'status',valor:"0"})
               
        }).catch(err => {
                alert("Houve um erro ao listar");
        });
    }

    /*createTable() {
        this.manager
          .criarTabelaPromocoes()
          .then(val => {
            alert("tabela criada");
          })
          .catch(err => {
            alert("false");
          });
    }*/

    /*removeTabela() {
        this.manager
          .removeTabela()
          .then(val => {
            alert("tabela excluida");
          })
          .catch(err => {
            alert("false");
          });
    }*/


    validaCampos(){
         if(this.props.nome =="")  return false 
         if(result = this.props.codigo =="" )  return false
         if(result = this.props.data =="" )  return false
         if(result = this.props.vencimento =="" )  return false
         if(result = this.props.desconto =="" )  return false
         if(result = this.props.valor =="0,00" )  return false  
         return true
    }


    salvar() {
    if(this.validaCampos()){
        if(this.props.status == 1){
            this.manager
            .adicionarPromocao(["'"+this.props.nome+"'",
            "'"+this.props.codigo+"'",
            "'"+this.props.data+"'",
            "'"+this.props.vencimento+"'",
            "'"+this.props.desconto+"'",
            "'"+this.props.descricao+"'",
            "'"+this.props.valor+"'"])
            .then(val => {
                alert("salvo");
                this.props.atualizaPromo({campo:'status',valor:"0"})
            })
            .catch(err => {
                alert("Erro ao salvar");
            });
        }else{
           
            this.manager
            .atualizarPromocao(["'"+this.props.id+"'",
            "'"+this.props.nome+"'",
            "'"+this.props.codigo+"'",
            "'"+this.props.data+"'",
            "'"+this.props.vencimento+"'",
            "'"+this.props.desconto+"'",
            "'"+this.props.descricao+"'",
            "'"+this.props.valor+"'"])
            .then(val => {
                alert("Editado");
               // this.props.atualizaPromo({campo:'status',valor:"0"})
            })
            .catch(err => {
                alert("Erro ao editar");
            });




        }
    }else{
        alert("preencha os campos necessarios")
    }


    }

    excluir() {
        Alert.alert(
            'Excluir',
            'Deseja excluir esta promoção?',
            [
              {
                text: 'Não',
                onPress: () =>{ },
                style: 'cancel',
              },
              {
                text: 'Sim', onPress: () => {
                        this.manager.deletarPromocao(this.props.id)
                        .then(val => {
                            this.props.navigation.goBack();
                        })
                        .catch(err => {
                            alert("Erro ao excluir");
                        });
                }
            },
            ],
            {cancelable: false},
          );    
    }
        
    compartilhar = () =>{
        this.props.navigation.navigate("Compartilhar",{
            code:this.props.codigo,
            titulo:this.props.nome,
            desconto:this.props.desconto,
            validade:this.props.vencimento,
            descricao:this.props.descricao,
        })
    }

    async abrirCalendario () {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              date: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                var dataVenc = moment(day +"-"+(month+1)+"-"+year,"DD-MM-YYYY");
                dataVenc = dataVenc.format("DD-MM-YYYY");
                this.props.atualizaPromo({campo:'vencimento',valor:dataVenc})
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
    }

    render(){
        
        return(
            <View style={styles.containerFundo}>
                 
                <Header navigation={this.props.navigation} nome={"Cadastro de Promoções"}/>
               
                <ScrollView>
               
                <View style={styles.containerCampos}>
                
                    <TextInput
                        ref='nome'
                        style={styles.inputs}
                        label='Nome da Promoção'
                        value={this.props.nome}
                        onChangeText={text => this.props.atualizaPromo({campo:'nome',valor:text})}
                        onSubmitEditing={(event) => { this.refs.descricao.focus() }}
                        mode="flat"
                        theme={{
                            colors: { 
                                placeholder: '#171F33',
                                background: 'transparent',
                                text: '#171F33',
                                primary: '#171F33' 
                            }
                        }}
                    />
                     <TextInput
                        ref='descricao'
                        style={styles.inputs}
                        label='Descrição'
                        value={this.props.descricao}
                        onChangeText={text => this.props.atualizaPromo({campo:'descricao',valor:text})}
                        onSubmitEditing={(event) => { this.refs.valor.focus() }}
                        mode="flat"
                
                        theme={{
                            colors: { 
                                placeholder: '#171F33',
                                background: 'transparent',
                                text: '#171F33',
                                primary: '#171F33' 
                            }
                        }}
                    />
                        
                <View style={{flexDirection:'row'}}>
                    <TextInput
                        ref='valor'
                        style={styles.inputs}
                        label='Valor (R$)'
                        value={this.props.valor}
                        onSubmitEditing={(event) => { this.refs.desconto.focus() }}
                        mode="flat"
                        render={props =>
                            <TextInputMask
                            {...props}
                            type={'money'}
                            options={{
                                precision: 2,
                                separator: ',',
                                delimiter: '.',
                                unit: '',
                                suffixUnit: ''
                            }}
                            value={this.props.valor}
                            onChangeText={text => {
                                this.props.atualizaPromo({campo:'valor',valor:text})
                            
                            }}
                          />  
                        }
                        theme={{
                            colors: { 
                                placeholder: '#171F33',
                                background: 'transparent',
                                text: '#171F33',
                                primary: '#171F33' 
                            }
                        }}
                    />

                  
                        <TextInput
                            ref='desconto'
                            style={styles.inputs}
                            label='Desconto (%)'
                            value={this.props.desconto}
                        
                            mode="flat"
                            underlineColor = {this.props.desconto > 100 ? '#ed3417':'#171F33'}
                            render={props =>
                                <TextInputMask
                                {...props}
                                type={'only-numbers'}
                                value={this.props.desconto}
                                onChangeText={text => {
                                    this.props.atualizaPromo({campo:'desconto',valor:text})
                            
                                }}
                              />  
                            }
                            theme={{
                                colors: { 
                                    placeholder: this.props.desconto > 100 ? '#ed3417':'#171F33',
                                    background: 'transparent',
                                    text: '#171F33',
                                    primary: this.props.desconto > 100 ? '#ed3417':'#171F33' 
                                }
                            }}
                        />
                   
                    


            </View>

                    <View style={{flexDirection:'row'}}>
                        <TextInput
                            style={styles.inputs}
                            label='Data Cadastro'
                            value={this.props.data}
                            onChangeText={text => this.props.atualizaPromo({campo:'data',valor:text})}
                            mode="flat"
                           disabled={true}
                            theme={{
                                colors: { 
                                    placeholder: '#171F33',
                                    background: 'transparent',
                                    text: '#171F33',
                                    primary: '#171F33' 
                                }
                            }}
                        />

                        <TextInput
                            style={styles.inputs}
                            label='Vencimento'
                            value={this.props.vencimento}
                            onChangeText={text => this.props.atualizaPromo({campo:'vencimento',valor:text})}
                            onPress={()=>this.abrirCalendario()}
                            mode="flat"
                            disabled={true}
                            theme={{
                                colors: { 
                                    placeholder: '#171F33',
                                    background: 'transparent',
                                    text: '#171F33',
                                    primary: '#171F33' 
                                }
                            }}
                        />
                        <View style={{flexDirection:'column', justifyContent:'flex-end',marginBottom:23,marginRight:5}}>
                            <TouchableOpacity onPress={()=>this.abrirCalendario()}>
                                <Icon2 name={"calendar"} size={30} color="#25203c" />
                            </TouchableOpacity>
                        </View>
                       
                    </View>

                    
                <View style={styles.qr}>
                  
                    <QRCode
                        value={this.props.codigo !="" && this.props.codigo !=null? this.props.codigo: "0"}
                        size={150}
                    />
                    <Text style={{fontSize:18 , color:"#000",marginTop:10}}>{this.props.codigo}</Text>
                
                </View>


                <View style={{flexDirection:'row' , flex:1, justifyContent:'center',margin:20}}>

                    <TouchableOpacity onPress={()=>this.salvar()} style={styles.botao}>
                        <Icon2 name={this.props.status == "1"?"save":"edit"} size={40} color="#25203c" />
                    </TouchableOpacity>


                    <TouchableOpacity style={ this.props.status =="1"?styles.hide:styles.botao} onPress={()=>this.excluir()}>
                        <Icon name="delete" size={40} color="#25203c" />
                    </TouchableOpacity>

                    <TouchableOpacity style={ this.props.status =="1"?styles.hide:styles.botao} onPress={()=>this.compartilhar()}>
                        <Icon name="share" size={40} color="#25203c" />
                    </TouchableOpacity>

                    
                </View>
                

                
            </View>

                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    
    containerFundo:{
        flex:1,
        color:'#fff',
    },
    hide:{
        display:'none',
    },
    qr:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    containerCampos:{
        flex:1,
        marginLeft:10,
        marginRight:10,  
        marginTop:70
    },
    inputs:{
        marginBottom:10,
        borderRadius:10,
        fontSize:30,
        flex:1,
        marginLeft:5,
        marginRight:5
    },
    botao:{
        margin:10
    }

});


const mapStateToProps = state => ({
    id:state.ReducerPromo.id,
    nome:state.ReducerPromo.nome,
    codigo:state.ReducerPromo.codigo,
    data:state.ReducerPromo.data,
    vencimento:state.ReducerPromo.vencimento,
    desconto:state.ReducerPromo.desconto,
    descricao:state.ReducerPromo.descricao,
    valor:state.ReducerPromo.valor,
    status:state.ReducerPromo.status,
    
});

export default connect(mapStateToProps, {atualizaPromo})(CadastroPromo);

