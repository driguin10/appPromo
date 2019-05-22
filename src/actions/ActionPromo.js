


export const atualizaPromo = (novo) => {
        if(novo.campo == "status"){
            return {
                type: "mod_status",
                payload: novo.valor
            }
        }else
        if(novo.campo == "id"){
            return {
                type: "mod_id",
                 payload: novo.valor
            }
        }else
        if(novo.campo == "nome"){
            return {
                type: "mod_nome",
                 payload: novo.valor
            }
        }else
        if(novo.campo == "codigo"){
            return {
                type: "mod_codigo",
                 payload: novo.valor
            }
        }else
        if(novo.campo == "data"){
            return {
                type: "mod_data",
                 payload: novo.valor
            }
        }else
        if(novo.campo == "vencimento"){
            return {
                type: "mod_vencimento",
                 payload: novo.valor
            }
        }else
        if(novo.campo == "desconto"){
            return {
                type: "mod_desconto",
                 payload: novo.valor
            }
        }else
        if(novo.campo == "valor"){
            return {
                type: "mod_valor",
                 payload: novo.valor
            }
        }else
        if(novo.campo == "descricao"){
            return {
                type: "mod_descricao",
                 payload: novo.valor
            }
        }
}

