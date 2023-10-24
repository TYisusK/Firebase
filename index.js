var express=require("express");
var path=require("path");
var cors =require('cors');
var usuariosRutas=require("./routes/usuariosRutas");
var productosRutas=require("./routes/productosRutas");
var usuariosRutasApi=require("./routes/usuariosRutasApi");
var productosRutasApi=require("./routes/productosRutasApi");

var app=express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use("/", express.static(path.join(__dirname,"/web")));
app.use(cors());
app.use("/", usuariosRutas, productosRutas,usuariosRutasApi, productosRutasApi);
var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port);
});
