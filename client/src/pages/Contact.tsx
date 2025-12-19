import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';
import SafeHTML from '@/components/SafeHTML';
import { trpc } from '@/lib/trpc';
import SEO from '@/components/SEO';
import UniversalLEO from '@/components/UniversalLEO';
import StructuredData, { montrealOfficeSchema, halifaxOfficeSchema } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function Contact() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const sendMessage = trpc.contact.send.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    
    try {
      await sendMessage.mutateAsync(formData);
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      console.error('Failed to send message:', error);
      
      // Extract validation errors from tRPC error
      // tRPC formats Zod errors differently - check multiple formats
      const formattedErrors: Record<string, string> = {};
      
      // Format 1: error.data is directly an array of Zod errors (most common with tRPC)
      if (Array.isArray(error?.data)) {
        error.data.forEach((err: any) => {
          if (err.path && Array.isArray(err.path) && err.path.length > 0) {
            const field = err.path[err.path.length - 1];
            formattedErrors[field] = err.message || 'Invalid value';
          }
        });
      }
      // Format 2: error.data.zodError.fieldErrors
      else if (error?.data?.zodError?.fieldErrors) {
        const fieldErrors = error.data.zodError.fieldErrors;
        Object.keys(fieldErrors).forEach((key) => {
          if (fieldErrors[key] && fieldErrors[key].length > 0) {
            formattedErrors[key] = fieldErrors[key][0];
          }
        });
      }
      // Format 3: error.data.zodError.issues (array)
      else if (error?.data?.zodError?.issues && Array.isArray(error.data.zodError.issues)) {
        error.data.zodError.issues.forEach((err: any) => {
          if (err.path && Array.isArray(err.path) && err.path.length > 0) {
            const field = err.path[err.path.length - 1];
            formattedErrors[field] = err.message || 'Invalid value';
          }
        });
      }
      // Format 4: error.data.zodError is directly an array
      else if (Array.isArray(error?.data?.zodError)) {
        error.data.zodError.forEach((err: any) => {
          if (err.path && Array.isArray(err.path) && err.path.length > 0) {
            const field = err.path[err.path.length - 1];
            formattedErrors[field] = err.message || 'Invalid value';
          }
        });
      }
      
      // Check error message format (tRPC sometimes puts errors in error.message)
      if (error?.message && typeof error.message === 'string' && error.message.includes('zodError')) {
        try {
          const parsed = JSON.parse(error.message);
          if (Array.isArray(parsed)) {
            parsed.forEach((err: any) => {
              if (err.path && Array.isArray(err.path) && err.path.length > 0) {
                const field = err.path[err.path.length - 1];
                formattedErrors[field] = err.message || 'Invalid value';
              }
            });
          }
        } catch (e) {
          // Not JSON, ignore
        }
      }
      
      if (Object.keys(formattedErrors).length > 0) {
        setValidationErrors(formattedErrors);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear validation error for this field when user starts typing
    if (validationErrors[e.target.name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Nukleo Digital',
    url: 'https://nukleo.digital/contact',
    description: 'Contact Nukleo Digital for AI transformation consulting and services',
    mainEntity: {
      '@type': 'Organization',
      name: 'Nukleo Digital',
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: '7236 Rue Waverly',
          addressLocality: 'Montréal',
          addressRegion: 'QC',
          postalCode: 'H2R 0C2',
          addressCountry: 'CA',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: '1800 Argyle St Unit 801',
          addressLocality: 'Halifax',
          addressRegion: 'NS',
          postalCode: 'B3J 3N8',
          addressCountry: 'CA',
        },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Business Inquiries',
        email: 'hello@nukleo.ai',
        telephone: '+1-514-777-1234',
        availableLanguage: ['English', 'French'],
      },
    },
  };

  return (
    <PageLayout>
      <SEO 
        title={t('seo.contact.title')}
        description={t('seo.contact.description')}
        keywords="contact AI agency, AI consultation, Montréal AI services, Halifax AI agency, AI transformation contact"
      />
      <StructuredData data={contactPageSchema} />
      <StructuredData data={montrealOfficeSchema} />
      <StructuredData data={halifaxOfficeSchema} />
    <div className="min-h-screen bg-gradient-nukleo relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 relative z-10">
        <div className="container">
          <Breadcrumb items={[{ name: t('nav.contact'), url: '/contact' }]} />

          <SafeHTML 
            html={t('contact.heroTitle')} 
            tag="h1"
            className="text-white mb-8 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ lineHeight: '1.2' }}
          />

          <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-3xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {t('contact.heroDescription')}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="pb-24 lg:pb-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="glass rounded-3xl p-8 lg:p-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">
                {t('contact.sendMessage')}
              </h2>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
                  <p className="text-green-400 font-medium">
                    {t('contact.successMessage')}
                  </p>
                </div>
              )}

              {(sendMessage.error || Object.keys(validationErrors).length > 0) && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                  <p className="text-red-400 font-medium mb-2">
                    {Object.keys(validationErrors).length > 0 
                      ? 'Veuillez corriger les erreurs ci-dessous'
                      : t('contact.errorMessage')}
                  </p>
                  {Object.keys(validationErrors).length > 0 && (
                    <ul className="list-disc list-inside text-red-300 text-sm space-y-1 mt-2">
                      {Object.entries(validationErrors).map(([field, message]) => {
                        const fieldLabels: Record<string, string> = {
                          message: t('contact.message'),
                          email: t('contact.email'),
                          firstName: t('contact.firstName'),
                          lastName: t('contact.lastName'),
                          company: t('contact.company'),
                        };
                        return (
                          <li key={field}>
                            <strong>{fieldLabels[field] || field}</strong>: {message}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/90 text-sm mb-2 font-medium">
                      {t('contact.firstName')}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-accent transition-colors"
                      placeholder={t('contact.firstNamePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-white/90 text-sm mb-2 font-medium">
                      {t('contact.lastName')}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-accent transition-colors"
                      placeholder={t('contact.lastNamePlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/90 text-sm mb-2 font-medium">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-accent transition-colors"
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-white/90 text-sm mb-2 font-medium">
                    {t('contact.company')}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-accent transition-colors"
                    placeholder={t('contact.companyPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-white/90 text-sm mb-2 font-medium">
                    {t('contact.message')} *
                    {validationErrors.message && (
                      <span className="text-red-400 text-xs ml-2">({validationErrors.message})</span>
                    )}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                      validationErrors.message 
                        ? 'border-red-500/50' 
                        : 'border-white/10'
                    } text-white placeholder:text-white/50 focus:outline-none focus:border-accent transition-colors resize-none`}
                    placeholder={t('contact.messagePlaceholder')}
                  />
                  <p className="text-white/50 text-xs mt-1">
                    Minimum 10 caractères requis ({formData.message.length}/10)
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={sendMessage.isPending}
                  className="w-full py-6 text-base"
                >
                  {sendMessage.isPending ? t('common.loading') : t('contact.send')}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Offices */}
              <div className="glass rounded-3xl p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-bold text-white">{t('contact.ourOffices')}</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Montréal</h4>
                    <p className="text-white/75 text-sm">
                      7236 Rue Waverly Montréal<br />
                      Montréal, QC H2R 0C2
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Halifax</h4>
                    <p className="text-white/75 text-sm">
                      1800 Argyle St Unit 801 Halifax<br />
                      Halifax, NS B3J 3N8
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="glass rounded-3xl p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-bold text-white">{t('contact.emailUs')}</h3>
                </div>
                <a
                  href="mailto:hello@nukleo.ai"
                  className="text-white/75 hover:text-accent transition-colors text-lg"
                >
                  hello@nukleo.ai
                </a>
              </div>

              {/* Phone */}
              <div className="glass rounded-3xl p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-bold text-white">{t('contact.phone')}</h3>
                </div>
                <a
                  href="tel:+15147771234"
                  className="text-white/75 hover:text-accent transition-colors text-lg"
                >
                  +1 (514) 777-1234
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
    </PageLayout>
  );
}
