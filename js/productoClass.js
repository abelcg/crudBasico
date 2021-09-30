// este archivo tendra todo lo necesario p trabajar con la clase de productos
export class Producto{
    constructor(codigo, producto, descripcion, cantidad, url){
        this.codigo = codigo;
        this.nombreProducto = producto;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.url = url;
    }
    //agregar los getters y setters

    get getCodigo(){
        return this.codigo;
    }
    set setCodigo(newcodigo){
        this.codigo = newcodigo;
    }
    get getNombreProducto(){
        return this.nombreProducto;
    }
    set setNombreProducto(productoNuevo){
        this.nombreProductoigo = productoNuevo;
    }
    get getDescripcion(){
        return this.descripcion;
    }
    set setDescripcion(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }
    get getcantidad(){
        return this.cantidad;
    }
    set setcantidad(cantidad){
        this.cantidad = nuevacantidad;
    }
}