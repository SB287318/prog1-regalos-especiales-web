/*Santiago Brito(Nro 287318)*/

window.addEventListener("load", inicio)

let sistema = new Sistema()

function get(id) {
    return document.getElementById(id)
}

function inicio() {
    actualizar()
    get("botonAgregarCategoria").addEventListener("click", agregarCategoria)
    get("botonAgregarExperiencia").addEventListener("click", agregarExperiencia)
    get("botonEliminarCategoria").addEventListener("click", eliminarCategoria)
    get("botonEliminarExperiencia").addEventListener("click", eliminarExperiencia)
    agregarEventListenerASelects()
    get("botonComprar").addEventListener("click", agregarCompra)
}

function agregarCategoria() {
    if (get("formulario2").reportValidity()) {
        let nombreCat = get("inputNombreCategoria").value
        let detallesCat = get("inputDetallesCategoria").value
        if (!sistema.verRepetidoCat(nombreCat)) {
            let categoria = new Categoria(nombreCat, detallesCat)
            sistema.agregarCat(categoria)
            get("formulario2").reset()
            actualizar()
            habilitarBoton("botonEliminarCategoria")
            habilitarBoton("botonAgregarExperiencia")
        } else {
            alert("Este nombre esta en uso!")
        }
    }
}

function agregarExperiencia() {
    if (get("formulario3").reportValidity()) {
        let tituloExp = get("inputTituloExperiencia").value
        let descripcionExp = get("inputDescripcionExperiencia").value
        let precioExp = parseInt(get("inputPrecioExperiencia").value)
        let cantidadExp = get("selectCantidadExperiencia").value
        let categoriaExp = sistema.buscarCat(get("selectCategoria2").value)
        if (!sistema.verRepetidoExp(tituloExp)) {
            let experiencia = new Experiencia(tituloExp, descripcionExp, precioExp, cantidadExp, categoriaExp)
            sistema.agregarExp(experiencia)
            get("formulario3").reset()
            actualizar()
            habilitarBoton("botonEliminarExperiencia")
        } else {
            alert("Este titulo ya esta en uso!")
        }
    }
}

function actualizar() {
    cargarSelectCategoria()
    cargarSelectExperiencia()
    cargarInformes()
    cargarTabla()
}

function cargarTabla() {
    limpiarTabla()
    let tabla = get("tabla")
    let datos = verificarSelects()
    if (datos.length === 0) {
        tabla.innerHTML = "Sin datos"
        get("spanSinDatos").innerHTML = "Sin datos"
        deshabilitarBoton("botonComprar")
    } else {
        habilitarBoton("botonComprar")
        let fila
        let celdaAnterior
        for (let i = 0; i < datos.length; i++) {
            if (i % 2 === 0) {
                fila = tabla.insertRow()
            }
            let elem = datos[i];
            let celda = fila.insertCell()
            celda.innerHTML = elem.titulo + "<br><i>" + elem.descripcion + "</i><br>$" + elem.precio + "<br>"
            if (elem.cantidad === "1Persona") {
                celda.innerHTML += "<img src='img/uno.png' alt='imagen_una_persona'>"
            } else {
                if (elem.cantidad === "2Personas") {
                    celda.innerHTML += "<img src='img/dos.png' alt='imagen_dos_personas'>"
                } else {
                    if (elem.cantidad === "MasDe2Personas") {
                        celda.innerHTML += "<img src='img/muchos.png' alt='imagen_muchas_personas'>"
                    }
                }
            }

            if (i === datos.length - 1) {
                celda.classList.add("selected")
                celdaAnterior = celda
                mostrarExpEnCompras(elem.titulo)
            }

            celda.addEventListener("click", function () {
                celdaAnterior.classList.remove("selected")
                celda.classList.add("selected")
                celdaAnterior = celda
                let datosCelda = this.innerHTML
                let index = datosCelda.indexOf("<br>")
                let nombreExperiencia = datosCelda.slice(0, index)
                mostrarExpEnCompras(nombreExperiencia)
            })
        }
    }
}

function limpiarTabla() {
    get("tabla").innerHTML = ""
}

function verificarSelects() {
    let selectObjCategoria = sistema.buscarCat(get("selectCategoria1").value)
    let res = sistema.darExpSegunCat(selectObjCategoria)
    let selectCantidadPersonas = get("selectCantidadPersonas").value
    res = sistema.darExpSegunCantidadPersonas(res, selectCantidadPersonas)
    let selectOrdenPrecio = get("selectOrdenPrecio").value
    res = sistema.darExpSegunPrecio(res, selectOrdenPrecio)
    return res
}

function cargarSelectCategoria() {
    let listaSelect = document.getElementsByClassName("selectCategoria")
    for (let elem of listaSelect) {
        let select = elem
        select.innerHTML = ""
        let lista = sistema.darTodosCat()
        for (let elem of lista) {
            let nodo = document.createElement("option")
            let nodoTexto = document.createTextNode(elem.nombre)
            nodo.appendChild(nodoTexto)
            nodo.value = elem.nombre
            select.appendChild(nodo)
        }
    }

}

