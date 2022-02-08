class Producto{
    constructor (id, categoria, modelo, marca, rodado, precio,img,cantidad){
        this.id=id,
        this.categoria=categoria,
        this.modelo=modelo,
        this.marca=marca,
        this.rodado=rodado,
        this.precio=precio,
        this.img=img,
        this.cantidad=cantidad || 1 
    }
}