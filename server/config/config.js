//================================
//puerto
//================================
process.env.PORT = process.env.PORT || 3001;

//================================
//Enterno
//================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//=================================
// Vencimiento del Token
//=================================
// 60 segundos
// 60 minutos
// 24 horas
//30 Dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//=================================
// Seed del Token
//=================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-dev';


//=================================
// Base de datos
//=================================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB


//=================================
// Google client ID
//=================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '216725640008-pf9ag9l7t2i6ddo11pimik2n8sd7047a.apps.googleusercontent.com'