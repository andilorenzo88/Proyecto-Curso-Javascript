//----------FUNCIONES----------//

// 1 - Función para crear grilla de productos en interfaz 
function productsUI(productos) {

    $('#listado_prd').empty();
    
    for (const prd of productos) { 
        $('#listado_prd').append(`<div><div class="prd__item">
                <p class="prd__item-modelo">${prd.modelo}</p>
                <a href="#"><img src="${prd.img}"></a>
                <p class="prd_item-precio">Precio: ${prd.precio}€</p>
                <p class="prd_item-categoria">Categoria: ${prd.categoria}</p>
                <p class="prd_rodado">Rodado: ${prd.rodado}</p>
                <a><button href="#" id="${prd.id}" class="btn_compra">+ Agregar al carrito</button></a>
            </div></div>`)
    }
    btnCompra();   
}

function btnCompra(){
    $('.btn_compra').on('click', function (e) {
        e.preventDefault();
        //Busqueda existencia del producto en el carrito
        const existingProduct = carrito.find(producto => producto.id == this.id);
        
        if (existingProduct == undefined) { //Si no existe se pushea el producto al carrito y en el localStorage
    
            let productoSeleccionado= bikes.find(producto => producto.id == this.id); 
            console.log(productoSeleccionado);
            carrito.push(productoSeleccionado);
            console.log(carrito);

            cartBadge();
            cartAlert(productoSeleccionado);
            buildCartPerSingleItem(productoSeleccionado); //Genera interfaz en el carrito del producto seleccionado
            updateCheckout(carrito); 

            localStorage.setItem('compra', JSON.stringify(carrito));//Almaceno el producto en el local storage
        }
    }); 
}

// Indicador cantidad de productos en el carrito
function cartBadge (){
    $('#elementos_carrito').empty();
    $('#elementos_carrito').html(carrito.length)
}

// Animaciòn/alerta para boton compra
function cartAlert(productoSeleccionado){
    $('#alert-cart').empty();
    $("html").animate({
        scrollTop: $("body").offset().top
    },1000);
    $('#alert-cart').append(`<p> Se ha agregado al carrito: ${productoSeleccionado.modelo}</p>`).fadeIn(3000,function(){
        $('#alert-cart').delay(1500).fadeOut(2000);
            });
};

// Funcion interfaz carrito 

const buildCartPerSingleItem = (productoSeleccionado) => {

    $('#compra_usuario').append(`<tr>
        <td class="sub_prd" id= ${productoSeleccionado.id}>-</td>
        <td class="cantidad_productos">${productoSeleccionado.cantidad}</td>
        <td class="add_prd" id=${productoSeleccionado.id}>+</td>
        <td class="modelo_producto">${productoSeleccionado.modelo} </td>
        <td class="precio_producto">${productoSeleccionado.precio*productoSeleccionado.cantidad} €</td>
    </tr>`);

    $(`td#${productoSeleccionado.id}.add_prd`).on('click',addProductQuantity);
    $(`td#${productoSeleccionado.id}.sub_prd`).on('click',removeProductQuantity);       
};

// UI importes del checkout

const cartCheckout = (subtotal, discount, total) => {
    const cartAmounts = [ 
    ["subtotal_price", subtotal],
    ["price_discount", discount],
    ["total_price", total],
    ];
    cartAmounts.forEach((element) => {
        let generateAmounts = document.getElementById(element[0]);
        generateAmounts.innerHTML = `<p>${element[1]}€</p>`;
    });
};

// Se actualizan los importes del carrito a medida que se agregan productos
const updateCheckout = (carritoArray) => {
    let subtotal=0;
    carritoArray.forEach(producto => { 
        subtotal += producto.precio*producto.cantidad; 
    });
    console.log(subtotal);
    
    const total = calculateDiscount(subtotal);
    console.log(total);
    const discount = subtotal - total;
    console.log(discount);
    console.log(subtotal,discount,total);
    cartCheckout(subtotal,discount,total)

}

//Promociones 

const discount1 = a => a * 0.95; //Para compras mayores de 499 euros
const discount2 = a => a * 0.90; //Para compras mayores de 999 euros
const discount3 = a => a * 0.80; //Para compras mayores de 1999 euros

const calculateDiscount = (totalPrice)=> {

    if ((totalPrice > 499) && (totalPrice < 1000)) {

        return parseFloat(discount1(totalPrice));
    } else if((totalPrice>=1000) && (totalPrice < 2000)){
    
        return parseFloat(discount2(totalPrice)); 
    
    }else if (totalPrice>=2000) {
    
        return parseFloat(discount3(totalPrice));
    } else {
        return totalPrice;
    }
}

