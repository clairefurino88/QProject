import { useEffect, useState } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//access to json data
import chartJson from '../charts.json'
import dashboardsJson from '../dashboards.json'

import { BarChart, LineChart, Line, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


//import supabase from "config/SupabaseClient";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://emicebslwiauxulmenmj.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaWNlYnNsd2lhdXh1bG1lbm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0NzMwMDcsImV4cCI6MjAxNzA0OTAwN30.Q2U4WbXI1_ElK2-jKU_d2_eDCfNh7dLzbUrU0_wtJ08");


function DatePickerDemo() {

  //need to save date to be used elsewhere
  const [date, setDate] = useState(new Date());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

//add containerstyle inside chart 
function Chart(containerStyle) {
  {
    return (
      <LineChart width={730} height={250} data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    );
  }
}


/* return (
   <ResponsiveContainer width="100%" height="100%">
     <BarChart
       width={500}
       height={300}
       data={data}
       margin={{
         top: 5,
         right: 30,
         left: 20,
         bottom: 5,
       }}
     >
       <CartesianGrid strokeDasharray="3 3" />
       <XAxis dataKey="name" />
       <YAxis />
       <Tooltip />
       <Legend />
       <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
       <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
     </BarChart>
   </ResponsiveContainer>
 );
}
*/
//-----------------------



//-----------
function Dashboard() {

}

//API FUNCTION-------------------------------------------------
function GetData() {
  const [wallabysightings, setwallabysightings] = useState([]);

  useEffect(() => {
    getWallabySightings();
  }, []);

  async function getWallabySightings() {
    const { data } = await supabase.from("wallabysightings").select();
    setwallabysightings(data);
  }

  return (
    <ul>
      {wallabysightings.map((wallabysightings) => (
        <li key={wallabysightings.date}>{wallabysightings.date}</li>
      ))}
    </ul>
  );
}

//___________________________________________________



function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <div>
        <DatePickerDemo />
      </div>

      <div>
        <GetData />
      </div>

      <div>
        <Chart/>
      </div>
    </>
  )
}

export default App
