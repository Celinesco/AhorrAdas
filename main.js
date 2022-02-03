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
const botonAgregarNuevaOperacion = document.getElementById("agregar-nueva-operacion");
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
const tituloModalEditarCrearOperacion = document.getElementById("titulo-modal-editar-crear-operacion");


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

const seccionReportes = document.getElementById("section-reportes");
const conReportes = document.getElementById("con-reportes");
const sinReportes = document.getElementById("sin-reportes");
const categoriaMayorGanancia = document.getElementById("categoria-mayor-ganancia");
const montoCategoriaMayorGanancia = document.getElementById("monto-categoria-mayor-ganancia");
const categoriaMayorGasto = document.getElementById("categoria-mayor-gasto");
const montoCategoriaMayorGasto = document.getElementById("monto-categoria-mayor-gasto");
const categoriaMayorBalance = document.getElementById("categoria-mayor-balace");
const montoCategoriaMayorBalance = document.getElementById("monto-categoria-mayor-balance");
const mesMayorGanancia = document.getElementById("mes-mayor-ganancia");
const montoMesMayorGanancia = document.getElementById("monto-mes-mayor-ganancia");
const mesMayorGasto = document.getElementById("mes-mayor-gasto");
const montoMesMayorGasto = document.getElementById("monto-mes-mayor-gasto");
const totalesPorCategoria = document.getElementById("totales-por-categorias");
const totalesPorMes = document.getElementById("totales-por-mes");



/////////////////////////FIN DE DOM////////////////////////////FIN DE DOM//////////////////////////////////////FIN DE DOM/////////////////////////////

// Variables del Usuario

let arrayInputUsuario = [];
let arrayCategorias = ["Comida", "Servicios", "Salidas", "Educación", "Transporte", "Trabajo"];

// Variables Auxiliares

let valoresPreviosEditarOperation = [];
let valorIdABorrar = -1;
let edicion = false;

// Funciones Auxiliares

const fechaLocalFormateada = () => {
    // FANTASTICA esta funcion!!!
    const fechaUTChoy = new Date();
    const fechaLocalString = fechaUTChoy.toLocaleDateString()
    const arrayFechaLocal = fechaLocalString.split('/')
    const arrayFechaLocalDadaVuelta = arrayFechaLocal.reverse();
    const fechaFormatoFecha = arrayFechaLocalDadaVuelta.join('/')
    return fechaFormatoFecha
}

const convertirAJSON = array => JSON.stringify(array);
const guardarEnLocalStorage = (array, clave) => localStorage.setItem(clave, convertirAJSON(array));
const convertirDesdeJSON = arrayJSON => JSON.parse(arrayJSON);

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

const buscarMayor = (array) => array.reduce((acc, elemento) => {
    if (acc.monto < elemento.monto) {
        return acc = elemento
    }
    return acc
}, 
{ categoria: "", tipo: "ganancia", monto: 0 })


// Comienzo de página


const operacionesAlmacenadas = leerDesdeLocalStorage('operaciones_usuario');
const categoriasActualizadas = leerDesdeLocalStorage('categorias_actualizadas');

if (categoriasActualizadas !== null) {
    arrayCategorias = categoriasActualizadas
}


fechaNuevaOperacion.valueAsDate = new Date(fechaLocalFormateada())
filtroFecha.valueAsDate = new Date(fechaLocalFormateada())


const arrayFechaDeHoy = () => {
    if (operacionesAlmacenadas !== null) {
        arrayInputUsuario = operacionesAlmacenadas
        const nuevoArray = operacionesAlmacenadas.filter((element) => {
            return element.fecha === filtroFecha.value
        })
        return nuevoArray
    }
    return arrayInputUsuario
}


