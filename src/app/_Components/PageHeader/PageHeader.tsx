import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaBoxOpen } from "react-icons/fa6";

type Crumb = { label: string; href: string };

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  icon?: IconType;
  image?: string;
  crumbs?: Crumb[];
  crumbLabel?: string;
  gradient?: string;
};

export default function PageHeader({
  title,
  subtitle,
  icon: Icon = FaBoxOpen,
  image,
  crumbs = [],
  crumbLabel,
  gradient = "from-primary-600 via-primary-500 to-primary-400",
}: PageHeaderProps) {
  return (
    <div className={`bg-linear-to-br ${gradient} text-white`}> 
      <div className="container mx-auto px-4 py-10 sm:py-14">
        <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.href} className="flex items-center gap-2">
              <span className="text-white/40">/</span>
              <Link
                href={c.href}
                className="hover:text-white transition-colors"
              >
                {c.label}
              </Link>
            </span>
          ))}
          <span className="text-white/40">/</span>
          <span className="text-white font-medium">{crumbLabel ?? title}</span>
        </nav>

        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden">
            {image ? (
              <Image
                src={image}
                alt={title}
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
            ) : (
              <Icon className="text-3xl" aria-hidden="true" />
            )}
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {title}
            </h1>
            {subtitle && <p className="text-white/80 mt-1">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
