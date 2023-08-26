const mongoose = require( 'mongoose' );
const { db } = require( '../config/index.config' );

const connectMongo = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${ db.user }:${ db.pass }@${ db.host }/${ db.name }?retryWrites=true&w=majority`
        )
        console.log( 'db is connected' );
    } catch (error) {
        console.log( `${ error } No se pudo establecer la conexión con la base de datos.` );
    }
}

module.exports = connectMongo;