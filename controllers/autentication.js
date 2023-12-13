import { usuariosregistrados as usuarios } from '../sql/usuarios.js'
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

//para traer las variables de entorno
dotenv.config();

async function login(req, res) {
    //console.log(req.body);
    const user = req.body.user;
    const password = req.body.password;

    //validar si los campos estan vacios
    if (!user || !password) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" })
    }
    //para determinar si el usuario no existe
    const UsuarioValidar = usuarios.find(usuario => usuario.user === user);
    const emailValidar = usuarios.find(email => email.email === user);

    if (!UsuarioValidar) {
        if (!emailValidar){
            return res.status(400).send({ status: "Error", message: "Error durante user login" })
        }
    }

    //compara contraseña
    const loginCorrecto = await bcryptjs.compare(password,emailOuser(UsuarioValidar,emailValidar).password);
    if(!loginCorrecto){
        return res.status(400).send({status:"Error",message:"Error durante pas login"})
    }
    const token = jsonwebtoken.sign(
        {user:emailOuser(UsuarioValidar,emailValidar).user},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRATION});
    
        const cookieOption = {
          expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
          path: "/"
        }
        res.cookie("jwt",token,cookieOption);
        res.send({status:"ok",message:"Usuario loggeado",redirect:"/admin"});
    //console.log(req.body);
}

function emailOuser(us,email) {
    if(us){
        return us
    }
    return email
}

async function registro(req, res) {
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    if (!user || !password || !email) {
        return res.status(400).send({ status: 'Error', message: 'Los campos estan incompretos' });
    }
    //para validar si el usuario ya existe
    const usuarioValidar = usuarios.find(usuario => usuario.user === user);
    if (usuarioValidar) {
        return res.status(400).send({ status: 'Error', message: 'El usuario ya esta registrado' });
    }
    //para valiar si hay un usuario registrado con el mismo email
    const usuarioValidarEmail = usuarios.find(correo => correo.email === email);
    if (usuarioValidarEmail) {
        return res.status(400).send({ status: 'Error', message: `El usuario ya esta registrado con ese correo ${email}` })
    }
    const salt = await bcryptjs.genSalt(5);
    const hasPassword = await bcryptjs.hash(password, salt);
    const nuevoUsuario = {
        user, email, password: hasPassword
    }
    console.log(nuevoUsuario);
    usuarios.push(nuevoUsuario);
    console.log(req.body);
    return res.status(201).send({ status: 'ok', message: `Registrado:${nuevoUsuario}`, redirect: '/' });
}

export const metons = {
    login,
    registro
}