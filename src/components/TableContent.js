import React from "react";

export default function TableContent({ batteryList }) {
  const getColor = (health) => {
    switch (health) {
      case "Fair":
        return "text-green-500"; 
      case "Good":
        return "text-orange-500"; 
      case "Poor":
        return "text-red-500"; 
      default:
        return "text-green-500";
    }
  };

  return (
    <div className="overflow-x-auto text-center">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Health</th>
            <th className="py-2 px-4 border-b">Battery Name</th>
            <th className="py-2 px-4 border-b">Current</th>
            <th className="py-2 px-4 border-b">Temperature</th>
            <th className="py-2 px-4 border-b">Power (°C)</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {batteryList?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b text-center">
                <i
                  title={item.health}
                  className={`material-icons p-2 ${getColor(item.health)}`}
                >
                  arrow_circle_up
                </i>
              </td>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.current}</td>
              <td className="py-2 px-4 border-b">{item.temperature}</td>
              <td className="py-2 px-4 border-b">{item.power}</td>
              <td className="py-2 px-4 border-b">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
