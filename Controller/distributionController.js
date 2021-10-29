const Distributions = require('../Modules/Distributions');
const Registration = require('../Modules/Registrations');
const Courses = require('../Modules/Courses');
const Doctors = require('../Modules/Doctors');
const nodemailer = require('nodemailer');

const Distributions_Index_Get = async (req, res) => {
  const Ds = await Distributions.find();
  res.json(Ds);

}

const Distributions_Create_Post = async (req, res) => {
  const { Name, Registrations, Date, Version } = req.body;

  console.log(Name, Registrations, Version);
  const R = await new Distributions({
    Name,
    Registrations,
    Version,
    Date,
  })

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'imad.alhaj.saad@gmail.com',
      pass: 'organizationinfo'
    }
  });

var message="";

  Registrations.map(i=>{
      message+= "Course code : "+i.Course_Code + 
      "\nDr. File number : "+i.DFile_number+" \n \n"+
      "Faculity year : "+i.Facility_year+" \n \n"+
      "English section : " +i.EN_Section+"\n \n"+
      "Frensh sections :"+i.FR_Section+" \n \n"+
      "Lab hours :"+i.Lab_hours+" \n\n"+
      "Exercise hours :"+i.Exercise_hours+"\n \n "+
      "Course hours :"+i.Course_hours+" \n \n"+
      "section ID :"+i.Section_ID+"\n \n"
      +"--------------------------------------- \n \n"
  });

  if (Version) {

    Registrations.map(async (i)=>{
      Doctors.find({File_Number:i.DFile_number})
      .then(dr=>{
        console.log(dr[0].Email);
        console.log(dr);
        const mailoptions = {
          from: 'imad.alhaj.saad@gmail.com',
           to: dr[0].Email,
            subject: "New Course Distribution ",
             text: "Distribution : \n"+message,
           }
           transporter.sendMail(mailoptions, (err, data) => {
            if (err) {
              console.log(err);
            }
          })
      })
      .catch(err=>{
        console.log(err);
      })
     
    });

  }

  const save = await R.save();
  res.send("done")

}

const Distributions_Details_Get = async (req, res) => {
  const id = req.params.id;
  const Dist = await Distributions.findById(id);
  const Crs=await Courses.find();
  const Drs=await Doctors.find();
  
  
  res.json({Dist,Crs,Drs});

}

const Distributions_Create_Get = async (req, res) => {
  const Reg = await Registration.find();
  const Doc = await Doctors.find();
  const Crs = await Courses.find();
  res.json({Reg,Doc,Crs});
}

const Distributions_Index_Delete = async (req, res) => {
  const id = req.params.id;
  const course = await Distributions.findByIdAndDelete(id);
}


const Distribution_Update_Put = async (req, res) => {
  const _id = req.params.id;
  const { Name, Registrations, Date, Version } = req.body;

  const Ds = await Distributions.findOneAndUpdate({ _id }, {
    Name, Registrations, Date, Version
  });
  console.log(Ds);
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'imad.alhaj.saad@gmail.com',
      pass: 'organizationinfo'
    }
  });


var message="";

  Registrations.map(i=>{
      message+= "Course code : "+i.Course_Code + 
      "\nDr. File number : "+i.DFile_number+" \n \n"+
      "Facility year : "+i.Facility_year+" \n \n"+
      "English section : " +i.EN_Section+"\n \n"+
      "Frensh sections :"+i.FR_Section+" \n \n"+
      "Lab hours :"+i.Lab_hours+" \n\n"+
      "Exercise hours :"+i.Exercise_hours+"\n \n "+
      "Course hours :"+i.Course_hours+" \n \n"+
      "section ID :"+i.Section_ID+"\n \n"
      +"--------------------------------------- \n \n"
  });

  if (Version) {

    Registrations.map(async (i)=>{
      Doctors.find({File_Number:i.DFile_number})
      .then(dr=>{
        console.log(dr[0].Email);
        console.log(dr);
        const mailoptions = {
          from: 'imad.alhaj.saad@gmail.com',
           to: dr[0].Email,
            subject: "New Course Distribution ",
             text: "Distribution : \n"+message,
           }
           transporter.sendMail(mailoptions, (err, data) => {
            if (err) {
              console.log(err);
            }
          })
          res.send("done")
      })
      .catch(err=>{
        console.log(err);
        res.send("err");
      })
     
    });

  }
  res.send("done")
}

const Distribution_Update_Get = async (req, res) => {
  const id = req.params.id;
  const Reg = await Distributions.findById(id);
  console.log(Reg);
  res.json(Reg);
}


module.exports = {
  Distributions_Index_Get,
  Distributions_Create_Post,
  Distributions_Details_Get,
  Distributions_Create_Get,
  Distributions_Index_Delete,
  Distribution_Update_Put,
  Distribution_Update_Get
}