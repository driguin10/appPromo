import moment from "moment"

export const makeid = () =>{
    var result           = '';
   // var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var characters = moment().format('LLLL').replace(/[:,\s]/g,"");
  
    var charactersLength = characters.length;
    for ( var i = 0; i < 7; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

return result;
    
    
 }
