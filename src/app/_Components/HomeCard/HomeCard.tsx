import { Product } from "@/types/product.t";
import Link from "next/link";
import { FaStar, FaRegStar, FaStarHalfStroke } from "react-icons/fa6";
import { FaRegEye, FaArrowsRotate } from "react-icons/fa6";
import CartBtn from "../CartBtn/CartBtn";
import WishlistBtn from "../WishlistBtn/WishlistBtn";

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfStroke key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }
  return stars;
};

const HomeCard = ({ product }: { product: Product }) => {
  const hasDiscount =
    typeof product.priceAfterDiscount === "number" &&
    product.priceAfterDiscount < product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100,
      )
    : 0;

  return (
    <div className="product">
      <div className="h-full bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-6px_rgba(0,0,0,0.15)]">
        {/* Image + badges + action buttons */}
        <div className="relative">
          <img
            className="w-full h-60 object-contain bg-white"
            alt={product.title}
            src={product.imageCover}
          />

          {hasDiscount && (
            <div className="absolute top-3 left-3">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{discountPercent}%
              </span>
            </div>
          )}

          <div className="absolute top-3 right-3 flex flex-col space-y-2">
            <WishlistBtn id={product.id} />

            <button
              type="button"
              title="Compare"
              className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-[#009966] shadow-sm"
            >
              <FaArrowsRotate size={14} />
            </button>

            <Link
              href={`/productDetails/${product.id}`}
              title="View details"
              className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-[#009966] shadow-sm"
            >
              <FaRegEye size={14} />
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">
            {product.category.name}
          </div>

          <h3 className="font-medium mb-1 cursor-pointer" title={product.title}>
            <Link
              className="line-clamp-2"
              href={`/productDetails/${product.id}`}
            >
              {product.title}
            </Link>
          </h3>

          <div className="flex items-center mb-2">
            <div className="flex text-amber-400 mr-2 text-sm">
              {renderStars(product.ratingsAverage)}
            </div>
            <span className="text-xs text-gray-500">
              {product.ratingsAverage} ({product.ratingsQuantity})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              {hasDiscount ? (
                <>
                  <span className="text-lg font-bold text-[#009966]">
                    {product.priceAfterDiscount} EGP
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {product.price} EGP
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-800">
                  {product.price} EGP
                </span>
              )}
            </div>
            <CartBtn id={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
