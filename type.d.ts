//me va a servir para extender la interfaz  de request para que tenga un userId

declare namespace Express {
export interface Request {
    userId: string;
}

}