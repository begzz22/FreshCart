"use client";

import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

type Props = {
  max: number;
  price: number;
  onChange?: (count: number) => void;
};

export default function QuantitySelector({ max, price, onChange }: Props) {
  const [count, setCount] = useState(1);

  const update = (value: number) => {
    const safe = Math.min(Math.max(value || 1, 1), max);
    setCount(safe);
    onChange?.(safe);
  };

  return (
    <>
      <div className="mb-6">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Quantity
        </label>

        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              id="decrease-qty"
              aria-label="Decrease quantity"
              onClick={() => update(count - 1)}
              disabled={count <= 1}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaMinus />
            </button>

            <input
              id="quantity"
              type="number"
              min={1}
              max={max}
              value={count}
              onChange={(e) => update(Number(e.target.value))}
              className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
            />

            <button
              type="button"
              id="increase-qty"
              aria-label="Increase quantity"
              onClick={() => update(count + 1)}
              disabled={count >= max}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPlus />
            </button>
          </div>

          <span className="text-sm text-gray-500">{max} available</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Price:</span>
          <span className="text-2xl font-bold text-primary-600">
            {(price * count).toFixed(2)} EGP
          </span>
        </div>
      </div>
    </>
  );
}
