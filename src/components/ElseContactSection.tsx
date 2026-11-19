'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface FormState {
  name: string;
  phone: string;
  email: string;
  description: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ElseContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    description: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [referenceId, setReferenceId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name as keyof FormState;
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (formData.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.';
    }
    if (formData.phone.replace(/\D/g, '').length < 7) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }
    if (!EMAIL_REGEX.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (formData.description.trim().length < 10) {
      nextErrors.description = 'Please enter a short message (at least 10 characters).';
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setStatus('error');
      setErrorMessage('Please check the highlighted fields below.');
      return;
    }

    setFieldErrors({});
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (data.fieldErrors && typeof data.fieldErrors === 'object') {
          setFieldErrors(data.fieldErrors);
        }
        setStatus('error');
        setErrorMessage(data.error || 'Unable to submit right now. Please try again.');
        return;
      }

      setReferenceId(data.referenceId || '');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Network error while submitting. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({ name: '', phone: '', email: '', description: '' });
    setFieldErrors({});
    setErrorMessage('');
    setReferenceId('');
    setStatus('idle');
  };

  const underlineClass = (field: keyof FormState) =>
    `w-full border-0 border-b bg-transparent px-0 py-2.5 font-mono text-sm text-black placeholder:text-neutral-400 transition-colors focus:outline-hidden ${
      fieldErrors[field]
        ? 'border-red-600 focus:border-red-600'
        : 'border-black focus:border-[#4D7C0F]'
    }`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-50 w-full bg-black text-white py-24 sm:py-32 border-t border-white/10"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-start">
          {/* Left Column: Direct Details & Socials (Exact Else Social Layout with Neon Accent) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-8 pt-2"
          >
            <div>
              <p
                id="contact-heading"
                className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#CCFF00]"
              >
                CONTACT
              </p>

              <div className="mt-5 space-y-3 text-base sm:text-lg font-bold tracking-tight text-white">
                <a
                  href="mailto:hello@think360media.com"
                  className="block hover:text-[#CCFF00] transition-colors"
                >
                  hello@think360media.com
                </a>
                <a
                  href="tel:+912248903600"
                  className="block hover:text-[#CCFF00] transition-colors"
                >
                  +91 (022) 4890 3600
                </a>
                <p className="text-neutral-300 font-semibold">
                  Mumbai HQ &bull; Bengaluru &bull; New Delhi
                </p>
              </div>
            </div>

            {/* Minimal Social Row */}
            <div className="flex items-center gap-5 pt-2">
              <a
                href="mailto:hello@think360media.com?subject=Instagram%20Inquiry"
                aria-label="Instagram"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="mailto:hello@think360media.com?subject=Meta%20Paid%20Social%20Inquiry"
                aria-label="Facebook"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                </svg>
              </a>
              <a
                href="mailto:hello@think360media.com?subject=LinkedIn%20Inquiry"
                aria-label="LinkedIn"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-7.8c0-1.86-.03-4.25-2.59-4.25-2.59 0-2.99 2.02-2.99 4.12V23h-4V8z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Signature Floating White Underline Form Card (Exact Else Social Match) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <div className="rounded-[2rem] bg-white p-8 sm:p-12 text-black shadow-[0_28px_80px_rgba(0,0,0,0.55)]">
              <div className="mb-8">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-black">
                  READY TO COLLABORATE?
                </p>
                <p className="mt-3 font-mono text-sm sm:text-base text-neutral-700">
                  Let&apos;s create something epic together
                </p>
              </div>

              {status === 'error' && errorMessage && (
                <div
                  role="alert"
                  className="mb-6 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-mono text-xs text-red-700"
                >
                  <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === 'success' ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="py-8 text-center"
                >
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#CCFF00] text-black">
                    <CheckCircle2 className="size-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-sans text-2xl font-extrabold uppercase tracking-tight text-black">
                    Brief Received
                  </h3>
                  {referenceId && (
                    <p className="mt-1.5 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">
                      REF: {referenceId}
                    </p>
                  )}
                  <p className="mt-3 mx-auto max-w-md font-mono text-xs sm:text-sm leading-relaxed text-neutral-600">
                    Thank you, {formData.name}. Our team will follow up at {formData.email} within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-7 inline-flex min-h-[46px] items-center justify-center rounded-full bg-black px-10 py-3 font-sans text-xs font-bold uppercase tracking-[0.18em] text-white transition-all hover:bg-[#CCFF00] hover:text-black"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-black mb-1"
                      >
                        NAME *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        aria-invalid={Boolean(fieldErrors.name)}
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={underlineClass('name')}
                      />
                      {fieldErrors.name && (
                        <p className="mt-1.5 font-mono text-[11px] text-red-600">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-black mb-1"
                      >
                        PHONE NUMBER *
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        aria-invalid={Boolean(fieldErrors.phone)}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (415) 555-0148"
                        className={underlineClass('phone')}
                      />
                      {fieldErrors.phone && (
                        <p className="mt-1.5 font-mono text-[11px] text-red-600">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-black mb-1"
                    >
                      EMAIL *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      aria-invalid={Boolean(fieldErrors.email)}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className={underlineClass('email')}
                    />
                    {fieldErrors.email && (
                      <p className="mt-1.5 font-mono text-[11px] text-red-600">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-description"
                      className="block font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-black mb-1"
                    >
                      MESSAGE *
                    </label>
                    <textarea
                      id="contact-description"
                      name="description"
                      rows={3}
                      required
                      aria-invalid={Boolean(fieldErrors.description)}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Type your message here"
                      className={`resize-y min-h-[84px] ${underlineClass('description')}`}
                    />
                    {fieldErrors.description && (
                      <p className="mt-1.5 font-mono text-[11px] text-red-600">
                        {fieldErrors.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex justify-center">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="inline-flex min-h-[48px] min-w-[200px] items-center justify-center gap-2 rounded-full bg-black px-12 py-3.5 font-sans text-xs font-extrabold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#CCFF00] hover:text-black hover:shadow-[0_0_24px_rgba(204,255,0,0.45)] active:scale-[0.98] disabled:opacity-60"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                          <span>SENDING...</span>
                        </>
                      ) : (
                        <span>SUBMIT</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