function cargarSelectExperiencia() {
    let select = get("selectExperienciaBorrar")
    select.innerHTML = ""
    let lista = sistema.darTodosExp()
    for (let elem of lista) {
        let nodo = document.createElement("option")
        let nodoTexto = document.createTextNode(elem.titulo)
        nodo.appendChild(nodoTexto)
        nodo.value = elem.titulo
        select.appendChild(nodo)
    }
}

function agregarEventListenerASelects() {
    get("selectCategoria1").addEventListener("change", cargarTabla)
    get("selectCantidadPersonas").addEventListener("change", cargarTabla)
    get("selectOrdenPrecio").addEventListener("change", cargarTabla)
    get("selectCategoria1").addEventListener("change", cargarInformes)
    get("selectCantidadPersonas").addEventListener("change", cargarInformes)
    get("selectOrdenPrecio").addEventListener("change", cargarInformes)
}

function cargarInformes() {
    if (!sistema.verificarSiExpTieneElementos()) {
        get("parrafoMontoMasCaro").innerHTML = "Sin datos"
    } else {
        get("parrafoMontoMasCaro").innerHTML = sistema.experienciaMontoMasCaro()
    }
    let listaExpMasVecesComprada = get("listaExpMasVecesComprada")
    listaExpMasVecesComprada.innerHTML = ""
    if (sistema.listaCom.length === 0) {
        listaExpMasVecesComprada.innerHTML = "Sin datos"
    } else {
        let datos = sistema.darExpMasVecesComprada()
        for (let elem of datos) {
            let nodo = document.createElement("li")
            let nodoTexto = document.createTextNode(elem.titulo)
            nodo.appendChild(nodoTexto)
            listaExpMasVecesComprada.appendChild(nodo)
        }
    }
    let parrafoInformacionDetallada = get("parrafoInformacionDetallada")
    parrafoInformacionDetallada.innerHTML = ""
    let lista = get("ulInformacionDetallada")
    lista.innerHTML = ""
    let selectObjCategoria = sistema.buscarCat(get("selectCategoria1").value)
    let comprasAMostrar = sistema.darComprasSegunCategoria(selectObjCategoria)
    if (comprasAMostrar.length > 0) {
        parrafoInformacionDetallada.innerHTML = "Información detallada de la categoría " + selectObjCategoria.nombre
        for (let elemCom of comprasAMostrar) {
            let nodo = document.createElement("li")
            let nodoTexto = document.createTextNode(elemCom)
            nodo.appendChild(nodoTexto)
            lista.appendChild(nodo)
        }
    } else {
        let nodo = document.createElement("li")
        let nodoTexto = document.createTextNode("Sin datos")
        nodo.appendChild(nodoTexto)
        lista.appendChild(nodo)
    }
}

function eliminarCategoria() {
    let optionElegido = get("selectCategoriaBorrar").selectedIndex
    if (!sistema.verificarSiCatTieneExpGuardadas(optionElegido)) {
        sistema.eliminarCat(optionElegido)
        actualizar()
        if (!sistema.verificarSiCatTieneElementos()) {
            deshabilitarBoton("botonEliminarCategoria")
            deshabilitarBoton("botonAgregarExperiencia")
        }
        alert("Borrada la categoría!")
    } else {
        alert("No se puede borrar la categoía pues hay experiencias de ella")
    }

}

function eliminarExperiencia() {
    let optionElegido = get("selectExperienciaBorrar").selectedIndex
    if (!sistema.verificarSiExpTieneCompras(optionElegido)) {
        sistema.eliminarExp(optionElegido)
        actualizar()
        alert("Borrada la experiencia!")
    } else {
        alert("No se puede borrar la experiencia pues hay compras de ella")
    }
}

function habilitarBoton(id) {
    get(id).disabled = false
}

function deshabilitarBoton(id) {
    get(id).disabled = true
}

function mostrarExpEnCompras(nombreExperiencia) {
    get("spanSinDatos").innerHTML = nombreExperiencia
}

function agregarCompra() {
    if (get("formulario1").reportValidity()) {
        let experiencia = sistema.buscarExp(get("spanSinDatos").innerHTML)
        let nombreComprador = get("inputNombreComprador").value
        let mailComprador = get("inputMail").value
        let fechaActual = devolverFecha()
        let horaActual = devolverHora()
        let compra = new Compra(experiencia, nombreComprador, mailComprador, fechaActual, horaActual)
        sistema.agregarCom(compra)
        alert("compra registrada!")
        get("formulario1").reset()
        actualizar()
    }
}

function devolverFecha() {
    let res = ""
    let d = new Date()
    let dia = d.getDate()
    let mes = d.getMonth() + 1
    let año = d.getFullYear()
    res = dia + "/" + mes + "/" + año
    return res
}

function devolverHora() {
    let res = ""
    let d = new Date
    let hora = d.getHours()
    let minutos = d.getMinutes()
    if (minutos < 10) {
        minutos = "0" + minutos
    }
    res = hora + ":" + minutos
    return res
}
