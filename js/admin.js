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
let productoExistente = false; //variable bandera: false significa q tengo que agregar un producto nuevo, true -> tengo que modificar uno existente
// este archivo tendra la logica del AMB o CRUD
let producto = document.querySelector("#producto");
let cantidad = document.querySelector("#cantidad");
let codigo = document.querySelector("#codigo");
let descripcion = document.querySelector("#Descripción");
let url = document.querySelector("#URL");
let formulario = document.querySelector("#formProducto");
let btnAgregar = document.querySelector("#btn-agregar");
let btnDatosPrueba = document.querySelector("#btnDatosPrueba");
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
btnDatosPrueba.addEventListener("click", cargarDatosPrueba);

cargaInicial();

function guardarProducto(e) {
  e.preventDefault();

  // validar los datos del formulario
  if (validarGeneral()) {
    // tengo que modificar o tengo que guardar uno nuevo
    if (productoExistente) {
      //modificar
      actualizarProducto();
    } else {
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
  //mostar un mensaje al usuario
  Swal.fire(
    "Producto agregado",
    "El producto fue correctamente agregado",
    "success"
  );
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
    <button class="btn btn-danger" onclick="eliminarProducto('${itemProducto.codigo}')">Borrar</button>
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

function actualizarProducto() {
  /* console.log("actualizo");
  console.log(codigo.value); */

  Swal.fire({
    title: "Esta seguro que desea editar el producto?",
    text: "No puede revertir posteriormente este proceso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
    cancelButtonText: "Cancelar",
  }).then((result) => {    //promesa. dettiene el proceso asincronico
    if (result.isConfirmed) {
      //aqui es donde procedemos a editar
      // buscar la posicion del objeto con el codigo indicado
      let indiceProducto = listaProductos.findIndex((itemProducto) => {
        return itemProducto.codigo == codigo.value;
      });
      console.log(indiceProducto);
      console.log(listaProductos[indiceProducto].nombreProducto);

      // actualizar los valores del objeto encontrado dentro de mi arreglo
      listaProductos[indiceProducto].nombreProducto =
        document.querySelector("#producto").value;
      listaProductos[indiceProducto].descripcion =
        document.querySelector("#Descripción").value;
      listaProductos[indiceProducto].cantidad =
        document.querySelector("#cantidad").value;
      listaProductos[indiceProducto].url = document.querySelector("#URL").value;

      console.log(listaProductos[indiceProducto]);

      //actualizar el localstorage
      localStorage.setItem("listaProductoKey", JSON.stringify(listaProductos));
      // actualizar la tabla
      borrarFilas();
      listaProductos.forEach((itemProducto) => {
        crearFila(itemProducto);
      });

      // limpiar el formulario
      limpiarFormulario();

      // mostrar un mensaje que el producto fue editado
      Swal.fire("Producto editado!", "Su producto fue correctamente editado", "success");
    }
  });
}

function borrarFilas() {
  let tabla = document.querySelector("#tablaProductos");
  tabla.innerHTML = "";
}

window.eliminarProducto = (codigo)=> {
  console.log(codigo);
  Swal.fire({
    title: '¿Eta seguro de borrar el producto?',
    text: "No se puede revertir este proceso posteriormente",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar!',
    cancelButtonText: 'Cancelar'

  }).then((result) => {
    if (result.isConfirmed) {
     // aqui el codigo si quiero borrar
     // opc1 usar splice(indice, 1), para obtener el indice puedo usar findIndex
     //opc2 usar filter
     let _listaProductos = listaProductos.filter((itemProducto)=>{return itemProducto.codigo != codigo})
     console.log(_listaProductos);
    // actualizar el arreglo y el localStorage
    listaProductos = _listaProductos;
    localStorage.setItem('listaProductoKey', JSON.stringify(listaProductos));
    //Borramos la tabla
    borrarFilas();
    //vuelvo a dibujar la tabla
    listaProductos.forEach((itemProducto) => {
      crearFila(itemProducto);
    });
     //muestro el mensaje
      Swal.fire(
        'Producto eliminado!',
        'El producto fue eliminado correctamente',
        'success'
      )
    }
  })
};



function cargarDatosPrueba(){
  const datos = [
    {
      codigo: "994",
      nombreProducto: "Kakashi Hatake (Anbu)",
      cantidad: "1",
      descripcion:
        "Funko Figura Pop Naruto Shippuden Kakashi Hatake (Anbu) (AAA Anime Exclusive)",
      url: "https://m.media-amazon.com/images/I/51Mkr80aQqL._AC_SL1092_.jpg",
    },
    {
      codigo: "933",
      nombreProducto: "Shikamaru Nara",
      cantidad: "1",
      descripcion: "Naruto shippuden",
      url: "https://m.media-amazon.com/images/I/51BitznofnL._AC_SL1300_.jpg",
    },
    {
      codigo: "184",
      nombreProducto: "Tobi",
      cantidad: "1",
      descripcion:
        "Figura de Tobi de Naruto Shippuden de la marca FunKo POP Anime",
      url: "https://m.media-amazon.com/images/I/51-H7QOsVES._AC_SL1200_.jpg",
    },
    {
      codigo: "729",
      nombreProducto: "Orochimaru",
      cantidad: "1",
      descripcion: "Orochimaru Figura Coleccionable, Multicolor (46628)",
      url: "https://m.media-amazon.com/images/I/610cunP4zOL._AC_SL1200_.jpg",
    },
    {
      codigo: "073",
      nombreProducto: "Jiraiya On Toad",
      cantidad: "1",
      descripcion:
        "Jiraiya On Toad Anime Figura De Acción Juguetes 73 Colección Modelo De Personaje Estatua 10 Cm En Caja",
      url: "https://m.media-amazon.com/images/I/61sLJuTZxBS._AC_SL1500_.jpg",
    },
    {
      codigo: "728",
      nombreProducto: "Gaara ",
      cantidad: "1",
      descripcion: "Gaara Figura Coleccionable, Multicolor (46627)",
      url: "https://m.media-amazon.com/images/I/616YRHWRZwL._AC_SL1200_.jpg",
    },
    {
      codigo: "182",
      nombreProducto: "Kakashi Figure",
      cantidad: "1",
      descripcion:
        'Funko FM-B01M5KD9Y6 Naruto Shippuden 12450"POP Vinyl Kakashi Figure',
      url: "https://m.media-amazon.com/images/I/617XvrkXkEL._AC_SL1360_.jpg",
    },
  ];

 if (!localStorage.getItem('listaProductoKey')) {
   // quiero agregar los datos de productos
   console.log('cargar datos prueba');
   localStorage.setItem('listaProductoKey', JSON.stringify(datos));
   listaProductos = datos;
   //mostar en la tabla
   listaProductos.forEach(itemProducto => {
     crearFila(itemProducto);
   })
 }else{
   //no quiero hacer nada
 }
}