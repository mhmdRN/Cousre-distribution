const express=require('express');
const router=express.Router();
const doctorController=require('../Controller/doctorController')
const {requireAuth}=require("../course-distribution/src/utilities/authMiddleware");

router.get('/',requireAuth,doctorController.Doctor_Index);
router.post('/create',doctorController.Doctor_Create_Post);
router.delete('/:id',doctorController.Doctor_Index_Delete);
router.get('/details/:id',doctorController.Doctor_Get_Details);
router.put('/update/:id',doctorController.Doctor_Update_Put);
router.put('/update-archived/:id',doctorController.Doctor_UpdateArchived_Put);
router.get('/update/:id',doctorController.Doctor_Update_Get);



module.exports=router;