// Funciones Actualizar
const resetearValoresInputs = () => {
    descripcionNuevaOperacion.value = "";
    montoNuevaOperacion.value = "";
    fechaNuevaOperacion.valueAsDate = new Date(fechaLocalFormateada())
    categoriasEnNuevaOperacion.value = arrayCategorias[0]
};
const actualizarInfoUsuario = () => {
    HTMLBalanceBoxOperaciones(aplicarFiltros())
    HTMLcategoriasSeccionCategorias()
    guardarEnLocalStorage(arrayCategorias, 'categorias_actualizadas');
    guardarEnLocalStorage(arrayInputUsuario, 'operaciones_usuario');
    categoriasEnSelects(filtroCategoria)
    categoriasEnSelects(categoriasEnNuevaOperacion)
}


// Advertencias para formularios
const ocultarAdvertenciaCamposRequeridos = () => {
    alertaCampoRequerido.forEach((alertas) => {
        alertas.classList.add('is-hidden')
    })
}

const ocultarAdvertenciaRepetida = () => {
    categoriaRepetida.forEach((alertas) => {
        alertas.classList.add('is-hidden')
    })
}


// //Funcionalidad Header/Nav


const ocultarMenuHamburguesa = () => {
    abrirMenuHamburguesa.classList.remove('is-active');
    botonMenuHamburguesa.classList.remove('is-active')
}

const mostrarReporte = () => {
    const mostrarReporteGanancia = arrayInputUsuario.some((elemento) => {
        return elemento.tipo === "ganancia"
    })
    const mostrarReporteGasto = arrayInputUsuario.some((elemento) => {
        return elemento.tipo === "gasto"
    })
    if (mostrarReporteGanancia && mostrarReporteGasto) {
        sinReportes.classList.add("is-hidden")
        conReportes.classList.remove("is-hidden")
        HTMLResumenReportes()
    }
    else {
        conReportes.classList.add("is-hidden")
        sinReportes.classList.remove("is-hidden")
    }
}

itemNavSeccionBalance.onclick = () => {
    ocultarSecciones();
    ocultarMenuHamburguesa()
    seccionBalance.classList.remove('is-hidden');
};

itemNavSeccionCategorias.onclick = () => {
    ocultarSecciones();
    ocultarAdvertenciaCamposRequeridos();
    ocultarMenuHamburguesa();
    seccionCategorias.classList.remove('is-hidden');
};

itemNavSeccionReportes.onclick = () => {
    ocultarSecciones();
    ocultarMenuHamburguesa();
    ocultarAdvertenciaCamposRequeridos();
    seccionReportes.classList.remove('is-hidden');
    mostrarReporte()
};

botonMenuHamburguesa.onclick = () => {
    abrirMenuHamburguesa.classList.toggle('is-active')
    botonMenuHamburguesa.classList.toggle('is-active')
}




//--------------SECCION-BALANCE------------//////



// Filtros

const categoriasEnSelects = (filtroEnSeccion) => {
    if (filtroEnSeccion !== categoriasEnNuevaOperacion)
        filtroEnSeccion.innerHTML = arrayCategorias.reduce((acc, element) => {
            return acc + ` <option value='${element}'>${element}</option>`
            // si no van a interpolar, usen comillas simples '' y dobles ""
        }, '<option value="todos">Todas</option>')

    else {
        filtroEnSeccion.innerHTML = arrayCategorias.reduce((acc, element) => {
            return acc + ` <option value="${element}">${element}</option>`
        }, "")

    }
}

// estas funciones que se ejecutan apenas carga la pagina son dificiles de encontrar si estan ejecutadas
// en medio de las declaraciones de las funciones auxiliares
// ponganlas al final de todo
categoriasEnSelects(filtroCategoria)
categoriasEnSelects(categoriasEnNuevaOperacion)


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


