function validarCampoRequerido(input) {
  // console.log(input);
  console.log(input.value);

  if (input.value.trim().length > 0 && input.value.trim().length >= 3) {
    console.log("el dato es correcto");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("dato erroneo");
    input.className = "form-control is-invalid";
    return false;
  }
}

let producto = document.querySelector("#producto");
let cantidad = document.querySelector("#cantidad");
let codigo = document.querySelector("#codigo");
let descripcion = document.querySelector("#Descripción");
let url = document.querySelector("#URL");
let formulario = document.querySelector("#formProducto");

//console.log(producto);

function validarNumeros(input) {
  // validar con expresiones regulares
  let patron = /^[0-9]{1,5}$/;
  if (patron.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

function validarCodigo(input) {
  // validar que tenga al menos 3 caracteres

  if (input.value.trim() != "" && input.value.trim().length >= 3) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

function validarURL(input) {
  // validar URL con una expresión regular

  let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (input.value.trim() != "" && patron.test(input.value.trim())) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

function validarGeneral(e) {
  e.preventDefault();
  // console.log('desde validar general');
  //console.log(e);
  let alerta = document.querySelector('#msjAlerta');
  if (
    validarCodigo(document.querySelector("#codigo")) &&
    validarCampoRequerido(document.querySelector("#producto")) &&
    validarCampoRequerido(document.querySelector("#Descripción")) &&
    validarNumeros(document.querySelector("#cantidad")) &&
    validarURL(document.querySelector("#URL"))
  ) {
    console.log("validación correcta");
    alerta.className = 'alert alert-danger mt-4 d-none';
  } else {
    console.log("validación incorrecta");
    alerta.className = 'alert alert-danger mt-4';
  }
}

// agregar eventos desde javascript
producto.addEventListener("blur", () => {
  validarCampoRequerido(producto);
}); //utilizo la función anonima flecha pq necesito usar la funcion validar con un parametro, si no solo el nombre de la funciomn si no tendría parámetro
cantidad.addEventListener("blur", () => {
  validarNumeros(cantidad);
});
descripcion.addEventListener("blur", () => {
  validarCampoRequerido(descripcion);
});
codigo.addEventListener("blur", () => {
  validarCodigo(codigo);
});
url.addEventListener("blur", () => {
  validarURL(url);
});
formulario.addEventListener("submit", validarGeneral);
