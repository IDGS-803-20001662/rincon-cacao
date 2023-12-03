const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")

app.use(cors());
app.use(express.json());

// ----------------------------------------------------------------------------

const db = mysql.createConnection({
    hos: "localhost",
    user: "root",
    password: "",
    //password: "CITLALLI123",
    database: "rincon_cacao"
});

// ----------------------------------------------------------------------------

// GUARDAR USUARIOS
app.post("/usuarios/create", (req, res) => {
    const nombre = req.body.nombre;
    const apellido_paterno = req.body.apellido_paterno;
    const apellido_materno = req.body.apellido_materno;
    const domicilio = req.body.domicilio;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const telefono = req.body.telefono;
    const email = req.body.email;
    const contrasennia = req.body.contrasennia;
    const rfc = req.body.rfc;

    db.query('INSERT INTO usuario (nombre, apellido_paterno, apellido_materno, domicilio, fecha_nacimiento, telefono, email, contrasennia, rfc) VALUES (?,?,?,?,?,?,?,?,?)', 
    [nombre, apellido_paterno, apellido_materno, domicilio,fecha_nacimiento, telefono, email, contrasennia, rfc],
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("¡Usuario registrado con éxito!");
        }
    });
});

// LISTAR USUARIOS
app.get("/usuarios", (req, res) => {

    db.query('SELECT * FROM usuario',
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    });
});

// EDITAR USUARIOS
app.put("/usuarios/edit", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const apellido_paterno = req.body.apellido_paterno;
    const apellido_materno = req.body.apellido_materno;
    const domicilio = req.body.domicilio;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const telefono = req.body.telefono;
    const email = req.body.email;
    const contrasennia = req.body.contrasennia;
    const rfc = req.body.rfc;

    db.query('UPDATE usuario SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, domicilio = ?, fecha_nacimiento = ?, telefono = ?, email = ?, contrasennia = ?, rfc = ? WHERE id = ?', 
    [nombre, apellido_paterno, apellido_materno, domicilio,fecha_nacimiento, telefono, email, contrasennia, rfc, id],
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("¡Usuario actualizado con éxito!");
        }
    });
});


// ELIMINAR USUARIOS
app.put("/usuarios/delete", (req, res) => {
    const id = req.body.id;

    db.query('UPDATE usuario SET estatus = 0 WHERE id = ?', 
    [id],
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("¡Usuario eliminado con éxito!");
        }
    });
});

// BUSCAR USUARIO POR ID
app.get("/usuario/:id", (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM usuario WHERE id = ? ',
    [id],
    (err, result) => {
        if (err)
        {
            console.log(err);
            req.status(500).send("Error al buscar el usuario")
        }
        else
        {
            if (result.length > 0)
            {
                res.send(result);
            }
            else
            {
                res.status(404).send("Usuario no encontrado")
            }
        }
    });
});

// BUSCAR USUARIOS
app.get("/usuarios/search", (req, res) => {
    const filter = req.query.filter;

    if (!filter)
    {
        return res.status(400).send("Favor de proporcionar un parámetro de búsqueda")
    }

    const searchQuery = `SELECT * FROM usuario 
                        WHERE nombre LIKE ? 
                        OR apellido_paterno LIKE ? 
                        OR apellido_materno LIKE ? 
                        OR domicilio LIKE ? 
                        OR email LIKE ? 
                        OR rfc LIKE ?`;

    const searchTerm = `%${filter}%`;

    db.query(
        searchQuery,
        [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al procesar la búsqueda");
            } else {
                if (result.length > 0)
                {
                    res.send(result);
                }
                else
                {
                    res.status(404).send("Ningun usuario coincide con la búsqueda")
                }
            }
        }
    );
});


// ----------------------------------------------------------------------------

