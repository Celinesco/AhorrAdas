// // /////////////////////DOM //////////////////////////////////////DOM//////////////////////////DOM////////////////////////////////////

//SHEADER/NAV

const itemNavSeccionBalance = document.getElementById("item-nav-seccion-balance");
const itemNavSeccionCategorias = document.getElementById("item-nav-seccion-categorias");
const itemNavSeccionReportes = document.getElementById("item-nav-seccion-reportes");
const botonMenuHamburguesa = document.getElementById("boton-menu-hamburguesa");
const abrirMenuHamburguesa = document.getElementById("abrir-menu-hamburguesa");

// Visibilidad

const seccionVisible = document.querySelectorAll(".seccion-visible");

//SECCION BALANCE

const seccionBalance = document.getElementById("seccion-balance");
const formularioSeccionBalance = document.getElementById("formulario-seccion-balance");
const ocultarFiltros = document.getElementById("ocultar-filtros");
const seccionNuevaOperacion = document.getElementById("seccion-nueva-operacion");
const abrirSeccionNuevaOperacion = document.getElementById("abrir-nueva-operacion");
const filtroTipo = document.getElementById("filtro-tipo");
const filtroCategoria = document.getElementById("filtro-categoria");
const categoriasEnNuevaOperacion = document.getElementById("categorias-nueva-operacion");
const cancelarNuevaOperacion = document.getElementById("cancelar-nueva-operacion");
const contenedorOperaciones = document.getElementById("contenedor-operaciones");
const agregarNuevaOperacion = document.getElementById("agregar-nueva-operacion");
const totalGananciasBoxBalance = document.getElementById("total-ganancias-box-balance");
const totalGastosBoxBalance = document.getElementById("total-gastos-box-balance");
const totalGastosGanancias = document.getElementById("total-gastos-ganancias");

//NUEVA OPERACION

const descripcionNuevaOperacion = document.getElementById("descripcion-operacion");
const montoNuevaOperacion = document.getElementById("monto-nueva-operacion");
const tipoNuevaOperacion = document.getElementById("tipo-nueva-operacion");
const fechaNuevaOperacion = document.getElementById("fecha-nueva-operacion");


// SECCION-CATEGORÍAS

const sectionCategorias = document.getElementById("section-categorias");
const sectionEditarCategoria = document.getElementById("section-editar-categoria");
const openSectionEditarCategoria = document.querySelectorAll(".open-editar-categoria");
const deleteCategoria = document.querySelectorAll(".delete-categoria");
const cancelEditarCategoria = document.getElementById("cancel-editar-categoria");
const addNuevaCategoria = document.getElementById("agregar-categoria");
const inputNuevaCategoria = document.getElementById("input-nueva-categoria");
const listaCategorias = document.getElementById("lista-categorias");
const alertsRequestField = document.querySelectorAll(".requested-field");


//SECCION REPORTES

const sectionReportes = document.getElementById("section-reportes");

/////////////////////////FIN DE DOM////////////////////////////FIN DE DOM//////////////////////////////////////FIN DE DOM/////////////////////////////


//Funciones Auxiliares


const convertirAJSON = (array) => {
    let arrayConvertido = JSON.stringify(array);
    return arrayConvertido
}

const guardarEnLocalStorage = (array, clave) => {
    localStorage.setItem(clave, convertirAJSON(array))
}

const convertirDesdeJSON = (arrayJSON) => {
    let JSONConvertido = JSON.parse(arrayJSON)
    return JSONConvertido
}


const leerDesdeLocalStorage = (clave) => {
    const json = localStorage.getItem(clave);
    const array = convertirDesdeJSON(json);
    return array
}


let ocultarSecciones = () => {
    seccionVisible.forEach((section) => {
        section.classList.add('is-hidden')
    })
}

let nuevasCategoriasEnSelects= () => {
    let nuevaOpcion = document.createElement('option')
    nuevaOpcion.innerText = `${inputNuevaCategoria.value}`
    nuevaOpcion.setAttribute('value',inputNuevaCategoria.value)
    return nuevaOpcion
}

let arrayInputUsuario = []


let nuevoObjeto = () => {
    arrayInputUsuario.push({
        id: Date.now(),
        descripcion:descripcionNuevaOperacion.value,
        monto: montoNuevaOperacion.value,
        tipo: tipoNuevaOperacion.value,
        categoria: categoriasEnNuevaOperacion.value,
        fecha: fechaNuevaOperacion.value
    })

    return arrayInputUsuario
}


//Chequea LocalStorage apenas carga la página

const infoAlmacenada = leerDesdeLocalStorage('operaciones_usuario')

if (infoAlmacenada !== null) {
  arrayInputUsuario = infoAlmacenada
}



// //Funcionalidad Header/Nav

