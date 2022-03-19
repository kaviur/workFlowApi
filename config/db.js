const config = require("./index.js")
const mongoose = require("mongoose")

const connect = async ()=>{
    try {
        await mongoose.connect(
            `mongodb+srv://${config.db_user}:${config.db_pass}@${config.db_host}/${config.db_name}`,
            {
                useNewUrlParser: true
            })
        console.log('Estas conectado a la base de datos')
    } catch (e) {
        console.log('Ocurrió un error al intentar conectarse a la base de datos')
    }
}

module.exports = {connect,mongoose}