// Variables
const btnEnviar = document.querySelector('#enviar');
const btnResetear = document.querySelector('#resetear');
const formulario = document.querySelector('#enviar-mail');

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');


const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        

// Principal
eventListeners();

function eventListeners(){
    // Inicio de la aplicación y deshabilitar submit
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    
    // Enviar email
    formulario.addEventListener('submit', enviarEmail);
    
    // Resetear formulario
    btnResetear.addEventListener('click', resetearFormulario);
}


// Funciones

function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e) {
    if (e.target.value.length > 0) {
        //Elimina los errores
        const error = document.querySelector('.error');
        if(error){
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        // Agrega el borde verde para el OK
        e.target.classList.add('border', 'border-green-500');
    } else {
        //Elimina el OK
        e.target.classList.remove('border', 'border-green-500');
        // Agrega el borde rojo para el Error
        e.target.classList.add('border', 'border-red-500');
        mostrarError("Todos los campos son obligatorios");
    }

    if (e.target.type === 'email'){
        if (er.test(e.target.value)) {
            //Elimina los errores
            const error = document.querySelector('.error');
            if(error){
                error.remove();
            }
            e.target.classList.remove('border', 'border-red-500');
            // Agrega el borde verde para el OK
            e.target.classList.add('border', 'border-green-500');
        } else {
           //Elimina el OK 
            e.target.classList.remove('border', 'border-green-500');
            // Agrega el borde rojo para el Error
            e.target.classList.add('border', 'border-red-500');
            mostrarError("Email no válido");
        }
    }

    if(er.test(email.value) && asunto.value !== '' && mensaje.value != ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    } else {
        btnEnviar.disabled = true;
        btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 
                                'bg-red-100', 'text-red-50', 
                                'p-3', 'mt-5', 'text-center', 'error');
    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}

function enviarEmail(e){
    e.preventDefault();

    // Mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none';

        // Mensaje de envío correcto
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-3', 
                            'bg-green-500');

        // Insertar el parrafo en un sitio anterior al spinner
        formulario.insertBefore(parrafo, spinner);

        //Eliminar el mensaje de éxito
        setTimeout(() => {
            parrafo.remove();
            resetearFormulario();
        }, 2000);
    }, 2000);
}

function resetearFormulario(){
    formulario.reset();
    iniciarApp();

    //Reiniciar estilo de campos
    const error = document.querySelector('.error');
    if (error){
        error.remove();
    }

    email.classList.remove('border', 'border-red-500');
    email.classList.remove('border', 'border-green-500');
    
    asunto.classList.remove('border', 'border-red-500');
    asunto.classList.remove('border', 'border-green-500');

    mensaje.classList.remove('border', 'border-red-500');
    mensaje.classList.remove('border', 'border-green-500');
}