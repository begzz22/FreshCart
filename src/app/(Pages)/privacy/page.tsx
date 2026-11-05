import Link from "next/link";
import {
  FaArrowLeft,
  FaClock,
  FaCookie,
  FaDatabase,
  FaEnvelope,
  FaLock,
  FaShareNodes,
  FaShieldHalved,
  FaUserCheck,
  FaUserShield,
} from "react-icons/fa6";

type Clause = string | { label: string; text: string };

type Article = {
  icon: React.ReactNode;
  title: string;
  clauses?: Clause[];
  text?: React.ReactNode;
};

const articles: Article[] = [
  {
    icon: <FaDatabase />,
    title: "Information We Collect",
    clauses: [
      {
        label: "Personal Data",
        text: "Name, email address, phone number, and shipping address.",
      },
      {
        label: "Payment Data",
        text: "Credit card information processed securely through our payment providers.",
      },
      {
        label: "Technical Data",
        text: "IP address, browser type, device information, and access times.",
      },
      {
        label: "Usage Data",
        text: "Pages viewed, products browsed, and actions taken within our platform.",
      },
    ],
  },
  {
    icon: <FaUserShield />,
    title: "How We Use Your Information",
    clauses: [
      "To process and fulfill your orders.",
      "To send order confirmations and shipping updates.",
      "To provide customer support and respond to inquiries.",
      "To improve our products, services, and user experience.",
      "To send promotional communications (with your consent).",
    ],
  },
  {
    icon: <FaLock />,
    title: "Data Protection",
    clauses: [
      "We implement industry-standard encryption (SSL/TLS) for all data transfers.",
      "Payment information is processed by PCI-compliant payment providers.",
      "We conduct regular security audits and vulnerability assessments.",
      "Access to personal data is restricted to authorized personnel only.",
    ],
  },
  {
    icon: <FaShareNodes />,
    title: "Information Sharing",
    clauses: [
      "We do not sell, trade, or rent your personal information to third parties.",
      "We may share data with trusted service providers who assist in our operations.",
      "We may disclose information when required by law or to protect our rights.",
    ],
  },
  {
    icon: <FaUserCheck />,
    title: "Your Rights",
    clauses: [
      { label: "Access", text: "Request a copy of your personal data." },
      {
        label: "Rectification",
        text: "Request correction of inaccurate data.",
      },
      { label: "Erasure", text: "Request deletion of your personal data." },
      { label: "Portability", text: "Request your data in a portable format." },
      {
        label: "Opt-out",
        text: "Unsubscribe from marketing communications at any time.",
      },
    ],
  },
  {
    icon: <FaCookie />,
    title: "Cookies",
    clauses: [
      "We use cookies to enhance your browsing experience and remember preferences.",
      "You can control cookie settings through your browser preferences.",
      "Disabling cookies may affect the functionality of certain features.",
    ],
  },
  {
    icon: <FaClock />,
    title: "Data Retention",
    text: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Account data is deleted within 30 days of account closure upon request.",
  },
  {
    icon: <FaEnvelope />,
    title: "Contact Us",
    text: (
      <>
        For questions about this Privacy Policy or to exercise your rights,
        contact our Data Protection Officer at{" "}
        <a
          href="mailto:privacy@freshcart.com"
          className="text-primary-600 hover:text-primary-700 font-semibold hover:underline"
        >
          privacy@freshcart.com
        </a>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero */}
      <div className="bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
            <Link
              href="/"
              className="hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Privacy Policy</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-primary-900/30 ring-1 ring-white/30">
              <FaShieldHalved className="text-4xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-white/80 mt-2 text-lg">
                Last updated: February 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Notice */}
        <div className="bg-linear-to-r from-primary-50 to-primary-100/50 border border-primary-200 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-500 flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/25">
              <FaShieldHalved className="text-xl text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary-900 mb-2">
                Your Privacy Matters
              </h2>
              <p className="text-primary-800 leading-relaxed">
                This Privacy Policy describes how FreshCart collects, uses, and
                protects your personal information when you use our services. We
                are committed to ensuring that your privacy is protected.
              </p>
            </div>
          </div>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {articles.map((article, index) => {
            const num = index + 1;
            return (
              <section
                key={article.title}
                className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-primary-100 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center shrink-0 text-xl text-primary-600 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                    {article.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">
                      Article {num}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900">
                      {article.title}
                    </h2>
                  </div>
                </div>

                {article.clauses && (
                  <div className="space-y-3">
                    {article.clauses.map((clause, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-gray-600 leading-relaxed"
                      >
                        <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                          {num}.{i + 1}
                        </span>
                        <p className="text-sm">
                          {typeof clause === "string" ? (
                            clause
                          ) : (
                            <>
                              <strong className="text-gray-800">
                                {clause.label}:{" "}
                              </strong>
                              {clause.text}
                            </>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {article.text && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {article.text}
                  </p>
                )}
              </section>
            );
          })}
        </div>

        {/* Footer buttons */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition-all duration-200"
            >
              <FaArrowLeft className="text-sm" />
              Back to Home
            </Link>

            <Link
              href="/terms"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white hover:bg-primary-600 font-medium shadow-lg shadow-primary-500/25 transition-all duration-200"
            >
              View Terms of Service
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
