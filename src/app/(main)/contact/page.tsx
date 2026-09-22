import type { Metadata } from "next";
import { MapPin, Mail, Clock, Share2, Globe, Play, MessageCircle } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Elevo Community.",
};

const socialLinks = [
  { icon: Share2, label: "Instagram", href: SOCIAL_LINKS.instagram },
  { icon: Globe, label: "Facebook", href: SOCIAL_LINKS.facebook },
  { icon: Play, label: "YouTube", href: SOCIAL_LINKS.youtube },
  { icon: MessageCircle, label: "WhatsApp", href: SOCIAL_LINKS.whatsapp },
];

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="section-sm bg-white border-b border-border">
        <div className="container-main">
          <div className="section-tag mb-4">Contact</div>
          <h1 className="text-dark-text mb-2">Get in <span className="text-forest">Touch</span></h1>
          <p className="text-dark-text/60 max-w-xl">
            Whether you want to join, collaborate, or just say hello — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card-flat">
                <h2 className="text-lg font-semibold text-dark-text mb-6">Send us a Message</h2>
                <form className="space-y-4" aria-label="Contact form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-dark-text mb-1.5">
                        Full Name <span className="text-forest">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-dark-text mb-1.5">
                        Email Address <span className="text-forest">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="input"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-dark-text mb-1.5">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="input"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-dark-text mb-1.5">
                      Subject <span className="text-forest">*</span>
                    </label>
                    <select id="subject" className="input" required defaultValue="">
                      <option value="" disabled>Select a subject</option>
                      <option>Membership Enquiry</option>
                      <option>Event Information</option>
                      <option>Sponsorship / Collaboration</option>
                      <option>Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-dark-text mb-1.5">
                      Message <span className="text-forest">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Write your message here..."
                      className="input resize-none"
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-5">
              {/* Contact details */}
              <div className="card-flat space-y-4">
                <h3 className="text-base font-semibold text-dark-text">Contact Details</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-mint-fog flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-forest" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-dark-text">Address</p>
                      <p className="text-sm text-muted mt-0.5">Elevo, Kerala, India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-mint-fog flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-forest" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-dark-text">Email</p>
                      <a href="mailto:contact@Elevo.in" className="text-sm text-forest hover:underline mt-0.5 block">
                        contact@Elevo.in
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-mint-fog flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-forest" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-dark-text">Office Hours</p>
                      <p className="text-sm text-muted mt-0.5">Mon–Sat, 9 AM – 6 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="card-flat">
                <h3 className="text-base font-semibold text-dark-text mb-4">Follow Us</h3>
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-border hover:bg-mint-fog hover:border-forest/20 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4 text-forest" />
                      <span className="text-sm font-medium text-dark-text">{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Join card */}
              <div className="bg-forest text-white rounded-2xl p-5">
                <h3 className="font-semibold mb-2">Want to Join Elevo?</h3>
                <p className="text-sm text-white/70 mb-4">
                  Fill out the form and select &quot;Membership Enquiry&quot; — we&apos;ll get back to you within 24 hours.
                </p>
                <div className="text-xs text-white/50">Membership is free for all Elevo youth (15–35 years)</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
