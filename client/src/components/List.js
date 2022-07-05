import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Table, Button, Image} from "react-bootstrap";
import axios from "axios";

export const List = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchList = async () => {
            const res = await axios.get("/api/list/");
            setList(res.data);
        };

        fetchList();
    }, []);

    const deleteListItem = (id) => {
        const deleteList = async () => {
            await axios.delete(`/api/list/${id}`);

            const res = await axios.get("/api/list/");
            setList(res.data);
        };
            
        deleteList();
    }
    
    return (
        <Table variant="light">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {list.map((list, index) => (
                    <tr key={index}>
                        <td><strong>{list.name}</strong></td>
                        <td><Image thumbnail src={require(`../../public/uploads/${list.image}`)} /></td>
                        <td>
                            <div className="d-flex gap-2">
                                <Link className="btn btn-warning" to={`/edit/${list.id}`}>Edit</Link>
                                <Button onClick={() => deleteListItem(list.id)} className="btn btn-danger">Delete</Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
