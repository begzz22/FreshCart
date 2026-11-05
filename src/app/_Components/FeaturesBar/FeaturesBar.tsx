import {
  FaTruck,
  FaShieldHalved,
  FaArrowRotateLeft,
  FaHeadset,
} from "react-icons/fa6";

const features = [
  {
    title: "Free Shipping",
    text: "On orders over 500 EGP",
    Icon: FaTruck,
    color: "bg-blue-50 text-blue-500",
  },
  {
    title: "Secure Payment",
    text: "100% secure transactions",
    Icon: FaShieldHalved,
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    title: "Easy Returns",
    text: "14-day return policy",
    Icon: FaArrowRotateLeft,
    color: "bg-orange-50 text-orange-500",
  },
  {
    title: "24/7 Support",
    text: "Dedicated support team",
    Icon: FaHeadset,
    color: "bg-purple-50 text-purple-500",
  },
];

const FeaturesBar = () => (
  <section className="py-8 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map(({ title, text, Icon, color }) => (
          <div
            key={title}
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div
              className={`${color} w-12 h-12 rounded-full flex items-center justify-center shrink-0`}
            >
              <Icon className="text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
              <p className="text-xs text-gray-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesBar;
