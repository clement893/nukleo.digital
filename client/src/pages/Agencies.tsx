import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  TrendingUp, Users, Shield, Clock, Euro, Target, 
  CheckCircle2, Zap, Globe, Award, BarChart3, HeartHandshake,
  Rocket, Lock, Sparkles, Code2, Smartphone, Cloud
} from "lucide-react";

export default function Agencies() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Your European Technical Team
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Based in Canada
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Nucleus Strategy Europe: your premium nearshore partner for risk-free expansion and guaranteed savings
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Francophone Europe 2025-2030
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                12 employees • €1.2M revenue
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                3 years of expertise
              </span>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">2 → 32</div>
              <div className="text-white font-semibold mb-1">Partner Agencies</div>
              <div className="text-white/60 text-sm">2025-2030</div>
            </Card>
            
            <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">€1.9M</div>
              <div className="text-white font-semibold mb-1">Revenue Target</div>
              <div className="text-white/60 text-sm">2030 Goal</div>
            </Card>
            
            <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">€189M</div>
              <div className="text-white font-semibold mb-1">Market Potential</div>
              <div className="text-white/60 text-sm">4 target countries</div>
            </Card>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <Award className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">95%</div>
              <div className="text-white/70 text-sm">Guaranteed satisfaction</div>
            </Card>
            
            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">98%</div>
              <div className="text-white/70 text-sm">On-time delivery</div>
            </Card>
            
            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <Shield className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">€1M</div>
              <div className="text-white/70 text-sm">Insurance coverage</div>
            </Card>
            
            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">725%</div>
              <div className="text-white/70 text-sm">5-year ROI</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Nucleus */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Agencies Choose Nucleus
            </h2>
            <p className="text-xl text-white/70">
              Natural extension • Guaranteed quality • Real savings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Operational Advantages */}
            <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10">
              <Zap className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Operational Advantages</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Total Flexibility
                  </h4>
                  <ul className="text-white/70 text-sm space-y-1 ml-7">
                    <li>• Scale up/down based on projects</li>
                    <li>• No internal HR constraints</li>
                    <li>• Rapid adaptation to needs</li>
                    <li>• Optimal workload management</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Accelerated Time-to-Market
                  </h4>
                  <ul className="text-white/70 text-sm space-y-1 ml-7">
                    <li>• Team immediately available</li>
                    <li>• No recruitment/training needed</li>
                    <li>• Project start within 48h</li>
                    <li>• Gain: 4-8 weeks vs internal hiring</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Minimized Risks
                  </h4>
                  <ul className="text-white/70 text-sm space-y-1 ml-7">
                    <li>• Unique contractual guarantees</li>
                    <li>• €1M liability insurance</li>
                    <li>• No team turnover risk</li>
                    <li>• Permanent technical support</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Financial Advantages */}
            <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10">
              <Euro className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Financial Advantages</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Direct Savings
                  </h4>
                  <ul className="text-white/70 text-sm space-y-1 ml-7">
                    <li>• 30-40% vs local developers</li>
                    <li>• No social charges</li>
                    <li>• No training costs</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Guaranteed ROI
                  </h4>
                  <ul className="text-white/70 text-sm space-y-1 ml-7">
                    <li>• Minimum 30% contractual</li>
                    <li>• Transparent measurement & reporting</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Predictable Costs
                  </h4>
                  <ul className="text-white/70 text-sm space-y-1 ml-7">
                    <li>• Fixed prices • No overruns</li>
                    <li>• Controlled & respected budgets</li>
                  </ul>
                </div>
              </div>

              {/* Competitive Advantage Box */}
              <div className="mt-8 p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <h4 className="text-white font-semibold mb-4 text-center">Competitive Advantage</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-cyan-400">3x</div>
                    <div className="text-white/70 text-xs">Project capacity</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400">40%</div>
                    <div className="text-white/70 text-xs">Savings</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-pink-400">0</div>
                    <div className="text-white/70 text-xs">HR risk</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-400">24/7</div>
                    <div className="text-white/70 text-xs">Support</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quality & Expertise */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10">
              <Sparkles className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Quality & Expertise</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Proven Technical Excellence</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Senior team 5+ years experience</li>
                    <li>• 100% satisfaction track record in Canada</li>
                    <li>• 0 failed projects in 3 years</li>
                    <li>• European quality standards</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Perfect Communication</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Native French/English bilingualism</li>
                    <li>• Understanding of European business culture</li>
                    <li>• Transparent & regular reporting</li>
                    <li>• Availability during European business hours</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10">
              <HeartHandshake className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Partnership Model</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Team Extension</h4>
                  <p className="text-white/70 text-sm">
                    Seamless integration with your teams. No visible subcontracting to clients.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Focus on Your Core Business</h4>
                  <p className="text-white/70 text-sm">
                    You keep strategy & client relationships. We handle technical execution.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Accelerated Growth</h4>
                  <p className="text-white/70 text-sm">
                    Project capacity multiplied by 3. New services without investment.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Service Offering
            </h2>
            <p className="text-xl text-white/70">
              Complete digital ecosystems for European agencies
            </p>
          </div>

          {/* 3-Phase Methodology */}
          <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10 mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">3-Phase Methodology</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-cyan-400">1</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Understand</h4>
                <p className="text-white/70 text-sm mb-3">
                  In-depth needs analysis • Technical audit • Optimal architecture
                </p>
                <div className="text-white/50 text-xs">
                  1-2 weeks • Technical specifications
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">2</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Activate</h4>
                <p className="text-white/70 text-sm mb-3">
                  Agile development • Automated testing • Continuous validation
                </p>
                <div className="text-white/50 text-xs">
                  4-12 weeks • Functional solution
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-pink-400">3</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Evolve</h4>
                <p className="text-white/70 text-sm mb-3">
                  Team training • Ongoing support • Performance optimization
                </p>
                <div className="text-white/50 text-xs">
                  Ongoing support • Evolutionary maintenance
                </div>
              </div>
            </div>
          </Card>

          {/* Service Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10">
              <Code2 className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Web & Application Development</h3>
              <ul className="text-white/70 text-sm space-y-2">
                <li>• Corporate & e-commerce websites</li>
                <li>• Custom web applications</li>
                <li>• Collaborative platforms</li>
                <li>• Progressive Web Apps (PWA)</li>
              </ul>
              <div className="mt-4 text-white/50 text-xs">
                React, Vue.js, Node.js, PHP, Python
              </div>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10">
              <Smartphone className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Mobile Applications</h3>
              <ul className="text-white/70 text-sm space-y-2">
                <li>• Native iOS/Android apps</li>
                <li>• Hybrid applications</li>
                <li>• Third-party API integration</li>
                <li>• Cloud synchronization</li>
              </ul>
              <div className="mt-4 text-white/50 text-xs">
                React Native, Flutter, Swift, Kotlin
              </div>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10">
              <Cloud className="w-10 h-10 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Infrastructure & Cloud</h3>
              <ul className="text-white/70 text-sm space-y-2">
                <li>• Architecture cloud scalable</li>
                <li>• DevOps et CI/CD</li>
                <li>• Sécurité et conformité</li>
                <li>• Monitoring et analytics</li>
              </ul>
              <div className="mt-4 text-white/50 text-xs">
                AWS, Azure, Docker, Kubernetes
              </div>
            </Card>
          </div>

          {/* Quality Guarantees */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <Card className="p-4 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">95%</div>
              <div className="text-white/70 text-sm">Min. satisfaction</div>
            </Card>
            <Card className="p-4 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">98%</div>
              <div className="text-white/70 text-sm">On-time delivery</div>
            </Card>
            <Card className="p-4 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">24/7</div>
              <div className="text-white/70 text-sm">Guaranteed support</div>
            </Card>
            <Card className="p-4 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">100%</div>
              <div className="text-white/70 text-sm">Code review</div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10">
        <div className="container mx-auto max-w-4xl text-center">
          <Rocket className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Amplify Your Success?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Join European agencies trusting Nucleus for their technical expansion. 
            Let's discuss your project today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white">
                Become a Partner
              </Button>
            </Link>
            <Link href="/start-project">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Request a Demo
              </Button>
            </Link>
          </div>

          <div className="mt-12 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg">
            <p className="text-white/80 text-sm mb-2">
              <strong>Export Canada Financing:</strong> CAD $75,000 available
            </p>
            <p className="text-white/60 text-xs">
              Nucleus Strategy Inc. • 12 employees • €1.2M revenue • Canada
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
