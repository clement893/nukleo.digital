import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function StartProject() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const submitProject = trpc.startProject.submit.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await submitProject.mutateAsync(formData);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          description: '',
        });
      }, 3000);
    } catch (error) {
      console.error('Failed to submit project:', error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Start Your AI Journey
          </h1>
          <p className="text-lg md:text-xl text-white/70">
            Tell us about your project and let's build something extraordinary together.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6 animate-bounce" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Thank You!
                </h3>
                <p className="text-white/70">
                  We've received your project request. Our team will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white text-sm font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent focus:ring-accent"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white text-sm font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent focus:ring-accent"
                    placeholder="john@company.com"
                  />
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white text-sm font-medium">
                    Company Name
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent focus:ring-accent"
                    placeholder="Your Company"
                  />
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <Label htmlFor="projectType" className="text-white text-sm font-medium">
                    Project Type *
                  </Label>
                  <Select
                    required
                    value={formData.projectType}
                    onValueChange={(value) => handleChange('projectType', value)}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent focus:ring-accent">
                      <SelectValue placeholder="Select a project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai-strategy">AI Strategy & Consulting</SelectItem>
                      <SelectItem value="agentic-ai">Agentic AI Development</SelectItem>
                      <SelectItem value="ai-integration">AI Integration</SelectItem>
                      <SelectItem value="ai-training">AI Training & Workshops</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-white text-sm font-medium">
                    Estimated Budget *
                  </Label>
                  <Select
                    required
                    value={formData.budget}
                    onValueChange={(value) => handleChange('budget', value)}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent focus:ring-accent">
                      <SelectValue placeholder="Select a budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10k-25k">$10k - $25k</SelectItem>
                      <SelectItem value="25k-50k">$25k - $50k</SelectItem>
                      <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                      <SelectItem value="100k+">$100k+</SelectItem>
                      <SelectItem value="not-sure">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white text-sm font-medium">
                    Project Description *
                  </Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent focus:ring-accent min-h-[150px]"
                    placeholder="Tell us about your project, goals, and challenges..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={submitProject.isPending}
                  className="w-full bg-gradient-to-r from-accent to-pink-500 hover:from-accent/90 hover:to-pink-500/90 text-white font-semibold py-6 text-lg group"
                >
                  {submitProject.isPending ? (
                    'Sending...'
                  ) : (
                    <>
                      Submit Project Request
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <p className="text-white/50 text-sm text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
