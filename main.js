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
const filtroFecha = document.getElementById("filtro-fecha");
const filtroOrdenarPor = document.getElementById("filtro-ordenar");


//NUEVA OPERACION

const descripcionNuevaOperacion = document.getElementById("descripcion-operacion");
const montoNuevaOperacion = document.getElementById("monto-nueva-operacion");
const tipoNuevaOperacion = document.getElementById("tipo-nueva-operacion");
const fechaNuevaOperacion = document.getElementById("fecha-nueva-operacion");
const montoCampoRequerido = document.querySelectorAll(".campo-requerido-monto");


// SECCION-CATEGORÍAS

const seccionCategorias = document.getElementById("seccion-categorias");
const sectionEditarCategoria = document.getElementById("section-editar-categoria");
const cancelarEditarCategoria = document.getElementById("cancelar-editar-categoria");
const agregarNuevaCategoria = document.getElementById("agregar-categoria");
const inputNuevaCategoria = document.getElementById("input-nueva-categoria");
const listaCategorias = document.getElementById("lista-categorias");
const alertaCampoRequerido = document.querySelectorAll(".requested-field");
const inputEditarCategoria = document.getElementById("editar-nueva-categoria");
const categoriaRepetida = document.querySelectorAll(".categoria-repetida");

// SECCION EDITAR CATEGORIA

const botonEditarCategoriaSeccionEditarCategoria = document.getElementById("boton-editar-categoria")


//SECCION REPORTES

const sectionReportes = document.getElementById("section-reportes");

/////////////////////////FIN DE DOM////////////////////////////FIN DE DOM//////////////////////////////////////FIN DE DOM/////////////////////////////


let arrayInputUsuario = [];
let arrayCategorias = ["Comida","Servicios","Salidas","Educación","Transporte","Trabajo"];
 


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


const ocultarSecciones = () => {
    seccionVisible.forEach((section) => {
        section.classList.add('is-hidden')
    })
}



const categoriasEnSelects= (filtroEnSeccion) => {
    if (filtroEnSeccion !== categoriasEnNuevaOperacion)
   filtroEnSeccion.innerHTML = arrayCategorias.reduce((acc,element)=> {
       return acc + ` <option value=${element}>${element}</option>`
   },`<option value="todos">Todas</option>`)

   else {
    filtroEnSeccion.innerHTML = arrayCategorias.reduce((acc,element)=> {
        return acc + ` <option value=${element}>${element}</option>`
    },"")
 
   }
}




const nuevoObjeto = () => {
    arrayInputUsuario.push({
        id: Date.now(),
        descripcion:descripcionNuevaOperacion.value,
        monto: montoNuevaOperacion.value,
        tipo: tipoNuevaOperacion.value,
        categoria: categoriasEnNuevaOperacion.value,
        fecha: fechaNuevaOperacion.value
    })

    arrayInputUsuario.sort((a,b)=> {
        return new Date(b.fecha) - new Date(a.fecha)
    })

    return arrayInputUsuario
}


const abrirVentanaEditarCategoria = () => {
    seccionCategorias.classList.add('is-hidden');
    sectionEditarCategoria.classList.remove('is-hidden');
   

}

const actualizarBotonesEditarCategorias = () => {
    let arrayDeBotonesEditarEnDOM = document.querySelectorAll(".open-editar-categoria");
    return arrayDeBotonesEditarEnDOM
}

const actualizarListaBotonEliminarCategoria = () => {
    let arrayDeBotonesEliminarDom = document.querySelectorAll(".eliminar-categoria");
    return arrayDeBotonesEliminarDom
}

const actualizarListaBotonesEliminarOperacion = () => {
    let botonesEliminarOperacion = document.querySelectorAll(".eliminar-operacion")
    return botonesEliminarOperacion
}


const resetearValoresInputs = () => {
    descripcionNuevaOperacion.value = "";
    montoNuevaOperacion.value = "";
    fechaNuevaOperacion.valueAsDate = new Date();
    categoriasEnNuevaOperacion.value = "Comida"
}


const actualizarInfoUsuario = () => {
    HTMLBalanceBoxOperaciones(arrayInputUsuario)
    HTMLcategoriasSeccionCategorias()
    guardarEnLocalStorage(arrayCategorias, 'categorias_actualizadas');
    guardarEnLocalStorage(arrayInputUsuario, 'operaciones_usuario');
    categoriasEnSelects(filtroCategoria)
    categoriasEnSelects(categoriasEnNuevaOperacion)
}



