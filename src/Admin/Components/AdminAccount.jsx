import React from "react";

function AdminAccount() {
  return (
    <div className="p-4 md:p-10 h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Account Settings</h1>

      {/* Tabs Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Profile</button>
        <button className="px-4 py-2 bg-gray-200 rounded-lg">Security</button>
        <button className="px-4 py-2 bg-gray-200 rounded-lg">Preferences</button>
        <button className="px-4 py-2 bg-gray-200 rounded-lg">Notifications</button>
      </div>

      {/* Profile Tab */}
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4 mb-6">
        <h2 className="text-lg font-semibold">Profile</h2>
        <div>
          <label className="block font-medium">Full Name</label>
          <input type="text" placeholder="Enter full name" className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input type="email" placeholder="Enter email" className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium">Phone Number</label>
          <input type="tel" placeholder="Enter phone number" className="w-full border rounded p-2" />
        </div>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">Save Changes</button>
      </div>

      {/* Security Tab */}
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4 mb-6">
        <h2 className="text-lg font-semibold">Security</h2>
        <div>
          <label className="block font-medium">Current Password</label>
          <input type="password" placeholder="Enter current password" className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium">New Password</label>
          <input type="password" placeholder="Enter new password" className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium">Confirm New Password</label>
          <input type="password" placeholder="Confirm new password" className="w-full border rounded p-2" />
        </div>
        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg">Update Password</button>
      </div>

      {/* Preferences Tab */}
      <div className="bg-white shadow-md rounded-xl p-6 space-y-6 mb-6">
        <h2 className="text-lg font-semibold">Preferences</h2>
        <div className="flex items-center justify-between">
          <label className="font-medium">Dark Mode</label>
          <input type="checkbox" className="w-5 h-5" />
        </div>
        <div className="flex items-center justify-between">
          <label className="font-medium">Language</label>
          <select className="border rounded p-2">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save Preferences</button>
      </div>

      {/* Notifications Tab */}
      <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <div className="flex items-center justify-between">
          <label className="font-medium">Email Notifications</label>
          <input type="checkbox" className="w-5 h-5" />
        </div>
        <div className="flex items-center justify-between">
          <label className="font-medium">SMS Notifications</label>
          <input type="checkbox" className="w-5 h-5" />
        </div>
        <div className="flex items-center justify-between">
          <label className="font-medium">System Alerts</label>
          <input type="checkbox" className="w-5 h-5" />
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Update Notifications</button>
      </div>
    </div>
  );
}

export default AdminAccount;