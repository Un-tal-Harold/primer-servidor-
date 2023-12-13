import { usuariosregistrados as usuarios } from '../sql/usuarios.js'
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";


//para traer las variables de entorno
dotenv.config();
function soloAdmin(req, res, next) {
  const logueado = revisarCookie(req);
  console.log(logueado);
  if (logueado) return next();
  return res.redirect("/");
}

function publico(req, res, next) {
  const logueado = revisarCookie(req);
  if (!logueado) return next();
  return res.redirect("/admin")
}

function revisarCookie(req) {
  try {
    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    console.log(decodificada);
    const usuarioAResvisar = usuarios.find(usuario => usuario.user === decodificada.user);
    console.log(usuarioAResvisar);
    if (!usuarioAResvisar) {
      return false;
    }
    return true;
  }
  catch {
    return false;
  }
}
export const metons = {
  soloAdmin,
  publico
}