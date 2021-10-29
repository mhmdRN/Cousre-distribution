import React, { useEffect, useState } from 'react';
import { Container, Button, Modal, Input, Message, Table, Icon, Radio } from 'semantic-ui-react'
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css'
import { Link, useParams } from 'react-router-dom';
import cookies from 'js-cookies';

var years = [];
const yearList = () => {
    var i, j;
    var temp = [];
    const year = new Date().getFullYear();
    const x = parseInt(year);
    for (i = 0, j = 1; i < 5, j < 10; i++, j++) {
        var myyear = (x + i) + "-" + (x + j);
        temp.push(myyear);
    }
    years = temp;
}
yearList();
const Update = () => {
    const [Registrations, setRegistrations] = useState([]);
    const [Distribution, setDistribution] = useState([]);
    const [Doctors, setDoctors] = useState([]);
    const [open, setOpen] = useState(false);
    const [title, setname] = useState(null);
    const [date, setdate] = useState(null);
    var [final, setFinal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState([]);
    const year = new Date().getFullYear();
    const temp = parseInt(year) + 1;
    const [searchInput, setSearchInput] = useState(year + "-" + temp);
    const { id } = useParams();

    useEffect( async () => {
        setLoading(true);
        const token = cookies.getItem("token");
        const payload = { headers: { Authorization: token } };
        await axios.get('http://localhost:4000/distributions/create')
            .then(req => {
                const myData = [].concat(req.data.Reg)
                    .sort((a, b) => a.Facility_year < b.Facility_year ? 1 : -1);
                setRegistrations(myData);
                setDoctors(req.data.Doc);
                setSearch(prev => (myData.filter(i => i.Facility_year.startsWith(searchInput))))
            })
            .catch(err => {
                console.log(err);
                //window.location.href = "/error"
            })

    


        axios.get('http://localhost:4000/distributions/update/' + id, payload)
            .then(req2 => {
                console.log(req2.data);
                //setDistribution(req2.data.Registrations);
                setname(req2.data.Name);
                setdate(req2.data.Date);
                setFinal(req2.data.Version);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
               // window.location.href = "/error"
            })

    }, []);






    const addReg = (index) => {

        setDistribution(prev => [...prev, Registrations[index]]);
        console.log(Distribution);
    }
    const removeReg = (index) => {
        const temp = Distribution.filter(i => i._id !== Registrations[index]._id);
        console.log(temp)
        setDistribution(temp);
    }

    const handleSubmit = async () => {
        const payload = {
            Name: title,
            Registrations: Distribution,
            Version: final,
            Date: date
        }
        console.log(payload);
        const req = await axios.put('http://localhost:4000/distributions/update/' + id, payload);
        window.location.href = "/distributions"

    }
    const handleSearch = (e) => {
        const { name, value } = e.target;
        setSearchInput(value);
        const x = Registrations.filter(i => i.Facility_year.startsWith(value));
        x.length !== 0 ? setSearch(x) : setSearch(Registrations)
    }

    const selectAll = () => {
        setDistribution([])
        search.map((R, index) => {
            setDistribution(prev => [...prev, Registrations[index]]);
        })
    }

    const display = (i) => {
        const temp = Distribution.filter(x => x._id === i._id);
        if (temp.length >= 1) {
            return false;
        }
        else {
            return true;
        }
    }
    var Dname, lname;
    const findDoctor = (Fnumber) => {
        const data = Doctors.filter(i => i.File_Number === Fnumber);
        console.log(data[0].Fname)
        Dname = data[0].Fname;
        lname = data[0].Lname;

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
                        <div>
                            <input type="search" onChange={handleSearch} value={searchInput}
                                style={{
                                    width: 250,
                                    height: 35,
                                    borderRadius: 15,
                                    borderWidth: 1,
                                    textAlign: "center",
                                    marginLeft: "40%",
                                    borderColor: "#eee",
                                    outline: "none"
                                }}
                                placeholder="Search by year "
                            />
                            <Icon name="search" size='big' />
                        </div>
                        <Table>
                            <Table.Header>
                                <Table.Row >

                                    <Table.HeaderCell >Course Code</Table.HeaderCell>
                                    <Table.HeaderCell >DFile number</Table.HeaderCell>
                                    <Table.HeaderCell >Faculity year</Table.HeaderCell>
                                    <Table.HeaderCell >Section</Table.HeaderCell>

                                    <Table.HeaderCell >Lab_hours</Table.HeaderCell>
                                    <Table.HeaderCell >Exercise_hours</Table.HeaderCell>
                                    <Table.HeaderCell >Course_hours</Table.HeaderCell>
                                    <Table.HeaderCell >Section_ID</Table.HeaderCell>
                                    <Table.HeaderCell />
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {
                                    search.map((i, index) => {
                                        findDoctor(i.DFile_number);
                                        return (
                                            <Table.Row>

                                                <Table.Cell >{i.Course_Code}</Table.Cell>
                                                <Table.Cell >{Dname} {lname}</Table.Cell>
                                                <Table.Cell >{i.Facility_year}</Table.Cell>
                                                <Table.Cell >{i.Section_ID}</Table.Cell>
                                                <Table.Cell >{i.Lab_hours}</Table.Cell>
                                                <Table.Cell >{i.Exercise_hours}</Table.Cell>
                                                <Table.Cell >{i.Course_hours}</Table.Cell>
                                                <Table.Cell >{i.Section_ID}</Table.Cell>
                                                <Table.Cell collapsing>

                                                    {display(i)
                                                        //    !Distribution.includes(Registrations[index]) 
                                                        &&
                                                        <Button
                                                            content="Add"
                                                            icon="add"
                                                            floated="right"
                                                            onClick={() => { addReg(index); }}
                                                            color="green"
                                                        />

                                                    }

                                                    {!display(i) &&
                                                        //Distribution.includes(Registrations[index]) &&
                                                        <Button
                                                            content="Remove"
                                                            icon="trash"
                                                            floated="right"
                                                            onClick={() => { removeReg(index); }}
                                                            color="red"
                                                        />
                                                    }
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })

                                }




                            </Table.Body>


                        </Table>
                        <Modal
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            open={open}
                            trigger={<Button color="green" >Show Modal</Button>}
                        >
                            <Modal.Header>Complete the distribution</Modal.Header>
                            <Modal.Content >
                                <Modal.Description>

                                    <Message>
                                        <Message.Header>  Are you sure you want to create the following distribution ?</Message.Header>
                                        <Message.List>
                                            {
                                                Distribution.map((d) => {
                                                    findDoctor(d.DFile_number);
                                                    return (
                                                        <Message.Item>{d.Course_Code} {Dname + " " + lname}</Message.Item>
                                                    )
                                                })
                                            }
                                        </Message.List>
                                    </Message>

                                    <Input
                                        label="Name "
                                        value={title}
                                        name="title"
                                        onChange={(e) => {
                                            const { name, value } = e.target;
                                            setname(value);
                                            console.log(title);
                                        }}
                                    />
                                  
                                  <select
                                        onChange={(e) => {
                                            const { name, value } = e.target;
                                            setdate(value);
                                           
                                        }}
                                        style={{
                                            width: 250,
                                            height: 38,
                                            padding:"0px 4px",
                                            borderWidth: 2,
                                            textAlign: "center",
                                            borderColor: "#eee",
                                            outline: "none"
                                        }}
                                        name="date"
                                        value={date}
                                    >
                                        
                                        {
                                            years.map(i => {
                                                return (
                                                    <>
                                                        <option value={i}>{i}</option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
                                    <Radio
                                        toggle
                                        onClick={() => { final = !final }}
                                        checked={final}
                                        label="Final version"
                                        onChange={() => {
                                            setFinal(final);
                                            console.log(final);
                                        }

                                        } />

                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='black' onClick={() => setOpen(false)}>
                                    Cancel
                    </Button>
                                <Button
                                    content="Update"
                                    labelPosition='right'
                                    icon='checkmark'
                                    onClick={handleSubmit}
                                    positive
                                />
                            </Modal.Actions>
                        </Modal>
                        <Link to="/distributions">
                            <Button icon="left arrow" content="Back" color="red" />
                        </Link>
                        <Button content="Select all" color="linkedin" onClick={selectAll} />
                    </div>
            }


        </Container>
    );
};

export default Update;


