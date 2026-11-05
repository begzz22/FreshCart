"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (address: {
    name: string;
    address: string;
    phone: string;
    city: string;
  }) => void;
}

const AddAddressModal = ({ isOpen, onClose, onAdd }: AddAddressModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    city: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAdd(formData);

    setFormData({
      name: "",
      address: "",
      phone: "",
      city: "",
    });

    onClose();
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Add New Address</h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Address Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Home, Office"
              className={inputClass}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Address
            </label>
            <textarea
              required
              rows={3}
              placeholder="Street, building, apartment..."
              className={`${inputClass} resize-none`}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="01xxxxxxxxx"
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
                placeholder="Cairo"
                className={inputClass}
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-gray-100 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-600/25 transition-colors hover:bg-primary-700"
            >
              Add Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal;
