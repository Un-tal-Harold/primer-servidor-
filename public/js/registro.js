//mandar el error si se encuentra en back
const mensajeError = document.getElementsByClassName("error")[0];

//enviar todo lo de post
document.getElementById('register-form').addEventListener('submit',async(e)=>{
    e.preventDefault();
    //console.log(e.target.children.name.value);
    const res = await fetch('http://localhost:3000/api/registro',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },body:JSON.stringify({
            user: e.target.children.name.value,
            email: e.target.children.email.value,
            password: e.target.children.password.value
        })
    });
    //para redirigir a la pagina inicial o mostrar error
    if (!res.ok ) return mensajeError.classList.toggle("escondido",false);{
        const resJson = await res.json();
        if (resJson.redirect){
            return window.location.href = resJson.redirect;
        }
    }
});