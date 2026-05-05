'use client'

import SideTabs from "../components/SideTabs";
import  { useState} from "react";
import AddEmployee from "./AddEmployee"
import { Shield, ChartNoAxesColumn, Users, UserCheck, Calendar, FileText ,CircleAlert, Activity,
} from "lucide-react";



const Sidebar = () => {


  const [activeTab, setActiveTab] = useState(1);

  const [search, setSearch] = useState("");

  

return (

  <div className="flex">

  
    <div className="w-[320px] min-h-screen text-[#D8C1A5] border-r border-[#3B2417] flex flex-col">

      {/* Logo */}
      <div className="px-8 py-10 border-b ">
        
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <Shield className="w-10 h-10 text-[#E6C17D]" strokeWidth={2} />
          </div>

          <div>
            <h1 className="text-[18px] leading-none font-bold text-white text-black.      ">
              All Birds ..
            </h1>

            <p className="text-[15px] mt-2 text-[#C9A679] font-medium">
              Admin Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col gap-6 px-6 py-8">
        <SideTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>
    </div>

    {/* Right Content */}
    <div className="flex-1 p-6">

     

      

    </div>

  </div>
)

}


export default Sidebar;