const cerrar = document.getElementById('cerrar').addEventListener("click",()=>{
  document.cookie ='jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.location.href = "/";
});
const cronometro = document.getElementById('cronometro').addEventListener('click',()=>{
  document.location.href = '/cronometro';
})