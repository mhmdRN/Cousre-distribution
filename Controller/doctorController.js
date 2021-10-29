const Courses=require("../Modules/Courses");
const Doctors=require("../Modules/Doctors");
const Registrations=require("../Modules/Registrations");
const Distributions=require("../Modules/Distributions");

const Doctor_Index=async (req,res)=>{
    const Drs=await Doctors.find();
    res.json(Drs);
}

const Doctor_Create_Post=async (req,res)=>{
    const {Fname,Email,phone_Number,File_Number,Lname,Mname,Rank,Contract_Type}=req.body
    const data=new Doctors({
    Fname,
    Email,
    phone_Number,
    File_Number,
    Lname,
    Mname,
    Rank,
    Contract_Type
    })
     data.save()
     .then(re=>{
        res.send("done!!");
     })
     .catch(err=>{
         res.status(500).send();
     });

    
}

const Doctor_Get_Details=async (req,res)=>{
    const id =req.params.id;
    const Doctor=await Doctors.findById(id);
    const Reg=await Registrations.find({DFile_number:Doctor.File_Number});
   
    res.json({Doctor,Reg});
}

const Doctor_Update_Put=async (req,res)=>{
    const _id=req.params.id;
    const {Fname,Email,phone_Number,File_Number,Lname,Mname,Rank,Contract_Type}=req.body

    const doctor=await Doctors.findOneAndUpdate({_id},{
        Fname,
    Email,
    phone_Number,
    File_Number,
    Lname,
    Mname,
    Rank,
    Contract_Type
    });
    res.send('done!!');
}
const Doctor_UpdateArchived_Put=async (req,res)=>{
    const _id=req.params.id;
    const {Fname,Email,phone_Number,File_Number,Lname,Mname,Rank,Contract_Type,archived}=req.body;
    console.log(archived)
    const Archived=archived;
    const doctor=await Doctors.findOneAndUpdate({_id},{
        Fname,
    Email,
    phone_Number,
    File_Number,
    Lname,
    Mname,
    Rank,
    Contract_Type,
    Archived
    });
   
    res.json(doctor);
}

const Doctor_Update_Get=async (req,res)=>{
    const id=req.params.id;
    const doctor=await Doctors.findById(id);
    res.json(doctor);
}

const Doctor_Index_Delete=async (req,res)=>{
    const id=req.params.id;
  var Doctor=await Doctors.findById(id); 
  console.log(Doctor);
    const Reg=await Registrations.find({DFile_number:Doctor.File_Number});
    Reg.map(async (d)=>{
        const del=await Registrations.findByIdAndDelete(d._id);
    });
     Doctor=await Doctors.findByIdAndDelete(id);
     const allDist=await Distributions.find();
     console.log(allDist.Registrations);
     allDist.map(async (i)=>{
         if(i.Registrations[0].DFile_number===Doctor.File_Number){
             console.log("found")
             const del=await Distributions.findByIdAndDelete(i._id);
         }
     })
}


module.exports={
    Doctor_Index,
    Doctor_Create_Post,
    Doctor_Update_Get,
    Doctor_Get_Details,
    Doctor_Update_Put,
    Doctor_Index_Delete,
    Doctor_UpdateArchived_Put
}