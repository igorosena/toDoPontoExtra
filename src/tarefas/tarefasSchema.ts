import { Schema, model } from 'mongoose';

const tarefaSchema = new Schema({
    tituloTarefa: String, 
    descricaoTarefa: String
  }//, {
   // timestemps: true       <- Mostra quando foi criado
   //}
  
  );


  export default model('Tarefa', tarefaSchema)