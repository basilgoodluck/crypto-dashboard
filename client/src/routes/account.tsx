import React, { useState } from "react";

const Account: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(
    "0x1234...abcd" // Replace with actual logic to fetch wallet
  );
  const [profilePic, setProfilePic] = useState<string>(
    "https://via.placeholder.com/150" // Placeholder profile picture
  );
  const [name, setName] = useState<string>("John Doe");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deleteReason, setDeleteReason] = useState<string>("");

  const handleLinkWallet = () => {
    const newWalletAddress = prompt("Enter your Ethereum wallet address:");
    if (newWalletAddress) {
      setWalletAddress(newWalletAddress);
    }
  };

  const handleLogout = () => {
    console.log("Logged out"); // Replace with actual logout logic
    alert("You have been logged out.");
  };

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setProfilePic(e.target?.result as string);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      console.log("Account deleted with reason:", deleteReason);
      alert("Your account has been deleted.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>

      {/* Profile Section */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <img
            src={profilePic}
            alt="Profile"
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Change Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="block w-full text-sm text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Name and Wallet Address */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        ) : (
          <p>{name}</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Wallet Address</h2>
        {walletAddress ? (
          <p className="mt-2 p-2 bg-gray-100 rounded text-gray-700">
            {walletAddress}
          </p>
        ) : (
          <p className="mt-2 text-gray-500">No wallet address linked.</p>
        )}
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleLinkWallet}
        >
          {walletAddress ? "Change Wallet" : "Link Wallet"}
        </button>
      </div>

      {/* Reset Password */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Reset Password</h2>
        <button
          className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={() => alert("Password reset link sent to your email!")}
        >
          Reset Password
        </button>
      </div>

      {/* Update Details */}
      <div className="mb-6">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save Changes" : "Edit Details"}
        </button>
      </div>

      {/* Logout */}
      <div className="mb-6">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>

      {/* Delete Account */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Delete Account</h2>
        <textarea
          placeholder="Reason for deleting your account (optional)"
          value={deleteReason}
          onChange={(e) => setDeleteReason(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        ></textarea>
        <button
          className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Account;
