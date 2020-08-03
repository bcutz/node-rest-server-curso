require('./config/config');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

//Midelware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/usuario', (req, res) => {
    res.json('get usuarios');
});

app.post('/usuario', (req, res) => {
    let body = req.body;
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        })
    } else {
        res.json({
            persona: body
        });
    }
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;

    res.json({
        id
    });
});

app.delete('/usuario', (req, res) => {
    res.json('Delete usuarios');
});




app.listen(process.env.PORT, () => {
    console.log(`Puerto ${process.env.PORT} escuchando...`);
})