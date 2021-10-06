// //VARIABLES HEADER/NAV

const navItemBalanceSection = document.getElementById("nav-item-balance-section");
const navItemCategoriasSection = document.getElementById("nav-item-categorias-section");
const navItemReportesSection = document.getElementById("nav-item-reportes-section");
const burgerNavButton = document.getElementById("button-navbar-burger");
const burgerNavBarOpen = document.getElementById("burger-navbar-open");

// Variables Visibilidad

const visibleSection = document.querySelectorAll(".visible-section")

// //Variables Section-Balance

const sectionBalance = document.getElementById("section-balance");
const formBalanceSection = document.getElementById("form-balance-section");
const buttonOcultarFiltros = document.getElementById("ocultar-filtros");
const sectionNuevaOperacion = document.getElementById("section-nueva-operacion");
const openSectionNuevaOperacion = document.getElementById("button-nueva-operacion");
const filtroCategoria = document.getElementById("filtro-categoria");


// //Variables section-categorías

const sectionCategorias = document.getElementById("section-categorias");
const sectionEditarCategoria = document.getElementById("section-editar-categoria")
const openSectionEditarCategoria = document.querySelectorAll(".open-editar-categoria");
const deleteCategoria = document.querySelectorAll(".delete-categoria");
const cancelEditarCategoria = document.getElementById("cancel-editar-categoria");
const addNuevaCategoria = document.getElementById("agregar-categoria");
const inputNuevaCategoria = document.getElementById("input-nueva-categoria");
const listCategorias = document.getElementById("lista-categorias");


//Variables Seccion Reportes 

const sectionReportes = document.getElementById("section-reportes");


// //Funcionalidad Header/Nav

let ocultarSecciones = () => {
    for (let i = 0; i < visibleSection.length; i++) {
        visibleSection[i].classList.add('is-hidden');
    }
}

navItemBalanceSection.onclick = () => {
    ocultarSecciones();
    sectionBalance.classList.remove('is-hidden');
}

navItemCategoriasSection.onclick = () => {
    ocultarSecciones();
    sectionCategorias.classList.remove('is-hidden');
}

navItemReportesSection.onclick = () => {
    ocultarSecciones();
    sectionReportes.classList.remove('is-hidden');
}


// Funcionalidad Nav-Mobile

burgerNavButton.onclick = () => {
    burgerNavButton.classList.toggle('is-active');
    burgerNavBarOpen.classList.toggle('is-active');
}


//---------------FFUNCIONALIDAD SECTION-BALANCE------------//////

openSectionNuevaOperacion.onclick = () => {
    ocultarSecciones();
    sectionNuevaOperacion.classList.remove('is-hidden');
}

buttonOcultarFiltros.onclick = () => {
    if (buttonOcultarFiltros.innerText === "Mostrar filtros") {
        buttonOcultarFiltros.innerText = "Ocultar filtros";
        formBalanceSection.classList.remove('is-hidden');


    }
    else {
        buttonOcultarFiltros.innerText = "Mostrar filtros";
        formBalanceSection.classList.add('is-hidden');
    }
}

// //--------------------FUNCIONALIDAD CATEGORÍAS-----------------///

let newCategoryOnFiltroCategoria = () => {
    let option = document.createElement('option')
    option.innerText = `${inputNuevaCategoria.value}`
    return option
}



let creatNewCategoryOnCategoriaSection = () => {
    let li = document.createElement('li');
    li.innerHTML = `<div class="columns is-mobile is-vcentered mb-3">
    <div class="column">
        <p class="tag is-primary is-light">${inputNuevaCategoria.value}</p>
    </div>
    <div class="columns">
        <div class="column">
            <button class="button is-ghost is-size-7 open-editar-categoria">Editar</button>
            <button class="button is-ghost is-size-7 delete-categoria">Eliminar</button>
        </div>
    </div>
</div>`
    return li;

}


const abrirVentanaEditarCategoria = () => {
    sectionCategorias.classList.add('is-hidden');
    sectionEditarCategoria.classList.remove('is-hidden');
}


for (let i = 0; i < openSectionEditarCategoria.length; i++) {
    openSectionEditarCategoria[i].onclick = abrirVentanaEditarCategoria;
}


addNuevaCategoria.onclick = () => {
    let nuevaCategoria = creatNewCategoryOnCategoriaSection()   
    listCategorias.appendChild(nuevaCategoria)
    let nuevaCategoriaEnFiltros = newCategoryOnFiltroCategoria ();
    filtroCategoria.appendChild(nuevaCategoriaEnFiltros);
    let listaActualizada = document.querySelectorAll(".open-editar-categoria");
    for (let i = 0; i < listaActualizada.length; i++) {
        listaActualizada[i].onclick = abrirVentanaEditarCategoria;
    }
}

//botones editar

cancelEditarCategoria.onclick = () => {
    ocultarSecciones();
    sectionCategorias.classList.remove('is-hidden');
}


//botones eliminar 

// eliminarCategoria = () => {

// }

// for (let i = 0; i < deleteCategoria.length; i++) {
//     deleteCategoria[i].onclick = () => {

//     }
    
// }