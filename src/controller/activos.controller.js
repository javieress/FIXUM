import { getConnection } from "../database/connection";

/** Query tabla Activoo */
export const getActivos=async(req,res) =>{
  const pool=await getConnection();
  const result=await pool.request().query('SELECT * FROM Activoo');
  console.log(result);
  res.json(result.recordset);
}

export const createNewActivo=(req,res)=>{
  res.json("Crear activo")
}

