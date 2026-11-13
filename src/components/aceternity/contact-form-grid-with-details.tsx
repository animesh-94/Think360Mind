'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  description: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactFormGridWithDetails() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    description: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [referenceId, setReferenceId] = useState('');

  const fieldClasses = (field: keyof ContactFormData) =>
    `w-full rounded-xl border bg-[var(--bg-elevated)] px-4 py-3 text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all duration-150 focus:outline-hidden ${
      fieldErrors[field]
        ? 'border-[var(--accent)] ring-2 ring-[var(--accent-soft)]'
        : 'border-[var(--border-hairline)] hover:border-neutral-400 dark:hover:border-neutral-600 focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]'
    }`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormData;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
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

    const nextErrors: Partial<Record<keyof ContactFormData, string>> = {};
    if (formData.name.trim().length < 2) {
      nextErrors.name = 'Enter your name.';
    }
    if (formData.phone.replace(/\D/g, '').length < 7) {
      nextErrors.phone = 'Enter a valid phone number.';
    }
    if (!EMAIL_REGEX.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (formData.description.trim().length < 10) {
      nextErrors.description = 'Add a brief description (at least 10 characters).';
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setStatus('error');
      setErrorMessage('Please fix the highlighted fields.');
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
    setFormData({
      name: '',
      phone: '',
      email: '',
      description: '',
    });
    setFieldErrors({});
    setErrorMessage('');
    setReferenceId('');
    setStatus('idle');
  };

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[28px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Editorial Visual */}
        <div className="relative h-64 sm:h-80 lg:col-span-6 lg:h-auto lg:min-h-[620px] bg-neutral-100 dark:bg-neutral-900">
          <img
            src="/assets/contact-showcase.jpg"
            alt="Think360 studio architectural composition"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Right Side: Clean 4-Field Inquiry Form */}
        <div className="lg:col-span-6 flex flex-col justify-center p-6 sm:p-10 lg:p-12 bg-[var(--bg-canvas)]">
          <div className="mb-7">
            <h1 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
              Contact us
            </h1>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Share your details below and our team will reach out within one business day.
            </p>
          </div>

          {status === 'error' && errorMessage && (
            <div
              role="alert"
              className="mb-6 flex items-center gap-2.5 rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--text-primary)]"
            >
              <AlertCircle className="size-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          )}

          {status === 'success' ? (
            <div
              role="status"
              aria-live="polite"
              className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6 sm:p-8"
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-6" aria-hidden="true" />
              </div>
              <h2 className="mt-4 font-sans text-xl font-semibold text-[var(--text-primary)]">
                Message received
              </h2>
              {referenceId && (
                <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">
                  Reference: {referenceId}
                </p>
              )}
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                Thanks, <span className="font-medium text-[var(--text-primary)]">{formData.name}</span>. We&apos;ve logged your inquiry and will reply to{' '}
                <span className="font-medium text-[var(--text-primary)]">{formData.email}</span> soon.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)] cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[var(--text-primary)] mb-1.5"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`min-h-[48px] ${fieldClasses('name')}`}
                />
                {fieldErrors.name && (
                  <p id="name-error" className="mt-1.5 text-xs font-medium text-[var(--accent)]">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-[var(--text-primary)] mb-1.5"
                >
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +1 (415) 555-0148"
                  className={`min-h-[48px] ${fieldClasses('phone')}`}
                />
                {fieldErrors.phone && (
                  <p id="phone-error" className="mt-1.5 text-xs font-medium text-[var(--accent)]">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--text-primary)] mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className={`min-h-[48px] ${fieldClasses('email')}`}
                />
                {fieldErrors.email && (
                  <p id="email-error" className="mt-1.5 text-xs font-medium text-[var(--accent)]">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-[var(--text-primary)] mb-1.5"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  aria-invalid={Boolean(fieldErrors.description)}
                  aria-describedby={fieldErrors.description ? 'description-error' : undefined}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about your project, goals, or timeline..."
                  className={`resize-y min-h-[120px] ${fieldClasses('description')}`}
                />
                {fieldErrors.description && (
                  <p id="description-error" className="mt-1.5 text-xs font-medium text-[var(--accent)]">
                    {fieldErrors.description}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)] disabled:opacity-60 cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
