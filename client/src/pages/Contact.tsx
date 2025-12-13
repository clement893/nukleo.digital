import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';
import { trpc } from '@/lib/trpc';
import SEO from '@/components/SEO';
import UniversalLEO from '@/components/UniversalLEO';
import StructuredData from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sendMessage = trpc.contact.send.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
        title="Contact Nukleo Digital | Start Your AI Transformation"
        description="Ready to transform with AI? Contact Nukleo Digital for expert consultation. Offices in Montréal & Halifax. Get tailored AI solutions for your business today."
        keywords="contact AI agency, AI consultation, Montréal AI services, Halifax AI agency, AI transformation contact"
      />
      <StructuredData data={contactPageSchema} />
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container">
          <Breadcrumb items={[{ name: 'Contact', url: '/contact' }]} />
          <span className="font-mono text-accent text-sm mb-8 block tracking-widest">
            07 — Contact
          </span>

          <h1 className="text-white mb-8">
            Let's Start<br />
            Your Transformation
          </h1>

          <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-3xl">
            Ready to become an AI-native leader? Get in touch and let's discuss how we can help you thrive in the age of artificial intelligence.
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
                Send us a message
              </h2>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
                  <p className="text-green-400 font-medium">
                    ✓ Message sent successfully! We'll get back to you within 24 hours.
                  </p>
                </div>
              )}

              {sendMessage.error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                  <p className="text-red-400 font-medium">
                    ✗ Failed to send message. Please try again.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/90 text-sm mb-2 font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-accent transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-white/90 text-sm mb-2 font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-accent transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/90 text-sm mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-accent transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-white/90 text-sm mb-2 font-medium">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-white/90 text-sm mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sendMessage.isPending}
                  className="w-full py-6 text-base"
                >
                  {sendMessage.isPending ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Offices */}
              <div className="glass rounded-3xl p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-bold text-white">Our Offices</h3>
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
                  <h3 className="text-xl font-bold text-white">Email</h3>
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
                  <h3 className="text-xl font-bold text-white">Phone</h3>
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
    </div>
    </PageLayout>
  );
}
