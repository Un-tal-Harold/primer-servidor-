const cronometro = document.getElementById('cronometro');
const botonIncioPausa = document.getElementById('boton-iniciar');
const BotonReniciar = document.getElementById('boton-reiniciar');

let [horas,minutos,segundos] = [0,0,0];
let intervaloDeTiempo;
let estadoCronometro= 'pausado';

// Actualizar el cronometro.
function actualizarCronometro() {
    segundos++;
  
    if (segundos / 60 === 1) {
      segundos = 0;
      minutos++;
  
      if (minutos / 60 === 1) {
        minutos = 0;
        horas++;
      }
    }
  
    // Agregar un cero a la izquierda si es necesario.
    const segundosConFormato = asignarFormato(segundos);
    const minutosConFormato = asignarFormato(minutos);
    const horasConFormato = asignarFormato(horas);
  
    // Actualizar el contenido del cronometro.
    cronometro.innerText = `${horasConFormato}:${minutosConFormato}:${segundosConFormato}`;
}

// Agregar un cero a la izquierda si se necesita.
function asignarFormato(unidadDeTiempo) {
    return unidadDeTiempo < 10 ? '0' + unidadDeTiempo : unidadDeTiempo;
  }

botonIncioPausa.addEventListener('click',()=>{
    if (estadoCronometro === 'pausado'){
        intervaloDeTiempo = window.setInterval(actualizarCronometro, 1000);
        botonIncioPausa.innerHTML = '<i class="bi bi-pause-fill"></i>';
        botonIncioPausa.style.background = '#F3E645';
        estadoCronometro = 'andando';
    }else{
        botonIncioPausa.innerHTML='<i class="bi bi-play-fill"></i>';
        window.clearInterval(intervaloDeTiempo)
        estadoCronometro = 'pausado';
        botonIncioPausa.style.background = 'rgb(54, 228, 54)';
    }
})
BotonReniciar.addEventListener('click',()=>{
    window.clearInterval(intervaloDeTiempo);
    segundos =0;
    minutos = 0;
    horas = 0;
    cronometro.innerText= '00:00:00';
    botonIncioPausa.innerHTML='<i class="bi bi-play-fill"></i>';
    botonIncioPausa.style.background = 'rgb(54, 228, 54)';
    estadoCronometro = 'pausado';
})

//app como tal 
//cerrar sesion
const cerrar = document.getElementById('cerrar').addEventListener("click",()=>{
  document.cookie ='jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.location.href = "/";
});
//regresar 
const regresar = document.getElementById('regresar').addEventListener('click',()=>{
  document.location.href = "/admin";
});
