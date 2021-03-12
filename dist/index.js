"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//console.log(process.env.TESTING); //VARIABLES DE ENTORNO, estaran en mi ordenador
const app_1 = __importDefault(require("./app"));
require("./database"); //aqui no hay from porque no importo nada
function main() {
    app_1.default.listen(app_1.default.get('port')); //ejecutamos servidor de express
    console.log('mi primer servidor :', app_1.default.get('port'));
}
main();
//# sourceMappingURL=index.js.map