"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routers.js"
import userRoutes from "../src/user/user.routes.js"
import postRouter from "../src/post/post.router.js"
import commentRouter from "../src/comment/comment.router.js"
import categoryRoutes from "../src/category/category.routes.js"
import apiLimiter from "../src/middlewares/validar-cant-peticiones.js"

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/opinionSystem/v1/auth", authRoutes)
    app.use("/opinionSystem/v1/user", userRoutes)
    app.use("/opinionSystem/v1/category", categoryRoutes)
    app.use("/opinionSystem/v1/post", postRouter)
    app.use("/opinionSystem/v1/comment", commentRouter)
}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initiServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}