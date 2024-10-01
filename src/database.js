
// banco de dados em formato Json
// salva em objeto database

// insert...

// select...

import fs from 'node:fs/promises'


const databaseLocal = new URL ('../db.json', import.meta.url)

export class Database {

    database={}

   constructor() {
        fs.readFile(databaseLocal, 'utf8').then(data=>{
            this.database = JSON.parse(data)
        })
        .catch(()=>{
            this.dbBanco
        })
    }

    async dbBanco () {
        fs.writeFile('db.json',JSON.stringify(this.database,null,2))
    }

   

    Select(table, search){

        // const data = this.database[table] ?? []
        

        let data 
        // Verifica se a tabela existe no objeto database

        if ( this.database[table] !== null && this.database[table] !== undefined){
            data = this.database[table] // Se existir, atribui à data
        }
        else {
            data = []// Se não existir, atribui um array vazio
        }
        //existe uma tabela neste objeto ? se nao retorna array vazio ( evita mensagem de erro)
        return data

    }

    Insert (table, data){

        if ( Array.isArray(this.database[table])){
            // verifica se ja existe array na tabela, se sim tabela+novatabela
            this.database[table].push(data)
        }   else {
            //cria nova tabela caso nao exista
            this.database[table]=[data]
        }

        this.dbBanco()
        return data
    }

    Update ( table, id , data){
        const rowIndex = this.database[table].findIndex(row => row.id ===id)

        if (rowIndex > -1){
            this.database[table][rowIndex]= {id,...data}
            this.dbBanco()
        }
    }

    Delete ( table, id ){
        const rowIndex = this.database[table].findIndex(row => row.id ===id)

        if (rowIndex > -1){
            this.database[table].splice(rowIndex, 1)
            this.dbBanco()
        }
    }
}