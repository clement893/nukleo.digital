import { MapPin, Mail, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container">
          <span className="font-mono text-accent text-sm mb-8 block uppercase tracking-widest">
            07 — CONTACT
          </span>

          <h1 className="text-white mb-8">
            LET'S START<br />
            YOUR TRANSFORMATION
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

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/75 text-sm mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-white/75 text-sm mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/75 text-sm mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-white/75 text-sm mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-white/75 text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full py-6 bg-accent text-white hover:bg-accent/90 transition-colors font-medium text-lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Locations */}
              <div className="glass rounded-3xl p-8 lg:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent/20 flex items-center justify-center rounded-full flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Our Offices</h3>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Montréal</h4>
                    <p className="text-white/75 text-sm">
                      7236 Rue Waverly<br />
                      Montréal, QC H2R 0C2
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Halifax</h4>
                    <p className="text-white/75 text-sm">
                      1800 Argyle St Unit 801<br />
                      Halifax, NS B3J 3N8
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="glass rounded-3xl p-8 lg:p-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/20 flex items-center justify-center rounded-full flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                    <a
                      href="mailto:hello@nukleo.ai"
                      className="text-white/75 hover:text-accent transition-colors"
                    >
                      hello@nukleo.ai
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="glass rounded-3xl p-8 lg:p-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/20 flex items-center justify-center rounded-full flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                    <a
                      href="tel:+15147771234"
                      className="text-white/75 hover:text-accent transition-colors"
                    >
                      +1 (514) 777-1234
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
