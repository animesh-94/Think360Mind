'use client';

import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Building2,
  Sparkles,
} from 'lucide-react';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  serviceInterest: string;
  budgetRange: string;
  message: string;
}

export function ContactFormGridWithDetails() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    serviceInterest: '360° Growth Audit (All Pods)',
    budgetRange: '$5,000 - $15,000 / mo',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setStatus('error');
      setErrorMessage('Please provide your full first and last name.');
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setStatus('error');
      setErrorMessage('Please provide a valid work email address.');
      return;
    }

    if (!formData.website.trim() && !formData.company.trim()) {
      setStatus('error');
      setErrorMessage('Please provide your company name or website URL.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 550);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] shadow-2xl">
      {/* Grid Pattern Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 min-h-[720px]">
        {/* Left Column: Contact Details, Studio Hubs & Agency Metadata */}
        <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-8 sm:p-12 lg:p-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[var(--text-primary)]">
              <Sparkles className="size-3.5" aria-hidden="true" />
              <span>START A TRANSFORMATION</span>
            </div>

            <h2 className="mt-4 font-sans text-3xl sm:text-5xl font-bold tracking-[-0.035em] text-[var(--text-primary)] leading-[1.08]">
              Let&apos;s build your category leader.
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Whether you need full-funnel media buying, a bespoke headless storefront, cinema-grade video, or high-intent SEO, our practice leads review your architecture before our call.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)] shadow-xs">
                  <Mail className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    DIRECT BRIEF INBOX
                  </div>
                  <a
                    href="mailto:partnerships@think360media.com"
                    className="mt-1 block text-sm sm:text-base font-bold text-[var(--text-primary)] hover:underline"
                  >
                    partnerships@think360media.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)] shadow-xs">
                  <Phone className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    GLOBAL STRATEGY DESK
                  </div>
                  <a
                    href="tel:+912248903600"
                    className="mt-1 block text-sm sm:text-base font-bold text-[var(--text-primary)] hover:underline"
                  >
                    +91 (022) 4890 3600
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)] shadow-xs">
                  <MapPin className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    STUDIOS &amp; SOUNDSTAGES
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-primary)] font-semibold leading-relaxed">
                    Mumbai HQ • Bengaluru Tech Studio • New Delhi Media Lab
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Active delivery across North America, Europe, MENA &amp; APAC
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)] shadow-xs">
                  <Clock className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    RESPONSE COMMITMENT
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-primary)] font-semibold">
                    Written audit teardown delivered in 24 to 48 hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[var(--border-hairline)]">
            <div className="flex items-center gap-3">
              <Building2 className="size-5 text-[var(--text-muted)] shrink-0" aria-hidden="true" />
              <span className="text-xs text-[var(--text-muted)] font-mono">
                THINK360 MEDIA // INTEGRATED OS #360
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Structured Grid Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
          <div>
            <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Send Us Your Brief
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)]">
              Fill out the details below. All fields marked with * are required for the strategy team to review your brand.
            </p>

            {status === 'error' && (
              <div
                role="alert"
                className="mt-6 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs sm:text-sm text-red-600 dark:text-red-400"
              >
                <AlertCircle className="size-5 shrink-0" aria-hidden="true" />
                <div>
                  <strong className="block font-bold">Please check your inputs</strong>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            {status === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center"
              >
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500 text-white mb-4">
                  <CheckCircle2 className="size-7" aria-hidden="true" />
                </div>
                <h4 className="font-sans text-2xl font-bold text-[var(--text-primary)]">
                  Brief Logged Successfully!
                </h4>
                <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                  Thank you, <strong className="text-[var(--text-primary)]">{formData.firstName}</strong>. Our practice leads have received your submission for <strong className="text-[var(--text-primary)]">{formData.company || formData.website}</strong> and will follow up at <strong className="text-[var(--text-primary)]">{formData.email}</strong> within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 inline-flex min-h-[46px] items-center gap-2 rounded-full bg-black text-white dark:bg-white dark:text-black px-7 py-3 text-xs font-bold"
                >
                  Submit Another Project
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Animesh"
                      className="min-h-[48px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--text-primary)] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Sharma"
                      className="min-h-[48px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--text-primary)] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                    >
                      Work Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="min-h-[48px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--text-primary)] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="min-h-[48px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--text-primary)] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                    >
                      Company or Brand
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Bellurét Paris"
                      className="min-h-[48px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--text-primary)] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="website"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                    >
                      Brand URL or Storefront *
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      required
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourbrand.com"
                      className="min-h-[48px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--text-primary)] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="serviceInterest"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                    >
                      Primary Practice Focus
                    </label>
                    <select
                      id="serviceInterest"
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleChange}
                      className="min-h-[48px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--text-primary)] focus:outline-hidden"
                    >
                      <option value="360° Growth Audit (All Pods)">
                        Full 360° Growth Audit (All 10 Pods)
                      </option>
                      <option value="Brand Strategy & Design Systems">
                        Brand Strategy &amp; Design Systems
                      </option>
                      <option value="Commerce & Headless Next.js">
                        Commerce &amp; Headless Next.js Storefronts
                      </option>
                      <option value="Paid Media (Google PMax & Meta)">
                        Paid Media (Google PMax &amp; Meta Advantage+)
                      </option>
                      <option value="Technical SEO & Generative Engine Optimization">
                        Technical SEO &amp; AI Search GEO
                      </option>
                      <option value="Studio Film & Commercial Production">
                        Studio Film &amp; Commercial Production
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="budgetRange"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                    >
                      Estimated Monthly Budget
                    </label>
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className="min-h-[48px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--text-primary)] focus:outline-hidden"
                    >
                      <option value="$3,000 - $5,000 / mo">$3,000 - $5,000 / month</option>
                      <option value="$5,000 - $15,000 / mo">$5,000 - $15,000 / month</option>
                      <option value="$15,000 - $50,000 / mo">$15,000 - $50,000 / month</option>
                      <option value="$50,000+ / mo">$50,000+ / month</option>
                      <option value="One-Time Strategic Project">One-Time Project / Teardown</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                  >
                    Project Details &amp; Objectives
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your brand bottlenecks, target markets, or deliverables you need..."
                    className="w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--text-primary)] focus:outline-hidden"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-xs text-[var(--text-muted)]">
                    Protected by NDA • No outsourced contractors • Direct partner access
                  </span>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black px-9 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        <span>Sending Brief...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <Send
                          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

