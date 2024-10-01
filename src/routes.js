
import { Database } from './database.js';
import {randomUUID} from 'node:crypto'
import { buildRoutePatch } from './utils/build-route-path.js';



const database = new Database



export const routes = [

    {   
        method:'GET',
        path: buildRoutePatch ('/users'),
        handler: (req,res) =>{
            const users = database.Select('users')
            return res.end(JSON.stringify(users))
            // Definindo o tipo de exibição no get
            // So pode o tipo json
            // setHeader defini o cabeçalho do conteudo - "bonitinho"
            // Metadados
            
        }
    },

    {
        method:'POST',
        path: buildRoutePatch ('/users'),
        handler:(req,res)=>{
            
     const { name, apelido } = req.fullContent

     const user ={
           id: randomUUID(),
           name,
           apelido,
       }

       database.Insert('users',user)

       //requisição http created
       return res.writeHeader(201).end()
               //caminho para post
        }
    },

    {
        method:'DELETE',
        path: buildRoutePatch ('/users/:id'),
        handler:(req,res)=>{
           const {id} = req.params

           database.Delete('users',id)
           return res.writeHeader(204).end("Usuario deletado com sucesso")
        }
    },

    {
        method:'PUT',
        path: buildRoutePatch ('/users/:id'),
        handler:(req,res)=>{
           const {id} = req.params
           const {name, apelido} = req.fullContent

           database.Update('users',id,{
            name,
            apelido,
           })
           return res.writeHeader(204).end("Usuario Atualizado com sucesso")
        }
    }
]