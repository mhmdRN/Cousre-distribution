const express=require('express');
const router=express.Router();
const registrationController=require('../Controller/registrationController');
const {requireAuth}=require("../course-distribution/src/utilities/authMiddleware");

router.get('/',requireAuth,registrationController.Registration_Index_Get);
router.post('/create',registrationController.Registration_Create_Post);
router.post('/createcopy',registrationController.Registration_CreateCopy_Post);
router.put('/update/:id',registrationController.Registration_Update_Put);
router.get('/update/:id',registrationController.Registration_Update_Get);
router.delete('/:id',registrationController.Registartion_Index_Delete);

 module.exports=router;