// GUARDAR PROVEEDORES
app.post("/proveedores/create", (req, res) => {
    const nombre = req.body.nombre;
    const apellido_paterno = req.body.apellido_paterno;
    const apellido_materno = req.body.apellido_materno;
    const direccion = req.body.direccion;
    const empresa = req.body.empresa;
    const telefono = req.body.telefono;
    const email = req.body.email;

    db.query('INSERT INTO proveedor (nombre, apellido_paterno, apellido_materno, direccion, empresa, telefono, email) VALUES (?,?,?,?,?,?,?)', 
    [nombre, apellido_paterno, apellido_materno, direccion, empresa, telefono, email],
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("¡Proveedor registrado con éxito!");
        }
    });
});

// LISTAR PROVEEDORES
app.get("/proveedores", (req, res) => {

    db.query('SELECT * FROM proveedor',
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    });
});

// EDITAR PROVEEDORES
app.put("/proveedores/edit", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const apellido_paterno = req.body.apellido_paterno;
    const apellido_materno = req.body.apellido_materno;
    const direccion = req.body.direccion;
    const empresa = req.body.empresa;
    const telefono = req.body.telefono;
    const email = req.body.email;

    db.query('UPDATE proveedor SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, direccion = ?, empresa = ?, telefono = ?, email = ? WHERE id = ?', 
    [nombre, apellido_paterno, apellido_materno, direccion, empresa, telefono, email, id],
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("¡Proveedor editado con éxito!");
        }
    });
});


// ELIMINAR PROVEEDORES
app.put("/proveedores/delete", (req, res) => {
    const id = req.body.id;

    db.query('UPDATE proveedor SET estatus = 0 WHERE id = ?', 
    [id],
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("¡Proveedor eliminado con éxito!");
        }
    });
});

// BUSCAR PROVEEDOR POR ID
app.get("/proveedor/:id", (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM proveedor WHERE id = ? ',
    [id],
    (err, result) => {
        if (err)
        {
            console.log(err);
            req.status(500).send("Error al buscar el proveedor")
        }
        else
        {
            if (result.length > 0)
            {
                res.send(result);
            }
            else
            {
                res.status(404).send("Proveedor no encontrado")
            }
        }
    });
});

// BUSCAR PROVEEDORES
app.get("/proveedores/search", (req, res) => {
    const filter = req.query.filter;

    if (!filter)
    {
        return res.status(400).send("Favor de proporcionar un parámetro de búsqueda")
    }

    const searchQuery = `SELECT * FROM proveedor
                        WHERE nombre LIKE ? 
                        OR apellido_paterno LIKE ? 
                        OR apellido_materno LIKE ? 
                        OR direccion LIKE ? 
                        OR email LIKE ? 
                        OR empresa LIKE ?`;

    const searchTerm = `%${filter}%`;

    db.query(
        searchQuery,
        [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al procesar la búsqueda");
            } else {
                if (result.length > 0)
                {
                    res.send(result);
                }
                else
                {
                    res.status(404).send("Ningun proveedor coincide con la búsqueda")
                }
            }
        }
    );
});


// ------------------------------------------------------------------------------

// GUARDAR MATERIAS PRIMAS
app.post("/materias/create", (req, res) => {
    const id_proveedor = req.body.id_proveedor;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const duracion = req.body.duracion;
    const stock = req.body.stock;
    const cantidad_minima = req.body.cantidad_minima;
    const medida = req.body.medida;
    const precio = req.body.precio;

    db.query('INSERT INTO materia_prima (id_proveedor, nombre, descripcion, duracion, stock, cantidad_minima, medida, precio) VALUES (?,?,?,?,?,?,?,?)', 
    [id_proveedor, nombre, descripcion, duracion, stock, cantidad_minima, medida, precio],
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("¡Materia prima registrada con éxito!");
        }
    });
});

// LISTAR MATERIAS PRIMAS
app.get("/materias", (req, res) => {

    db.query('SELECT * FROM materia_prima',
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    });
});

