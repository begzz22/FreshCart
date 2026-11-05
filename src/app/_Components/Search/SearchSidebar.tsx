
"use client";

type Props = {
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
  selectedBrands: string[];
  setSelectedBrands: (value: string[]) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
};

const categories = [
  "Music",
  "Men's Fashion",
  "Women's Fashion",
  "SuperMarket",
  "Baby & Toys",
  "Home",
  "Books",
  "Beauty & Health",
  "Mobiles",
  "Electronics",
];

const brands = [
  "Canon", "Dell", "Lenovo", "SONY", "Infinix",
  "Realme", "HONOR", "Nokia", "OPPO", "Huawei",
  "Apple", "Xiaomi", "Samsung", "Jack & Jones", "LC Waikiki",
];

const priceOptions = [
  { label: "Under 500", value: 500 },
  { label: "Under 1K", value: 1000 },
  { label: "Under 5K", value: 5000 },
  { label: "Under 10K", value: 10000 },
];

export default function SearchSidebar({
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: Props) {
  function toggleItem(
    value: string,
    selected: string[],
    setSelected: (value: string[]) => void,
  ) {
    setSelected(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  }

  return (
    <aside className="w-64 shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="space-y-6">

          {/* Categories */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Categories</h3>

            <div className="space-y-2 max-h-52 overflow-y-auto">
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() =>
                      toggleItem(category, selectedCategories, setSelectedCategories)
                    }
                    className="w-4 h-4 rounded border-gray-300 text-primary-600"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Price */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Min (EGP)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Max (EGP)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="No limit"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {priceOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setMinPrice("");
                    setMaxPrice(String(option.value));
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    maxPrice === String(option.value)
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Brands */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Brands</h3>

            <div className="space-y-2 max-h-52 overflow-y-auto">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() =>
                      toggleItem(brand, selectedBrands, setSelectedBrands)
                    }
                    className="w-4 h-4 rounded border-gray-300 text-primary-600"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>

        </div>
      </div>
    </aside>
  );
}
