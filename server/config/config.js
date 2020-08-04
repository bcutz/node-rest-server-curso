//=============
//puerto
//=============
process.env.PORT = process.env.PORT || 3001;

//=============
//Enterno
//=============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//=============
// Base de datos
//=============
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://bcutz:ZumnVzmOOQYKigoR@cluster0.w5uyy.mongodb.net/cafe';
}

process.env.URLDB = urlDB