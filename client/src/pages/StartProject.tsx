// StartProject.tsx
import { useState } from 'react';
import SEO from '@/components/SEO';
import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { useLocation } from 'wouter';
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
import { ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function StartProject() {
  const [, navigate] = useLocation();
  const { t } = useLanguage();
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
    <PageLayout>
      <SEO
        title={t('startProject.seoTitle')}
        description={t('startProject.seoDescription')}
        keywords={t('startProject.seoKeywords')}
        ogImage="https://nukleo.digital/og-image.jpg"
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
        {/* Breadcrumb */}
        <div className="max-w-3xl mx-auto mb-8">
          <Breadcrumb items={[{ name: t('nav.startProject') || 'Start Project', url: '/start-project' }]} />
        </div>
        {/* Back Button */}
        <div className="max-w-3xl mx-auto mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('startProject.backToHome')}
          </Button>
        </div>

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            {t('startProject.pageTitle')}
          </h1>
          <p className="text-lg md:text-xl text-white/70">
            {t('startProject.pageDescription')}
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6 animate-bounce" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t('startProject.form.thankYou')}
                </h3>
                <p className="text-white/70">
                  {t('startProject.form.successMessage')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white text-sm font-medium">
                    {t('startProject.form.fullName')} *
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent focus:ring-accent"
                    placeholder={t('startProject.form.fullNamePlaceholder')}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white text-sm font-medium">
                    {t('startProject.form.emailAddress')} *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent focus:ring-accent"
                    placeholder={t('startProject.form.emailPlaceholder')}
                  />
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white text-sm font-medium">
                    {t('startProject.form.companyName')}
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent focus:ring-accent"
                    placeholder={t('startProject.form.companyPlaceholder')}
                  />
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <Label htmlFor="projectType" className="text-white text-sm font-medium">
                    {t('startProject.form.projectType')} *
                  </Label>
                  <Select
                    required
                    value={formData.projectType}
                    onValueChange={(value) => handleChange('projectType', value)}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent focus:ring-accent">
                      <SelectValue placeholder={t('startProject.form.projectTypePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/20 backdrop-blur-xl">
                      <SelectItem value="ai-strategy" className="text-white hover:bg-white/20 focus:bg-white/20 cursor-pointer">{t('startProject.form.projectTypes.aiStrategy')}</SelectItem>
                      <SelectItem value="agentic-ai" className="text-white hover:bg-white/20 focus:bg-white/20 cursor-pointer">{t('startProject.form.projectTypes.agenticAI')}</SelectItem>
                      <SelectItem value="ai-integration" className="text-white hover:bg-white/20 focus:bg-white/20 cursor-pointer">{t('startProject.form.projectTypes.aiIntegration')}</SelectItem>
                      <SelectItem value="ai-training" className="text-white hover:bg-white/20 focus:bg-white/20 cursor-pointer">{t('startProject.form.projectTypes.aiTraining')}</SelectItem>
                      <SelectItem value="other" className="text-white hover:bg-white/20 focus:bg-white/20 cursor-pointer">{t('startProject.form.projectTypes.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-white text-sm font-medium">
                    {t('startProject.form.estimatedBudget')} *
                  </Label>
                  <Select
                    required
                    value={formData.budget}
                    onValueChange={(value) => handleChange('budget', value)}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent focus:ring-accent">
                      <SelectValue placeholder={t('startProject.form.budgetPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/20 backdrop-blur-xl">
                      <SelectItem value="10k-25k" className="text-white hover:bg-white/20 focus:bg-white/20 cursor-pointer">{t('startProject.form.budgetRanges.10k25k')}</SelectItem>
                      <SelectItem value="25k-50k" className="text-white hover:bg-white/20 focus:bg-white/20 cursor-pointer">{t('startProject.form.budgetRanges.25k50k')}</SelectItem>
                      <SelectItem value="50k-100k" className="text-white hover:bg-white/20 focus:bg-white/20 cursor-pointer">{t('startProject.form.budgetRanges.50k100k')}</SelectItem>
                      <SelectItem value="100k+" className="text-white hover:bg-white/20 focus:bg-white/20 cursor-pointer">{t('startProject.form.budgetRanges.100kPlus')}</SelectItem>
                      <SelectItem value="not-sure" className="text-white hover:bg-white/20 focus:bg-white/20 cursor-pointer">{t('startProject.form.budgetRanges.notSure')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white text-sm font-medium">
                    {t('startProject.form.projectDescription')} *
                  </Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent focus:ring-accent min-h-[150px]"
                    placeholder={t('startProject.form.projectDescriptionPlaceholder')}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={submitProject.isPending}
                  className="w-full bg-gradient-to-r from-violet-600 to-rose-600 hover:from-violet-700 hover:to-rose-700 text-white font-bold py-4 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group disabled:opacity-50"
                >
                  {submitProject.isPending ? (
                    t('startProject.form.sending')
                  ) : (
                    <>
                      {t('startProject.form.submit')}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <p className="text-white/50 text-sm text-center">
                  {t('startProject.form.privacyNotice')}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
    </PageLayout>
  );
}
