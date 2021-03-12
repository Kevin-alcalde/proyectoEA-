"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signin = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    //guardando nuevo usuario
    const user = new User_1.default({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    // si crea un usuario, vamos a tomar su contraseña sin cifrar, va a ser cifrada y esa sería la nueva contraseña del usuario
    user.password = yield user.encryptPassword(user.password);
    const savedUser = yield user.save();
    //generamos tokens
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET || 'tokenTEST'); //usar doten para el secret key, para que podamos leer variables de entorno, si es un valor indefinido que coja tokentest, 
    res.header('token', token).json(savedUser); //le devolvemos al que consulta en fomra de cabecera el token y de cuerpo el usuario
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: req.body.email }); //voy a buscar un mail en mi base de datos y me de el usuario
    if (!user)
        return res.status(400).json("Hay errores en el logearse, o no estas registrado o te has equivocado");
    const correctPassword = yield user.validatePassword(req.body.password);
    if (!correctPassword)
        return res.status(404).json('invalid Password');
    //genero token
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'tokenTEST', { expiresIn: 60 * 60 * 24 }); //despues de un dia expira
    res.header('auth-token', token).json(user); //mandamos en el header el token 
    console.log(req.body);
    res.send('login'); //le ppintamos al que viene solo unos strings para verificar
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId, { password: 0 }); //enviamos todo menos el password
    if (!user)
        return res.status;
    res.json(user);
    return res.status(404).json('no hemos encontrado al usuario');
});
exports.profile = profile;
//# sourceMappingURL=auth.controller.js.map