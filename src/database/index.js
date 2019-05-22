import SQLite from 'react-native-sqlite-storage'

export class BaseManager {

    


    constructor() {
        if(this.dbInstance == null){
            this.sqlite = SQLite;
            this.sqlite.DEBUG(true);
            this.sqlite.enablePromise(true);
            this.sqlite.openDatabase({
                name: "appPromo",
                location: "default"
            }).then((db) => {
                this.dbInstance = db;
            })
        }
    }

    criarTabelaPromocoes() {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "CREATE TABLE IF NOT EXISTS 'promocoes' ("+
                    "'id'	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
                    "'nome'	TEXT NOT NULL,"+
                    "'codigo'	TEXT NOT NULL,"+
                    "'data'	TEXT NOT NULL,"+
                    "'vencimento'	TEXT NOT NULL,"+
                    "'desconto'	TEXT NOT NULL,"+
                    "'valor'	TEXT NOT NULL,"+
                    "'descricao'	TEXT)"
            ).then((val) => {
                resolve(true)
            }).catch((err) => {
                console.log(err);
                reject(false)
            })
        });
    }

    removeTabela() {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "DROP TABLE 'promocoes' "
            ).then((val) => {
                resolve(true)
            }).catch((err) => {
                console.log(err);
                reject(false)
            })
        });
    }

    

    adicionarPromocao(val) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "INSERT INTO promocoes (nome,codigo,data,vencimento,desconto,descricao,valor)" +
                `VALUES(${val})`
            ).then((val) => {
                resolve(true);
            }).catch((err) => {
                reject(false);
            })

        });
    }

    atualizarPromocao(val) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "UPDATE promocoes SET nome="+val[1]+",codigo="+val[2]+",data="+val[3]+",vencimento="+val[4]+",desconto="+val[5]+",descricao="+val[6]+",valor="+val[7]+" WHERE id ="+val[0]
            ).then((val) => {
                resolve(true);
            }).catch((err) => {
                reject(false);
            })

        });
    }

    listarPromocao(id) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                id==null?"SELECT * FROM promocoes":"SELECT * FROM promocoes WHERE id="+id
            ).then(([values]) => {
                var array = [];
                for (let index = 0; index < values.rows.length; index++) {
                    const element = values.rows.item(index);
                    array.push(element);
                }
                resolve(array);
            }).catch((err) => {
                reject(false);
            })
        });
    }

    deletarPromocao(id) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "DELETE FROM  promocoes where id="+id
            ).then((val) => {
                resolve(true);
            }).catch((err) => {
                reject(false);
            })

        });
    }

    buscaCodigo(codigo) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "SELECT * FROM promocoes WHERE codigo='"+codigo+"'"
            ).then(([values]) => {
                var array = [];
                for (let index = 0; index < values.rows.length; index++) {
                    const element = values.rows.item(index);
                    array.push(element);
                }
                resolve(array);
            }).catch((err) => {
                reject(false);
            })
        });
    }

}