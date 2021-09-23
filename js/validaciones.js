function validarCampoRequerido(input){
   // console.log(input);
    console.log(input.value);

    if (input.value.trim().length > 0 && input.value.trim().length >= 3 ) {
        console.log('el dato es correcto');
        input.className = 'form-control is-valid';
    }else {
        console.log('dato erroneo');
        input.className = 'form-control is-invalid';
    }
}

let producto = document.querySelector('#producto');
let cantidad = document.querySelector('#cantidad');
//console.log(producto);

function validarNumeros(input){
    // validar con expresiones regulares
    let patron = /^[0-9]{1,5}$/;
    if (patron.test(input.value)) {
        input.className = 'form-control is-valid';
    } else {
        input.className = 'form-control is-invalid';
    }
}


// agregar eventos desde javascript
producto.addEventListener('blur', ()=>{ validarCampoRequerido(producto); }); //utilizo la función anonima flecha pq necesito usar la funcion validar con un parametro, si no solo el nombre de la funciomn si no tendría parámetro
cantidad.addEventListener('blur', ()=>{
    validarNumeros(cantidad);
});