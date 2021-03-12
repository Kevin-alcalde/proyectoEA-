import {Schema, model, Document } from 'mongoose';
import { createEmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';
import bcrypt from 'bcryptjs'


export interface IUser extends Document {

    username: string;
    email: string;
    password: string, 

    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;

    };



const userScheama = new Schema({
   username: {
    type: String,
    required: true,
    min: 4,  //como minimo el valor de strings
    lowercase: true //minusculas

},
email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
},
password: {
    type: String,
    required: true 
},


}  ,




{
timestamps: true 
}    



);


userScheama.methods.encryptPassword = async (password: string): Promise<string>  => {   //aquí se usa flecha para ir mas rapido pero no puede invocar por ejemplo: this.email
   const salt = await bcrypt.genSalt(10);
  return  bcrypt.hash(password,salt);

}

userScheama.methods.validatePassword = async function(password): Promise<boolean> {

return await bcrypt.compare(password, (this as any).password);



};


export default model<IUser>('User', userScheama);