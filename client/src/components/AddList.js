import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Form, FormGroup, FormLabel, FormControl, Button, Navbar, NavbarBrand, Container, } from "react-bootstrap";
import axios from "axios";

export const AddList = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [img, setImg] = useState(null);
    const [validated, setValidated] = useState(false);
    
    const handleFile = (files) => {
        setImg(files[0]);
    }

    const createList = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if(form.checkValidity() === false) {
            e.stopPropagation();

            
        } else {
            setValidated(true);

            const formData = new FormData();
            formData.append("file", img);
            formData.append("name", name);
    
            axios.post("/api/list/", formData, {
                "Content-Type": "multipart/form-data"
            }).then((res) => console.log(res));
    
            navigate("../.");
        }

    };

    return (
        <div className="col-md-4 offset-md-4 p-5">
            <Navbar className="bg-dark">
                <Container>
                    <NavbarBrand className="text-light">Add List</NavbarBrand>
                </Container>
            </Navbar>
            <Form noValidate validated={validated} onSubmit={(createList)} className="p-4 bg-light">
                <FormGroup className="mb-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl type="text" onChange={(e) => setName(e.target.value)} required></FormControl>
                </FormGroup>
                <FormGroup className="mb-2">
                    <FormLabel>Image</FormLabel>
                    <FormControl type="file" onChange={(e) => handleFile(e.target.files)} required></FormControl>
                </FormGroup>
                <FormGroup className="d-flex gap-2">
                    <Button type="submit">Submit</Button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </FormGroup>
            </Form>
        </div>
    )
}
