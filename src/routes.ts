import { Router } from "express";
import tarefaController from "./tarefas/tarefasController";

const routes = Router()

routes.post('/Tarefas', tarefaController.create)

routes.get('/Tarefas', tarefaController.findAll)

routes.get('/Tarefas/:id', tarefaController.findById)

routes.put('/Tarefas/:id', tarefaController.update)

routes.delete('/Tarefas/:id', tarefaController.delete)

export { routes }