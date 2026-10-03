/*Santiago Brito(Nro 287318)*/

class Sistema {
    constructor() {
        this.listaCat = []
        this.listaExp = []
        this.listaCom = []
    }
    agregarCat(elem) {
        this.listaCat.push(elem)
    }
    darTodosCat() {
        return this.listaCat
    }
    verRepetidoCat(nombreCat) {
        let bool = false
        for (let i = 0; i < this.listaCat.length && !bool; i++) {
            if (nombreCat.toUpperCase() === this.listaCat[i].nombre.toUpperCase()) {
                bool = true
            }
        }
        return bool
    }
    verificarSiCatTieneExpGuardadas(posicion) {
        if (posicion >= 0 && posicion < this.listaCat.length) {
            let categoria = this.listaCat[posicion]
            let bool = false
            for (let i = 0; i < this.listaExp.length && !bool; i++) {
                if (categoria === this.listaExp[i].categoria) {
                    bool = true
                }
            }
            return bool
        }
    }
    verificarSiCatTieneElementos() {
        let bool = true
        if (this.listaCat.length === 0) {
            bool = false
        }
        return bool
    }
    eliminarCat(posicion) {
        if (posicion >= 0 && posicion < this.listaCat.length) {
            this.listaCat.splice(posicion, 1)
        }
    }
    buscarCat(nombre) {
        let res = ""
        for (let elem of this.listaCat) {
            if (nombre === elem.nombre) {
                res = elem
            }
        }
        return res
    }
    agregarExp(experiencia) {
        this.listaExp.push(experiencia)
    }
    darTodosExp() {
        return this.listaExp
    }
    verRepetidoExp(tituloExp) {
        let bool = false
        for (let i = 0; i < this.listaExp.length && !bool; i++) {
            if (tituloExp.toUpperCase() === this.listaExp[i].titulo.toUpperCase()) {
                bool = true
            }
        }
        return bool
    }
    verificarSiExpTieneCompras(posicion) {
        if (posicion >= 0 && posicion < this.listaExp.length) {
            let experiencia = this.listaExp[posicion]
            let bool = false
            for (let i = 0; i < this.listaCom.length && !bool; i++) {
                if (experiencia === this.listaCom[i].experiencia) {
                    bool = true
                }
            }
            return bool
        }
    }
    experienciaMontoMasCaro() {
        let max = 0
        let monto = "Sin datos"
        if (this.listaExp.length > 0) {
            for (let elem of this.listaExp) {
                if (elem.precio > max) {
                    max = elem.precio
                }
            }
            monto = max
        }
        return monto
    }
    eliminarExp(posicion) {
        if (posicion >= 0 && posicion < this.listaExp.length) {
            this.listaExp.splice(posicion, 1)
        }
    }
    buscarExp(tituloExp) {
        let res = ""
        for (let elem of this.listaExp) {
            if (tituloExp === elem.titulo) {
                res = elem
            }
        }
        return res
    }
    verificarSiExpTieneElementos() {
        let bool = true
        if (this.listaExp.length === 0) {
            bool = false
        }
        return bool
    }
    darExpSegunCat(objCategoria) {
        let res = []
        for (let elem of this.listaExp) {
            if (elem.categoria === objCategoria) {
                res.push(elem)
            }
        }
        return res
    }
    darExpSegunCantidadPersonas(lista, cantidadPer) {
        let res = []
        if (cantidadPer === "todos") {
            res = lista
        } else {
            for (let elem of lista) {
                if (elem.cantidad === cantidadPer) {
                    res.push(elem)
                }
            }
        }
        return res
    }

    darExpSegunPrecio(lista, orden) {
        let res = lista.sort(function (a, b) {
            let res2 = 0
            if (orden === "creciente") {
                res2 = a.precio - b.precio
            } else {
                res2 = b.precio - a.precio
            }
            return res2
        })
        return res
    }
    darExpMasVecesComprada() {
        let res = []
        let max = -1
        for (let objExp of this.listaExp) {
            let cont = this.cantidadComprasDeUnaExp(objExp)
            if (cont > max) {
                max = cont
                res = [objExp]
            } else {
                if (cont === max) {
                    res.push(objExp)
                }
            }
        }
        return res
    }
    cantidadComprasDeUnaExp(objExp) {
        let cont = 0
        for (let objCom of this.listaCom) {
            if (objCom.experiencia === objExp) {
                cont++
            }
        }
        return cont
    }
    agregarCom(compra) {
        this.listaCom.push(compra)
    }
    darComprasSegunCategoria(objCategoria) {
        let res = []
        let listaDeExperienciasSegunCategoria = this.darExpSegunCat(objCategoria)
        for (let objExp of listaDeExperienciasSegunCategoria) {
            for (let objCom of this.listaCom) {
                if (objCom.experiencia === objExp) {
                    res.push(objCom)
                }
            }
        }
        return res
    }
}


class Categoria {
    constructor(nombre, detalles) {
        this.nombre = nombre
        this.detalles = detalles
    }
    toString() {
        return this.nombre + ""
    }
}

class Experiencia {
    constructor(titulo, descripcion, precio, cantidad, categoria) {
        this.titulo = titulo
        this.descripcion = descripcion
        this.precio = precio
        this.cantidad = cantidad
        this.categoria = categoria
    }
    toString() {
        return this.titulo
    }
}

class Compra {
    constructor(experiencia, nombreComprador, mailComprador, fecha, hora) {
        this.experiencia = experiencia
        this.nombreComprador = nombreComprador
        this.mailComprador = mailComprador
        this.fecha = fecha
        this.hora = hora
    }
    toString() {
        return "Nombre: " + this.nombreComprador + " Mail: " + this.mailComprador + " Fecha: " + this.fecha + " Hora: " + this.hora
    }
}