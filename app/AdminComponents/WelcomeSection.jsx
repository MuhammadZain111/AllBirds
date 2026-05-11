import React from "react";




function WelcomeSection({ adminName = "Admin" }) {
  return (
    <div className="w-[95%] flex items-center justify-between p-5 mt-5 border border-gray-200 rounded-xl bg-white shadow-sm mb-4">
      
      {/* Left Side */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {adminName}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your dashboard and monitor all activities.
        </p>
      </div>

      {/* Avatar */}
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-900 text-white text-lg font-semibold">
        {adminName.charAt(0).toUpperCase()}
      </div>
    </div>
  );
}

export default WelcomeSection;