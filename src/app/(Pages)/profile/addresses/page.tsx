"use client";

import { useState } from "react";
import {
  MapPin,
  Plus,
  X,
  Home,
  Briefcase,
  Trash2,
  Phone,
  User,
} from "lucide-react";

type Address = {
  id: number;
  type: "home" | "work";
  name: string;
  phone: string;
  city: string;
  street: string;
};

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addresses, setAddresses] = useState<Address[]>([]);

  const [formData, setFormData] = useState({
    type: "home" as "home" | "work",
    name: "",
    phone: "",
    city: "",
    street: "",
  });

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20";

  const resetForm = () => {
    setFormData({ type: "home", name: "", phone: "", city: "", street: "" });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newAddress: Address = {
      id: Date.now(),
      ...formData,
    };

    setAddresses((prev) => [...prev, newAddress]);

    closeModal();
  };

  const deleteAddress = (id: number) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id));
  };

  return (
    <>
      {" "}
      <div>
        {" "}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          {" "}
          <div>
            {" "}
            <h2 className="text-xl font-bold text-gray-900"> My Addresses </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your saved delivery addresses
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl hover:cursor-pointer bg-primary-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-primary-600/25 transition-colors hover:bg-primary-700"
          >
            <Plus size={17} />
            Add Address
          </button>
        </div>
        {addresses.length === 0 ? (
          <div className="rounded-3xl border border-gray-100 bg-white p-8 text-center sm:p-12">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <MapPin size={32} className="text-gray-400" />
            </div>

            <h3 className="mb-2 text-lg font-bold text-gray-900">
              No Addresses Yet
            </h3>

            <p className="mx-auto mb-6 max-w-sm text-gray-500">
              Add your first delivery address to make checkout faster and
              easier.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl hover:cursor-pointer bg-primary-600 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-600/25 transition-colors hover:bg-primary-700"
            >
              <Plus size={18} />
              Add Your First Address
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {addresses.map((address) => {
              const Icon = address.type === "home" ? Home : Briefcase;

              return (
                <div
                  key={address.id}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                        <Icon size={22} />
                      </div>

                      <div>
                        <h3 className="font-bold capitalize text-gray-900">
                          {address.type}
                        </h3>

                        <p className="text-xs text-gray-500">
                          Delivery Address
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteAddress(address.id)}
                      aria-label="Delete address"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="space-y-3 border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <User size={16} className="text-gray-400" />
                      {address.name}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Phone size={16} className="text-gray-400" />
                      {address.phone}
                    </div>

                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <MapPin
                        size={16}
                        className="mt-0.5 shrink-0 text-gray-400"
                      />

                      <span>
                        {address.street}, {address.city}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
          onClick={closeModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Add New Address
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Enter your delivery information
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
              >
                <X size={19} />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Address Type
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "home" })}
                    className={`flex items-center gap-2 rounded-xl border p-3 transition-colors ${
                      formData.type === "home"
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-200 text-gray-600 hover:border-primary-300"
                    }`}
                  >
                    <Home size={18} />
                    <span className="text-sm font-medium">Home</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "work" })}
                    className={`flex items-center gap-2 rounded-xl border p-3 transition-colors ${
                      formData.type === "work"
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-200 text-gray-600 hover:border-primary-300"
                    }`}
                  >
                    <Briefcase size={18} />
                    <span className="text-sm font-medium">Work</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  className={inputClass}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  className={inputClass}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  City
                </label>

                <input
                  type="text"
                  required
                  placeholder="Enter your city"
                  className={inputClass}
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Street Address
                </label>

                <textarea
                  required
                  rows={3}
                  placeholder="Enter your street address"
                  className={`${inputClass} resize-none`}
                  value={formData.street}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-600 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
