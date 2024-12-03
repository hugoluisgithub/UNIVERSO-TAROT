
/*Validar previo envío de formulario*/
   var nombre1, nombre2;
   function iniciar() {
    nombre1=document.getElementById("nombre");
    nombre2=document.getElementById("apellido");
    nombre1.addEventListener("input",validacion);
    nombre2.addEventListener("input",validacion);
    validacion();
   }
    function validacion() {
        if(nombre1.value==""||nombre2.value==""){
        nombre1.setCustomValidity("Inserte su nombre");
        nombre1.style.background="#FFDDDD";
        nombre2.setCustomValidity("Inserte su apellido");
        nombre2.style.background="#FFDDDD";
        }else{
        nombre1.setCustomValidity("");
        nombre1.style.background="#FFFFFF";
        nombre2.STYLE.background="#FFFFFF";     
    }
}  
    window.addEventListener("load", iniciar);
    