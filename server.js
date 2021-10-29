const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require("cors");
const coursesRoutes=require('./Routes/coursesRoutes');
const doctorsRoutes=require('./Routes/doctorsRoutes');
const registrationRoutes=require('./Routes/registrationRoutes');
const distributionRoutes=require('./Routes/distributionsRoutes');
const Admin=require('./Modules/Admins');
const jwt=require('jsonwebtoken');
const bcrypt =require('bcrypt') ;
const {requireAuth}=require("./course-distribution/src/utilities/authMiddleware");
const cookieparser =require("cookie-parser");


const dburl= "mongodb+srv://mydb:93928@cluster0.g0he0.mongodb.net/Course-distribution?retryWrites=true&w=majority";
mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(res=>{
    app.listen(4000);
    console.log('connected')
    
})
.catch((err)=>{
    console.log(err);
})

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
app.use('/registrations',registrationRoutes);
app.use('/courses',coursesRoutes);
app.use('/doctors',doctorsRoutes);
app.use('/distributions',distributionRoutes);

app.post('/',async (req,res)=>{
    const {Email,password}=req.body
    
    const user =await Admin.findOne({Email});
    console.log(user);
    
   
    if(!user){
        return res.status(404).send(`No user exists with email ${Email}`);
    }

        const passwordMatch=await bcrypt.compare(password,user.password)
 
    if(passwordMatch){
        const token=  jwt.sign({userId:user._id},"XYZABC3366",{expiresIn:'7d'})

        res.status(200).json(token)
    } 
    else{
        res.status(401).send("password do not matches")
    }
})

app.post('/signup',async(req,res)=>{
    const {Email,password,Fname,Mname,Lname,phone_Number,File_Number,Rank,Contract_Type}=req.body
    //1) check if user already exist
    const user =await Admin.findOne({Email});
    if(user){
        return res.status(422).send(`User already exists with email ${Email}`);
    }

    //2)if not hash their password
    const hash=await bcrypt.hash(password,10);
    //3))create user
    const newuser=await new Admin({
        Fname,
        Email,
        phone_Number,
        File_Number,
        Lname,
        Mname,
        Rank,
        Contract_Type,
        Email,
        password:hash
    }).save()

    //4)create token for the new user
    const token =jwt.sign({userId:newuser._id},"XYZABC3366",{
        expiresIn:'7d'
    })
    res.status(201).json(token)
    //5)send back token
})


