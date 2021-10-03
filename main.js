//VARIABLES HEADER

const buttonBalance = document.getElementById("open-balance-section")
const buttonCategorias = document.getElementById("open-categorias-section")
const buttonReportes = document.getElementById("open-reportes-section")


//Variables main

const sectionBalance = document.getElementById("section-balance")
const sectionCategorias = document.getElementById("section-categorias")
const sectionReportes = document.getElementById("section-reportes")

//Funcionalidad Header

buttonBalance.onclick = () => {
    sectionCategorias.classList.add('is-hidden')
    sectionReportes.classList.add('is-hidden')
    sectionBalance.classList.remove('is-hidden')
}

buttonCategorias.onclick = () => {
    sectionBalance.classList.add('is-hidden')
    sectionCategorias.classList.remove('is-hidden')
    sectionReportes.classList.add('is-hidden')
}

buttonReportes.onclick = () => {
    sectionBalance.classList.add('is-hidden')
    sectionCategorias.classList.add('is-hidden')
    sectionReportes.classList.remove('is-hidden')
}