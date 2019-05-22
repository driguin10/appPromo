const INITIAL_STATE = {
    isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case "setLoading":
            return { ...state, isLoading: action.payload }

      
        default:
            return state;
    }
}