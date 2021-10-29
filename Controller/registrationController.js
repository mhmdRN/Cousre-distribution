const Registration=require('../Modules/Registrations');
const Courses=require('../Modules/Courses');
const Doctors=require('../Modules/Doctors');

const router = require('../Routes/coursesRoutes');
const Registration_Index_Get=async (req,res)=>{
    const Cs=await Courses.find();
    const Ds=await Doctors.find();
    const courses=Cs.filter(i=>i.Archived===false && i.available===true); 
    const doctors=Ds.filter(i=>i.Archived===false); 
    res.json({courses,doctors,Cs});
}

const Registration_Create_Post=async(req,res)=>{
    console.log(req.body)
    const {Course_Code,DFile_number,Facility_year,Language,Lab,Exercise,Course,Lab_hours,Exercise_hours,Course_hours,Section_ID,Location}=req.body
    const doc=await new Registration({
        Course_Code,
        DFile_number,
        Facility_year,
        Language,
        Lab,
        Exercise,
        Course,
        Lab_hours,
        Exercise_hours,
        Course_hours,
        Section_ID,
        Location
    });
    doc.save()
    .then(()=>{
        res.send("done")
    })
    .catch(err=>{
        res.status(500).send();
    })
  
}

const Registration_Update_Put=async (req,res)=>{
    const _id=req.params.id;
    const {Course_Code,DFile_number,Facility_year,Language,Lab,Exercise,Course,Lab_hours,Exercise_hours,Course_hours,Section_ID,Location}=req.body;
    console.log(Course_Code);
     Registration.findOneAndUpdate({_id},{
        Course_Code,
        DFile_number,
        Facility_year,
        Language,
        Lab,
        Exercise,
        Course,
        Lab_hours,
        Exercise_hours,
        Course_hours,
        Section_ID,
        Location
    }).then(result=>{
        res.send('Done !!')
    })
    .catch(err=>{
        res.status(500).send("error");
    })
    
    
}

const Registration_Update_Get=async (req,res)=>{
    const id=req.params.id;
    const Reg=await Registration.findById(id);
    const allCrs=await Courses.find();
    res.json({Reg,allCrs});
}

const Registartion_Index_Delete=async (req,res)=>{
    const id=req.params.id;
    const Reg=await Registration.findByIdAndDelete(id);
    res.send("done")
}

const Registration_CreateCopy_Post=async(req,res)=>{
    const year=new Date().getFullYear();
    const temp=parseInt(year)+1;
    const myarray=req.body;
    myarray.map(async (i)=>{
    const {Course_Code,DFile_number,Facility_year,Language,Lab,Exercise,Course,Lab_hours,Exercise_hours,Course_hours,Section_ID,Location}=i
    const doc=await new Registration({
        Course_Code,
        DFile_number,
        Facility_year:year+"-"+temp,
        Language,
        Lab,
        Exercise,
        Course,
        Lab_hours,
        Exercise_hours,
        Course_hours,
        Section_ID,
        Location
    });
    const save= await doc.save();
   
    })
    res.send("done");
}

 module.exports={
     Registration_Index_Get,
     Registration_Create_Post,
     Registration_Update_Get,
     Registration_Update_Put,
     Registartion_Index_Delete,
     Registration_CreateCopy_Post
 }