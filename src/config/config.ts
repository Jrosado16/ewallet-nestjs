//================
// PORT
//================

export let PORT = process.env.PORT || 3000;

//================
// ENTORNO
//================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//================
// DB
//================
export let URLDB : string;

if(process.env.NODE_ENV == 'dev') {
    URLDB = 'mongodb://localhost/ewallet'
}else{
    URLDB = process.env.URLDB
}
