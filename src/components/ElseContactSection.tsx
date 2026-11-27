'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { FallingLeaves } from 'falling-leaves/react';

const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Authentic natural autumn Maple tree leaf colors
const NATURAL_MAPLE_COLORS = [
  '#B22222', // Crimson maple
  '#C84B11', // Burnt autumn orange
  '#D96B1B', // Sugar maple amber-orange
  '#9E2A2B', // Deep russet red
  '#C95B1C', // Warm copper maple
  '#E0911E', // Golden autumn maple
];

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

  // Apple / Google minimalist input styling: slim, airy, crisp border & soft focus ring
  const inputClass = (field: keyof FormState) =>
    `w-full rounded-xl border bg-white/88 px-3.5 py-2.5 font-sans text-[14px] text-[#1D1D1F] placeholder:text-[#86868B] backdrop-blur-[2px] transition-all duration-200 focus:outline-hidden ${
      fieldErrors[field]
        ? 'border-red-500 focus:border-red-600 focus:ring-[3px] focus:ring-red-500/15'
        : 'border-[#D2D2D7] hover:border-[#AEAEB2] focus:border-[#1D1D1F] focus:ring-[3px] focus:ring-black/8'
    }`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-50 w-full bg-black text-white pt-16 pb-24 sm:pt-24 sm:pb-32 border-t border-white/10"
    >
      <div className="mx-auto max-w-[1060px] px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Minimal Left Contact Info Column */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: SMOOTH_EASE }}
            className="order-2 lg:order-1 lg:col-span-5 space-y-6 text-left"
          >
            <div>
              <p
                id="contact-heading"
                className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400"
              >
                Contact
              </p>
              <h2 className="mt-2 font-sans text-2xl sm:text-[32px] font-extrabold tracking-[-0.03em] leading-[1.12] text-white">
                Let&apos;s build{' '}
                <span className="font-display-serif italic font-normal text-white">
                  what&apos;s next.
                </span>
              </h2>
              <p className="mt-3 font-sans text-sm text-neutral-400 leading-relaxed max-w-sm">
                360° Growth Partner: Building Brands From Every Angle. Reach out directly or send
                us a quick brief.
              </p>
            </div>

            <div className="space-y-2.5 border-t border-white/10 pt-5 font-sans text-sm">
              <a
                href="tel:+917045405070"
                className="block font-semibold text-white hover:text-[#CCFF00] transition-colors duration-200"
              >
                +91 7045405070
              </a>
              <a
                href="https://www.think360media.in"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-medium text-neutral-300 hover:text-white transition-colors duration-200"
              >
                www.Think360media.in
              </a>
              <p className="text-neutral-400 leading-relaxed max-w-xs">
                Shram Jeevan Premises, Office no. 408, Wadala 400037
              </p>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.think360media.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Think360 Media Instagram"
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 text-neutral-300 hover:border-white hover:text-white transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.think360media.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Think360 Media Facebook"
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 text-neutral-300 hover:border-white hover:text-white transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                </svg>
              </a>
              <a
                href="https://www.think360media.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Think360 Media LinkedIn"
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 text-neutral-300 hover:border-white hover:text-white transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-7.8c0-1.86-.03-4.25-2.59-4.25-2.59 0-2.99 2.02-2.99 4.12V23h-4V8z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Compact Apple / Google-Style Form Card with Falling Natural Maple Leaves Inside */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.06, ease: SMOOTH_EASE }}
            className="order-1 lg:order-2 lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-8 text-[#1D1D1F] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              {/* Natural Maple Tree Falling Leaves Layer (scoped cleanly inside the form card) */}
              <FallingLeaves
                shapes={['maple']}
                colors={NATURAL_MAPLE_COLORS}
                count={18}
                size={[15, 26]}
                speed={[0.45, 1.1]}
                wind={[-0.3, 0.45]}
                sway={[0.35, 0.85]}
                rotationSpeed={[-1.2, 1.2]}
                opacity={0.72}
                zIndex={1}
                respectReducedMotion={true}
              />

              <div className="relative z-10">
                <div className="mb-5">
                  <h3 className="font-sans text-[19px] sm:text-[21px] font-semibold tracking-[-0.02em] text-[#1D1D1F]">
                    Send a message
                  </h3>
                  <p className="mt-1 font-sans text-[13px] text-[#6E6E73]">
                    Share a few details and our team will respond promptly.
                  </p>
                </div>

                {status === 'error' && errorMessage && (
                  <div
                    role="alert"
                    className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50/95 px-3.5 py-2.5 font-sans text-xs font-medium text-red-700"
                  >
                    <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {status === 'success' ? (
                  <div role="status" aria-live="polite" className="py-8 text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#1D1D1F] text-[#CCFF00]">
                      <CheckCircle2 className="size-6" aria-hidden="true" />
                    </div>
                    <h4 className="mt-4 font-sans text-xl font-semibold tracking-tight text-[#1D1D1F]">
                      Message sent
                    </h4>
                    {referenceId && (
                      <p className="mt-1 font-sans text-xs font-medium text-[#6E6E73]">
                        Ref: {referenceId}
                      </p>
                    )}
                    <p className="mt-2 mx-auto max-w-sm font-sans text-[13px] leading-relaxed text-[#6E6E73]">
                      Thank you, {formData.name}. We&apos;ll follow up at {formData.email} shortly.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#1D1D1F] px-6 py-2.5 font-sans text-[13px] font-medium text-white transition-colors duration-200 hover:bg-black"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block font-sans text-[13px] font-medium text-[#1D1D1F] mb-1.5"
                        >
                          Name
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
                          placeholder="Full name"
                          className={`h-11 ${inputClass('name')}`}
                        />
                        {fieldErrors.name && (
                          <p className="mt-1 font-sans text-xs text-red-600">{fieldErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block font-sans text-[13px] font-medium text-[#1D1D1F] mb-1.5"
                        >
                          Phone
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
                          placeholder="+91 70454 05070"
                          className={`h-11 ${inputClass('phone')}`}
                        />
                        {fieldErrors.phone && (
                          <p className="mt-1 font-sans text-xs text-red-600">{fieldErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block font-sans text-[13px] font-medium text-[#1D1D1F] mb-1.5"
                      >
                        Email
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
                        className={`h-11 ${inputClass('email')}`}
                      />
                      {fieldErrors.email && (
                        <p className="mt-1 font-sans text-xs text-red-600">{fieldErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-description"
                        className="block font-sans text-[13px] font-medium text-[#1D1D1F] mb-1.5"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-description"
                        name="description"
                        rows={3}
                        required
                        aria-invalid={Boolean(fieldErrors.description)}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Tell us about your brand goals or timeline"
                        className={`min-h-[88px] resize-y ${inputClass('description')}`}
                      />
                      {fieldErrors.description && (
                        <p className="mt-1 font-sans text-xs text-red-600">
                          {fieldErrors.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 flex items-center justify-end">
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="group inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-7 py-2.5 font-sans text-[13px] font-semibold text-white transition-all duration-200 hover:bg-black active:scale-[0.98] disabled:opacity-60"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send message</span>
                            <ArrowRight
                              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
