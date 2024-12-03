const BASEURL = 'http://127.0.0.1:5500/Templates/Registro.html';
/**
* Función para realizar una petición fetch con JSON.
* @param {string} url - La URL a la que se realizará la petición.
* @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
* @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
* @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
*/
async function fetchData(url, method, data = null) {
const options = {
method: method,
headers: {
'Content-Type': 'application/json',
},
body: data ? JSON.stringify(data) : null, // Si hay datos, los convierte a JSON y los incluye en el cuerpo
};
try {
const response = await fetch(url, options); // Realiza la petición fetch
if (!response.ok) {
throw new Error(`Error: ${response.statusText}`);
}
return await response.json(); // Devuelve la respuesta en formato JSON
} catch (error) {
console.error('Fetch error:', error);
alert('An error occurred while fetching data. Please try again.');
}
}
/**
* Funcion que permite crear un elemento <tr> para la tabla de prospectos
* por medio del uso de template string de JS.
*/
async function showProspectos(){
    let prospectos = await fetchData(BASEURL+'/api/prospectos/', 'GET');
    const tableProspectos = document.querySelector('#list-table-prospectos tbody');
    tableProspectos.innerHTML='';
    prospectos.forEach((prospecto, _index) => {
        let tr = `<tr>
                    <td>${prospecto.nombre}</td>
                    <td>${prospecto.apellido}</td>
                    <td>${prospecto.email}</td>
                    <td>${prospecto.fecha_nac}</td>      
    <button class="enviar" onclick='updateMovie(${prospecto.id_prosp})'><i class="fa fa-pencil" ></button></i>
    <button class="enviar" onclick='deleteMovie(${prospecto.id_prosp})'><i class="fa fa-trash" ></button></i>
    </td>
    </tr>`;
    tableProspectos.insertAdjacentHTML("beforeend",tr);
    });
    }
    /**
* Función para comunicarse con el servidor para poder Crear o Actualizar
* un registro de prospecto
* @returns
*/
async function saveProspecto(){
    const idProspecto = document.querySelector('#id-prosp').value;
    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const email = document.querySelector('#email').value;
    const fecha_nac = document.querySelector('#fecha_nac').value;
    //VALIDACION DE FORMULARIO
    if (!idProspecto || !nombre || !apellido || !email || !fecha_nac) {
    Swal.fire({
    title: 'Error!',
    text: 'Por favor completa todos los campos.',
    icon: 'error',
    confirmButtonText: 'Cerrar'
    });
    return;
    }
    // Crea un objeto con los datos del prospecto
    const prospectoData = {
    nombre: nombre,
    apellido: apellido,
    email: email,
    fecha_nac: fecha_nac,
    };
    let result = null;
// Si hay un idProspecto, realiza una petición PUT para actualizar el prospecto existente
if(idProspecto!==""){
result = await fetchData(`${BASEURL}/api/prospectos/${idProspecto}`, 'PUT', prospectoData);
}else{
// Si no hay idProspecto, realiza una petición POST para crear un nuevo Prospecto
result = await fetchData(`${BASEURL}/api/prospectos/`, 'POST', prospectoData);
}
const formProspecto = document.querySelector('#form-prospecto');
formProspecto.reset();
Swal.fire({
title: 'Exito!',
text: result.message,
icon: 'success',
confirmButtonText: 'Cerrar'
})
showProspectos();
}
/**
* Function que permite eliminar un prospecto del array del localstorage
* de acuedo al indice del mismo
* @param {number} id posición del array que se va a eliminar
*/
function deleteProspecto(id){
    Swal.fire({
    title: "Esta seguro de eliminar el prospecto?",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    }).then(async (result) => {
    if (result.isConfirmed) {
    let response = await fetchData(`${BASEURL}/api/prospectos/${id}`, 'DELETE');
    showProspectos();
    Swal.fire(response.message, "", "success");
    }
    });
    }
    /**
* Function que permite cargar el formulario con los datos del prospecto
* para su edición
* @param {number} id Id del prospecto que se quiere editar
*/
async function updateProspecto(id){
    //Buscamos en el servidor el prospecto de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/prospectos/${id}`, 'GET');
    const idProsp = document.querySelector('#id-prosp');
    const nombre = document.querySelector('#nombre');
    const apellido = document.querySelector('#apellido');
    const email = document.querySelector('#email');
    const fecha_nac = document.querySelector('#fecha_nac');
    idProsp.value = response.id_prosp;
    nombre.value = response.nombre;
    apellido.value = response.apellido;
    email.value = response.email;
    fecha_nac.value = response.fecha_nac;
    }
    // Escuchar el evento 'DOMContentLoaded' que se dispara cuando el
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
    const btnSaveProspecto = document.querySelector('#btn-save-prospecto');
//ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveProspecto.addEventListener('click',saveProspecto);
    showProspectos();
    });
    