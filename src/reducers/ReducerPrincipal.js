const INITIAL_STATE = {
    
    codigoQR:'',
    success: null,
    
    
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case "mod_cod":
            return { ...state, codigoQR: action.payload }

            case "mod_sucess":
            return { ...state, success: action.payload }
        

        default:
            return state;
    }
}