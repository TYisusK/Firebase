var admin = require("firebase-admin");
var keys = require("../database.json");

admin.initializeApp({
    credential: admin.credential.cert(keys)
});

var db = admin.firestore();
var conexionUs = db.collection("usuariosBD"); // Cambiando el nombre de la variable
var conexionProd = db.collection("productosBD");

module.exports = {
    conexionUs, // Actualizando el nombre aquí
    conexionProd
};
