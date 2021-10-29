import React, { useState } from 'react'
//import { Helmet } from 'react-helmet'
import { Button,Form,Input, Container, Radio, Divider, Icon} from 'semantic-ui-react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const CREATE_COURSE={
    Course_code:'',
      course_name:'',
      Total_Hours:0,
      Description:'',
      credits:0,
      available:false,
      Semester_Nb:'',
      Course_Type:'',
      Course_hours:0,
      Lab_hours:0,
      Exercise_hours:0
}
const Create = () => {
  var x=0;
    const [create_course,set_create_course]=useState(CREATE_COURSE);
    const handleInput=(e)=>{
        const{name,value}=e.target;
       
        set_create_course(prev=>({...prev,[name]:value}));
       
    }
    const handleSubmit= ()=>{
      x=parseInt(create_course.Course_hours)  + parseInt(create_course.Lab_hours) + parseInt(create_course.Exercise_hours)  ;
      const n1=parseInt(x);
      const n2=parseInt(create_course.Total_Hours)
      console.log(n1,n2);
      if(n1===n2 ){
         axios.post('http://localhost:4000/courses/create',create_course)
         .then(re=>{
          window.location.href='/courses';
         })
         .catch(err =>{
           console.log("errrrrorrrrr");
           alert("Code already exists");
         });
        
      }
      else{
        alert("Number of C+L+E should be  equal to Total hours");
      }
       
    }
    
    return (  
      
          <Container>
  
        
        <Form  method='POST' onSubmit={handleSubmit} >
            <Form.Group widths='equal'>
              <Form.Field
              value={CREATE_COURSE.Course_code}
              >
                <label>Course Code</label>
                <Input   
                required         
                placeholder='Course Code'
                name='Course_code'
                onChange={handleInput} />
              </Form.Field>
              <Form.Field
                value={CREATE_COURSE.course_name}
                >
                <label> Course Name</label>
              <Input required name="course_name" onChange={handleInput}  placeholder="Course Name"/>
              </Form.Field>
              <Form.Field
                value={CREATE_COURSE.Total_Hours}
              >
                <label>Total Hours</label>
                <Input
                required
                type='number'
                placeholder='Total Hours'
                name="Total_Hours"
                onChange={handleInput} />
              </Form.Field>
              
            </Form.Group>
            <Divider  section/>
            <Form.Group widths='3' >
            <Form.Field
                value={CREATE_COURSE.Description}
              >
                 <label>Description</label>
                <Input 
                  required
                  placeholder='Description'
                  name="Description"
                  onChange={handleInput}
                  />
               
                </Form.Field>
                <Form.Field
                value={CREATE_COURSE.available}
                >
                  <label style={{marginLeft:"50%"}}>Available</label>
                <Radio toggle style={{marginLeft:"50%"}}  name='available' checked={create_course.available} onChange={handleInput} onClick={()=>create_course.available=!create_course.available}/>
                </Form.Field>
                <Form.Field 
                
                value={CREATE_COURSE.credits}
              >
                <label>Credits</label>
                
                <input 
                name="credits"
                required 
                type="number" 
                min="0" max="30" 
                placeholder="0"
                onChange={handleInput} />
                
                
                </Form.Field>
              </Form.Group >
              <Divider  section/>
              
              <Form.Group widths="equal">
             
    
              <Form.Field 
                value={CREATE_COURSE.Semester_Nb}
              >
                <label>Semester Number</label>
               

                <select name="Semester_Nb" value={create_course.Semester_Nb} onChange={handleInput}>
                  <option value="" selected hidden disabled> Select Semester</option>
                  <option value="S1" >S1</option>
                  <option value="S2" >S2</option>
                  <option value="S3" >S3</option>
                  <option value="S4" >S4</option>
                  <option value="S5" >S5</option>
                  <option value="S6" >S6</option>
                  <option value="S7" >S7</option>
                  <option value="S8" >S8</option>
                  </select>
                </Form.Field>
    
              <Form.Field
                value={CREATE_COURSE.Course_Type}
              >
              <label>Course Type</label>   
               <select  name="Course_Type" value={create_course.Course_Type} onChange={handleInput}>
               <option value="" selected hidden disabled> Select Course Type</option>
                <option value="Obligatory">Obligatory</option>
                <option value="Elective">Elective</option>
              </select>
              
                </Form.Field>
              </Form.Group >
              <Divider  section/>
              <Form.Group widths="equal">
              <Form.Field
                value={CREATE_COURSE.Course_hours}
              >
              <label>Course Hours</label>
              <Input
              required
              type='number'
                placeholder='Course Hours'
                name="Course_hours"
                onChange={handleInput}/>
                </Form.Field>
                <Form.Field
                value={CREATE_COURSE.Lab_hours}
              >
              <label>Lab Hours</label>
              <Input
              required
              type='number'
                placeholder='Lab Hours'
                name="Lab_hours"
                onChange={handleInput}/>
                </Form.Field>
                
                <Form.Field
                value={CREATE_COURSE.Exercise_hours}
              >
              <label>Exercise Hours</label>
              <Input
              required
                type='number'
                placeholder='Exercise Hours'
                name="Exercise_hours"
                onChange={handleInput}/>
                </Form.Field>
                </Form.Group>
            <Form.Field  >
             <Button floated="right" color="green" >
               <Icon name="add"/>
               Create</Button>
            </Form.Field>
            
          </Form>
          <Link to="/courses"><Button icon="left arrow" content="Back" color="red" /></Link>
          </Container>
       
        
    )
}
 
export default Create;