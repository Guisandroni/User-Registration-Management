export async function json(req,res){

    const buffers= []

    for await( const chunk of req){
        buffers.push(chunk)
    }

    //  const fullContent = JSON.parse(Buffer.concat(buffers).toString())

    try{
        req.fullContent = JSON.parse(Buffer.concat(buffers).toString())
        
    }
    catch{
        req.fullContent= ''
    }
    //  console.log(fullContent.name)

    res.setHeader('content-type','application/json')

} 