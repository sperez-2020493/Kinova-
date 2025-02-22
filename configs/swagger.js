import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Opinion System API",
            version: "1.0.0",
            description: "API para un sistema de gestión de opiniones",
            contact:{
                name: "Samuel Perez",
                email: "sperez-2020493@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/opinionSystem/v1"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis:[
        "./src/auth/auth.routers.js",
        "./src/user/user.routes.js",
        "./src/post/post.router.js",
        "./src/comment/comment.router.js",
        "./src/category/category.routes.js"

    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}
