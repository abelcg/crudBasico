export function validarCampoRequerido(input) {
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



//console.log(producto);

export function validarNumeros(input) {
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

export function validarCodigo(input) {
  // validar que tenga al menos 3 caracteres

  if (input.value.trim() != "" && input.value.trim().length >= 3) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarURL(input) {
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

export function validarGeneral() {
 
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
    return true;
  } else {
    console.log("validación incorrecta");
    alerta.className = 'alert alert-danger mt-4';
    return false;
  }
}


