import {Readable} from 'node:stream'


class oneStream extends Readable{
    index = 1;

    _read(){

        const i = this.index++
//cd1s
       setTimeout(()=>{
        if (i> 10){
            this.push(null)
            }
                else {
                        const buf = Buffer.from(String(i))
    
                        this.push(buf)
                }
       } ,1000)
    }

}

fetch('http://localhost:3001',{
    method:'POST',
    body: new oneStream(),
    duplex: 'half'
   
})

.then( response =>{
    response.text().then(data=>{
        console.log(data)
    })
})

