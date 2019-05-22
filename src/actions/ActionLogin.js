export const modEmail = (novo) => {
    return {
        type: "alteraEmail",
        payload: novo
    }
}

export const modSenha = (novo) => {
    return {
        type: "alteraSenha",
        payload: novo
    }
}