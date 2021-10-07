import {
  validarCampoRequerido,
  validarCodigo,
  validarURL,
  validarGeneral,
  validarNumeros,
} from "./validaciones.js";

import { Producto } from "./productoClass.js";


//declarar variables
let listaProductos = [];
let productoExistente = false; //false significa q tengo que agregar un producto nuevo, true -> tengo que modificar uno existente
// este archivo tendra la logica del AMB o CRUD
let producto = document.querySelector("#producto");
let cantidad = document.querySelector("#cantidad");
let codigo = document.querySelector("#codigo");
let descripcion = document.querySelector("#Descripción");
let url = document.querySelector("#URL");
let formulario = document.querySelector("#formProducto");
let btnAgregar = document.querySelector("#btn-agregar");
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

btnAgregar.addEventListener("click", limpiarFormulario);

cargaInicial();

function guardarProducto(e) {
  e.preventDefault();

  // validar los datos del formulario
  if (validarGeneral()) {

    // tengo que modificar o tengo que guardar uno nuevo
     if (productoExistente) {
       //modificar
       actualizarProducto();
     }else {
       //agregar
       // crear un nuevo producto
       console.log("aqui debería crear un producto");
       agregarProducto();
     }
    
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
  localStorage.setItem("listaProductoKey", JSON.stringify(listaProductos));
  // limpiar el formulario
  limpiarFormulario();
  //  Dibujar FILA EN LA TABLA
  crearFila(productoNuevo);
}

function cargaInicial() {
  // si hay algo en el localStorage lo guardo en el arreglo sino dejo el arreglo vacio
  listaProductos = JSON.parse(localStorage.getItem("listaProductoKey")) || [];
  console.log(listaProductos);

  // llamar a la funcion que crea filas
  listaProductos.forEach((itemProducto) => {
    crearFila(itemProducto);
  });
}

function crearFila(itemProducto) {
  console.log(itemProducto);
  // traigo el nodo padre que seria el tbody
  let tabla = document.querySelector("#tablaProductos");
  //console.log(tabla);
  tabla.innerHTML += ` <tr>
  <th scope="row">${itemProducto.codigo}</th>
  <td>${itemProducto.nombreProducto}</td>
  <td>${itemProducto.descripcion}</td>
  <td>${itemProducto.cantidad}</td>
  <td>${itemProducto.url}</td>
  <td>
    <button class="btn btn-warning" onclick="prepararEdicionProducto('${itemProducto.codigo}')">Editar</button>
    <button class="btn btn-danger">Editar</button>
  </td>
</tr>`;
}

function limpiarFormulario() {
  // limpia los value de los elementos del form
  formulario.reset();
  // limpia las clases de cada elemento del form
  codigo.className = "form-control";

  // limpiar los demas input y text-area
  productoExistente = false;
}
//funcion invocada desde el html
//agrego un metodo al objeto window para que la funcion creada sea global y la reconozca el arvhivo tipo kmodulo
window.prepararEdicionProducto = (codigo) => {
  // console.log('algo')
  // console.log(codigo);
  // buscar el objeto dentro del arreglo
  let productoEncontrado = listaProductos.find((itemProducto) => {
    return itemProducto.codigo == codigo;
  });
  //console.log(productoEncontrado);
  //mostrar los datos del objeto en el formulario
  document.querySelector("#codigo").value = productoEncontrado.codigo;
  document.querySelector("#producto").value = productoEncontrado.nombreProducto;
  document.querySelector("#Descripción").value = productoEncontrado.descripcion;
  document.querySelector("#cantidad").value = productoEncontrado.cantidad;
  document.querySelector("#URL").value = productoEncontrado.url;

  // cambiar el valor de la variable bandera para editar
  productoExistente = true;
};


function actualizarProducto(){
  console.log("actualizo");
  console.log(codigo.value);
  // buscar la posicion del objeto con el codigo indicado
  let indiceProducto = listaProductos.findIndex((itemProducto)=> {return itemProducto.codigo == codigo.value});
  console.log(indiceProducto);
 console.log(listaProductos[indiceProducto].nombreProducto);

 // actualizar los valores del objeto encontrado dentro de mi arreglo
 listaProductos[indiceProducto].nombreProducto = document.querySelector("#producto").value;
 listaProductos[indiceProducto].descripcion = document.querySelector("#Descripción").value;
 listaProductos[indiceProducto].cantidad = document.querySelector("#cantidad").value;
 listaProductos[indiceProducto].url = document.querySelector("#URL").value;
 

 console.log(listaProductos[indiceProducto]);

 //actualizar el localstorage
localStorage.setItem('listaProductoKey', JSON.stringify(listaProductos));
 // actualizar la tabla
borrarFilas();
listaProductos.forEach((itemProducto)=>{crearFila(itemProducto);});
}

function borrarFilas(){
  let tabla = document.querySelector("#tablaProductos");
  tabla.innerHTML = '';
}