// Envio datos de la compra al "servidor"

function enviarCompra(e){
    e.preventDefault();

    $.post('https://jsonplaceholder.typicode.com/posts',JSON.stringify.carrito, function (respuesta,estado){
        console.log(estado);
        console.log(respuesta);
        if(estado=="success"){
            $('.modal__carrito').fadeOut('fast');
            $("html").animate({
                scrollTop: $(".alert-primary").offset().top
            },1000)
            $('#alert-cart').html('Gracias por la compra').fadeIn(2000).delay(1000).fadeOut(2000);

            $('#compra_usuario').empty(); 
            localStorage.clear(); //Se vacia el local Storage
            console.log(localStorage);
            console.log(carrito);
            carrito.splice(0,carrito.length); // Se eliminan todos los productos del carrito
            console.log(carrito);
            updateCheckout(carrito);
            cartBadge();
            productsUI(bikes); // Vuelven a cargarse toda la grilla de productos
        }
    })
}

//Vaciar el carrito

function cartClear(e) {
    e.preventDefault();
    $('#compra_usuario').empty();
    localStorage.clear();
    console.log(localStorage);
    carrito.splice(0,carrito.length);
    console.log(carrito);
    updateCheckout(carrito);
    cartBadge();
    $(".modal__carrito").hide('slow')
    $("html").animate({
        scrollTop: $("body").offset().top
    },1000)
    $('#alert-cart').html('Carrito vacio').fadeIn(2000).delay(1000).fadeOut(2000);
}

//Función buscador principal modelo - searchBar

function searchBar () {

    resultados.innerHTML = '';

    const userSearch = buscador.value.toLowerCase();
    console.log(userSearch);

    for (let producto of bikes) {
        
        let searchResult = producto.modelo.toLowerCase();   

        if(searchResult.indexOf(userSearch) != -1){
            resultados.innerHTML += `
            <div><div class="prd__item">
            <p class="prd__item-modelo">${producto.modelo}</p>
            <a href="#"><img src="${producto.img}"></a>
            <p class="prd_item-precio">Precio: ${producto.precio}€</p>
            <p class="prd_item-categoria">Categoria: ${producto.categoria}</p>
            <p class="prd_rodado">Rodado: ${producto.rodado}</p>
            <a href="#" id="${producto.id}" class="btn_compra">+ Agregar al carrito</a>
            </div></div>
        `
        }
    }
    btnCompra();

    if (resultados.innerHTML =='') {

        resultados.innerHTML += `
        <p>Lo siento, no hemos encontrado el producto buscado...</p>`
    }
}

// Funciones para sumar y restar cantidades de productos al carrito

const updateProductQuantity = (selectedProductId, operation) => {

    console.log(carrito);

    for (const product of carrito) {

        if (product.id==selectedProductId) {
            if (operation) { // Si es true agrega cantidad del producto
                product.cantidad += 1; 
            }else{
                if (product.cantidad > 1) {
                    product.cantidad -= 1; // si es false resta cantidad del producto
                }else {
                    carrito = carrito.filter((producto)=> producto.id != selectedProductId);
                }  
            }
        }  
    }
}

const changeProductQuantity = (operation)=> (e) => {

    const selectedProductId = e.currentTarget.id;

    updateProductQuantity(selectedProductId, operation);

    $('#compra_usuario').empty();

    carrito.forEach((producto)=> { //genera interfaz de los productos en el carrito

        buildCartPerSingleItem(producto);
    });
    cartBadge(carrito);
    localStorage.setItem('compra', JSON.stringify(carrito));//actualiza el local storage

    updateCheckout(carrito);
    console.log(carrito);

};

const addProductQuantity = changeProductQuantity(true);
const removeProductQuantity = changeProductQuantity(false);


// Funcion modal mapa/ubicación

const openModalLocation = () => {
    $('#modal_iframe').click(function (e) {
        e.preventDefault();
        $('#open_modal_location').slideDown(1500); 
    })
    $('.modal__close').click(function () {
        $('#open_modal_location').hide('slow')
    })
};

//Función para mostrar el aboutUs 

const aboutUs = () =>{

    $('#about_us').on('click',function (e) {
        e.preventDefault()

        $("html").animate({
            scrollTop: $(".contenedorcontacto").offset().top
        },2000); 
    
        $('.aboutUs').fadeIn(2500);
        $('#close_aboutUs').on('click', function () {
            $('.aboutUs').fadeOut('slow');
            
        })
    });
}


