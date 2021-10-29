const Courses=require("../Modules/Courses");
const express=require('express');
const router=express.Router();
const courseController=require('../Controller/courseController')
const {requireAuth}=require("../course-distribution/src/utilities/authMiddleware");

router.get('/',requireAuth,courseController.Course_Index);
router.post('/create',courseController.Course_Create_Post);

router.put('/updateUnits',courseController.Course_Create_Update_Units);

router.delete('/:id',courseController.Course_Index_Delete);

router.get('/details/:id',courseController.Course_Get_Details);

router.put('/update/:id',courseController.Course_Update_Put);
router.put('/update-archived/:id',courseController.Course_UpdateArchived_Put);

router.get('/update/:id',courseController.Course_Update_Get);

module.exports=router;