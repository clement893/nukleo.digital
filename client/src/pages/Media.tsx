import { useState } from 'react';
import { Mail, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { trpc } from '@/lib/trpc';
import { logger } from '@/lib/logger';

export default function Media() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mediaOutlet: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const sendMessage = trpc.contact.send.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    
    try {
      await sendMessage.mutateAsync({
        ...formData,
        company: formData.mediaOutlet,
      });
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mediaOutlet: '',
        subject: '',
        message: '',
      });
      
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      logger.tagged('Media').error('Failed to send message:', error);
      const formattedErrors: Record<string, string> = {};
      
      if (Array.isArray(error?.data)) {
        error.data.forEach((err: any) => {
          if (err.path && Array.isArray(err.path) && err.path.length > 0) {
            const field = err.path[err.path.length - 1];
            formattedErrors[field] = err.message || 'Invalid value';
          }
        });
      } else if (error?.data?.zodError?.fieldErrors) {
        const fieldErrors = error.data.zodError.fieldErrors;
        Object.keys(fieldErrors).forEach((key) => {
          if (fieldErrors[key] && fieldErrors[key].length > 0) {
            formattedErrors[key] = fieldErrors[key][0];
          }
        });
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
    if (validationErrors[e.target.name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  return (
    <PageLayout>
      <SEO 
        title={t('media.seoTitle')}
        description={t('media.seoDescription')}
        keywords={t('media.seoKeywords')}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-20">
          <Breadcrumb items={[{ name: t('nav.media') || 'Médias', url: '/media' }]} />
          <div className="max-w-4xl mx-auto text-center mb-16 mt-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-white/90">{t('media.badge')}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">{t('media.heroTitle')}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                {t('media.heroTitleHighlight')}
              </span>
            </h1>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              {t('media.heroDescription')}
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-white mb-4">{t('media.contactForm.title')}</h2>
              <p className="text-white/70 mb-8">{t('media.contactForm.description')}</p>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
                  <p className="text-green-400 font-medium">{t('media.contactForm.success')}</p>
                </div>
              )}

              {(sendMessage.error || Object.keys(validationErrors).length > 0) && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                  <p className="text-red-400 font-medium">
                    {Object.keys(validationErrors).length > 0 
                      ? 'Veuillez corriger les erreurs ci-dessous'
                      : t('media.contactForm.error')}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/90 text-sm mb-2 font-medium">
                      {t('media.contactForm.firstName')}
                    </label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="Jean"
                    />
                    {validationErrors.firstName && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-white/90 text-sm mb-2 font-medium">
                      {t('media.contactForm.lastName')}
                    </label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="Dupont"
                    />
                    {validationErrors.lastName && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/90 text-sm mb-2 font-medium">
                      {t('media.contactForm.email')}
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="jean@media.com"
                    />
                    {validationErrors.email && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-white/90 text-sm mb-2 font-medium">
                      {t('media.contactForm.mediaOutlet')}
                    </label>
                    <Input
                      type="text"
                      name="mediaOutlet"
                      value={formData.mediaOutlet}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="Nom du média"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/90 text-sm mb-2 font-medium">
                    {t('media.contactForm.subject')}
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    placeholder="Sujet de votre demande"
                  />
                </div>

                <div>
                  <label className="block text-white/90 text-sm mb-2 font-medium">
                    {t('media.contactForm.message')}
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    placeholder="Votre message..."
                  />
                  {validationErrors.message && (
                    <p className="text-red-400 text-xs mt-1">{validationErrors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={sendMessage.isPending}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-6 text-lg"
                >
                  {sendMessage.isPending ? 'Envoi...' : t('media.contactForm.submit')}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Media Contact Section */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8 lg:p-12 text-center">
              <Mail className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('media.mediaContact.title')}
              </h2>
              <p className="text-white/70 text-lg mb-8">
                {t('media.mediaContact.description')}
              </p>
              <div className="space-y-4">
                <a
                  href={`mailto:${t('media.mediaContact.email')}`}
                  className="inline-block text-cyan-400 hover:text-white text-xl font-semibold transition-colors"
                >
                  {t('media.mediaContact.email')}
                </a>
                <p className="text-white/60">
                  {t('media.mediaContact.responseTime')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LinkedIn Feed Section */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Linkedin className="w-8 h-8 text-cyan-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {t('media.linkedinFeed.title')}
              </h2>
            </div>
            <p className="text-white/70 mb-8">
              {t('media.linkedinFeed.description')}
            </p>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 lg:p-12 text-center">
              <div className="max-w-2xl mx-auto">
                <Linkedin className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t('media.linkedinFeed.followUs')}
                </h3>
                <a
                  href="https://www.linkedin.com/company/nukleo-group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105"
                >
                  <Linkedin className="w-5 h-5" />
                  Suivre sur LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
