import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Container, Message, Table, Icon ,Divider} from 'semantic-ui-react'
import ReactToExcel from 'react-html-table-to-excel';
import cookies from 'js-cookies';



const Details = () => {
    const [Distributions, setDistributions] = useState([]);
    const [Distributions2, setDistributions2] = useState([]);
    const [Courses, setCourses] = useState([]);
    const [Doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        setLoading(true);
        const token=cookies.getItem("token");
        console.log("my token : "+token);
        const payload={headers:{Authorization:token}};
        axios.get('http://localhost:4000/distributions/details/' + id,payload)
        .then(Ds=>{
            const myData = [].concat(Ds.data.Dist.Registrations)
            .sort((a, b) => a.Course_Code  > b.Course_Code  ? 1 : -1);
            const myData2 = [].concat(Ds.data.Dist.Registrations)
            .sort((a, b) => a.DFile_number  > b.DFile_number  ? 1 : -1);

         
            setDistributions(myData);         
            setDistributions2(myData2);
            setDoctors(Ds.data.Drs);
            setCourses(Ds.data.Crs);
            setLoading(false);
           
        })
        .catch(err=>{
            console.log(err);
            window.location.href="/error"
        })
      
    }, []);
    var name,SemesterNb,coursename,contracttype,courseTotalhours=0,hourstaken=0,emptyhours=0,Rank;
    
    const findDoctor=(Fnumber)=>{
        const data=Doctors.filter(i=>i.File_Number === Fnumber);
        console.log(data[0].Fname)
        name=data[0].Fname;
        contracttype=data[0].Contract_Type;
        Rank=data[0].Rank;
    }

    const findCourse=(code)=>{
        courseTotalhours=0
        const data=Courses.filter(i=>i.Course_code === code);
        const data2=Distributions.filter(i=>i.Course_Code === code);
        SemesterNb=data[0].Semester_Nb;
        coursename=data[0].course_name;
        data2.map(i=>{
            courseTotalhours+=i.Course_hours+i.Lab_hours+i.Exercise_hours;
        })
       
    }
    // const findhours=(code)=>{
    //     hourstaken=0;
    //     const data=Distributions.filter(i=>i.Course_Code === code);
    //     data.map(i=>{
    //         hourstaken+=i.Lab_hours + i.Course_hours+i.Exercise_hours;
    //     })
    //     emptyhours=courseTotalhours-hourstaken;
       

    // }
    var Teachinghouurs=0;
    const  findteachinghours=(Fnb)=>{
        Teachinghouurs=0
        const data=Distributions.filter(i=>i.DFile_number === Fnb);
        data.map(i=>{
            Teachinghouurs+=i.Lab_hours + i.Course_hours+i.Exercise_hours;
        })
       
    }


    return (
        <Container>
            {
                (loading) ?
                    <Message icon style={{ marginTop: "20%" }}>
                        <Icon name='circle notched' loading />
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            We are fetching that content for you.
                            </Message.Content>
                    </Message>
                    :
                            <div>
                                <Divider section horizontal >By Courses</Divider>
                            <Table  id="distribution-details-table">
                                <Table.Header>
                                    <Table.Row >

                                        <Table.HeaderCell >Course Code</Table.HeaderCell>
                                       
                                        <Table.HeaderCell >Semester Number</Table.HeaderCell>
                                        <Table.HeaderCell >Course Name</Table.HeaderCell>
                                        <Table.HeaderCell >Lab_hours</Table.HeaderCell>
                                        <Table.HeaderCell >Exercise_hours</Table.HeaderCell>
                                        <Table.HeaderCell >Course_hours</Table.HeaderCell>
                                        <Table.HeaderCell >Language</Table.HeaderCell>
                                        <Table.HeaderCell >Section_ID</Table.HeaderCell>
                                        <Table.HeaderCell >Doctor Name</Table.HeaderCell>
                                        <Table.HeaderCell >Contract Type</Table.HeaderCell>
                                        <Table.HeaderCell >Total hours</Table.HeaderCell>
                                        <Table.HeaderCell >Location</Table.HeaderCell>

                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {
                                        Distributions.map((i,index) => {
                                            findDoctor(i.DFile_number);
                                            findCourse(i.Course_Code);
                                            //findhours(i.Course_Code)
                                            return (
                                                <Table.Row>

                                                    <Table.Cell >{i.Course_Code}</Table.Cell>
                                                    
                                                    <Table.Cell >
                                                    { SemesterNb }
                                                    </Table.Cell>
                                                    <Table.Cell >{coursename}</Table.Cell>
                                                    <Table.Cell >{i.Lab_hours}</Table.Cell>
                                                    <Table.Cell >{i.Exercise_hours}</Table.Cell>
                                                    <Table.Cell >{i.Course_hours}</Table.Cell>
                                                    <Table.Cell >{i.Language}</Table.Cell>
                                                    <Table.Cell >{i.Section_ID}</Table.Cell>
                                                    <Table.Cell >{name}</Table.Cell>
                                                    <Table.Cell >{contracttype}</Table.Cell>
                                                    <Table.Cell >{courseTotalhours}</Table.Cell>
                                                    <Table.Cell >{ i.Location}</Table.Cell>

                                                </Table.Row>
                                            )
                                        })

                                    }




                                </Table.Body>


                            </Table>
                            <ReactToExcel 
                            table="distribution-details-table"
                            filename="Distribution details "
                            sheet="Sheet"
                            buttonText="Export To Excel"
                            className="ui primary button"
                            />


                            <Divider section horizontal>By Doctors</Divider>
                            <Table  id="distribution2-details-table">
                                <Table.Header>
                                    <Table.Row >

                                        <Table.HeaderCell >Doctor Name</Table.HeaderCell>
                                       
                                        <Table.HeaderCell >Rank</Table.HeaderCell>
                                        <Table.HeaderCell >Contract Type</Table.HeaderCell>
                                        <Table.HeaderCell >Course name</Table.HeaderCell>
                                        <Table.HeaderCell >Semester Nb</Table.HeaderCell>
                                        <Table.HeaderCell >Course Code</Table.HeaderCell>
                                        <Table.HeaderCell >Lab - Course -Exercise</Table.HeaderCell>
                                        <Table.HeaderCell >Teaching Hours</Table.HeaderCell>
                                        <Table.HeaderCell >Language</Table.HeaderCell>
                                        <Table.HeaderCell >Total hours</Table.HeaderCell>

                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {
                                        Distributions2.map((i,index) => {
                                            findDoctor(i.DFile_number);
                                            findCourse(i.Course_Code);
                                            findteachinghours(i.DFile_number)
                                            var h=i.Exercise_hours+i.Lab_hours+i.Course_hours;
                                            return (
                                                <Table.Row>

                                                    <Table.Cell >{name}</Table.Cell>
                                                    
                                                    <Table.Cell >
                                                    { Rank }
                                                    </Table.Cell>
                                                    <Table.Cell >{contracttype}</Table.Cell>
                                                    <Table.Cell >{coursename}</Table.Cell>
                                                    <Table.Cell >{SemesterNb}</Table.Cell>
                                                    <Table.Cell >{i.Course_Code}</Table.Cell>



                                                    <Table.Cell>{(i.Course) ? (i.Lab) ? (i.Exercise)? "C+L+E":"C+L" :(i.Exercise)? "C+E":"C" :
                                                    (i.Lab) ? (i.Exercise)? "L+E":"L" :(i.Exercise)? "E":null
                                                    }</Table.Cell>

                                                    <Table.Cell >{h}</Table.Cell>

                                                    <Table.Cell >{i.Language}</Table.Cell>
                                                   
                                                    <Table.Cell >{ Teachinghouurs}</Table.Cell>

                                                </Table.Row>
                                            )
                                        })

                                    }




                                </Table.Body>


                            </Table>
                            <ReactToExcel 
                            table="distribution2-details-table"
                            filename="Distribution details "
                            sheet="Sheet"
                            buttonText="Export To Excel"
                            className="ui primary button"
                            />
                            </div>
                    
                    
            }
           

        </Container>
    );

}
export default Details;