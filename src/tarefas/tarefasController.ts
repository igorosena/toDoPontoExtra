import { Request, Response } from 'express'; 
import tarefaService from "./tarefasService";

class tarefaController {
   async create(req: Request, res: Response) {
        const createdTarefa = await tarefaService.create(req.body)
        res.status(201)
        return res.json(createdTarefa)
    }

 
    async findAll(req: Request, res: Response) {
        const findedTarefa = await tarefaService.findAll()
        res.status(200)
        return res.json(findedTarefa)
    }


    async findById(req: Request, res: Response) {
        const findedTarefa = await tarefaService.findById(req.params.id)
        res.status(200)
        return res.json(findedTarefa)
    }

    async update(req: Request, res: Response) {
        const updatedTarefa = await tarefaService.update(req.params.id, req.body)
        res.status(200)
        return res.json(updatedTarefa)
    }

    async delete(req: Request, res: Response) {
        const deleted = await tarefaService.delete(req.params.id)
        res.status(200)
        return res.json(deleted)
    }

}

export default new tarefaController()