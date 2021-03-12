
import dotenv from 'dotenv';

dotenv.config();

//console.log(process.env.TESTING); //VARIABLES DE ENTORNO, estaran en mi ordenador

import app from './app';
import './database'; //aqui no hay from porque no importo nada
function main (){

    app.listen(app.get('port')); //ejecutamos servidor de express
    console.log('mi primer servidor :', app.get('port'))

}
main();
