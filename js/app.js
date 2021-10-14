// declarar variables
let productos = [];

cargarInicial();

function cargarInicial() {
  productos = JSON.parse(localStorage.getItem("listaProductoKey")) || [];

  // Si hay datos dentro del arreeglo dibujo las columnas con las cards

  if (productos.length > 0) {
    // aqui dibujo las cards
    productos.forEach((producto) => {
      crearColumna(producto);
    });
  }
}

function crearColumna(producto) {
  let grilla = document.querySelector("#grilla");
  console.log(producto);
  grilla.innerHTML += `<div class="col-sm-12 col-md-4 col-lg-3 mb-5">
    <div class="card">
      <img src="${producto.url}" class="card-img-top" alt="${producto.nombreProducto}">
      <div class="card-body">
        <h5 class="card-title">${producto.nombreProducto}</h5>
        <p class="card-text">${producto.descripcion}</p>
      </div>
    </div>
  </div>`;
}
