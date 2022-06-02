import { Router } from "express";
import { getActivos } from "../controller/activos.controller";
import { createNewActivo } from "../controller/activos.controller";

const router=Router();

router.get('/activos',getActivos);

//hago uso de cliente rest para pobrar este metodo.
router.post('/activos',createNewActivo);


export default router