itemNavSeccionBalance.onclick = () => {
    ocultarSecciones();
    seccionBalance.classList.remove('is-hidden');
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





//--------------SECCION-BALANCE------------//////


let arrayDeGanancias = arrayInputUsuario.filter((operacion)=> {
    return operacion.tipo === "Ganancia"
})

let arrayDeGastos = arrayInputUsuario.filter((operacion)=> {
    return operacion.tipo === "Gasto"
})

let sumaTotalGanancias = arrayDeGanancias.reduce((acc, element)=> {
    return acc + Number(element.monto)
},0)

let sumaTotalGastos = arrayDeGastos.reduce((acc,element)=> {
    return acc + Number(element.monto)
},0)




totalGananciasBoxBalance.innerHTML = `+$${sumaTotalGanancias}`;
totalGastosBoxBalance.innerHTML = `-$${sumaTotalGastos}`;
totalGastosGanancias.innerHTML = `$${sumaTotalGanancias - sumaTotalGastos}`


abrirSeccionNuevaOperacion.onclick = () => {
    ocultarSecciones();
    seccionNuevaOperacion.classList.remove('is-hidden');
    
}

abrirSeccionNuevaOperacion.addEventListener('onkeypress', abrirSeccionNuevaOperacion)





let HTMLBalanceBoxOperaciones = (array) => {
   
    let acc = " ";

    array.map((operacion)=> {
        acc = acc + `
        <div class="columns is-vcentered">
            <div class="column  is-3 is-3-tablet">
               <p class="has-text-weight-bold"> ${operacion.descripcion}</p>
            </div>
            <div class="column is-2">
                <p class="tag is-primary is-light ">${operacion.categoria}</p>
            </div>
            <div class="column is-2 has-text-grey has-text-right">
                ${operacion.fecha}
            </div>
            <div class="column is-2 has-text-right has-text-weight-bold ${operacion.tipo === "Ganancia" ?"has-text-success":"has-text-danger"}"> 
            ${operacion.tipo === "Ganancia" ?"+$":"-$"}${operacion.monto}
            </div>
            <div class="column is-3">
                <div class="columns">
                    <div class="column is-flex is-justify-content-flex-end">
                        <button class="button is-ghost is-size-7 open-editar-categoria">Editar</button>
                        <button class="button is-ghost is-size-7 delete-categoria">Eliminar</button>
                    </div>
                </div>
            </div>
         </div>`
    })

    contenedorOperaciones.removeAttribute("class")
    contenedorOperaciones.innerHTML =`
    <div class="columns my-3 py-2" >
        <div class="column has-text-weight-semibold is-3">Descripción</div>
        <div class="column has-text-weight-semibold is-2">Categoría</div>
        <div class="column has-text-weight-semibold is-2 has-text-right">Fecha</div>
        <div class="column has-text-weight-semibold is-2 has-text-right">Monto</div>
        <div class="column has-text-weight-semibold is-3 has-text-right">Acciones</div>
    </div>

    <div class="">
        ${acc} 
    </div> ` 

}


ocultarFiltros.onclick = () => {
    if (ocultarFiltros.innerText === "Mostrar filtros") {
        ocultarFiltros.innerText = "Ocultar filtros";
        formularioSeccionBalance.classList.remove('is-hidden');
    }

    else {
        ocultarFiltros.innerText = "Mostrar filtros";
        formularioSeccionBalance.classList.add('is-hidden');
    }
}



let aplicarfiltros = () => {

    const filtradoPorTipo = arrayInputUsuario.filter((operacion)=> {
        if (filtroTipo.value === "todos") {
            return operacion
        }
        return operacion.tipo.toLowerCase() == filtroTipo.value
    })
    
    const filtradoFinal = filtradoPorTipo.filter((operacion) => {
      if (filtroCategoria.value === "todos") {
        return operacion
      }
      return operacion.categoria == filtroCategoria.value
    })
    return filtradoFinal
}



filtroTipo.onclick = () => {
    let arrayFiltradoPorTipo = aplicarfiltros()
    HTMLBalanceBoxOperaciones(arrayFiltradoPorTipo)
}

filtroCategoria.onclick = () => {
    let arrayFiltradoPorCategoria = aplicarfiltros()
    HTMLBalanceBoxOperaciones(arrayFiltradoPorCategoria)
}



//NUEVA OPERACIÓN

agregarNuevaOperacion.onclick = () => {
    ocultarSecciones();
    seccionBalance.classList.remove('is-hidden');

}

cancelarNuevaOperacion.onclick = () => {
    ocultarSecciones();
    seccionBalance.classList.remove('is-hidden')
}

cancelarNuevaOperacion.addEventListener('onkeypress', cancelarNuevaOperacion.onclick);





// //--------------------FUNCIONALIDAD CATEGORÍAS-----------------///


let HTMLnuevaCategoriaSeccionCategorias = () => {
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


openSectionEditarCategoria.forEach((botonEditar) => {
    botonEditar.onclick = abrirVentanaEditarCategoria;
})




inputNuevaCategoria.oninput = () => {
    alertsRequestField.forEach((alertas) => {
        alertas.classList.add('is-hidden')
    })
}


addNuevaCategoria.onclick = () => {
    
    if ( inputNuevaCategoria.value.length > 0) {
        listaCategorias.appendChild(HTMLnuevaCategoriaSeccionCategorias());
        categoriasEnNuevaOperacion.appendChild(nuevasCategoriasEnSelects());
        filtroCategoria.appendChild(nuevasCategoriasEnSelects());
        
        let listaActualizada = document.querySelectorAll(".open-editar-categoria");
        listaActualizada.forEach((botonEditar)=> {
            botonEditar.onclick = abrirVentanaEditarCategoria
        })
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

cancelEditarCategoria.addEventListener('onkeypress', cancelEditarCategoria.onclick);




    ///////



    

    

   