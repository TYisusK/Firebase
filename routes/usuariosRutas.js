var ruta=require("express").Router();
var subirArchivo = require("../middlewares/middleware").subirArchivo;
var eliminarArchivo = require("../middlewares/middleware").eliminarArchivo;

var {mostrarUsuarios, nuevoUsuario, buscarporID, modificarUsuario, borrarUsuario, iniciarSesion}=require("../database/usuariosBD");
const Usuario = require("../models/Usuario");

ruta.get("/",async(req, res)=>{
    var usuarios = await mostrarUsuarios()
    console.log(usuarios);
    res.render("usuarios/mostrar", {usuarios})
});

ruta.get("/nuevousuario", (req,res)=>{
    res.render("usuarios/nuevo");
});

ruta.post("/nuevousuario",subirArchivo(), async(req,res)=>{
    //console.log(req.file);
    //console.log(req.body);
    req.body.foto=req.file.filename;
    var error=await nuevoUsuario(req.body);
    //res.end();
    res.redirect("/");
});

ruta.get("/editarUsuario/:id", async(req,res)=>{
    console.log(req.params.id);
    buscarporID();
    var user= await buscarporID(req.params.id);
    res.render("usuarios/modificar", {user});
    res.end();
});

ruta.post("/editarusuario", subirArchivo(), async(req,res)=>{
  if (req.file != null){
    req.body.foto = req.file.filename;
  }else{
    req.body.foto = req.body.fotoAnterior;
  }
    //console.log(req.body);
    //req.body.foto=req.file.originalname;
    var error = await modificarUsuario(req.body);
    res.redirect("/");
});


ruta.get("/borrarUsuario/:id", async (req, res) => {
    try {
      var usuario = await buscarporID(req.params.id);
      if (!usuario) {
        res.status(400).send("Usuario no encontrado.");
      } else {
        var archivo = usuario.foto;
        await borrarUsuario(req.params.id);
        eliminarArchivo(archivo)(req, res, () => {
          res.redirect("/");
        });
      }
    } catch (err) {
      console.log("Error al borrar usuario" + err);
      res.status(400).send("Error al borrar usuario.");
    }
  });
  ruta.get("/login", (req, res) => {
    
    res.render("usuarios/login", { error: null });
  });
  
  ruta.post("/login", async (req, res) => {
    const datos = req.body;

    console.log("Datos del formulario:", datos); // Agrega esta línea para depurar

    const resultadoInicioSesion = await iniciarSesion(datos);

    if (resultadoInicioSesion.exitoso) {
        // Inicio de sesión exitoso
        res.redirect("/");
    } else {
        // Usuario no encontrado, contraseña incorrecta o error
        console.log("Error de inicio de sesión:", resultadoInicioSesion.mensaje); // Agrega esta línea para depurar
        res.render("usuarios/login", { error: resultadoInicioSesion.mensaje });
    }
});




module.exports=ruta;