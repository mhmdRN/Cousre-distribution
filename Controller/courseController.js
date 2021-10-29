const Courses=require("../Modules/Courses");
const Registrationss=require("../Modules/Registrations");
const Distributions=require("../Modules/Distributions");
const Doctors=require("../Modules/Doctors");
const Course_Index=async (req,res)=>{
    const Crs=await Courses.find();
    res.json(Crs);
}

const Course_Create_Post=async (req,res)=>{
    const {Course_code,course_name,
        Total_Hours,Description,
        credits,available,
        Semester_Nb,Course_Type,
        Course_hours,Lab_hours,
        Exercise_hours}=req.body;

    const data=new Courses({
        Course_code,course_name,
      Total_Hours,Description,
      credits,available,
      Semester_Nb,Course_Type,
      Course_hours,Lab_hours,
      Exercise_hours
    });

     data.save()
     .then(()=>{
        res.send('done !');
     })
     .catch(err=>{
         res.status(404).send();
     })
    
}

const Course_Create_Update_Units=async (req,res)=>{
    const {_id,Course_code,course_name,
        Total_Hours,Description,
        credits,available,
        Semester_Nb,Course_Type,
        Course_hours,Lab_hours,
        Exercise_hours,archived,LabUnits,
        CourseUnits,ExerciseUnits}=req.body.data;
        const Archived=archived;
    const request=await Courses.findOneAndUpdate({_id},{
        Course_code,course_name,
        Total_Hours,Description,
        credits,available,
        Semester_Nb,Course_Type,
        Course_hours,Lab_hours,
        Exercise_hours,
        LabUnits,CourseUnits,
        ExerciseUnits
    });
    console.log(request);
    res.send('done')
}



const Course_UpdateArchived_Put=async (req,res)=>{
    const _id=req.params.id;
    const {Course_code,course_name,
        Total_Hours,Description,
        credits,available,
        Semester_Nb,Course_Type,
        Course_hours,Lab_hours,
        Exercise_hours,archived}=req.body;
    console.log(archived)
    const Archived=archived;
    const course=await Courses.findOneAndUpdate({_id},{
        Course_code,course_name,
        Total_Hours,Description,
        credits,available,
        Semester_Nb,Course_Type,
        Course_hours,Lab_hours,
        Exercise_hours,
    Archived
    });
   
    res.json(course);
}

const Course_Get_Details=async (req,res)=>{
    const id =req.params.id;
    const course=await Courses.findById(id);
    const Doc=await Doctors.find();
    const Reg=await Registrationss.find({Course_Code:course.Course_code});
    res.json({course,Reg,Doc});
}

const Course_Update_Put=async (req,res)=>{
    const _id=req.params.id;
    const {Course_code,course_name,
        Total_Hours,Description,
        credits,available,
        Semester_Nb,Course_Type,
        Course_hours,
        Lab_hours,Exercise_hours}=req.body;

    const course=await Courses.findOneAndUpdate({_id},{
        Course_code,course_name,
        Total_Hours,Description,
        credits,available,
        Semester_Nb,Course_Type,
        Course_hours,Lab_hours,
        Exercise_hours
    });
    console.log(course);
res.send('Done!!');
}

const Course_Update_Get=async (req,res)=>{
    const id=req.params.id;
    const course=await Courses.findById(id);
    res.json(course);
}

const Course_Index_Delete=async (req,res)=>{
    const id=req.params.id;
    const course=await Courses.findByIdAndDelete(id);
    const Reg=await Registrationss.find({ Course_Code:course.Course_code});
    const allDist=await Distributions.find();
    
    Reg.map(async (d)=>{
        const del=await Registrationss.findByIdAndDelete(d._id);
    });
    allDist.map(async (i)=>{
        if(i.Registrations[0].Course_Code===course.Course_code){
            console.log("found")
            const del=await Distributions.findByIdAndDelete(i._id);
        }
    })
    res.send("done");
}


module.exports={
    Course_Index,
    Course_Create_Post,
    Course_Update_Get,
    Course_Get_Details,
    Course_Update_Put,
    Course_Index_Delete,
    Course_UpdateArchived_Put,
    Course_Create_Update_Units
}