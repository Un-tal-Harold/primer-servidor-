import express from "express";
//fix para _direname
import path from 'path';
import {fileURLToPath} from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { metons as autentication } from "./controllers/autentication.js";
import cookieParser from "cookie-parser";
import {metons as autorizacion} from "./middlewares/autorizacion.js"

//express
const app = express();
const PUERTO = process.env.PORT || 3000;

//servidor
app.set("port",PUERTO);
app.listen(app.get("port"));
console.log(`El servidor esta escuchando en el ${app.get("port")}`);
console.log(`http://localhost:${app.get("port")}`);

//Configuracion de css js y img

app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/web 5/public'));
app.use(express.json());
app.use(cookieParser())
//rutas
app.get('/',autorizacion.publico,(req,res)=>{
    res.sendFile(__dirname+ "/views/login.html")
}); 
app.get('/registro',autorizacion.publico,(req,res)=>{
    res.sendFile(__dirname+'/views/registro.html')
});
app.get('/admin',autorizacion.soloAdmin,(req,res)=>{
    res.sendFile(__dirname+'/views/admin.html')
});
app.get('/cronometro',autorizacion.soloAdmin,(req,res)=>{
    res.sendFile(__dirname+'/web 5/index.html')
})
app.post('/api/login', autentication.login);
app.post('/api/registro',autentication.registro);
