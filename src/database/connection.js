import sql from 'mssql'

const dbSettings= {
    user:'SanFernado',
    password:'fer123',
    server:'localhost',
    database:'Activos',
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
}

async function getConnection(){
const pool=await sql.connect(dbSettings);
const result= await pool.request().query('SELECT * FROM Ubicacion');
console.log(result);
}

getConnection();