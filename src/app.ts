//configura el servidor
import morgan from 'morgan';
import express, { Application } from 'express';
import authroutes from './routes/auth'
const app: Application = express();
import cors from 'cors'


//settings 
app.set('port', 3000);


//middleware procesan antes que lleguen a las rutas  procesan cada peticion que va llegando json
app.use(morgan('dev'));
app.use(express.json()); //use el formato json para comunicarse 
app.use(cors()); //para que se comunique con otros servidores

//rutas
app.use('/api/auth',authroutes);



export default app;
