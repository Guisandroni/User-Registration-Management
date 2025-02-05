import http from 'node:http'
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

// Get => buscar informação 
// Post => criar um recurso
// Put => atualizar um recurso
// Patch => atualizar um informação especifica de um recurso
// Delet => deletar recurso


// Criação de variavel e salvar os dados enquanto roda a aplicação
// Uso de Stateful - Stateless

//Http status code

// const users = []


const server = http.createServer(async(req,res) =>{
    


 


  
        const { method, url } = req;
    
        // Adiciona os cabeçalhos CORS para todas as requisições
        res.setHeader('Access-Control-Allow-Origin', '*'); // Permite qualquer origem
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Permite os métodos especificados
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Permite os cabeçalhos especificados
    
        // Se a requisição for do tipo OPTIONS (preflight), responda diretamente
        if (method === 'OPTIONS') {
            res.writeHead(204); // No Content
            return res.end();
        }
        


    await json(req,res)

    const route = routes.find(route=>{
        return route.method === method && route.path.test(url)
    })  

        console.log(route)

    if (route){
        const routeParams = req.url.match(route.path)
        req.params = { ...routeParams.groups}
        return route.handler(req,res)
    }

    

    //Requisição http notFound
    return res.writeHead(404).end('Rota não existe')
    // sem uma rota especifica cai aqui
   
})


server.listen(2000)