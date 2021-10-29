import React, { useEffect, useState } from "react";

import {  Button, Form, Input, Radio, Container ,Divider, Icon} from "semantic-ui-react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import cookies from 'js-cookies'

const Update = () => {
  var [crses, setcrses] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const token=cookies.getItem("token");
    const payload={headers:{Authorization:token}};
     axios.get(
      "http://localhost:4000/courses/update/" + id,payload
    ).then(course=>{
      setcrses(course.data);
      crses = course.data;
      console.log(course.data, crses);
    })
    .catch(err=>{
      window.location.href="/error";
    })
   
  }, []);

  const CREATE_COURSE = {
    Course_code: crses.Course_code,
    course_name: crses.course_name,
    Total_Hours: crses.Total_Hours,
    Description: crses.Description,
    credits: crses.credits,
    available: crses.available,
    Semester_Nb: crses.Semester_Nb,
    Course_Type: crses.Course_Type,
    Course_hours: crses.Course_hours,
    Lab_hours: crses.Lab_hours,
    Exercise_hours: crses.Exercise_hours,
  };
  const [create_course, set_create_course] = useState(CREATE_COURSE);

  const handleInput = (e) => {
    const { name, value } = e.target;

    set_create_course((prev) => ({ ...prev, [name]: value }));
    console.log(create_course);
  };
  const handleSubmit = async () => {
    const x = await axios.put(
      "http://localhost:4000/courses/update/" + id,
      create_course
    );
  
    console.log(x);
  };

  return (
    <Container>
      <Form method="POST" onSubmit={()=>{handleSubmit();  window.location.href="/courses"}}>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Course Code</label>
            <Input
              required
              placeholder={CREATE_COURSE.Course_code}
              name="Course_code"
              onChange={handleInput}
            />
          </Form.Field>
          <Form.Field>
            <label> Course Name</label>
            <Input
              required
              name="course_name"
              onChange={handleInput}
              placeholder={CREATE_COURSE.course_name}
            />
          </Form.Field>
          <Form.Field>
            <label>Total Hours</label>
            <Input
              required
              type="number"
              placeholder={CREATE_COURSE.Total_Hours}
              name="Total_Hours"
              onChange={handleInput}
            />
          </Form.Field>
         
        </Form.Group>
        <Divider section/>
        <Form.Group widths="3">
        <Form.Field>
            <label>Description</label>
            <Input
              required
              placeholder={CREATE_COURSE.Description}
              name="Description"
              onChange={handleInput}
            />
          </Form.Field>
          <Form.Field value={CREATE_COURSE.available} >
            <lable style={{marginLeft:"50%"}}>Available</lable>
            <Radio
              style={{marginLeft:"50%"}}
              toggle
              name="available"
              checked={create_course.available}
              onChange={handleInput}
              value={CREATE_COURSE.available}
              onClick={() =>
                (create_course.available = !create_course.available)
              }
            />
          </Form.Field>
          <Form.Field>
              <label>Credits</label>
              <input
                name="credits"
                placeholder={CREATE_COURSE.credits}
                required
                type="number"
                min="0"
                max="30"
                onChange={handleInput}
              />
            </Form.Field>

        </Form.Group>
        <Divider section/>
          <Form.Group widths="equal">
            
            <Form.Field>
              <label>Semester Number</label>

              <select
                name="Semester_Nb"
                placeholder={create_course.Semester_Nb}
                onChange={handleInput}
              >
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
                <option value="S4">S4</option>
                <option value="S5">S5</option>
                <option value="S6">S6</option>
                <option value="S7">S7</option>
                <option value="S8">S8</option>
              </select>
            </Form.Field>

            <Form.Field name="Course_Type">
              <label>Course Type</label>
              <select
                onChange={handleInput}
                name="Course_Type"
                placeholder={create_course.Course_Type}
              >
                <option value="Obligatory">Obligatory</option>
                <option value="Elective">Elective</option>
              </select>
            </Form.Field>
          </Form.Group>
          <Divider section/>
        <Form.Group widths="equal">
          <Form.Field value={CREATE_COURSE.Course_hours}>
            <label>Course Hours</label>
            <Input
              required
              type="number"
              name="Course_hours"
              placeholder={CREATE_COURSE.Course_hours}
              onChange={handleInput}
            />
          </Form.Field>
          <Form.Field>
            <label>Lab Hours</label>
            <Input
              required
              type="number"
              placeholder={CREATE_COURSE.Lab_hours}
              name="Lab_hours"
              onChange={handleInput}
            />
          </Form.Field>
          <Form.Field value={CREATE_COURSE.Exercise_hours}>
            <label>Exercise Hours</label>
            <Input
              required
              type="number"
              placeholder={CREATE_COURSE.Exercise_hours}
              name="Exercise_hours"
              onChange={handleInput}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <Button floated="right"  color="green">
            <Icon name="redo"/>
            update</Button>
        </Form.Field>
      </Form>
      <Link to="/courses"><Button icon="left arrow" content="Back" color="red" /></Link>
    </Container>
  );
};

export default Update;
