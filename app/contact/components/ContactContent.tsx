'use client';

import AppIcon from '@/app/components/ui/AppIcon';
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp} from "react-icons/fa";

const serviceOptions = [
  'Book a Fitting',
  'Prescription Glasses',
  'Sunglasses Inquiry',
  'Frame Repair',
  'Lens Replacement',
  'General Question',
];

const storeInfo = [
  {
    icon: 'MapPinIcon' as const,
    label: 'Visit Us',
    lines: ['Pokhrel Market, Behind Himalaya Medicine Store, Bhadrapur Road', 'Birtamod, Jhapa, Nepal'],
  },
  {
    icon: 'PhoneIcon' as const,
    label: 'Call Us',
    lines: ['+977 9804971647'],
  },
  {
    icon: 'EnvelopeIcon' as const,
    label: 'Email Us',
    lines: ['montya786@gmail.com'],
  },
  {
    icon: 'ClockIcon' as const,
    label: 'Hours',
    lines: ['Sun-Sat: 10am - 7pm', 'Mon: Closed'],
  },
];

const socials = [
  { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/monty_anari786?igsh=MXZyMmlwZWc0bDJxeA==' },
  { name: 'Facebook', icon: FaFacebookF, href: 'https://www.facebook.com/share/1ESiBxbhW3/' },
  { name: 'TikTok', icon: FaTiktok, href: 'https://www.tiktok.com/@himalayachasmagharbtm?_r=1&_t=ZS-96DN7h8CFaW' },
];

export default function ContactContent() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const message = `
        Name: ${form.name}
        Email: ${form.email}
        Phone: ${form.phone}
        Service: ${form.service}

        Message:
        ${form.message}
        `;

        const encodedMessage = encodeURIComponent(message);

        const whatsappURL = `https://wa.me/9779804971647?text=${encodedMessage}`;

        window.open(whatsappURL, "_blank");
    };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="pb-24 lg:pb-32">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* ── Contact Form (3/5) ── */}
          <div className="lg:col-span-3 reveal">
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-card border border-accent/20">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center mb-4">
                    <AppIcon name="CheckBadgeIcon" variant="solid" size={32} className="text-secondary" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-primary mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted text-base max-w-sm leading-relaxed">
                    Thanks for reaching out. Our team will get back to you within 2 hours during business hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }); }}
                    className="mt-6 btn-outline text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-semibold text-primary mb-2">
                    Send us a message
                  </h2>
                  <p className="text-muted text-sm mb-7">
                    Fill out the form and we&apos;ll be in touch shortly.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">
                          Full Name *
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Alex Johnson"
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">
                          Email *
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="alex@email.com"
                          className="form-input"
                        />
                      </div>
                    </div>

                    {/* Phone + Service */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">
                          Phone
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="(312) 555-0100"
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">
                          Service Needed
                        </label>
                        <select
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          className="form-input"
                        >
                          <option value="">Select a service…</option>
                          {serviceOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us how we can help you today…"
                        className="form-input resize-none"
                      />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
                        >
                        <FaWhatsapp className="text-[16px]" />
                        Send on WhatsApp
                    </button>

                    <p className="text-muted text-xs text-center">
                      We typically respond within 2 hours during business hours.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* ── Info Panel (2/5) ── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Store Info */}
            <div className="reveal reveal-delay-2 bg-primary rounded-3xl p-8">
              <h3 className="font-display text-xl font-semibold text-white mb-6">
                Store Information
              </h3>
              <div className="space-y-5">
                {storeInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-secondary/15 flex items-center justify-center flex-shrink-0">
                      <AppIcon name={info.icon} size={16} className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{info.label}</p>
                      {info.lines.map((line) => (
                        <p key={line} className="text-white/90 text-sm">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-7 pt-6 border-t border-white/10">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      aria-label={s.name}
                      className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center hover:bg-secondary/20 hover:border-secondary/30 transition-all"
                    >
                      <s.icon className="text-white/70 text-[15px]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="reveal reveal-delay-3 bg-accent/30 rounded-3xl overflow-hidden" style={{ height: 220 }}>
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 border-2 border-dashed border-accent">
                <AppIcon name="MapIcon" size={28} className="text-secondary" />
                <p className="text-muted text-sm font-medium">Pokhrel Market, Behind Himalaya Medicine Store,<br/> Bhadrapur Road,<br/> Birtamod, Jhapa, Nepal</p>
                <a
                  href="https://maps.app.goo.gl/pJ2vtTGDdBqpuH2U6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-secondary underline underline-offset-2 font-medium"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

            {/* Quick Booking CTA */}
            <div
              className="reveal reveal-delay-4 rounded-3xl p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(232,213,163,0.2) 100%)',
                border: '1.5px solid rgba(201,168,76,0.25)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <AppIcon name="CalendarDaysIcon" size={16} className="text-secondary" />
                </div>
                <p className="text-primary font-semibold text-sm">Prefer to call ahead?</p>
              </div>
              <p className="text-muted text-xs leading-relaxed mb-4">
                Call us directly to book same-day appointments or urgent repairs.
              </p>
              <a
                href="tel:+13125550192"
                className="btn-primary inline-flex items-center gap-2 text-xs py-2.5"
              >
                <AppIcon name="PhoneIcon" size={13} className="text-primary" />
                (+977) 9804971647
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}