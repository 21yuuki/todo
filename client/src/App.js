import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home} from "./components/Home";
import {AddList} from "./components/AddList";
import {EditList} from "./components/EditList";

import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <div className="min-vh-100 bg-secondary">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/add" element={<AddList />} />
          <Route path="/edit/:id" element={<EditList />} />
        </Routes>
      </Router>
    </div>
  )
}

