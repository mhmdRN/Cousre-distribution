import React,{ useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {Container,Form,Input,Radio,Divider,Button} from "semantic-ui-react";
import axios from "axios";
import cookies from 'js-cookies';
var years=[];
const yearList=()=>{
  var i,j;
  var temp=[];
  const year=new Date().getFullYear();
  const x=parseInt(year);
  for( i=0,j=1;i<5,j<10;i++,j++){
    var myyear=(x+i)+"-"+(x+j);
    temp.push(myyear);
  }
 years=temp;
}
yearList();



const Create = () => {
  const params=new URLSearchParams(window.location.search);
  let code=params.get('code');
  let Ch=params.get('Ch');
  let Lh=params.get('Lh');
  let Eh=params.get('Eh');
  

  
  const REGISTRATION_INITIAL = {
    Course_Code: code,
    DFile_number: "",
    Facility_year: years[0],
    Language:"",
    Lab: false,
    Exercise: false,
    Course: false,
    Lab_hours: Lh,
    Exercise_hours: Eh,
    Course_hours: Ch,
    Section_ID: "",
    Location:"",
  };
  

  const [Reg, setReg] = useState(REGISTRATION_INITIAL);
  const [Loading, setLoading] = useState(false);
  const [Crs, setCrs] = useState([]);
  const [allCrs, setAllCrs] = useState([]);
  const [allReg, setAllReg] = useState([]);
  const [Drs, setDrs] = useState([]);
  const [maxCrs, setMaxCrs] = useState(Ch);
  const [maxLab, setMaxLab] = useState(Lh);
  const [maxExe, setMaxExe] = useState(Eh);
  const [DLab, setDLab] = useState(false);
  const [DExc, setDExc] = useState(false);
  const [DCrs, setDCrs] = useState(false);
 
 

  const handledisabled = () => {
    Reg.Course ? setDCrs(false) : setDCrs(true);
    Reg.Exercise ? setDExc(false) : setDExc(true);
    Reg.Lab ? setDLab(false) : setDLab(true);
  };

  const findmax=(code)=>{

    allCrs.map((i)=>{
      if(i.Course_code===code){
        setMaxCrs( i.Course_hours );
        setMaxLab( i.Lab_hours);
        setMaxExe( i.Exercise_hours);
      
      }
    })
  }

  useEffect(() => {
    setLoading(true);
   
    const token=cookies.getItem("token");
    const payload={headers:{Authorization:token}};
    axios.get("http://localhost:4000/registrations",payload)
    .then(data=>{
      setAllCrs(data.data.Cs);
      var crs = data.data.courses.map((d, i) => (
        {
        key: d._id,
        value: d.Course_code,
        text: d.Course_code +' ('+d.course_name+')',
      }));
      var drs = data.data.doctors.map((d, i) => ({
        key: d._id,
        text: d.File_Number +' ('+d.Fname+' '+d.Lname+')',
        value: d.File_Number,
      }));
      setCrs(crs);
      setDrs(drs);
      setLoading(false);
      handledisabled();
    })
    .catch(err=>{
      window.location.href="/error"
      
    })
    axios.get("http://localhost:4000/distributions/create")
    .then(res=>{
      setAllReg(res.data.Reg);
    })
    .catch(err=>{
      window.location.href="/error";
    })
    
   
  }, []);


  
  const handleInput = (e) => {
    const { name, value } = e.target;
            setReg((prev) => ({ ...prev, [name]: value }));    
  };

  const handlesubmit = () => {
    setLoading(true);
    axios.post("http://localhost:4000/registrations/create", Reg)
    .then(result=>{
      setLoading(false);
      window.location.href='/registrations';
    })
    .catch(err=>{
      setLoading(false);
      alert("All fields are required ")
    })

  };
  
 

  return (
    <Container>
      <Form loading={Loading} onSubmit={handlesubmit}>
        <Form.Group widths="equal">
          <Form.Field value={Reg.Course_Code} name="Course_Code">
            <label>Course Code</label>
            <select
              onChange={(e)=>{handleInput(e);findmax(e.target.value);}}
              name="Course_Code"
              value={Reg.Course_Code}
            >
                <option value="" selected disabled hidden>Select Course</option>
              {Crs.map((d, i) => {
                return <option value={d.value}>{d.text}</option>;
              })}
            </select>
          </Form.Field>
          <Form.Field name="DFile_number" value={Reg.DFile_number}>
            <label>DR. File Number</label>
            <select
              onChange={handleInput}
              name="DFile_number"
              value={Reg.DFile_number}
            >
                <option value="" selected disabled hidden>Select Doctor</option>
              {Drs.map((d, i) => {
                return <option value={d.value}>{d.text}</option>;
              })}
            </select>
          </Form.Field>
          <Form.Field value={Reg.Facility_year}>
            <label>Faculty Year</label>
               <select
              onChange={handleInput}
              name="Facility_year"
              value={Reg.Facility_year}
            >
              <option value="" selected disabled hidden>Select year</option>
              {
               years.map(i=>{
                 return (
                   <>
                   <option  value={i}>{i}</option>
                   </>
                 )
               })
              }
            </select>
          </Form.Field>
        </Form.Group>
        <Divider section />
      
        <Form.Group widths="equal" >
          <div style={{display:"flex",flexDirection:"column",width:"30%",padding:15}}>
           
          <label>Course <b>({maxCrs} hours)</b></label>
          <Form.Field value={Reg.Course}>
            <Radio
              name="Course"
              toggle
              onChange={(e)=>{handleInput(e)}}
              onClick={() => {
                Reg.Course = !Reg.Course;
                handledisabled();
              }}
              checked={Reg.Course}
             
            />
            </Form.Field>
           
          <Form.Field value={Reg.Course_hours}>
            <input 
             name="Course_hours"
             type="Number"
             placeholder="course hours"
              onChange={handleInput}
              disabled={DCrs}
            min="0"
            max={maxCrs}
            /> 
          </Form.Field>
          </div>

          <div style={{display:"flex",flexDirection:"column",width:"30%",padding:15}}>
          <Form.Field value={Reg.Exercise}>
            <label>Excercise <b>({maxExe} hours)</b></label>
            <Radio
              name="Exercise"
              toggle
              onChange={handleInput}
              onClick={() => {
                Reg.Exercise = !Reg.Exercise;
                handledisabled();
              }}
              checked={Reg.Exercise}
            />
          </Form.Field>
         
          <Form.Field value={Reg.Exercise_hours}>
            <input 
             name="Exercise_hours"
             type="Number"
             placeholder="exercise hours"
             onChange={handleInput}
             disabled={DExc }
             min="0"
             max={maxExe}
            />
          </Form.Field>
            </div>
            <div style={{display:"flex",flexDirection:"column",width:"30%",padding:15}}>
          <Form.Field value={Reg.Lab}>
            <label>Lab <b>({maxLab} hours)</b></label>
            <Radio
              name="Lab"
             
              toggle
              onChange={handleInput}
              onClick={() => {
                Reg.Lab = !Reg.Lab;
                handledisabled();
              }}
              checked={Reg.Lab}
            />
          </Form.Field>
          
          <Form.Field value={Reg.Lab_hours}>
            <input
              name="Lab_hours"
              type="Number"
              placeholder="lab hours"
              onChange={handleInput}
              disabled={DLab}
              min="0"
              max={maxLab}
            />
          </Form.Field>
          </div>
        </Form.Group>
        <Divider section />
        <Form.Group widths="equal">
          <Form.Field value={Reg.Section_ID}>
            <label>Section ID</label>
            <Input
              name="Section_ID"
              fluid
              placeholder="Section ID"
              onChange={handleInput}
            />
          </Form.Field>
          <Form.Field value={Reg.Location}>
            <label>Location</label>
            <Input
              name="Location"
              fluid
              placeholder="Location"
              onChange={handleInput}
            />
          </Form.Field>
          <Form.Field value={Reg.Language}>
            <label>Language</label>
            <select onChange={handleInput}   name="Language">
              <option value="" selected  disabled hidden>Select Language</option>
              <option value="E">English</option>
              <option value="F">French</option>
            </select>
          </Form.Field>
          
        </Form.Group>
        <Divider section hidden />
        <Button
          content="Add assignment"
          icon="add"
          color="green"
          floated="right"
          loading={Loading}
        />
      </Form>
      <Link to="/registrations">
        <Button icon="left arrow" content="Back" color="red" />
      </Link>
    </Container>
  );
};
export default Create;
