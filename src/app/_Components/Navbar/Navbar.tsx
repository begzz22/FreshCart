"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  FaMagnifyingGlass,
  FaChevronDown,
  FaHeadset,
  FaCartShopping,
  FaBars,
  FaXmark,
  FaRegHeart,
  FaRegUser,
  FaRegCircleUser,
  FaBoxOpen,
  FaRegAddressBook,
  FaGear,
  FaRightFromBracket,
} from "react-icons/fa6";
import logo from "../../../../public/images/FreshCart.png";
import { cartContext } from "@/Context/CartContext";
import { useWishlist } from "@/Context/WishlistContext";
import { useRouter } from "next/navigation";

const categories = [
  { name: "All Categories", href: "/categories" },
  { name: "Electronics", href: "/products?category=6439d58a0049ad0b52b9003f" },
  {
    name: "Women's Fashion",
    href: "/products?category=6439d5b90049ad0b52b90048",
  },
  {
    name: "Men's Fashion",
    href: "/products?category=6439d2d167d9aa4ca970649f",
  },
  {
    name: "Beauty & Health",
    href: "/products?category=6439d40367d9aa4ca97064a8",
  },
];

const accountItems = [
  { label: "My Profile", href: "/profile", Icon: FaRegUser },
  { label: "My Orders", href: "/allorders", Icon: FaBoxOpen },
  { label: "My Wishlist", href: "/wishlist", Icon: FaRegHeart },
  { label: "Addresses", href: "/profile/addresses", Icon: FaRegAddressBook },
  { label: "Settings", href: "/profile/settings", Icon: FaGear },
];

const navLink =
  "text-gray-700 hover:text-primary-600 font-medium transition-colors";
const iconBtn =
  "relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group";
const iconCls =
  "text-xl text-gray-500 group-hover:text-primary-600 transition-colors";

const Navbar = () => {
  const { status, data } = useSession();
  const { totalCartItems } = useContext(cartContext);
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const authed = status === "authenticated";

  const { items } = useWishlist();

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(e.target as Node)
      ) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-18 gap-4 lg:gap-8">
          <Link href="/" className="shrink-0">
            <Image
              src={logo}
              alt="FreshCart"
              width={160}
              height={31}
              priority
              className="h-6 lg:h-8 w-auto"
            />
          </Link>

          {authed && (
            <form
              onSubmit={(e) => {
                e.preventDefault();

                const query = searchTerm.trim();

                if (!query) return;

                router.push(`/search?query=${encodeURIComponent(query)}`);
                setSearchTerm("");
              }}
              className="hidden lg:flex flex-1 max-w-2xl"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  className="w-full px-5 py-3 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                />

                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors"
                >
                  <FaMagnifyingGlass className="text-sm" />
                </button>
              </div>
            </form>
          )}

          {authed && (
            <nav className="hidden xl:flex items-center gap-6">
              <Link href="/" className={navLink}>
                Home
              </Link>
              <Link href="/products" className={navLink}>
                Shop
              </Link>

              <div className="relative group">
                <button
                  type="button"
                  className={`flex items-center hover:cursor-pointer gap-1.5 py-2 ${navLink}`}
                >
                  Categories
                  <FaChevronDown className="text-[10px] transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-50">
                    {categories.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/brands" className={navLink}>
                Brands
              </Link>
            </nav>
          )}

          <div className="flex items-center gap-1 lg:gap-2">
            {authed && (
              <>
                <Link
                  href="/contact"
                  className="hidden lg:flex items-center gap-2 pr-3 mr-2 border-r border-gray-200 hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                    <FaHeadset className="text-primary-600" />
                  </div>
                  <div className="text-xs">
                    <div className="text-gray-400">Support</div>
                    <div className="font-semibold text-gray-700">24/7 Help</div>
                  </div>
                </Link>

                <Link href="/wishlist" title="Wishlist" className={iconBtn}>
                  <FaRegHeart className={iconCls} />
                  {items.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full bg-red-600 text-white text-[10px] font-semibold flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </Link>

                <Link href="/cart" title="Cart" className={iconBtn}>
                  <FaCartShopping className={iconCls} />
                  {totalCartItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full bg-primary-600 text-white text-[11px] font-semibold flex items-center justify-center">
                      {totalCartItems}
                    </span>
                  )}
                </Link>

                {/* Account dropdown */}
                <div ref={accountRef} className="hidden lg:block relative">
                  <button
                    onClick={() => setAccountOpen((v) => !v)}
                    title="Account"
                    className={`${iconBtn} cursor-pointer`}
                  >
                    <FaRegCircleUser className={iconCls} />
                  </button>

                  <div
                    className={`absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl transition-all duration-200 origin-top-right ${
                      accountOpen
                        ? "opacity-100 scale-100 visible"
                        : "opacity-0 scale-95 invisible"
                    }`}
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <FaRegCircleUser className="text-xl text-primary-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {data?.user?.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {data?.user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      {accountItems.map(({ label, href, Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        >
                          <Icon className="w-4 text-gray-400" />
                          {label}
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-gray-100 py-2">
                      <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left cursor-pointer"
                      >
                        <FaRightFromBracket className="w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {status === "unauthenticated" && (
              <Link
                href="/login"
                className="hidden lg:flex items-center gap-2 ml-2 px-5 py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-primary-600/20"
              >
                <FaRegUser className="text-xs" /> Sign In
              </Link>
            )}

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="xl:hidden ml-1 w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-colors"
            >
              {open ? <FaXmark /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden border-t border-gray-100 bg-white">
          <div className="container mx-auto px-4 py-3 flex flex-col">
            {(authed
              ? [
                  ["Home", "/"],
                  ["Shop", "/products"],
                  ["Categories", "/categories"],
                  ["Brands", "/brands"],
                  ["Orders", "/allorders"],
                  ["Wishlist", "/wishlist"],
                  ["Cart", "/cart"],
                  ["Contact", "/contact"],
                ]
              : [
                  ["Sign In", "/login"],
                  ["Register", "/register"],
                ]
            ).map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-3 text-gray-700 hover:text-primary-600 font-medium border-b border-gray-50"
              >
                {label}
              </Link>
            ))}
            {authed && (
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="mt-3 py-3 rounded-full bg-gray-900 text-white font-semibold"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
