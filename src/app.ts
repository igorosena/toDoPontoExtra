import express from 'express'
import mongoose from 'mongoose'
import {routes} from './routes'

class App {
    public express: express.Application

    constructor(){
        this.express = express()
        this.middleware()
        this.database()
        this.routes()
    }

    public middleware() {
        this.express.use(express.json())
    }

    public async database() {
      
        try {
            await mongoose.connect('mongodb://localhost:27017/CrudHtml')
            console.log("Conectado ao MongoDB database")

        } catch (error) {
            console.error("Erro ao conectar ao database:", error)
        }
    }

    public routes(){
        this.express.use(routes)
    }

}

export default new App().express