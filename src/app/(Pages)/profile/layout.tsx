import PageHeader from "@/app/_Components/PageHeader/PageHeader";
import { User } from "lucide-react";
import Link from "next/link";
import { MapPin, Settings, ChevronRight } from "lucide-react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader
        title="My Account"
        subtitle="Manage your addresses and account settings"
        icon={User}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="w-full lg:w-72 shrink-0">
            <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">My Account</h2>
              </div>

              <ul className="p-2 space-y-1">
                <li>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                      <MapPin size={17} />
                    </div>
                    <span className="font-medium flex-1">My Addresses</span>
                    <ChevronRight size={16} />
                  </Link>
                </li>

                <li>
                  <Link
                    href="/profile/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Settings size={17} />
                    </div>
                    <span className="font-medium flex-1">Settings</span>
                    <ChevronRight size={16} />
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </>
  );
}
