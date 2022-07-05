import React from "react";
import {Heading} from "./Heading";
import {List} from "./List"; 

export const Home = () => {
    return (
        <div className="col-md-6 offset-md-3 p-5">
            <Heading />
            <List />
        </div>
    )
}
