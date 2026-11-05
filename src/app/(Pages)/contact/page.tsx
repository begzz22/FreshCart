"use client";

import PageHeader from "@/app/_Components/PageHeader/PageHeader";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Headset,
  Send,
  CircleHelp,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaHeadset,
} from "react-icons/fa6";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    description: "Mon-Fri from 8am to 6pm",
    value: "+1 (800) 123-4567",
    href: "tel:+18001234567",
  },
  {
    icon: Mail,
    title: "Email",
    description: "We'll respond within 24 hours",
    value: "support@freshcart.com",
    href: "mailto:support@freshcart.com",
  },
];

const socials = [
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaXTwitter, label: "X" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaLinkedinIn, label: "LinkedIn" },
];

const inputClass =
  "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20";

const Contact = () => {
  return (
    <>
      {" "}
      <PageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you. Get in touch with our team."
        icon={FaHeadset}
      />
      <main className="min-h-screen bg-gray-50">
        

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-1">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                        <Icon className="text-primary-600" size={21} />
                      </div>

                      <div>
                        <h3 className="mb-1 font-semibold text-gray-900">
                          {item.title}
                        </h3>

                        <p className="mb-2 text-sm text-gray-500">
                          {item.description}
                        </p>

                        <a
                          href={item.href}
                          className="font-medium text-primary-600 hover:underline"
                        >
                          {item.value}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                    <MapPin className="text-primary-600" size={21} />
                  </div>

                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Office</h3>

                    <p className="text-sm leading-6 text-gray-500">
                      123 Commerce Street
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                    <Clock className="text-primary-600" size={21} />
                  </div>

                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">
                      Business Hours
                    </h3>

                    <p className="text-sm leading-6 text-gray-500">
                      Monday - Friday: 8am - 6pm
                      <br />
                      Saturday: 9am - 4pm
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-semibold text-gray-900">Follow Us</h3>

                <div className="flex items-center gap-3">
                  {socials.map((social) => {
                    const Icon = social.icon;

                    return (
                      <a
                        key={social.label}
                        href="#"
                        aria-label={social.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-primary-600 hover:text-white"
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                    <Headset className="text-primary-600" size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Send us a Message
                    </h2>

                    <p className="text-sm text-gray-500">
                      Fill out the form and we'll get back to you
                    </p>
                  </div>
                </div>

                <form
                  className="space-y-5"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Subject
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      required
                      defaultValue=""
                      className={`${inputClass} bg-white`}
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="shipping">Shipping Question</option>
                      <option value="returns">Returns & Refunds</option>
                      <option value="product">Product Information</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="How can we help you?"
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-8 py-3.5 font-semibold text-white shadow-sm shadow-primary-600/20 transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
                  >
                    <Send size={17} />
                    Send Message
                  </button>
                </form>
              </div>

              <div className="mt-6 rounded-2xl border border-primary-100 bg-primary-50 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    <CircleHelp className="text-primary-600" size={23} />
                  </div>

                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">
                      Looking for quick answers?
                    </h3>

                    <p className="mb-3 text-sm leading-6 text-gray-600">
                      Check out our Help Center for frequently asked questions
                      about orders, shipping, returns, and more.
                    </p>

                    <a
                      href="/help"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:underline"
                    >
                      Visit Help Center →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
