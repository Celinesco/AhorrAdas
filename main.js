// //VARIABLES HEADER/NAV

const itemNavSeccionBalance = document.getElementById("item-nav-seccion-balance");
const itemNavSeccionCategorias = document.getElementById("item-nav-seccion-categorias");
const itemNavSeccionReportes = document.getElementById("item-nav-seccion-reportes");
const botonMenuHamburguesa = document.getElementById("boton-menu-hamburguesa");
const abrirMenuHamburguesa = document.getElementById("abrir-menu-hamburguesa");

// Variables Visibilidad

const seccionVisible = document.querySelectorAll(".seccion-visible")

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
const alertsRequestField = document.querySelectorAll(".requested-field")


//Variables Seccion Reportes 

const sectionReportes = document.getElementById("section-reportes");


//Funciones Auxiliares
let ocultarSecciones = () => {
    seccionVisible.forEach((section) => {
        section.classList.add('is-hidden')
    })
}

// //Funcionalidad Header/Nav



itemNavSeccionBalance.onclick = () => {
    ocultarSecciones();
    sectionBalance.classList.remove('is-hidden');
}

itemNavSeccionCategorias.onclick = () => {
    ocultarSecciones();
    sectionCategorias.classList.remove('is-hidden');
}

itemNavSeccionReportes.onclick = () => {
    ocultarSecciones();
    sectionReportes.classList.remove('is-hidden');
}


// Funcionalidad Nav-Mobile

botonMenuHamburguesa.onclick = () => {
    botonMenuHamburguesa.classList.toggle('is-active');
    abrirMenuHamburguesa.classList.toggle('is-active');
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



let nuevaCategoriaEnHtml = () => {
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


let abrirVentanaEditarCategoria = () => {
    sectionCategorias.classList.add('is-hidden');
    sectionEditarCategoria.classList.remove('is-hidden');
}


for (let i = 0; i < openSectionEditarCategoria.length; i++) {
    openSectionEditarCategoria[i].onclick = abrirVentanaEditarCategoria;
}



inputNuevaCategoria.oninput = () => {
    alertsRequestField.forEach((alertas) => {
        alertas.classList.add('is-hidden')
    })
}


addNuevaCategoria.onclick = () => {
    
    if ( inputNuevaCategoria.value.length > 0) {
        let nuevaCategoria = nuevaCategoriaEnHtml()   
        listCategorias.appendChild(nuevaCategoria)
        let nuevaCategoriaEnFiltros = newCategoryOnFiltroCategoria ();
        filtroCategoria.appendChild(nuevaCategoriaEnFiltros);
        let listaActualizada = document.querySelectorAll(".open-editar-categoria");
        for (let i = 0; i < listaActualizada.length; i++) {
            listaActualizada[i].onclick = abrirVentanaEditarCategoria;
        }
      }

    else {
        alertsRequestField.forEach((alertas) => {
            alertas.classList.remove('is-hidden')
        })
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