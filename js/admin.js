import {
  validarCampoRequerido,
  validarCodigo,
  validarURL,
  validarGeneral,
  validarNumeros,
} from "./validaciones.js";

import { Producto } from "./productoClass.js";

// este archivo tendra la logica del AMB o CRUD
//declarar variables
let listaProductos = [];

let producto = document.querySelector("#producto");
let cantidad = document.querySelector("#cantidad");
let codigo = document.querySelector("#codigo");
let descripcion = document.querySelector("#Descripción");
let url = document.querySelector("#URL");
let formulario = document.querySelector("#formProducto");



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
formulario.addEventListener("submit", guardarProducto);
cargaInicial();

function guardarProducto(e) {
  e.preventDefault();

  // validar los datos del formulario
  if (validarGeneral()) {
    // crear un nuevo producto
    console.log("aqui debería crear un producto");
    agregarProducto();
  } else {
    console.log("aqui solo mostrar el cartel de error");
  }
}

function agregarProducto() {
  let productoNuevo = new Producto(
    codigo.value,
    producto.value,
    descripcion.value,
    cantidad.value,
    url.value
  );

 // console.log(productoNuevo);
 // guardar el producto en el arreeglo
  listaProductos.push(productoNuevo);
  console.log(listaProductos);

  // guardo en localstorage
  localStorage.setItem('listaProductoKey', JSON.stringify(listaProductos));
  // limpiar el formulario
  //  Dibujar FILA EN LA TABLA
}


function cargaInicial(){
  listaProductos = JSON.parse(localStorage.getItem('listaProductoKey')) || [];
  console.log(listaProductos);
}