// EDITAR MATERIAS PRIMAS
app.put("/materias/edit", (req, res) => {
    const id = req.body.id;
    const id_proveedor = req.body.id_proveedor;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const duracion = req.body.duracion;
    const stock = req.body.stock;
    const cantidad_minima = req.body.cantidad_minima;
    const medida = req.body.medida;
    const precio = req.body.precio;

    db.query('UPDATE materia_prima SET id_proveedor = ?, nombre = ?, descripcion = ?, duracion = ?, stock = ?, cantidad_minima = ?, medida = ?, precio = ? WHERE id = ?', 
    [id_proveedor, nombre, descripcion, duracion, stock, cantidad_minima, medida, precio, id],
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("¡Materia prima editada con éxito!");
        }
    });
});

// ELIMINAR MATERIAS PRIMAS
app.put("/materias/delete", (req, res) => {
    const id = req.body.id;

    db.query('UPDATE materia_prima SET estatus = 0 WHERE id = ?', 
    [id],
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("¡Materia prima eliminada con éxito!");
        }
    });
});

// BUSCAR MATERIAS POR ID
app.get("/materia/:id", (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM materia_prima WHERE id = ? ',
    [id],
    (err, result) => {
        if (err)
        {
            console.log(err);
            req.status(500).send("Error al buscar la materia prima")
        }
        else
        {
            if (result.length > 0)
            {
                res.send(result);
            }
            else
            {
                res.status(404).send("Materia prima no encontrada")
            }
        }
    });
});

// BUSCAR MATERIAS
app.get("/materias/search", (req, res) => {
    const filter = req.query.filter;

    if (!filter)
    {
        return res.status(400).send("Favor de proporcionar un parámetro de búsqueda")
    }

    const searchQuery = `SELECT * FROM materia_prima
                        WHERE nombre LIKE ? 
                        OR descripcion LIKE ? 
                        OR medida LIKE ? 
                        OR precio LIKE ?`;

    const searchTerm = `%${filter}%`;

    db.query(
        searchQuery,
        [searchTerm, searchTerm, searchTerm, searchTerm],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al procesar la búsqueda");
            } else {
                if (result.length > 0)
                {
                    res.send(result);
                }
                else
                {
                    res.status(404).send("Ninguna materia prima coincide con la búsqueda")
                }
            }
        }
    );
});

// BUSCAR MATERIAS POR PROVEEDOR
app.get("/materias/proveedor/:id", (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM materia_prima WHERE id_proveedor = ? ',
    [id],
    (err, result) => {
        if (err)
        {
            console.log(err);
            req.status(500).send("Error al buscar la materia prima")
        }
        else
        {
            if (result.length > 0)
            {
                res.send(result);
            }
            else
            {
                res.status(404).send("Materias primas no encontrada")
            }
        }
    });
});

// ---------------------------------------------------------------------------

// GUARDAR COMPRA
app.post("/compras/create", (req, res) => {
    const fecha_actual = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato YYYY-MM-DD HH:MM:SS

    const fecha = fecha_actual;
    const id_usuario = req.body.id_usuario;
    const total = req.body.total;

    db.query('INSERT INTO compra (fecha, id_usuario, total) VALUES (?,?,?)', 
    [fecha, id_usuario, total],
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("¡Compra registrada con éxito!");
        }
    });
});

// LISTAR COMPRAS
app.get("/compras", (req, res) => {

    db.query('SELECT * FROM compra',
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    });
});

// EDITAR COMPRA
app.put("/compras/edit", (req, res) => {

    const id = req.body.id;
    const fecha = req.body.fecha;
    const id_usuario = req.body.id_usuario;
    const total = req.body.total;

    db.query('UPDATE compra SET fecha = ?, id_usuario = ?, total = ? WHERE id = ?', 
    [fecha, id_usuario, total, id],
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("¡Compra editada con éxito!");
        }
    });
});

// ELIMINAR COMPRA
app.put("/compras/delete", (req, res) => {

    const id = req.body.id;

    db.query('UPDATE compra SET estatus = 0 WHERE id = ?', 
    [id],
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("¡Compra eliminada con éxito!");
        }
    });
});

