import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const banners = [
  {
    badge: "🔥 Deal of the Day",
    title: "Fresh Organic Fruits",
    text: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    cta: "Shop Now",
    href: "/products",
    gradient: "from-emerald-500 to-emerald-700",
    btnText: "text-emerald-600",
  },
  {
    badge: "✨ New Arrivals",
    title: "Exotic Vegetables",
    text: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    cta: "Explore Now",
    href: "/products?sort=newest",
    gradient: "from-orange-400 to-rose-500",
    btnText: "text-orange-500",
  },
];

const PromoBanners = () => (
  <section className="py-10">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-6">
        {banners.map((b) => (
          <div
            key={b.code}
            className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${b.gradient} p-8 text-white`}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                {b.badge}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{b.title}</h3>
              <p className="text-white/80 mb-4">{b.text}</p>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold">{b.discount}</div>
                <div className="text-sm text-white/70">
                  Use code:{" "}
                  <span className="font-bold text-white">{b.code}</span>
                </div>
              </div>

              <Link
                href={b.href}
                className={`inline-flex items-center gap-2 bg-white ${b.btnText} px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors`}
              >
                {b.cta}
                <FaArrowRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PromoBanners;
