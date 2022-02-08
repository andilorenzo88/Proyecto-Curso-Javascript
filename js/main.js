// PETICION AJAX para obtener informacion 

$.get("data/prd.json", function(respuesta, estado){

    console.log(respuesta); 
    console.log(estado);
    if(estado=="success"){
        for (const generico of respuesta){
            bikes.push(new Producto(generico.id, generico.categoria,generico.modelo,generico.marca,generico.rodado,generico.precio,generico.img))    
        }
        productsUI(bikes);
        console.log(bikes);   
    }else{
        console.log('Hubo un error en la carga');
    }
})
//Se abre modal con mapa de google maps
$('#modal_iframe').on('click', openModalLocation)

//Scroll por la pagina para mostrar al usuario la sección About us
$('#about_us').on('click',aboutUs);

// Scroll down para ver Contactos
$('#socialmedia').click(function(e) {
    e.preventDefault();
    $("html").animate({
        scrollTop: $(".redes").offset().top
    },2000)
})
//Scroll up para volver arriba 
$('#btn_slideUp').click(function(e) {
    e.preventDefault();
    $("html").animate({
        scrollTop: $("body").offset().top
    },2000)
})

// Animación Promociones
$('#modal_promociones').click(function(){
    $('#promos').toggle(1000);
});

$('#close_promos').click(function(){
    $('#promos').hide(1000);
})

// Interfaz searchBar

$("#search-input").append('<a href="#"><img id="icon_search" class="icon_search" src="/Images/magnifying-glass.png" alt="buscador"></a><a href="#"><input type="text" id="buscador__input" class="buscador__input" placeholder="Buscar modelo"></input></a>')

$("#icon_search").click(function() {
    $('#icon_search').hide('slow', function(){
    $('#buscador__input').fadeIn('fast')
    }); 
});


//----CREACIÓN FILTROS PRODUCTOS----//

// Creo evento para filtrar productos según letra que se escriba en el input buscador
const buscador = document.querySelector('#buscador__input');
const resultados = document.querySelector('#listado_prd');

buscador.addEventListener('keyup', searchBar);


// Genero interfaz y evento filtro CATEGORIA

$('#filtro__categoria').append(`<option>Todas</option>`);

for(const items of categorias) {
    $('#filtro__categoria').append(`<option> ${items}</option>`); 
}

//Agrego evento al filtro categoria
$('#filtro__categoria').change(function () {
    if (this.value!='Todas') {
        const found = bikes.filter(categoria=> categoria.categoria == this.value );
        productsUI(found); 
    } else {
        productsUI(bikes)  ;  
    } 
});

// Genero interfaz y evento filtro MARCA

$('#filtros__marca').append(`<option>Todas</option>`)

for(const items of marcas) {

    $('#filtros__marca').append(`<option> ${items}</option>`)
}

$('#filtros__marca').change(function () { 

    if (this.value!='Todas') {
        const found = bikes.filter(marca=> marca.marca == this.value);
        productsUI(found);   
    } else {
        productsUI(bikes)   
    }  
});

// Genero interfaz y evento filtros precios maximos
$('#filtros__precios').append("<option>Todos los precios</option>");
for (const items of priceRange) {
    $('#filtros__precios').append(`<option>${items}</option>`);
}

$('#filtros__precios').change(function (){ 
    if (this.value!='Todos los precios') {
        const found = bikes.filter (preciosmax => preciosmax.precio <= this.value);
        productsUI(found);
    } else {
        productsUI(bikes);
    }  
});

// Genero interfaz y evento filtros precios maximos
$('#filtros__rodado').append(`<option> Todos</option>`); 

for (const items of rodados) {

    $('#filtros__rodado').append(`<option>${items}</option>` );
    };

    $('#filtros__rodado').change(function () {
    if (this.value!='Todos') {
        const found = bikes.filter (rodado => rodado.rodado == this.value);
        productsUI(found);   
    } else {
        productsUI(bikes); 
    } 
});

//---VERIFICACIÓN DE PRODUCTOS ALMACENADOS EN LOCAL STORAGE---// 

if ('compra' in localStorage) {
    
    console.log(localStorage.getItem('compra'));

    carritogenerico = JSON.parse(localStorage.getItem('compra'));

    console.log(carritogenerico);
    for (const element of carritogenerico) { // convierto elementos genericos a Producto
        carrito.push(new Producto(element.id, element.categoria, element.modelo, element.marca, element.rodado, element.precio, element.img, element.cantidad));                
    }  
    console.log(carrito);
    cartBadge()//muestro contador de elementos en el carrito


    carrito.forEach((productoSeleccionado) => buildCartPerSingleItem(productoSeleccionado));
    updateCheckout(carrito);
}
    
$(document).ready(function (){
    console.log('El DOM esta listo para su uso');
});


// BOTONES CARRITO: Creación interfaz y animaciones 

$('#botones_carrito').append(`<a id="btn_clear" class="btn_clear" href="#">Vaciar Carrito</a>
<a id="btn_pagar" class="btn_pagar" href="#">Pagar</a>`)

$('#btn_closeCart').click(function (){
    $('.modal__carrito').hide(1000);
})
$('#btn_pagar').click(enviarCompra)
$('#btn_clear').on('click',cartClear);


$('#icon_carrito').on('click', function (){
    $(".modal__carrito").show(1000)
    $("html").animate({
        scrollTop: $("#sct_carrito").offset().top
    },2000)

})
































