// BUSCAR COMPRAS POR ID
app.get("/compra/:id", (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM compra WHERE id = ? ',
    [id],
    (err, result) => {
        if (err)
        {
            console.log(err);
            req.status(500).send("Error al buscar la compra")
        }
        else
        {
            if (result.length > 0)
            {
                res.send(result);
            }
            else
            {
                res.status(404).send("Compra no encontrada")
            }
        }
    });
});

// BUSCAR COMPRAS POR EMPLEADO
app.get("/compras/usuario/:id", (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM compra WHERE id_usuario = ? ',
    [id],
    (err, result) => {
        if (err)
        {
            console.log(err);
            req.status(500).send("Error al buscar las compras")
        }
        else
        {
            if (result.length > 0)
            {
                res.send(result);
            }
            else
            {
                res.status(404).send("Compras no encontradas")
            }
        }
    });
});

// ------------------------------------------------------------------------------------

// GUARDAR DETALLES DE COMPRAS
app.post("/detalles/create", (req, res) => {
    const id_compra = req.body.id_compra;
    const id_materia_prima = req.body.id_materia_prima;
    const id_proveedor = req.body.id_proveedor;
    const medida = req.body.medida;
    const cantidad = req.body.cantidad;
    const subtotal = req.body.subtotal;

    db.query('INSERT INTO detalle_compra (id_compra, id_materia_prima, id_proveedor, medida, cantidad, subtotal) VALUES (?,?,?,?,?,?)', 
    [id_compra, id_materia_prima, id_proveedor, medida, cantidad, subtotal],
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("¡Detalle de compra registrado con éxito!");
        }
    });
});

// LISTAR DETALLES COMPRA
app.get("/detalles", (req, res) => {

    db.query('SELECT * FROM detalle_compra',
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    });
});

// EDITAR DETALLES DE COMPRAS
app.put("/detalles/edit", (req, res) => {
    const id = req.body.id;
    const id_compra = req.body.id_compra;
    const id_materia_prima = req.body.id_materia_prima;
    const id_proveedor = req.body.id_proveedor;
    const medida = req.body.medida;
    const cantidad = req.body.cantidad;
    const subtotal = req.body.subtotal;

    db.query('UPDATE detalle_compra SET id_compra = ?, id_materia_prima = ?, id_proveedor = ?, medida = ?, cantidad = ?, subtotal = ? WHERE id = ?', 
    [id_compra, id_materia_prima, id_proveedor, medida, cantidad, subtotal, id],
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("¡Detalle de compra editado con éxito!");
        }
    });
});

// ELIMINAR DETALLES DE COMPRAS
app.delete("/detalles/delete", (req, res) => {

    const id = req.body.id;

    db.query('DELETE FROM detalle_compra WHERE id = ?', 
    [id],
    (err, result) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("¡Detalle de compra eliminado con éxito!");
        }
    });
});

// BUSCAR DETALLES POR ID
app.get("/detalle/:id", (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM detalle_compra WHERE id = ? ',
    [id],
    (err, result) => {
        if (err)
        {
            console.log(err);
            req.status(500).send("Error al buscar el detalle de compra")
        }
        else
        {
            if (result.length > 0)
            {
                res.send(result);
            }
            else
            {
                res.status(404).send("Detalle de compra no encontrado")
            }
        }
    });
});

// BUSCAR DETALLES POR COMPRA
app.get("/detalles/compra/:id", (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM detalle_compra WHERE id_compra = ? ',
    [id],
    (err, result) => {
        if (err)
        {
            console.log(err);
            req.status(500).send("Error al buscar los detalles por compra")
        }
        else
        {
            if (result.length > 0)
            {
                res.send(result);
            }
            else
            {
                res.status(404).send("Detalles no encontrados")
            }
        }
    });
});

// ----------------------------------------------------------------------------------

app.listen(3001,() => {
    console.log("Servidor corriendo en el puerto 3001")
});