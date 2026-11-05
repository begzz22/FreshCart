import Image from "next/image";
import Link from "next/link";
import image from "../../../../public/images/FreshCart.png";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Headset,
  Phone,
  Mail,
  MapPin,
  CreditCard,
} from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const features = [
  { icon: Truck, title: "Free Shipping", text: "On orders over 500 EGP" },
  { icon: RotateCcw, title: "Easy Returns", text: "14-day return policy" },
  { icon: ShieldCheck, title: "Secure Payment", text: "100% secure checkout" },
  { icon: Headset, title: "24/7 Support", text: "Contact us anytime" },
];

const socials = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
      {
        label: "Electronics",
        href: "/products?category=6439d58a0049ad0b52b9003f",
      },
      {
        label: "Men's Fashion",
        href: "/products?category=6439d2d167d9aa4ca970649f",
      },
      {
        label: "Women's Fashion",
        href: "/products?category=6439d5b90049ad0b52b90048",
      },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/profile" },
      { label: "Order History", href: "/profile/orders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/register" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Track Order", href: "/track-order" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const payments = ["Visa", "Mastercard", "PayPal"];

export default function Footer() {
  return (
    <>
      {/* Features strip */}
      <section className="bg-primary-50 border-y border-primary-100">
        <div className="container mx-auto px-4 py-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                  <Icon
                    className="text-primary-600 size-5"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {title}
                  </h4>
                  <p className="text-gray-500 text-xs">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-6">
                <div className="bg-white rounded-lg px-4 py-2 inline-block">
                  <Image
                    src={image}
                    alt="FreshCart Logo"
                    width={160}
                    height={31}
                    className="h-8 w-auto"
                  />
                </div>
              </Link>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                FreshCart is your one-stop destination for quality products.
                From fashion to electronics, we bring you the best brands at
                competitive prices with a seamless shopping experience.
              </p>

              <div className="space-y-3 mb-6 text-sm text-gray-400">
                <a
                  href="tel:+18001234567"
                  className="flex items-center gap-3 hover:text-primary-400 transition-colors"
                >
                  <Phone className="size-4 text-primary-500" />
                  <span className="hover:text-green-500">
                    +1 (800) 123-4567
                  </span>
                </a>
                <a
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-3 hover:text-primary-400 transition-colors "
                >
                  <Mail className="size-4 text-primary-500" />
                  <span className="hover:text-green-500">
                    support@freshcart.com
                  </span>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin className="size-4 text-primary-500 mt-0.5" />
                  <span>123 Commerce Street, New York, NY 10001</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {columns.map(({ title, links }) => (
              <div key={title} className="lg:col-span-2">
                <h3 className="font-semibold text-lg mb-5">{title}</h3>
                <ul className="space-y-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="font-bold text-gray-400 hover:text-green-500 transition-colors text-sm"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2026 FreshCart. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {payments.map((p) => (
                <div
                  key={p}
                  className="flex items-center gap-2 text-gray-500 text-sm"
                >
                  <CreditCard className="size-4" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
