export const mod_codigo = (new_codigo) => {
    return {
        type: "mod_cod",
        payload: new_codigo
    }
}

export const mod_sucess = (new_status) => {
    return {
        type: "mod_sucess",
        payload: new_status
    }
}