// esta funcion hace dos cosas distintas: aplica los filtros, pero tambien 
// actualiza la seccion de balances
// deberian ser dos funciones diferentes, no es bueno mezclar funcionalidades
const aplicarFiltros = () => {
    const filtradoPorTipo = arrayInputUsuario.filter((operacion) => {
        if (filtroTipo.value === "todos") {
            return operacion
        }
        return operacion.tipo.toLowerCase() === filtroTipo.value
    });

    const filtradoCategoriayTipo = filtradoPorTipo.filter((operacion) => {
        if (filtroCategoria.value === "todos") {
            return operacion
        }
        return operacion.categoria == filtroCategoria.value
    });

    const filtradoFinal = filtradoCategoriayTipo.filter(operacion => new Date(operacion.fecha) >= new Date(filtroFecha.value));
    const arrayDeGanancias = filtradoFinal.filter(operacion => operacion.tipo === "ganancia");
    const arrayDeGastos = filtradoFinal.filter(operacion => operacion.tipo === "gasto");
    const sumaTotalGanancias = arrayDeGanancias.reduce((acc, element) => acc + element.monto, 0);
    const sumaTotalGastos = arrayDeGastos.reduce((acc, element) => acc + element.monto, 0);

    const total = sumaTotalGanancias - sumaTotalGastos


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


const filtroMayorMonto = () => {
    const arrayFiltradoDefiltros = aplicarFiltros();
    const arrayOrdenado = arrayFiltradoDefiltros.sort((a, b) => b.monto - a.monto);
    return arrayOrdenado
}

const filtroMenorMonto = () => {
    const arrayFiltradoDefiltros = aplicarFiltros();
    const arrayOrdenado = arrayFiltradoDefiltros.sort((a, b) => a.monto - b.monto);
    return arrayOrdenado;
}

const filtroRecientes = () => {
    const arrayFiltradoDefiltros = aplicarFiltros();
    const arrayOrdenado = arrayFiltradoDefiltros.sort((a, b) =>  new Date(b.fecha) - new Date(a.fecha))
    return arrayOrdenado
}

const filtroMenosRecientes = () => {
    const arrayFiltradoDefiltros = aplicarFiltros();
    const arrayOrdenado = arrayFiltradoDefiltros.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    return arrayOrdenado
}

const filtroAZ = () => {
    const arrayFiltradoDefiltros = aplicarFiltros();
    const arrayOrdenado = arrayFiltradoDefiltros.sort((a, b) => {
        const descripcionA = a.descripcion.toLowerCase();
        const descripcionB = b.descripcion.toLowerCase();

        if (descripcionA < descripcionB) {
            return -1;
        }
        if (descripcionA > descripcionB) {
            return 1
        }
        return 0
    });
    return arrayOrdenado
}


const filtroZA = () => {
    const arrayFiltradoDefiltros = aplicarFiltros();
    const arrayOrdenado = arrayFiltradoDefiltros.sort((a, b) => {
        const descripcionA = a.descripcion.toLowerCase();
        const descripcionB = b.descripcion.toLowerCase();

        if (descripcionA > descripcionB) {
            return -1;
        }
        if (descripcionA < descripcionB) {
            return 1
        }
        return 0
    });
    return arrayOrdenado
}

// excelente
const activarFiltrosOrdenarPor = () => {
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

filtroOrdenarPor.onchange = () => {
    activarFiltrosOrdenarPor()
}

filtroTipo.onchange = () => {
    const arrayFiltradoPorTipo = aplicarFiltros()
    HTMLBalanceBoxOperaciones(arrayFiltradoPorTipo)
}

filtroCategoria.onchange = () => {
    const arrayFiltradoPorCategoria = aplicarFiltros()
    HTMLBalanceBoxOperaciones(arrayFiltradoPorCategoria)
};

filtroFecha.onchange = () => {
    const arrayFiltradoPorFecha = aplicarFiltros()
    HTMLBalanceBoxOperaciones(arrayFiltradoPorFecha)
}



// Box operaciones

const htmlOperacionesSinResulados = () => {
    contenedorOperaciones.setAttribute('class', "columns is-centered my-6 py-6")
    contenedorOperaciones.innerHTML =
        `<div class="column is-6">
        <div class="image" aria-hidden= "true">
            <img src="images/undraw_Growing_re_olpi.svg">
        </div>
        <p class="title has-text-centered mt-6 is-4">Sin resultados</p>
        <p class="has-text-centered">Cambia los filtros o agrega operaciones</p>
    </div>`
};

htmlOperacionesSinResulados()

const ordernarFechaHTMLOperaciones = (string) => {
    const arrayFechaOrdenada = [];
    const arrayFechaDesordenada = string.split("-");
    for (let i = 2; i >= 0; i--) {
        arrayFechaOrdenada.push(arrayFechaDesordenada[i])
    }
    const fechaResultado = arrayFechaOrdenada.join("/")
    return fechaResultado
}

const HTMLBalanceBoxOperaciones = (array) => {

    if (array.length == 0) {
        htmlOperacionesSinResulados()
    }
    else {
        let acc = " ";

        array.map((operacion) => {
            acc = acc + `
        <div class="columns is-vcentered is-multiline is-mobile">
            <div class="column is-6-mobile is-3-tablet">
               <p class="has-text-weight-bold"> ${operacion.descripcion}</p>
            </div>
            <div class="column is-6-mobile is-3-tablet is-2-desktop has-text-right-mobile">
                <p class="tag is-primary is-light ">${operacion.categoria}</p>
            </div>
            <div class="column is-2-tablet is-3-desktop has-text-grey has-text-right-tablet is-hidden-mobile">
                ${ordernarFechaHTMLOperaciones(operacion.fecha)}
            </div>
            <div class="column has-text-right-tablet has-text-weight-bold is-2-tablet is-6-mobile is-size-4-mobile ${operacion.tipo === "ganancia" ? "has-text-success" : "has-text-danger"}"> 
            ${operacion.tipo === "ganancia" ? "+$" : "-$"}${operacion.monto}
            </div>
            <div class="column is-2-tablet is-6-mobile is-2-desktop">
                <div class="columns">
                    <div class="column is-flex-widescreen is-block-desktop has-text-right">
                        <button class="button is-ghost is-size-7 abrir-editar-operacion pl-0" id="editar${operacion.id}">Editar</button>
                        <button class="button is-ghost is-size-7 eliminar-operacion pl-0" id="eliminar${operacion.id}">Eliminar</button>
                    </div>
                </div>
            </div>
         </div>`

        })

        contenedorOperaciones.removeAttribute("class")
        contenedorOperaciones.innerHTML = `
    <div class="columns my-3 py-2 is-hidden-mobile" id="contenedor-operaciones">
        <div class="column has-text-weight-semibold is-3">Descripción</div>
        <div class="column has-text-weight-semibold is-3">Categoría</div>
        <div class="column has-text-weight-semibold is-2 has-text-right">Fecha</div>
        <div class="column has-text-weight-semibold is-2 has-text-right">Monto</div>
        <div class="column has-text-weight-semibold is-2 has-text-right">Acciones</div>
    </div>

    <div class="">
        ${acc} 
    </div> `

        eliminarOperacion()
        editarOperacion()
    }
};




// NUEVA OPERACIÓN

abrirSeccionNuevaOperacion.onclick = () => {
    edicion = false;
    ocultarAdvertenciaCamposRequeridos()
    montoCampoRequerido.forEach((alertas) => {
        alertas.classList.add('is-hidden')
    })
    ocultarSecciones();
    seccionNuevaOperacion.classList.remove('is-hidden');
    tituloModalEditarCrearOperacion.textContent = `Nueva operación`;
    botonAgregarNuevaOperacion.innerHTML = `<button type="button" class="button is-success">Agregar</button>`;
};

const nuevoObjeto = () => {
    arrayInputUsuario.push({
        id: Date.now(),
        descripcion: descripcionNuevaOperacion.value,
        monto: Number(montoNuevaOperacion.value),
        tipo: tipoNuevaOperacion.value,
        categoria: categoriasEnNuevaOperacion.value,
        fecha: fechaNuevaOperacion.value
    })

    arrayInputUsuario.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    return arrayInputUsuario
};


const guardaVariable = valor => valoresPreviosEditarOperation.push(valor);

const agregarOEditarOperacion = () => {
    const valorDescripcion = descripcionNuevaOperacion.value
    const valorMonto = montoNuevaOperacion.value

    if (valorDescripcion.length > 0 && valorMonto > 0) {
        if (edicion === true) {
            arrayInputUsuario = arrayInputUsuario.filter((operacion) => {
                return operacion.id != valorIdABorrar
            })
        }

        valorIdABorrar = -1;
        ocultarSecciones();
        seccionBalance.classList.remove('is-hidden');
        nuevoObjeto();
        resetearValoresInputs();
        HTMLBalanceBoxOperaciones(aplicarFiltros());
        activarFiltrosOrdenarPor()
        guardarEnLocalStorage(arrayInputUsuario, 'operaciones_usuario')
    }
    else if (valorDescripcion.length === 0 && valorMonto == "") {
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
};

descripcionNuevaOperacion.oninput = () => {
    ocultarAdvertenciaCamposRequeridos()
};

botonAgregarNuevaOperacion.onclick = (e) => {
    e.preventDefault()
    agregarOEditarOperacion()
};


cancelarNuevaOperacion.onclick = () => {
    ocultarSecciones();
    seccionBalance.classList.remove('is-hidden');
    resetearValoresInputs();
    ocultarAdvertenciaCamposRequeridos()
};


const editarOperacion = () => {

    
    const botonesEditarOperacion = document.querySelectorAll(".abrir-editar-operacion");

    botonesEditarOperacion.forEach((boton) => {
        boton.onclick = () => {
            edicion = true
            editarOperacion()
            ocultarSecciones()
            seccionNuevaOperacion.classList.remove('is-hidden')
            tituloModalEditarCrearOperacion.textContent = `Editar operación`
            botonAgregarNuevaOperacion.innerHTML = `<button type="button" class="button is-success">Editar</button>`;

            const cantidadLetrasEditar = 6
            const idRecortado = Number(boton.id.slice(cantidadLetrasEditar));
            valorIdABorrar = idRecortado;

            const operacionAEditar = arrayInputUsuario.filter((operacion) => {
                return operacion.id == idRecortado
            })

            descripcionNuevaOperacion.value = operacionAEditar[0].descripcion
            montoNuevaOperacion.value = operacionAEditar[0].monto;
            tipoNuevaOperacion.value = operacionAEditar[0].tipo;
            categoriasEnNuevaOperacion.value = operacionAEditar[0].categoria
            fechaNuevaOperacion.value = operacionAEditar[0].fecha;
        }
    })
};


const eliminarOperacion = () => {
    const botonesEliminarOperacion = document.querySelectorAll(".eliminar-operacion")
    botonesEliminarOperacion.forEach((boton) => {
        boton.onclick = () => {
            eliminarOperacion();
            const cantidadLetrasEliminar = 8
            const idRecortado = Number(boton.id.slice(cantidadLetrasEliminar))
            arrayInputUsuario = arrayInputUsuario.filter(operacion => operacion.id != idRecortado)
            actualizarInfoUsuario()
        }
    })
};


montoNuevaOperacion.oninput = () => {
    if (montoNuevaOperacion.value.length > 10) {
        const numeroAstring = String(montoNuevaOperacion.value)
        const cortarString = numeroAstring.slice(0, 10)
        const volverANumero = Number(cortarString)
        montoNuevaOperacion.value = volverANumero
    }

    montoCampoRequerido.forEach((alertas) => {
        alertas.classList.add('is-hidden')
    })
};


// //--------------------FUNCIONALIDAD CATEGORÍAS-----------------///


const abrirVentanaEditarCategoria = () => {
    seccionCategorias.classList.add('is-hidden');
    sectionEditarCategoria.classList.remove('is-hidden');
};

const botonEliminarCategoria = () => {

    const arrayDeBotonesEliminarDom = document.querySelectorAll(".eliminar-categoria");
    arrayDeBotonesEliminarDom.forEach((boton) => {
        boton.onclick = () => {
            botonEliminarCategoria()
            const idRecortado = Number(boton.id.slice(8))
            arrayInputUsuario = arrayInputUsuario.filter(operacion => operacion.categoria !== arrayCategorias[idRecortado]);
            arrayCategorias = arrayCategorias.filter((element, index) => index !== idRecortado);
            actualizarInfoUsuario()
        };
    })
};


const botonEditarCategoriaSeccionCategoria = () => {
    const arrayDeBotonesEditarEnDOM = document.querySelectorAll(".open-editar-categoria");
    arrayDeBotonesEditarEnDOM.forEach((boton) => {
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
};


cancelarEditarCategoria.onclick = () => {
    ocultarAdvertenciaCamposRequeridos()
    ocultarAdvertenciaRepetida()
    ocultarSecciones()
    seccionCategorias.classList.remove('is-hidden');
};


const HTMLcategoriasSeccionCategorias = () => {
    const categoriasAMostrar = arrayCategorias.reduce((acc, element, index) => {
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
    }, "")

    listaCategorias.innerHTML = categoriasAMostrar
    botonEliminarCategoria()
    botonEditarCategoriaSeccionCategoria();
};

HTMLcategoriasSeccionCategorias()


const agregarOEditarCategoria = (input) => {

    const valorNuevaCategoria = input.value
    const verificarCategoriaExistente = arrayCategorias.some(element => element.toLocaleLowerCase() === valorNuevaCategoria.toLowerCase())

    if (valorNuevaCategoria.length > 0 && !verificarCategoriaExistente) {
        if (input === inputNuevaCategoria) {
            arrayCategorias.push(input.value);
            actualizarInfoUsuario()
            input.value = ""
        }
        else {
            for (let i = 0; i < arrayCategorias.length; i++) {
                if (arrayCategorias[i] === valoresPreviosEditarOperation[0]) {
                    arrayCategorias[i] = inputEditarCategoria.value
                }
            }
            arrayInputUsuario.forEach((objeto) => {
                if (objeto.categoria === valoresPreviosEditarOperation[0]) {
                    objeto.categoria = inputEditarCategoria.value
                }
            })
            actualizarInfoUsuario()
            ocultarSecciones()
            seccionCategorias.classList.remove('is-hidden')
            ocultarAdvertenciaCamposRequeridos()
            ocultarAdvertenciaRepetida()
            valoresPreviosEditarOperation = []
        }
    }
    valorNuevaCategoria.length == 0 && alertaCampoRequerido.forEach(alertas => alertas.classList.remove('is-hidden'));
    verificarCategoriaExistente && categoriaRepetida.forEach(alertas => alertas.classList.remove('is-hidden'));
};


inputEditarCategoria.oninput = () => {
    ocultarAdvertenciaRepetida();
    ocultarAdvertenciaCamposRequeridos();
};

botonEditarCategoriaSeccionEditarCategoria.onclick = (e) => {
    e.preventDefault();
    agregarOEditarCategoria(inputEditarCategoria);
};

inputNuevaCategoria.oninput = () => {
    ocultarAdvertenciaCamposRequeridos();
    ocultarAdvertenciaRepetida();
};

agregarNuevaCategoria.onclick = (e) => {
    e.preventDefault();
    agregarOEditarCategoria(inputNuevaCategoria);
};


HTMLBalanceBoxOperaciones(arrayFechaDeHoy());
aplicarFiltros();



//--------------SECCION-REPORTES------------//////

// El codigo de esta funcion es excelente: dicho eso, seria mejor subdividirla en funciones mas pequeñas. 
const HTMLResumenReportes = () => {
    const categoriasFiltradas = arrayInputUsuario.map((elemento) => {
        return elemento.categoria
    })

    const categoriasEnUso = categoriasFiltradas.filter((elemento, index) => {
        return categoriasFiltradas.indexOf(elemento) === index
    })


    //------------- FUNCIONES TOTALES POR CATEGORIA 

    const gananciaPorCategoria = categoriasEnUso.map((categoria) => {
        const buscarCategoria = arrayInputUsuario.reduce((acc, elemento) => {
            if (elemento.tipo === "ganancia" && elemento.categoria === categoria) {
                acc.monto = elemento.monto + acc.monto
                acc.categoria = elemento.categoria
                acc.tipo = elemento.tipo
            }
            return acc
        }, { categoria: "", tipo: "", monto: 0 })

        if (buscarCategoria.monto != 0) {
            return buscarCategoria
        }
        if (buscarCategoria.monto === 0) {
            return { categoria: categoria, tipo: "ganancia", monto: 0 }
        }
    })

    const categoriaConMayorGanancia = buscarMayor(gananciaPorCategoria)

    const gastoPorCategoria = categoriasEnUso.map((categoria) => {

        const buscarCategoria = arrayInputUsuario.reduce((acc, elemento) => {
            if (elemento.tipo === "gasto" && elemento.categoria === categoria) {
                acc.monto = elemento.monto + acc.monto
                acc.categoria = elemento.categoria
                acc.tipo = elemento.tipo
            }
            return acc
        }, { categoria: "", tipo: "", monto: 0 })

        if (buscarCategoria.monto != 0) {
            return buscarCategoria
        }
        if (buscarCategoria.monto === 0) {
            return { categoria: categoria, tipo: "gasto", monto: 0 }
        }
    })

    const categoriaConMayorGasto = buscarMayor(gastoPorCategoria)


    const balancePorCategoria = categoriasEnUso.map((categoria) => {
        const buscarCategoria = arrayInputUsuario.reduce((acc, elemento) => {
            if (elemento.tipo === "ganancia" && elemento.categoria === categoria) {
                acc.monto = elemento.monto + acc.monto
                acc.categoria = elemento.categoria
            }
            if (elemento.tipo === "gasto" && elemento.categoria === categoria) {
                acc.monto = acc.monto - elemento.monto
                acc.categoria = elemento.categoria
            }
            return acc

        }, { categoria: "", monto: 0 })

        if (buscarCategoria.monto != 0) {
            return buscarCategoria
        }
        if (buscarCategoria.monto === 0) {
            return { categoria: categoria, monto: 0 }
        }

    })


    const categoriaConMayorBalance = buscarMayor(balancePorCategoria)



    //----------------------FECHAS

    const fechaDeOperacion = arrayInputUsuario.map((elemento) => {
        return elemento.fecha.slice(0, 7)
    })
    const fechasFiltradas = fechaDeOperacion.filter((elemento, index) => {
        return fechaDeOperacion.indexOf(elemento) === index
    })


    // TOTALES POR MES: GANANCIA

    const gananciaPorMes = fechasFiltradas.map((fecha) => {
        const buscarMesMayorGanancia = arrayInputUsuario.reduce((acc, elemento) => {

            if (elemento.tipo === "ganancia" && elemento.fecha.slice(0, 7) === fecha) {
                acc.monto = acc.monto + elemento.monto
                acc.fecha = fecha
                acc.tipo = "ganancia"
            }
            return acc

        }, { monto: 0, tipo: "", fecha: "" })

        if (buscarMesMayorGanancia.monto != 0) {
            return buscarMesMayorGanancia
        }
        if (buscarMesMayorGanancia.monto === 0) {
            return { monto: 0, tipo: "ganancia", fecha: fecha }
        }

    })

    const filtroGananciaPorMes = gananciaPorMes.filter((elemento) => {
        return elemento.tipo === "ganancia"
    })

    const mesConMayorGanancia = buscarMayor(filtroGananciaPorMes)



    //TOTALES POR MES: GASTO

    const gastoPorMes = fechasFiltradas.map((fecha) => {
        const buscarMesMayorGasto = arrayInputUsuario.reduce((acc, elemento) => {
            if (elemento.tipo === "gasto" && elemento.fecha.slice(0, 7) === fecha) {
                acc.monto = acc.monto + elemento.monto
                acc.fecha = fecha
                acc.tipo = "gasto"
            }
            return acc

        }, { monto: 0, tipo: "", fecha: "" })

        if (buscarMesMayorGasto.monto != 0) {
            return buscarMesMayorGasto
        }
        if (buscarMesMayorGasto.monto === 0) {
            return { monto: 0, tipo: "gasto", fecha: fecha }
        }
    })
    const filtroGastoPorMes = gastoPorMes.filter((elemento) => {
        return elemento.tipo === "gasto"
    })

    const mesConMayorGasto = buscarMayor(filtroGastoPorMes)

    //TOTALES POR MES: BALANCE

    const balancePorMes = fechasFiltradas.map((elemento) => {
        const buscarBalancePorMes = arrayInputUsuario.reduce((accb, elementob) => {
            if (elementob.tipo === "ganancia" && elementob.fecha.slice(0, 7) === elemento) {
                accb.monto = accb.monto + elementob.monto
                accb.fecha = elemento
            }
            if (elementob.tipo === "gasto" && elementob.fecha.slice(0, 7) === elemento) {
                accb.monto = accb.monto - elementob.monto
                accb.fecha = elemento
            }
            return accb

        }, { monto: 0, fecha: "" })

        if (buscarBalancePorMes.monto != 0) {
            return buscarBalancePorMes
        }
        if (buscarBalancePorMes.monto === 0) {
            return { monto: 0, fecha: elemento }
        }
    })
    const filtroBalancePorMes = balancePorMes.filter((elemento) => {
        return elemento.fecha != ""
    })



    //----------------HTML RESUMEN

    categoriaMayorGanancia.innerHTML = `${categoriaConMayorGanancia.categoria}`;
    montoCategoriaMayorGanancia.innerHTML = `$${categoriaConMayorGanancia.monto}`;
    categoriaMayorGasto.innerHTML = `${categoriaConMayorGasto.categoria}`;
    montoCategoriaMayorGasto.innerHTML = `-$${categoriaConMayorGasto.monto}`;
    categoriaMayorBalance.innerHTML = `${categoriaConMayorBalance.categoria}`;
    montoCategoriaMayorBalance.innerHTML = `$${categoriaConMayorBalance.monto}`;
    mesMayorGanancia.innerHTML = `${mesConMayorGanancia.fecha}`;
    montoMesMayorGanancia.innerHTML = `$${mesConMayorGanancia.monto}`;
    mesMayorGasto.innerHTML = `${mesConMayorGasto.fecha}`;
    montoMesMayorGasto.innerHTML = `-$${mesConMayorGasto.monto}`;


    //--------------HTML totales por categoria 

    let accCategoria = ""
    categoriasEnUso.map((elemento, index) => {
        accCategoria = accCategoria + `
        <div class="columns is-mobile">
            <div class="column has-text-weight-semibold">${elemento}</div>
            <div class="column has-text-right has-text-success">+$${gananciaPorCategoria[index].monto}</div>
            <div class="column has-text-right has-text-danger">-$${gastoPorCategoria[index].monto}</div>
            <div class="column has-text-right has-text-dark">$${balancePorCategoria[index].monto}</div> 
        </div>
        `
    })

    totalesPorCategoria.innerHTML = accCategoria

    //--------------------HTML totales por mes
    let accMes = ""
    fechasFiltradas.map((elemento, index) => {
        accMes = accMes + `
        <div class="columns is-mobile">
            <div class="column has-text-weight-semibold">${elemento}</div>
            <div class="column has-text-right has-text-success">+$${filtroGananciaPorMes[index].monto}</div>
            <div class="column has-text-right has-text-danger">-$${filtroGastoPorMes[index].monto}</div>
            <div class="column has-text-right has-text-dark">$${Number(filtroBalancePorMes[index].monto)}</div>
        </div> 
        `
    })
    totalesPorMes.innerHTML = accMes
}
