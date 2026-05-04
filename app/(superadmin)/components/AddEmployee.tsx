



export default function AdddEmployee() {

  //Now here I Will Call the Api to Create the User








  return (
    <div className="min-h-screen p-6 bg-black ">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white px-8 py-6">
          <h1 className="text-3xl font-bold text-black">Create Employee Account</h1>
          <p className="text-gray-300 mt-2">
            Add a new employee who can manage the ecommerce store,
            products, orders, and customers.
          </p>
        </div>

        {/* Form */}
        <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter employee name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="employee@gmail.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="+92 300 1234567"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Create password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Department
            </label>
            <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black">
              <option>Select Department</option>
              <option>Product Management</option>
              <option>Order Management</option>
              <option>Customer Support</option>
              <option>Inventory</option>
            </select>
          </div>

          {/* Employee Role */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Employee Role
            </label>
            <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black">
              <option>Select Role</option>
              <option>Store Manager</option>
              <option>Product Manager</option>
              <option>Support Agent</option>
              <option>Inventory Manager</option>
            </select>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Address
            </label>
            <textarea
              rows="4"
              placeholder="Enter employee address"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>
          </div>

          {/* Permissions */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-4 text-gray-700">
              Permissions
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'Add Products',
                'Edit Products',
                'Delete Products',
                'Manage Orders',
                'Manage Customers',
                'View Reports',
                'Manage Inventory',
                'Discount Management',
                'Category Management',
              ].map((permission) => (
                <label
                  key={permission}
                  className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-50"
                >
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-gray-700 text-sm font-medium">
                    {permission}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Account Status
            </label>
            <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* Joining Date */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Joining Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
            >
              Create Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
