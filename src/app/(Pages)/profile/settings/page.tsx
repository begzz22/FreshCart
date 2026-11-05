"use client";

import { useState } from "react";
import { User, Lock, Save, Eye, EyeOff } from "lucide-react";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Begad Ahmed",
    email: "",
    phone: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    newPassword: false,
    confirm: false,
  });

  const [message, setMessage] = useState("");

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Profile information updated successfully!");
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirm) {
      setMessage("New passwords do not match!");
      return;
    }

    if (passwords.newPassword.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setMessage("Password updated successfully!");

    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });
  };

  const togglePassword = (field: "current" | "newPassword" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-gray-500 text-sm mt-1">
          Update your profile information and change your password
        </p>
      </div>

      {message && (
        <div className="rounded-xl bg-primary-50 text-primary-700 p-4 text-sm font-medium">
          {message}
        </div>
      )}

      {/* Profile Information */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center">
              <User size={25} className="text-primary-600" />
            </div>

            <div>
              <h3 className="font-bold text-gray-900">Profile Information</h3>
              <p className="text-sm text-gray-500">
                Update your personal details
              </p>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="01xxxxxxxxx"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                className={inputClass}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:cursor-pointer text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Account Information */}
        <div className="p-6 sm:p-8 bg-gray-50">
          <h3 className="font-bold text-gray-900 mb-4">Account Information</h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-gray-500">User ID</span>
              <span className="font-mono text-gray-700">Not available</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Role</span>
              <span className="px-3 py-1 rounded-lg bg-primary-100 text-primary-700 font-medium capitalize">
                User
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
              <Lock size={25} className="text-amber-600" />
            </div>

            <div>
              <h3 className="font-bold text-gray-900">Change Password</h3>
              <p className="text-sm text-gray-500">
                Update your account password
              </p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            {(
              [
                {
                  key: "current",
                  label: "Current Password",
                  placeholder: "Enter your current password",
                },
                {
                  key: "newPassword",
                  label: "New Password",
                  placeholder: "Enter your new password",
                },
                {
                  key: "confirm",
                  label: "Confirm New Password",
                  placeholder: "Confirm your new password",
                },
              ] as const
            ).map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>

                <div className="relative">
                  <input
                    type={showPasswords[field.key] ? "text" : "password"}
                    required
                    minLength={field.key !== "current" ? 6 : undefined}
                    placeholder={field.placeholder}
                    value={passwords[field.key]}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        [field.key]: e.target.value,
                      })
                    }
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() => togglePassword(field.key)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer hover:text-primary-600 transition-colors"
                    aria-label={
                      showPasswords[field.key]
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPasswords[field.key] ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {field.key === "newPassword" && (
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 6 characters
                  </p>
                )}
              </div>
            ))}

            <div className="pt-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl hover:cursor-pointer bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/25"
              >
                <Lock size={17} />
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
