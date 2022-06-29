import { Request,Response } from "express";
import ubic from "../models/ubicacion";


export const getUbicacion=async(Request,Response)=>{

    const ubicaciones=await ubic.findAll();

    Response.json(ubicaciones);

}