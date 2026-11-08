'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type AuditStatus = 'idle' | 'loading' | 'error' | 'success';

export default function ContactPage() {
  const [status, setStatus] = useState<AuditStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [focusArea, setFocusArea] = useState('Full 360° Growth Audit (All 10 Pods)');
  const [brief, setBrief] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your name so our strategist knows who to address.');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid work email address (for example, email@example.com).');
      return;
    }

    if (!website.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your brand name or website URL so we can review your channels.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 450);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setWebsite('');
    setFocusArea('Full 360° Growth Audit (All 10 Pods)');
    setBrief('');
    setErrorMessage('');
    setStatus('idle');
  };

  return (
    <div className="min-h-screen flex flex-col bg-black selection:bg-black selection:text-white">
      <Header />

      <main
        id="main-content"
        className="flex-1 bg-[var(--bg-canvas)] text-[var(--text-primary)] rounded-b-[2.5rem] sm:rounded-b-[4rem] overflow-hidden relative z-10 shadow-[0_24px_80px_rgba(0,0,0,0.45)] py-16 sm:py-24 px-4 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[1440px]">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>

          <div className="mt-8 rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] text-[var(--text-primary)] p-6 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  START A TRANSFORMATION
                </span>
                <h1 className="mt-2 font-sans text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-[var(--text-primary)] leading-[1.06]">
                  Request Your Custom 360° Channel Audit
                </h1>
                <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  Share your brand URL and primary growth bottleneck. Our practice leads review your creative, storefront, search visibility, and media structure before our call.
                </p>

                <div className="mt-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5">
                  {status === 'idle' && (
                    <div className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      <strong className="text-[var(--text-primary)] block mb-1">
                        Audit Queue Status: Ready for your brief
                      </strong>
                      No audit request submitted in this session yet. Complete the fields to schedule your channel review.
                    </div>
                  )}

                  {status === 'loading' && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="flex items-center gap-3 text-xs sm:text-sm text-[var(--text-primary)]"
                    >
                      <Loader2 className="size-4 animate-spin shrink-0" aria-hidden="true" />
                      <span>Preparing your 360° channel audit request and routing to the practice lead...</span>
                    </div>
                  )}

                  {status === 'error' && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-primary)]"
                    >
                      <AlertCircle className="size-4 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <strong className="block font-bold">
                          Submission requires attention
                        </strong>
                        <span>{errorMessage}</span>
                      </div>
                    </div>
                  )}

                  {status === 'success' && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]"
                    >
                      <div className="flex items-center gap-2 font-bold text-[var(--text-primary)]">
                        <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
                        <span>Audit Request Logged for {website}</span>
                      </div>
                      <p>
                        Thank you, <strong className="text-[var(--text-primary)]">{fullName}</strong>. We have assigned your{' '}
                        <strong className="text-[var(--text-primary)]">{focusArea}</strong> review and will send your audit deck to{' '}
                        <strong className="text-[var(--text-primary)]">{email}</strong>.
                      </p>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="mt-2 inline-flex min-h-[44px] items-center rounded-full bg-black text-white dark:bg-white dark:text-black px-5 py-2 text-xs font-bold"
                      >
                        Submit Another Brand URL
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                <div>
                  <label
                    htmlFor="audit-full-name"
                    className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    id="audit-full-name"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your Name"
                    className="min-h-[48px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="audit-email"
                    className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                  >
                    Work Email *
                  </label>
                  <input
                    id="audit-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="min-h-[48px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="audit-website"
                    className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                  >
                    Brand or Website URL *
                  </label>
                  <input
                    id="audit-website"
                    name="website"
                    type="text"
                    required
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourbrand.com"
                    className="min-h-[48px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="audit-focus"
                    className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                  >
                    Primary Growth Priority
                  </label>
                  <select
                    id="audit-focus"
                    name="focusArea"
                    value={focusArea}
                    onChange={(e) => setFocusArea(e.target.value)}
                    className="min-h-[48px] w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--text-primary)]"
                  >
                    <option value="Full 360° Growth Audit (All 10 Pods)">
                      Full 360° Growth Audit (All 10 Pods)
                    </option>
                    <option value="Brand Solution & Creative Production">
                      Brand Solution &amp; Creative Production
                    </option>
                    <option value="Tech Solution (Web, E-commerce & CRM)">
                      Tech Solution (Web, E-commerce &amp; CRM)
                    </option>
                    <option value="Media Solution (Paid Search & Social)">
                      Media Solution (Paid Search &amp; Social)
                    </option>
                    <option value="SEO, GEO & Market Research">
                      SEO, GEO &amp; Market Research
                    </option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="audit-brief"
                    className="block text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                  >
                    Campaign Goals or Bottlenecks (Optional)
                  </label>
                  <textarea
                    id="audit-brief"
                    name="brief"
                    rows={3}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="Share your target channels, current monthly ad spend, or launch timeline..."
                    className="w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--text-primary)]"
                  />
                </div>

                <div className="sm:col-span-2 pt-2 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[var(--text-muted)]">
                    Delivered as a written teardown + 30-minute strategy session.
                  </span>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black px-8 py-3.5 text-sm font-bold transition-transform duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                  >
                    <span>
                      {status === 'loading'
                        ? 'Submitting Audit Request...'
                        : 'Request Your 360° Growth Audit'}
                    </span>
                    <ArrowRight
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

