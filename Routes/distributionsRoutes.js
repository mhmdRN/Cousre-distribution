const express=require('express');
const distributionController=require('../Controller/distributionController');
const {requireAuth}=require("../course-distribution/src/utilities/authMiddleware");
const router=express.Router();


router.get('/',requireAuth,distributionController.Distributions_Index_Get);
router.get('/create',distributionController.Distributions_Create_Get);
router.get('/details/:id',distributionController.Distributions_Details_Get);
router.post('/create',distributionController.Distributions_Create_Post);
router.delete('/:id',distributionController.Distributions_Index_Delete);

router.put('/update/:id',distributionController.Distribution_Update_Put);
router.get('/update/:id',distributionController.Distribution_Update_Get);

module.exports=router;
