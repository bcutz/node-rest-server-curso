const express = require('express');

const { verificaToken } = require('../middlawares/autenticacion');

let app = express();
let Producto = require('../models/producto');


//====================================================
//          Mostrar todas los Productos.
// ===================================================
app.get('/productos', verificaToken, (req, res) => {
    //traer todos los productos
    //populate: usuario categoria
    //paginado
    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({})
    .skip(desde)
    .limit(10)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .exec((err, productosDB) => {
        if (err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            productos: productosDB
        })

    });

});

//====================================================
//          Mostrar Productos por Id.
// ===================================================

app.get('/productos/:id', verificaToken, (req, res) => {
    //populate: usuario categoria
    //paginado
    let id = req.params.id;

    Producto.findById(id)
            .populate('usuario', 'nombre email')
            .populate('categoria', 'descripcion')
            .exec((err, productoDB) => {
                if(err){
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
        
                if(!productoDB){
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'El ID que buscas es incorrecto'
                        }
                    })
                }
        
                res.json({
                    ok: true,
                    producto: productoDB
                })
            });  
});

//====================================================
//          Busqueda Eficiente.
// ===================================================
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {
    let termino = req.params.termino;
    //Crear una expresion regular para una busqueda, la i es para ser insensible 
    //a mayusculas y minusculas
    let regex = new RegExp(termino, 'i');

    Producto.find({nombre: regex})
        .populate('categoria', 'descripcion')
        .exec((err, producto) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto
            });
        });
});


//====================================================
//          Crear un Nuevo Producto.
// ===================================================

app.post('/productos', verificaToken, (req, res) => {
    //Grabar el usuario
    //grabar una categoria del listado 
    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDb) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.status(201).json({
                ok: true,
                producto: productoDb
            });
    });
});

//====================================================
//          Actualizar un Producto.
// ===================================================

app.put('/productos/:id', verificaToken, (req, res) => {
    //Grabar el usuaio
    //Grabar una categoria del listado
    let id = req.params.id;
    let body = req.body;

    let productoActualizado = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    };
    
    Producto.findByIdAndUpdate(id, productoActualizado, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });
    
});


//====================================================
//          Borrar un Producto.
// ===================================================

app.delete('/productos/:id', verificaToken, (req, res) => {
      //disponible pase a falso y no borrar
      let id = req.params.id;
      let ProductoBorrado = {
            disponible: false
      }

      Producto.findByIdAndUpdate(id, ProductoBorrado,  { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // usuarioDB.password = null;
       if (!productoDB){
           return res.status(400).json({
               ok: false,
               err
           });
       }

       res.json({
           ok: true,
           prodcuto: productoDB,
           message: 'Producto Borrado'
       });
      })
    
});







module.exports = app;