// este archivo tendra la logica del AMB o CRUD

let producto = document.querySelector("#producto");
let cantidad = document.querySelector("#cantidad");
let codigo = document.querySelector("#codigo");
let descripcion = document.querySelector("#Descripción");
let url = document.querySelector("#URL");
let formulario = document.querySelector("#formProducto");


producto.addEventListener("blur", () => {
    validarCampoRequerido(producto);
  });
