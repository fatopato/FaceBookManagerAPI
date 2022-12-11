import React from "react";
import { useLocation } from "react-router-dom";
export default function Campaign() {
    const location = useLocation();
    const data = location.state.params;
    console.log(data);
    return (
      <div>
          <h2>data</h2>
          <h2>data.id</h2>
          <h2>data.name</h2>
          <h2>data.objective</h2>
      </div>
    );
}