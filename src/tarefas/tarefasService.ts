import tarefaModel from './tarefasSchema'
import { tarefaType } from './tarefasTypes'

class tarefaService {
   
  async create(tarefa: tarefaType){
     const createdTarefa = await tarefaModel.create(tarefa)
     return createdTarefa
  }
  
  async findAll() {
    const findedTarefas = await tarefaModel.find()
    return findedTarefas
  }

  async findById(id: string) {
    const findedTarefa = await tarefaModel.findById(id)
    return findedTarefa
  }

  async update(id: string, tarefa: tarefaType) {
    const updatedTarefa = await tarefaModel.findByIdAndUpdate(id, {
        tituloTarefa: tarefa.tituloTarefa,
       descricaoTarefa: tarefa.descricaoTarefa
    }, {new: true} )

    return updatedTarefa
  }

  async delete(id: string) {
    try {
          await tarefaModel.findByIdAndDelete(id)
          return "Tarefa removido com sucesso"
   
        } catch (error) {
        throw new Error(`Ocorreu um erro ao remover a tarefa: ${error}`)    
   } 
   


  }

}

export default new tarefaService()