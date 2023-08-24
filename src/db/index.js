const mongoose = require( 'mongoose' );

const connectMongo = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://cristianlanza:coderlanza@proyectobackend.jj3ggfu.mongodb.net/ecommerce?retryWrites=true&w=majority"
        )
        console.log( 'db is connected' );
    } catch (error) {
        console.log( `${ error } No se pudo establecer la conexión con la base de datos.` );
    }
}

module.exports = connectMongo;