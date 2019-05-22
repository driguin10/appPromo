import * as React from 'react';
import { View, Text,StyleSheet,TouchableOpacity,ScrollView,Dimensions,FlatList,ListItem,Alert} from 'react-native';
import { connect } from 'react-redux';
import Header from './utils/header'
import { FAB ,Portal } from 'react-native-paper';
import { atualizaPromo } from '../actions/ActionPromo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BaseManager } from "../database/index";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


  const manager = null;

class ListaPromo extends React.Component {
   
      constructor(props) {
        super(props);
    
        this.state = {
          datas: [],
          open: false,
        };
      }

      componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            this.getTable();
        });
      }
    
      componentWillUnmount() {
        this.focusListener.remove();
      }

      async componentWillMount(){
        this.manager =  await new BaseManager();
        this.getTable();
      }

      getTable() {
        this.manager
          .listarPromocao(null)
          .then(val => {
            this.setState({
              datas: val
            });
          })
          .catch(err => {
           
          });
      }

      excluir(id,nome) {

        Alert.alert(
            nome,
            'Deseja excluir esta promoção?',
            [
              {
                text: 'Não',
                onPress: () =>{ },
                style: 'cancel',
              },
              {
                text: 'Sim', onPress: () => {
                        this.manager.deletarPromocao(id)
                        .then(val => {
                            alert("Excluido");
                            this.getTable();
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
    

      abrirPromo = (id) =>{
       // this.props.atualizaPromo({campo:'id',valor:id})
        this.props.navigation.navigate("CadastroPromo",{idPromo:id});
      }

      compartilhar = ( dados) =>{
         
        this.props.navigation.navigate("Compartilhar",{code:dados.codigo,titulo:dados.nome,desconto:dados.desconto,validade:dados.vencimento,descricao:dados.descricao})
    }

      keyExtractor = (item, index) => index.toString()

        renderItem = ({ item }) => (

            <View style={styles.card}>
                <TouchableOpacity style={styles.cardClick} onPress={()=>this.abrirPromo(item.id)}>
                    <View style={styles.cardItem}>
                        <View style={{flex:1}}>
                            <Text style={styles.nome}>{item.nome} - {item.desconto}%</Text>
                            <Text style={styles.descricao}>{item.descricao} </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity  onPress={()=>this.compartilhar(item)}>
                                <Icon name="share" size={30} color="#25203c" />
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={()=>this.excluir(item.id,item.nome)}>
                                <Icon name="delete" size={30} color= '#b30202' />
                            </TouchableOpacity>
                        </View>
                    </View>     
                </TouchableOpacity>
            </View>
        )

    render(){
        return(
            <View style={styles.containerFundo}>
                <Header navigation={this.props.navigation} nome={"Promoções"}/>
                
                

                <FlatList
                    style={styles.lista}
                    keyExtractor={this.keyExtractor}
                    data={this.state.datas}
                    renderItem={this.renderItem}
                />
            
                    <FAB
                        style={styles.fab}
                        icon="add"
                        color="#fff"
                        theme={{ colors: { accent: '#25203c' } }}
                        onPress={() => this.props.navigation.navigate("CadastroPromo")}
                    />
                   
            </View>
        );
    }
}


const styles = StyleSheet.create({
    
    containerFundo:{
        flex:1,
        color:'#f7f7f7',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
    lista:{
        
        top:60
    },
    card:{
        margin:5,
        borderRadius:5,
        minHeight:70,
        borderBottomColor:'#e5e5e5',
        borderBottomWidth:1
        
    },
    cardClick:{
        flex:1
    },
    cardItem:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        margin:5
    },
    nome:{
        fontSize:20,
        fontWeight:'bold'
    },
    descricao:{
        fontSize:12
    },
    desconto:{
        fontSize:20,
        textAlign:'center',
        color:'#42f422'
    },
    validade:{
        fontSize:12,
        textAlign:'center',
        color:'#e10000'
    }

});


const mapStateToProps = state => ({
    id:state.ReducerPromo.id,
});

export default connect(mapStateToProps, {atualizaPromo})(ListaPromo);

