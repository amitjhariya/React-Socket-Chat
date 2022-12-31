import { Router } from "express";
import {getAll,create} from "../controllers/GroupsController.js";

const router=Router()

router.get('/',async(req,res)=>{
    await getAll(req,res)
})

router.post('/',async(req,res)=>{
    const data = await create(req,res)
    res.status(200).send({
        success:true,
        message:'Groups Created Successfuly',
        data
    })
})





export default router