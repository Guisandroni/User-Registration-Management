// // Streams no node

// servem para fazer um requisição de dados de forma continua
// Suponha que o tamanho dos dados seja 1g 
// não é necessario baixar todo o conteudo e entao fazer a requisição 
// é feita aos poucos enquanto baixar

// Types Stream
// Readable - Leitura  => entrada e saida
// Writable - Escrita


import {Readable,Writable, Transform} from 'node:stream'

//Stream  leitura
class oneStream extends Readable{
    index = 1;

    _read(){

        const i = this.index++
//cd1s
       setTimeout(()=>{
        if (i> 30){
            this.push(null)
            }
                else {
                        const buf = Buffer.from(String(i))
    
                        this.push(buf)
                }
       } ,1000)
    }

}


// Stream Escrita
class oneStreamMult extends Writable{
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString()*10))
        callback()
    }
}

//Stream transformação de dados
class inverseNumberStream extends Transform{
    _transform(chunk, encoding, callback){
        const tranformed = (Number(chunk.toString()) * -1)

        callback(null,Buffer.from(String(tranformed)))
    }
} 

// class negativeNumbers extends Writable{
//     _write(chunk, encoding, callback){
//         console.log(Number(chunk.toString()* 2))

//         callback()
//     }
// }
new oneStream()
.pipe(new inverseNumberStream())
.pipe(new oneStreamMult())
