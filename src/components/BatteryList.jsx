import React ,{useState} from 'react'
import { batteries } from "./DataTableConstants";

export default function BatteryList() {
const [batteryList, setBatteryList] = useState(batteries);   

  return (
    <div className="flex my-2 mx-4">

    <div className="w-3/12 shadow-lg border rounded  m-1" style={{ marginRight: '5px' }}>
      <div className="max-h-[90vh] overflow-y-auto divide-y divide-slate-200">
      {batteryList.map((battery,key)=>(
        <p className=' ml-[2rem] mr-[2rem] my-2 p-1'>{battery.name}</p>
      ))}
      </div>
    </div>

    <div className="w-9/12 shadow-lg border rounded m-1">
      <div className="p-4">
        Column 8/12
      </div>
    </div>
  </div>
  )
}
