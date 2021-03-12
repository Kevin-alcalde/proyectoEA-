"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//programita para ayudarme con las validaciones
//actuaciones cuando me llegue el token al servidor
const TokenValidation = (req, res, next) => {
    const token = req.header('token');
    if (!token)
        return res.status(401).json('no tienes token, denegado!');
    const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'token test'); //tenemos que verificar este token y le damos propiedades
    req.userId = payload._id;
    console.log(payload);
    next();
}; //middleware  una función que se ejecuta antes de alguna ruta.
exports.TokenValidation = TokenValidation;
//# sourceMappingURL=verifyToken.js.map