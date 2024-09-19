import PouchDB from "pouchdb";

const database = new PouchDB('./backend/src/services/product-db');

database.info().then(info => {
    console.log("Banco de dados PouchDB está funcionando: ", info);
}).catch(error => {
    console.error("Erro ao conectar ao Banco: ", error);
})

export default database;