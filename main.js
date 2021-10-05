//VARIABLES HEADER/NAV

const buttonBalance = document.getElementById("open-balance-section");
const buttonCategorias = document.getElementById("open-categorias-section");
const openSectionReportes = document.getElementById("open-reportes-section");
const burgerNavButton = document.getElementById("button-navbar-burger");
const windowNavBarOpen = document.getElementById("burger-navbar-open");
const sectionNuevaOperacion = document.getElementById("section-nueva-operacion");
const openSectionNuevaOperacion = document.getElementById("button-nueva-operacion");


//Variables main

const sectionBalance = document.getElementById("section-balance");
const sectionCategorias = document.getElementById("section-categorias");
const sectionReportes = document.getElementById("section-reportes");

//Funcionalidad Header/Nav

buttonBalance.onclick = () => {
    sectionCategorias.classList.add('is-hidden');
    sectionReportes.classList.add('is-hidden');
    sectionBalance.classList.remove('is-hidden');
    sectionNuevaOperacion.classList.add('is-hidden');
}

buttonCategorias.onclick = () => {
    sectionBalance.classList.add('is-hidden');
    sectionCategorias.classList.remove('is-hidden');
    sectionReportes.classList.add('is-hidden');
    sectionNuevaOperacion.classList.add('is-hidden');
}

openSectionReportes.onclick = () => {
    sectionBalance.classList.add('is-hidden');
    sectionCategorias.classList.add('is-hidden');
    sectionReportes.classList.remove('is-hidden');
    sectionNuevaOperacion.classList.add('is-hidden');
}


// Funcionalidad Nav-Mobile

burgerNavButton.onclick = () => {
    burgerNavButton.classList.toggle('is-active');
    windowNavBarOpen.classList.toggle('is-active');
}

//Funcionalidad main/Balance-section

openSectionNuevaOperacion.onclick = () => {
    sectionNuevaOperacion.classList.remove('is-hidden');
    sectionBalance.classList.add('is-hidden');
}