const ocultarAdvertenciaCamposRequeridos = () => {
    alertaCampoRequerido.forEach((alertas) => {
        alertas.classList.add('is-hidden')
    })
}

const ocultarAdvertenciaRepetida = () => {
    categoriaRepetida.forEach((alertas)=> {
        alertas.classList.add('is-hidden')
    })
}



// Comiezo de página



const operacionesAlmacenadas = leerDesdeLocalStorage('operaciones_usuario');
const categoriasActualizadas = leerDesdeLocalStorage('categorias_actualizadas');



if (categoriasActualizadas !== null) {
    arrayCategorias = categoriasActualizadas
}


fechaNuevaOperacion.valueAsDate = new Date()
filtroFecha.valueAsDate = new Date()


let arrayFechaDeHoy = () => { 
    if (operacionesAlmacenadas !== null) {
        arrayInputUsuario = operacionesAlmacenadas
    let nuevoArray =  operacionesAlmacenadas.filter((element)=> {
        return element.fecha === filtroFecha.value
    })
    return nuevoArray
    }
    return arrayInputUsuario
} 


categoriasEnSelects(filtroCategoria)
categoriasEnSelects(categoriasEnNuevaOperacion)




// //Funcionalidad Header/Nav

const menuHambuguesa = () => {
    abrirMenuHamburguesa.classList.toggle('is-active')
    botonMenuHamburguesa.classList.toggle('is-active')
}

itemNavSeccionBalance.onclick = () => {
    ocultarSecciones();
    seccionBalance.classList.remove('is-hidden');
    menuHambuguesa()
    
}

itemNavSeccionCategorias.onclick = () => {
    ocultarSecciones();
    seccionCategorias.classList.remove('is-hidden');
    menuHambuguesa()
}

itemNavSeccionReportes.onclick = () => {
    ocultarSecciones();
    sectionReportes.classList.remove('is-hidden');
    menuHambuguesa()
}




// Funcionalidad Nav-Mobile

botonMenuHamburguesa.onclick = () => {
   menuHambuguesa()
}





//--------------SECCION-BALANCE------------//////


let arrayDeGanancias = arrayInputUsuario.filter((operacion)=> {
    return operacion.tipo === "Ganancia"
})

let arrayDeGastos = arrayInputUsuario.filter((operacion)=> {
    return operacion.tipo === "Gasto"
})


abrirSeccionNuevaOperacion.onclick = () => {
    ocultarSecciones();
    seccionNuevaOperacion.classList.remove('is-hidden');   
}



const htmlOperacionesSinResulados = () => {
    contenedorOperaciones.setAttribute('class', "columns is-centered my-6 py-6")
    contenedorOperaciones.innerHTML = 
    `<div class="column is-6">
        <div class="image">
            <img src="images/undraw_Growing_re_olpi.svg">
        </div>
        <p class="title has-text-centered mt-6 is-4">Sin resultados</p>
        <p class="has-text-centered">Cambia los filtros o agrega operaciones</p>
    </div>`
}

htmlOperacionesSinResulados()


