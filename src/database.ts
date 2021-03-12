//ya tenemos el servidor ahora la base de datos
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/test', {
useNewUrlParser: true, //requerimiento
useUnifiedTopology: true, //requerimiento
useCreateIndex: true

})

.then(db => console.log ('mi Primera Database Conectada'))
.catch(err => console.log(err));