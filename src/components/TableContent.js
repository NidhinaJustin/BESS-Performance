import React from "react";
import { Table } from "react-bootstrap";

export default function TableContent({batteryList}) {

  const getColor = (health) => {
    switch (health) {
      case "Fair":
        return "green";
      case "Good":
        return "orange";
      case "Poor":
        return "red";
      default:
        return "green"; 
    }
  };
  return (
        <Table  striped bordered hover>
          <thead>
          <tr>
          <th>health</th>
          <th>Battery Name</th>
          <th>current</th>
          <th>temperature</th>
          <th>power (°C)</th>
          <th>status</th>
        </tr>
          </thead>
          <tbody>
            {batteryList?.map((item, index) => (
              <tr key={index}>
               <td><i title={item.health} style={{backgroundColor:getColor(item.health)}} className="material-icons batteryHealth">arrow_circle_up</i> </td>
               <td> {item.name} </td>
               <td> {item.current} </td>
               <td> {item.temperature} </td>
               <td> {item.power} </td>
               <td> {item.status} </td>
              </tr>
            ))}
          </tbody>
        </Table>

  );
}
