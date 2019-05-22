const INITIAL_STATE = {
    email: '',
    senha:''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case "alteraEmail":
            return { ...state, email: action.payload }

        case "alteraSenha":
            return { ...state, senha: action.payload }


        default:
            return state;
    }
}