import http from 'node:http'

import {Transform} from 'node:stream'

class inverseNumberStream extends Transform{
    _transform(chunk, encoding, callback){
        const tranformed = (Number(chunk.toString()) * -1)
    
        console.log(tranformed)
        callback(null,Buffer.from(String(tranformed)))
    }
} 



const server = http.createServer(async (req,res)=>{
//Req => è um stream de leitura

//Res => é uma stream de escrita

        // arrays para receber conteudo
        const buffers= []

        for await( const chunk of req){
            buffers.push(chunk)
        }

        const fullContent = Buffer.concat(buffers).toString()

        console.log(fullContent)

        return res.end(fullContent)
        // return req
        // .pipe(new inverseNumberStream())
        // .pipe( res)
})


server.listen(3001)