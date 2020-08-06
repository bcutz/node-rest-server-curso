const express = require('express');
let { verificaToken, verificaAdmin_Role } = require('../middlawares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');
const usuario = require('../models/usuario');

//====================================================
//          Mostrar todas las Categorias.
// ===================================================

app.get('/categoria', verificaToken, async(req, res) => {
        //aparezcan todas las categorias
       Categoria.find({})
       //sort ordena los resgistros dependiendo del datos especifico
       .sort('descripcion')
       //populata nos trae los datos de un esquema espesifico de objectID
       .populate('usuario', 'nombre email')
       .exec((err, categoria) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria,
        });
    });
});

//====================================================
//          Mostrar Una Categoria por ID.
// ===================================================

app.get('/categoria/:id', verificaToken,(req, res) => {
            //Categoria.findbyID
            let id = req.params.id;
            Categoria.findById(id, (err, categoriaDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                if(!categoriaDB){
                    return res.status(500).json({
                        ok: false,
                        err: {
                            message: 'El ID no es correcto'
                        }
                    });
                }

                res.json({
                    ok: true,
                    categoria: categoriaDB
                });
            });
           
});

//====================================================
//          Crear Nueva Categoria.
// ===================================================

app.post('/categoria', verificaToken, (req, res) => {
    //regresa la nueva categoria
    
        let body = req.body;
        let categoria = new Categoria({
                descripcion: body.descripcion,
                usuario: req.usuario._id
        });

        
        categoria.save((err, categoriaDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

           
           if (!categoriaDB){
               return res.status(400).json({
                   ok: false,
                   err
               });
           }

           res.json({
               ok: true,
               categoria: categoriaDB
           });

        });


});

//====================================================
//          Actualizar Categoria.
// ===================================================

app.put('/categoria/:id', verificaToken, (req, res) => {
            let id = req.params.id;
            let body = req.body;
            let categoriaActualizada = {
                descripcion: body.descripcion
            };

            Categoria.findByIdAndUpdate(id, categoriaActualizada, { new: true, runValidators: true }, (err, categoriaDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
    
                // usuarioDB.password = null;
               if (!categoriaDB){
                   return res.status(400).json({
                       ok: false,
                       err
                   });
               }
    
               res.json({
                   ok: true,
                   categoria: categoriaDB
               });
            });

});

//====================================================
//          Borrar Categoria.
// ===================================================

app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
            let id = req.params.id;

            Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
    
                // usuarioDB.password = null;
               if (!categoriaBorrada){
                   return res.status(400).json({
                       ok: false,
                       err: {
                           message: 'El id no existe'
                       }
                   });
               }

               res.json({
                   ok: true,
                   message: 'Categoria Borrada'
               })
            });
});



module.exports = app;