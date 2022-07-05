import React, {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import {Form, FormGroup, FormLabel, FormControl, Button, Navbar, NavbarBrand, Container} from "react-bootstrap";
import axios from "axios";

export const EditList = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [img, setImg] = useState(null);

    useEffect(() => {
        const fetchList = async () => {
            const res = await axios.get(`/api/list/${id}`);
            setName(res.data.name);
            setImg(res.data.image);
        };

        fetchList();
    }, [id]);

    const handleFile = (files) => {
       setImg(files[0]);
    }

    const updateList = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", img);
        formData.append("name", name);

        axios.put(`/api/list/${id}`, formData, {
            "Content-Type": "multipart/form-data"
        }).then((res) => console.log(res));

        navigate("../../.");
    };

    return (
        <div className="col-md-4 offset-md-4 p-5">
            <Navbar className="bg-dark">
                <Container>
                    <NavbarBrand className="text-light">Edit List</NavbarBrand>
                </Container>
            </Navbar>
            <Form onSubmit={(updateList)} className="p-4 bg-light">
                <FormGroup className="mb-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl type="text" value={name} onChange={(e) => setName(e.target.value)} required></FormControl>
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
