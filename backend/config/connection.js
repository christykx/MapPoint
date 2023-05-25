const MongoClient=require('mongodb').MongoClient

const state={
    db:null
}



module.exports.connect=async function(done)
{

    
    const url='mongodb://localhost:27017'
    const dbname='mappoint'
    const client = new MongoClient("mongodb://localhost:27017");

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db('mappoint');
     state.db = db

    return db
 
}


module.exports.get=function(){
    return state.db
}