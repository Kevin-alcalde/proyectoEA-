"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//configura el servidor
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = express_1.default();
const cors_1 = __importDefault(require("cors"));
//settings 
app.set('port', 3000);
//middleware procesan antes que lleguen a las rutas  procesan cada peticion que va llegando json
app.use(morgan_1.default('dev'));
app.use(express_1.default.json()); //use el formato json para comunicarse 
app.use(cors_1.default());
//rutas
app.use('/api/auth', auth_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map