const HTMLBalanceBoxOperaciones = (array) => {
  
    if (array.length == 0) {
       htmlOperacionesSinResulados()
   }

   else {
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
            <div class="column is-2 has-text-right has-text-weight-bold ${operacion.tipo === "ganancia" ?"has-text-success":"has-text-danger"}"> 
            ${operacion.tipo === "ganancia" ?"+$":"-$"}${operacion.monto}
            </div>
            <div class="column is-3">
                <div class="columns">
                    <div class="column is-flex is-justify-content-flex-end">
                        <button class="button is-ghost is-size-7 abrir-editar-operacion" id="editar${operacion.id}">Editar</button>
                        <button class="button is-ghost is-size-7 eliminar-operacion" id="eliminar${operacion.id}">Eliminar</button>
                    </div>
                </div>
            </div>
         </div>`
    })


    contenedorOperaciones.removeAttribute("class")
    contenedorOperaciones.innerHTML =`
    <div class="columns my-3 py-2" id="contenedor-operaciones">
        <div class="column has-text-weight-semibold is-3">Descripción</div>
        <div class="column has-text-weight-semibold is-2">Categoría</div>
        <div class="column has-text-weight-semibold is-2 has-text-right">Fecha</div>
        <div class="column has-text-weight-semibold is-2 has-text-right">Monto</div>
        <div class="column has-text-weight-semibold is-3 has-text-right">Acciones</div>
    </div>

    <div class="">
        ${acc} 
    </div> ` 

    eliminarOperacion()

    }

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



const aplicarfiltros = () => {

    const filtradoPorTipo = arrayInputUsuario.filter((operacion)=> {
        if (filtroTipo.value === "todos") {
            return operacion
        }
        return operacion.tipo.toLowerCase() == filtroTipo.value
    });
    
    const filtradoCategoriayTipo = filtradoPorTipo.filter((operacion) => {
      if (filtroCategoria.value === "todos") {
        return operacion
      }
      return operacion.categoria == filtroCategoria.value
    });

    const filtradoFinal = filtradoCategoriayTipo.filter((operacion)=> {
        return new Date (operacion.fecha) >= new Date (filtroFecha.value)
    })


    let arrayDeGanancias = filtradoFinal.filter((operacion)=> {
        return operacion.tipo === "ganancia"
    })
    
    let arrayDeGastos = filtradoFinal.filter((operacion)=> {
        return operacion.tipo === "gasto"
    })
    
    let sumaTotalGanancias = arrayDeGanancias.reduce((acc, element)=> {
        return acc + parseInt(element.monto)
    },0)
    
    let sumaTotalGastos = arrayDeGastos.reduce((acc,element)=> {
        return acc + parseInt(element.monto)
    },0)

    
    let total = sumaTotalGanancias - sumaTotalGastos


    totalGananciasBoxBalance.innerHTML = `+$${sumaTotalGanancias}`;
    totalGastosBoxBalance.innerHTML = `-$${sumaTotalGastos}`;

    if (total > 0) {
        totalGastosGanancias.classList.add('has-text-success')
        totalGastosGanancias.classList.remove('has-text-danger')
        totalGastosGanancias.innerHTML = `+$${total}`
    }
    else if (total < 0) {
        totalGastosGanancias.classList.add('has-text-danger');
        totalGastosGanancias.classList.remove('has-text-success')
        totalGastosGanancias.innerHTML = `-$${Math.abs(total)}`
    }

    else {
        totalGastosGanancias.innerHTML = `$0`
        totalGastosGanancias.classList.add('has-dark-text');
        totalGastosGanancias.classList.remove('has-text-success');
        totalGastosGanancias.classList.remove('has-text-danger');
    }
    
        return filtradoFinal

}


let filtroMayorMonto = () => {
    
    let arrayFiltradoDefiltros = aplicarfiltros ()
    let arrayOrdenado = arrayFiltradoDefiltros.sort((a,b)=> {
        return Number(b.monto)-Number(a.monto)
    })
    return arrayOrdenado
}

let filtroMenorMonto = () => {
    let arrayFiltradoDefiltros = aplicarfiltros ()
    let arrayOrdenado = arrayFiltradoDefiltros.sort((a,b)=> {
        return Number(a.monto)-Number(b.monto)
    })
    return arrayOrdenado
}

let filtroRecientes = () => {
    let arrayFiltradoDefiltros = aplicarfiltros();
    let arrayOrdenado = arrayFiltradoDefiltros.sort ((a,b)=> {
        return new Date(b.fecha)- new Date(a.fecha)
    })
    return arrayOrdenado
}

let filtroMenosRecientes = () => {
    let arrayFiltradoDefiltros = aplicarfiltros();
    let arrayOrdenado = arrayFiltradoDefiltros.sort ((a,b)=> {
        return new Date(a.fecha)- new Date(b.fecha)
    })
    return arrayOrdenado
}

let filtroAZ = () => {
    let arrayFiltradoDefiltros = aplicarfiltros();
    let arrayOrdenado = arrayFiltradoDefiltros.sort((a,b)=> {
        const descripcionA = a.descripcion.toLowerCase();
        const descripcionB = b.descripcion.toLowerCase();

        if(descripcionA < descripcionB) {
            return -1;
        }
        if(descripcionA > descripcionB) {
            return 1
        }
        return 0
    });
    return arrayOrdenado
}


let filtroZA = () => {
    let arrayFiltradoDefiltros = aplicarfiltros();
    let arrayOrdenado = arrayFiltradoDefiltros.sort((a,b)=> {
        const descripcionA = a.descripcion.toLowerCase();
        const descripcionB = b.descripcion.toLowerCase();

        if(descripcionA > descripcionB) {
            return -1;
        }
        if(descripcionA < descripcionB) {
            return 1
        }
        return 0
    });
    return arrayOrdenado
}



// FILTROS ORDENAR POR


filtroOrdenarPor.onchange = () => {
    if (filtroOrdenarPor.value == "mayor-monto") {
     HTMLBalanceBoxOperaciones(filtroMayorMonto())
    }
    else if (filtroOrdenarPor.value === "menor-monto") {
        HTMLBalanceBoxOperaciones(filtroMenorMonto())
    }
    else if (filtroOrdenarPor.value === "recientes") {
        HTMLBalanceBoxOperaciones(filtroRecientes())
    }
    else if (filtroOrdenarPor.value === "menos-recientes") {
        HTMLBalanceBoxOperaciones(filtroMenosRecientes())
    }
    else if (filtroOrdenarPor.value === "a-z") {
        HTMLBalanceBoxOperaciones(filtroAZ())
    }
    else if (filtroOrdenarPor.value === "z-a") {
        HTMLBalanceBoxOperaciones(filtroZA())
    }
}




filtroTipo.onchange = () => {
    let arrayFiltradoPorTipo = aplicarfiltros()
    HTMLBalanceBoxOperaciones(arrayFiltradoPorTipo)
}

filtroCategoria.onchange = () => {
    let arrayFiltradoPorCategoria = aplicarfiltros()
    HTMLBalanceBoxOperaciones(arrayFiltradoPorCategoria)
};

filtroFecha.onchange = () => {
    let arrayFiltradoPorFecha = aplicarfiltros()
    HTMLBalanceBoxOperaciones(arrayFiltradoPorFecha)
}





//NUEVA OPERACIÓN

agregarNuevaOperacion.onclick = () => {
    const valorDescripcion = descripcionNuevaOperacion.value 
    const valorMonto = montoNuevaOperacion.value

    if (valorDescripcion.length > 0 && valorMonto > 0){
    actualizarListaBotonesEliminarOperacion()
    ocultarSecciones();
    seccionBalance.classList.remove('is-hidden');
    nuevoObjeto();
    filtroFecha.valueAsDate = new Date()
    resetearValoresInputs();
    HTMLBalanceBoxOperaciones(aplicarfiltros());
    guardarEnLocalStorage(arrayInputUsuario, 'operaciones_usuario')
    
    
    }

    else if (valorDescripcion.length === 0 && valorMonto == "" ){
        alertaCampoRequerido.forEach((alertas) => {
            alertas.classList.remove('is-hidden')
        })
        montoCampoRequerido.forEach((alertas) => {
            alertas.classList.remove('is-hidden')
        })
    }

    else if (valorDescripcion.length > 0 && valorMonto == 0) {
        montoCampoRequerido.forEach((alertas) => {
            alertas.classList.remove('is-hidden')
        })
    }

    else if (valorMonto > 0 && valorDescripcion.length == 0) {
        alertaCampoRequerido.forEach((alertas) => {
            alertas.classList.remove('is-hidden')
        })
    }
    
}



cancelarNuevaOperacion.onclick = () => {
    ocultarSecciones();
    seccionBalance.classList.remove('is-hidden');
    resetearValoresInputs();
    ocultarAdvertenciaCamposRequeridos()
    montoCampoRequerido.forEach((alertas) => {
        alertas.classList.add('is-hidden')
    })
}


const botonesEditarOperacion = () => {

}



const eliminarOperacion = () => {
    listaDeBotonesActualizada = actualizarListaBotonesEliminarOperacion()

    listaDeBotonesActualizada.forEach((boton)=> {
        boton.onclick = () => {
            eliminarOperacion();
            const cantidadLetrasEliminar = 8
            const idRecortado = Number =(boton.id.slice(cantidadLetrasEliminar))
            
            arrayInputUsuario = arrayInputUsuario.filter((operacion)=> {
                return operacion.id != idRecortado
            })

                  
            actualizarInfoUsuario()
            aplicarfiltros()
        }
    })
}







// //--------------------FUNCIONALIDAD CATEGORÍAS-----------------///

let botonEliminarCategoria = () => {

    const listaBotonesEliminarCategoria = actualizarListaBotonEliminarCategoria();

    listaBotonesEliminarCategoria.forEach((boton)=> {
        boton.onclick = () => {
            botonEliminarCategoria()
            const idRecortado = Number(boton.id.slice(8))
            
            arrayInputUsuario = arrayInputUsuario.filter((operacion)=> {
                return operacion.categoria !== arrayCategorias[idRecortado] 
           })

            arrayCategorias = arrayCategorias.filter((element,index)=> {
                return index !== idRecortado
            });
           actualizarInfoUsuario()
        };
    })
    
}

let cajita = []

let guardaVariable = (valor) => {
    cajita.push(valor)
}

let botonEditarCategoriaSeccionCategoria = () => {
    arrayDeBotonesEditarEnDOM = actualizarBotonesEditarCategorias()
    arrayDeBotonesEditarEnDOM.forEach((boton)=> {
        boton.onclick = () => {
            ocultarAdvertenciaCamposRequeridos()
            ocultarAdvertenciaRepetida()
            botonEditarCategoriaSeccionCategoria()
            abrirVentanaEditarCategoria()
            const cantidadLetrasCortadasDelId = 6
            const idRecortado = Number(boton.id.slice(cantidadLetrasCortadasDelId))
            inputEditarCategoria.value = arrayCategorias[idRecortado]
            guardaVariable(inputEditarCategoria.value)
        }  
    }) 
}



cancelarEditarCategoria.onclick = () => {
    ocultarAdvertenciaCamposRequeridos()
    ocultarAdvertenciaRepetida()
    ocultarSecciones()
    seccionCategorias.classList.remove('is-hidden');
}



let HTMLcategoriasSeccionCategorias = () => {
    let categoriasAMostrar = arrayCategorias.reduce((acc,element,index)=> {
        return acc + `<li>
        <div class="columns is-mobile is-vcentered mb-3">
            <div class="column">
                <p class="tag is-primary is-light">${element}</p>
            </div>
            <div class="columns">
                <div class="column">
                    <button class="button is-ghost is-size-7 open-editar-categoria" id="editar${index}">Editar</button>
                    <button class="button is-ghost is-size-7 eliminar-categoria" id="eliminar${index}">Eliminar</button>
                </div>
            </div>
        </div>
    </li>`
    },"")

    listaCategorias.innerHTML = categoriasAMostrar
    botonEliminarCategoria()
    botonEditarCategoriaSeccionCategoria();
}

HTMLcategoriasSeccionCategorias()


const agregarOEditarCategoria = (input) => {

    let valorNuevaCategoria = input.value
    let verificarCategoriaExistente = arrayCategorias.some((element)=> {
        return element.toLocaleLowerCase() === valorNuevaCategoria.toLowerCase()
    })
  
    if ( valorNuevaCategoria.length > 0 && !verificarCategoriaExistente) {
        if (input === inputNuevaCategoria) {
        arrayCategorias.push(input.value);
        actualizarInfoUsuario()
        input.value = ""
        actualizarBotonesEditarCategorias()
      }

      else {
        for (let i = 0; i < arrayCategorias.length; i++) {
            if (arrayCategorias[i] === cajita[0]) {
                arrayCategorias[i] = inputEditarCategoria.value
            }
        }
        
        arrayInputUsuario.forEach((objeto)=> {
            if (objeto.categoria === cajita[0]) {
                objeto.categoria = inputEditarCategoria.value
            }
        })

        actualizarInfoUsuario()
        ocultarSecciones()
        seccionCategorias.classList.remove('is-hidden')
        ocultarAdvertenciaCamposRequeridos()
        ocultarAdvertenciaRepetida()
        cajita = []
        
      }
    }

    if (valorNuevaCategoria.length == 0) {
        alertaCampoRequerido.forEach((alertas) => {
            alertas.classList.remove('is-hidden')
        })

    }

    if (verificarCategoriaExistente){
        categoriaRepetida.forEach((alertas)=> {
            alertas.classList.remove('is-hidden')
        })
        
    }


}



inputEditarCategoria.oninput = () => {
    ocultarAdvertenciaRepetida()
    ocultarAdvertenciaCamposRequeridos()
}

// Seccion editar nueva categoria 

botonEditarCategoriaSeccionEditarCategoria.onclick = (e) => {
    e.preventDefault()
    agregarOEditarCategoria(inputEditarCategoria)
}



//Alertas 



montoNuevaOperacion.oninput = () => {
    montoCampoRequerido.forEach((alertas) => {
        alertas.classList.add('is-hidden')
    })
}

descripcionNuevaOperacion.oninput = () => {
  ocultarAdvertenciaCamposRequeridos()
}



inputNuevaCategoria.oninput = () => {
  ocultarAdvertenciaCamposRequeridos()
  ocultarAdvertenciaRepetida()
    
}


agregarNuevaCategoria.onclick = (e) => {
    e.preventDefault()
    agregarOEditarCategoria(inputNuevaCategoria)
}

//botones editar


montoNuevaOperacion.oninput = () => {
    if(montoNuevaOperacion.value > 9999999) {
        montoNuevaOperacion.value = 0
    }
}



HTMLBalanceBoxOperaciones(arrayFechaDeHoy())
aplicarfiltros()