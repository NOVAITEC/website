'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, MapPin, Send, CheckCircle } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface FormData {
  naam: string;
  email: string;
  bedrijf: string;
  bericht: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    naam: '',
    email: '',
    bedrijf: '',
    bericht: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validatie
    const newErrors: Partial<FormData> = {};
    if (!formData.naam.trim()) newErrors.naam = 'Naam is verplicht';
    if (!formData.email.trim()) newErrors.email = 'Email is verplicht';
    else if (!validateEmail(formData.email)) newErrors.email = 'Ongeldig email adres';
    if (!formData.bericht.trim()) newErrors.bericht = 'Bericht is verplicht';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Captcha validatie
    if (!captchaToken) {
      setSubmitError('Vul de captcha in om te bewijzen dat je geen robot bent.');
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitError(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `🚀 Nieuw contactverzoek van ${formData.naam}`,
          from_name: 'NOVAITEC Website',
          replyto: formData.email,
          'h-captcha-response': captchaToken,
          // Custom HTML email template
          message: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; border-radius: 16px; overflow: hidden;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #14b8a6 0%, #22d3ee 100%); padding: 32px; text-align: center;">
    <h1 style="color: #0f172a; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
      NOVAITEC
    </h1>
    <p style="color: #0f172a; margin: 8px 0 0 0; font-size: 14px; opacity: 0.8;">
      Nieuw bericht via de website
    </p>
  </div>

  <!-- Content -->
  <div style="padding: 32px;">

    <!-- Contact Info Card -->
    <div style="background-color: #1e293b; border-radius: 12px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #14b8a6;">
      <h2 style="color: #14b8a6; margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
        Contactgegevens
      </h2>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="color: #94a3b8; padding: 8px 0; font-size: 14px; width: 100px;">Naam</td>
          <td style="color: #f1f5f9; padding: 8px 0; font-size: 14px; font-weight: 500;">${formData.naam}</td>
        </tr>
        <tr>
          <td style="color: #94a3b8; padding: 8px 0; font-size: 14px;">Email</td>
          <td style="color: #f1f5f9; padding: 8px 0; font-size: 14px;">
            <a href="mailto:${formData.email}" style="color: #22d3ee; text-decoration: none;">${formData.email}</a>
          </td>
        </tr>
        <tr>
          <td style="color: #94a3b8; padding: 8px 0; font-size: 14px;">Bedrijf</td>
          <td style="color: #f1f5f9; padding: 8px 0; font-size: 14px;">${formData.bedrijf || '—'}</td>
        </tr>
      </table>
    </div>

    <!-- Message Card -->
    <div style="background-color: #1e293b; border-radius: 12px; padding: 24px;">
      <h2 style="color: #14b8a6; margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
        Bericht
      </h2>
      <p style="color: #f1f5f9; margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${formData.bericht}</p>
    </div>

    <!-- Action Button -->
    <div style="text-align: center; margin-top: 32px;">
      <a href="mailto:${formData.email}?subject=Re: Uw bericht aan NOVAITEC"
         style="display: inline-block; background: linear-gradient(135deg, #14b8a6 0%, #22d3ee 100%); color: #0f172a; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
        Beantwoorden →
      </a>
    </div>

  </div>

  <!-- Footer -->
  <div style="background-color: #1e293b; padding: 20px 32px; text-align: center; border-top: 1px solid #334155;">
    <p style="color: #64748b; margin: 0; font-size: 12px;">
      Dit bericht is verzonden via het contactformulier op novaitec.nl
    </p>
  </div>

</div>
          `.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setFormData({ naam: '', email: '', bedrijf: '', bericht: '' });
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
      } else {
        setSubmitError('Er ging iets mis. Probeer het opnieuw of mail direct naar kyan@novaitec.nl');
      }
    } catch {
      setSubmitError('Kon geen verbinding maken. Controleer je internetverbinding.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error wanneer gebruiker begint te typen
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'kyan@novaitec.nl',
      href: 'mailto:kyan@novaitec.nl',
      external: false,
    },
    {
      icon: Linkedin,
      label: 'Connect op LinkedIn',
      href: 'https://linkedin.com/in/kyancordes',
      external: true,
    },
    {
      icon: MapPin,
      label: 'Drunen, Noord-Brabant',
      href: null,
      external: false,
    },
  ];

  return (
    <SectionWrapper className="bg-midnight" id="contact">
      {/* === Background Effects === */}

      {/* Amber glow - static on mobile, animated on desktop */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full bg-amber/10 blur-[120px] -z-10 opacity-10 md:hidden" />
      <motion.div
        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber/10 blur-[120px] -z-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Teal accent - static on mobile, animated on desktop */}
      <div className="absolute left-0 top-1/3 w-[400px] h-[400px] rounded-full bg-teal/5 blur-[100px] -z-10 opacity-[0.07] md:hidden" />
      <motion.div
        className="hidden md:block absolute left-0 top-1/3 w-[400px] h-[400px] rounded-full bg-teal/5 blur-[100px] -z-10"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grid Overlay Pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">

        {/* Links: De Uitnodiging */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-sm uppercase tracking-wider text-teal"
          >
            START HET GESPREK
          </motion.p>

          {/* Kop */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
          >
            Klaar voor{' '}
            <span className="bg-gradient-to-r from-teal via-cyan-300 to-white bg-clip-text text-transparent">
              rust
            </span>{' '}
            in je bedrijf?
          </motion.h2>

          {/* Tekst */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed"
          >
            Ik geloof in korte lijnen en heldere afspraken. Ik kijk graag met je mee naar waar voor jou de winst ligt.
          </motion.p>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4 pt-4"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group"
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-2 -m-2 rounded-lg active:bg-slate-800/30 transition-colors duration-300"
                  >
                    <div className="w-11 h-11 sm:w-10 sm:h-10 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center group-hover:border-teal/50 group-hover:bg-teal/10 transition-all duration-300 flex-shrink-0">
                      <item.icon className="w-5 h-5 text-teal" strokeWidth={1.5} />
                    </div>
                    <span className="font-inter text-slate-300 group-hover:text-teal transition-colors duration-300">
                      {item.label}
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-2 -m-2">
                    <div className="w-11 h-11 sm:w-10 sm:h-10 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-teal" strokeWidth={1.5} />
                    </div>
                    <span className="font-inter text-slate-300">{item.label}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Rechts: Het Formulier */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Glass Card Container */}
          <div className="relative bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl">
            {/* Tech corner accents */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-slate-600 opacity-50">
              [
            </div>
            <div className="absolute top-4 right-4 font-mono text-[10px] text-slate-600 opacity-50">
              ]
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-slate-600 opacity-50">
              +
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-slate-600 opacity-50">
              +
            </div>

            {isSuccess ? (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-teal" strokeWidth={1.5} />
                </motion.div>
                <h3 className="font-montserrat font-bold text-2xl text-white mb-3">
                  Verstuurd bericht
                </h3>
                <p className="font-inter text-slate-400">
                  Bedankt voor je bericht. Ik neem zo snel mogelijk contact met je op.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 font-inter text-teal hover:text-cyan-300 transition-colors underline underline-offset-4"
                >
                  Nog een bericht sturen
                </button>
              </motion.div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Naam */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label htmlFor="naam" className="block font-inter text-sm text-slate-400 mb-2">
                    Naam <span className="text-teal">*</span>
                  </label>
                  <input
                    type="text"
                    id="naam"
                    name="naam"
                    value={formData.naam}
                    onChange={handleChange}
                    placeholder="Je naam"
                    className={`w-full bg-midnight/50 border rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-paper placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all duration-300 ${
                      errors.naam ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-teal'
                    }`}
                  />
                  {errors.naam && (
                    <p className="mt-1 text-sm text-red-400">{errors.naam}</p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label htmlFor="email" className="block font-inter text-sm text-slate-400 mb-2">
                    Email <span className="text-teal">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="je@email.nl"
                    className={`w-full bg-midnight/50 border rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-paper placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all duration-300 ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-teal'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </motion.div>

                {/* Bedrijf (optioneel) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label htmlFor="bedrijf" className="block font-inter text-sm text-slate-400 mb-2">
                    Bedrijf <span className="text-slate-600">(optioneel)</span>
                  </label>
                  <input
                    type="text"
                    id="bedrijf"
                    name="bedrijf"
                    value={formData.bedrijf}
                    onChange={handleChange}
                    placeholder="Je bedrijf"
                    className="w-full bg-midnight/50 border border-slate-700 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-paper placeholder-slate-500 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all duration-300"
                  />
                </motion.div>

                {/* Bericht */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label htmlFor="bericht" className="block font-inter text-sm text-slate-400 mb-2">
                    Bericht <span className="text-teal">*</span>
                  </label>
                  <textarea
                    id="bericht"
                    name="bericht"
                    value={formData.bericht}
                    onChange={handleChange}
                    placeholder="Waar kan ik je mee helpen?"
                    rows={4}
                    className={`w-full bg-midnight/50 border rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-paper placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all duration-300 resize-none ${
                      errors.bericht ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-teal'
                    }`}
                  />
                  {errors.bericht && (
                    <p className="mt-1 text-sm text-red-400">{errors.bericht}</p>
                  )}
                </motion.div>

                {/* hCaptcha */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.65 }}
                  className="flex justify-center"
                >
                  <HCaptcha
                    ref={captchaRef}
                    sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                    reCaptchaCompat={false}
                    theme="dark"
                    onVerify={(token: string) => setCaptchaToken(token)}
                    onExpire={() => setCaptchaToken(null)}
                  />
                </motion.div>

                {/* Error Message */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                  >
                    <p className="text-sm text-red-400">{submitError}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-teal to-cyan-400 text-midnight font-montserrat font-semibold py-3 sm:py-4 text-sm sm:text-base rounded-xl hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-midnight/30 border-t-midnight rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Versturen...
                      </>
                    ) : (
                      <>
                        Verstuur bericht
                        <Send className="w-5 h-5" strokeWidth={2} />
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-amber/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </SectionWrapper>
  );
}
