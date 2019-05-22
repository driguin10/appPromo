const INITIAL_STATE = {
    id: '',
    nome:'',
    codigo:'',
    data:'',
    vencimento:'',
    desconto:'',
    descricao:'',
    valor:'',
    status:'1'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

            case "mod_id":
            return { ...state, id: action.payload }
            case "mod_nome":
            return { ...state, nome: action.payload }
            case "mod_codigo":
            return { ...state, codigo: action.payload }
            case "mod_data":
            return { ...state, data: action.payload }
            case "mod_vencimento":
            return { ...state, vencimento: action.payload }
            case "mod_desconto":
            return { ...state, desconto: action.payload }
            case "mod_descricao":
            return { ...state, descricao: action.payload }
            case "mod_valor":
                return { ...state, valor: action.payload }
            case "mod_status":
            return { ...state, status: action.payload}

        default:
            return state;
    }
}