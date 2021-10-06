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


// //Variables section-categorías

const sectionCategorias = document.getElementById("section-categorias");
const sectionEditarCategoria = document.getElementById("section-editar-categoria")
const openSectionEditarCategoria = document.querySelectorAll(".open-editar-categoria");
const deleteCategoria = document.querySelectorAll(".delete-categoria");
const cancelEditarCategoria = document.getElementById("cancel-editar-categoria");


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


for (let i = 0; i < openSectionEditarCategoria.length; i++) {
    openSectionEditarCategoria[i].onclick = () => {
        sectionCategorias.classList.add('is-hidden');
        sectionEditarCategoria.classList.remove('is-hidden');
    }

}

cancelEditarCategoria.onclick = () => {
    ocultarSecciones();
    sectionCategorias.classList.remove('is-hidden')
}










  