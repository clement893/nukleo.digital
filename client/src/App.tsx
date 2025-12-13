import { Suspense, lazy } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import CustomCursor from "./components/CustomCursor";
import PageLoader from "./components/PageLoader";

import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";
import ArrowBackground from "./components/ArrowBackground";
import { FloatingLanguageToggle } from "./components/FloatingLanguageToggle";
import { usePageTransition } from "./hooks/usePageTransition";
import { usePageBackground } from "./hooks/usePageBackground";

// Lazy load UniversalLEO
const UniversalLEO = lazy(() => import("./components/UniversalLEO"));

// Helper function to determine page context from URL
function getPageContext(pathname: string): 'home' | 'agencies' | 'services' | 'contact' | 'projects' | 'about' | 'default' {
  // Remove language prefix if present
  const path = pathname.replace(/^\/(fr|en)/, '') || '/';
  
  // Skip admin routes
  if (path.startsWith('/admin')) return 'default';
  
  if (path === '/' || path === '') return 'home';
  if (path.includes('/agencies')) return 'agencies';
  if (path.includes('/services')) return 'services';
  if (path.includes('/contact')) return 'contact';
  if (path.includes('/projects')) return 'projects';
  if (path.includes('/about')) return 'about';
  
  return 'default';
}

// Global LEO component that detects page context
function GlobalLEO() {
  const [location] = useLocation();
  const pageContext = getPageContext(location);
  
  return (
    <Suspense fallback={null}>
      <UniversalLEO pageContext={pageContext} />
    </Suspense>
  );
}

// Eager load only critical pages
import Home from "./pages/Home";
import NotFound404 from "@/pages/NotFound404";

// Lazy load all other pages
const Projects = lazy(() => import("./pages/Projects"));
const About = lazy(() => import("./pages/About"));
const Expertise = lazy(() => import("./pages/Expertise"));
const Resources = lazy(() => import("./pages/Resources"));
const Contact = lazy(() => import("./pages/Contact"));
const Leo = lazy(() => import("./pages/Leo"));
const Manifesto = lazy(() => import("./pages/Manifesto"));
const Radar = lazy(() => import("./pages/RadarNew").then(m => ({ default: m.RadarNew })));
const AITrendRadar = lazy(() => import("./pages/AITrendRadar"));
const AIReadinessAssessment = lazy(() => import("./pages/AIReadinessAssessment"));
const AIStrategyMarketing = lazy(() => import("./pages/services/AIStrategyMarketing"));
const DigitalPlatforms = lazy(() => import("./pages/services/DigitalPlatforms"));
const IntelligentOperations = lazy(() => import("./pages/services/IntelligentOperations"));
const Glossary = lazy(() => import("./pages/Glossary"));
const GlossaryTerm = lazy(() => import("./pages/GlossaryTerm"));
const AIGlossary = lazy(() => import("./pages/AIGlossary"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Services = lazy(() => import("./pages/Services"));
const Clients = lazy(() => import("./pages/Clients"));
const StartProject = lazy(() => import("./pages/StartProject"));
const MediaCenter = lazy(() => import("./pages/MediaCenter"));
const Media = lazy(() => import("./pages/Media"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const FAQ = lazy(() => import("./pages/FAQ"));
const ArtsCulture = lazy(() => import("./pages/ArtsCulture"));
const Lab = lazy(() => import("./pages/Lab"));
const Bureau = lazy(() => import("./pages/Bureau"));
const Studio = lazy(() => import("./pages/Studio"));
const AILabService = lazy(() => import("./pages/services/AILab"));
const StrategicBureauService = lazy(() => import("./pages/services/StrategicBureau"));
const CreativeStudioService = lazy(() => import("./pages/services/CreativeStudio"));
const Agencies = lazy(() => import("./pages/Agencies"));
const ArrowDemo = lazy(() => import("./pages/ArrowDemo"));
const ArrowDemoV2 = lazy(() => import("./pages/ArrowDemoV2"));
const ArrowDemoV3 = lazy(() => import("./pages/ArrowDemoV3"));
const AdminAgencyLeads = lazy(() => import("./pages/admin/AdminAgencyLeads"));
const AdminLEOAnalytics = lazy(() => import("./pages/admin/AdminLEOAnalytics"));
const AdminLEOContacts = lazy(() => import("./pages/admin/AdminLEOContacts"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const CreateFirstAdmin = lazy(() => import("./pages/CreateFirstAdmin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminLoaders = lazy(() => import("./pages/AdminLoaders"));
const AdminAINewsSubscribers = lazy(() => import("./pages/admin/AdminAINewsSubscribers"));
const AdminStartProjectSubmissions = lazy(() => import("./pages/admin/AdminStartProjectSubmissions"));
const AdminContactMessages = lazy(() => import("./pages/admin/AdminContactMessages"));
const AdminSounds = lazy(() => import("./pages/admin/AdminSounds"));
const AdminHome = lazy(() => import("./pages/admin/AdminHome"));
import { ProtectedAdminRoute } from "./components/ProtectedAdminRoute";

// Wrapper component to handle language routes
function LanguageRoute({ component: Component, ...props }: { component: any; path: string }) {
  return <Component {...props} />;
}

function App() {
  // Trigger animations on route change
  usePageTransition();
  // Preload background of destination page to prevent color flash
  usePageBackground();
  
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <PageLoader />
          <ArrowBackground variant="default" />
          <CustomCursor />
          <ScrollToTop />
          <FloatingLanguageToggle />
          <GlobalLEO />
          <Suspense fallback={null}>
            <Switch>
              {/* Language routes - French */}
              <Route path="/fr" component={Home} />
              <Route path="/fr/projects" component={Projects} />
              <Route path="/fr/about" component={About} />
              <Route path="/fr/expertise" component={Expertise} />
              <Route path="/fr/resources" component={Resources} />
              <Route path="/fr/contact" component={Contact} />
              <Route path="/fr/leo" component={Leo} />
              <Route path="/fr/manifesto" component={Manifesto} />
              <Route path="/fr/radar" component={AITrendRadar} />
              <Route path="/fr/ai-trend-radar" component={AITrendRadar} />
              <Route path="/fr/ai-readiness" component={AIReadinessAssessment} />
              <Route path="/fr/ai-readiness-assessment" component={AIReadinessAssessment} />
              <Route path="/fr/assessment" component={AIReadinessAssessment} />
              <Route path="/fr/services/ai-strategy-marketing" component={AIStrategyMarketing} />
              <Route path="/fr/services/digital-platforms" component={DigitalPlatforms} />
              <Route path="/fr/services/intelligent-operations" component={IntelligentOperations} />
              <Route path="/fr/glossary" component={Glossary} />
              <Route path="/fr/glossary/:slug" component={GlossaryTerm} />
              <Route path="/fr/ai-glossary" component={AIGlossary} />
              <Route path="/fr/privacy" component={Privacy} />
              <Route path="/fr/terms" component={Terms} />
              <Route path="/fr/cookies" component={Cookies} />
              <Route path="/fr/testimonials" component={Testimonials} />
              <Route path="/fr/services" component={Services} />
              <Route path="/fr/clients" component={Clients} />
              <Route path="/fr/start-project" component={StartProject} />
              <Route path="/fr/media-center" component={MediaCenter} />
              <Route path="/fr/media" component={Media} />
              <Route path="/fr/privacy-policy" component={PrivacyPolicy} />
              <Route path="/fr/terms-of-service" component={TermsOfService} />
              <Route path="/fr/cookie-policy" component={CookiePolicy} />
              <Route path="/fr/faq" component={FAQ} />
              <Route path="/fr/arts-culture" component={ArtsCulture} />
              <Route path="/fr/lab" component={Lab} />
              <Route path="/fr/bureau" component={Bureau} />
              <Route path="/fr/studio" component={Studio} />
              <Route path="/fr/services/ai-lab" component={AILabService} />
              <Route path="/fr/services/strategic-bureau" component={StrategicBureauService} />
              <Route path="/fr/services/creative-studio" component={CreativeStudioService} />
              <Route path="/fr/agencies" component={Agencies} />
              
              {/* Default routes (English) */}
              <Route path="/" component={Home} />
              <Route path="/projects" component={Projects} />
            <Route path="/about" component={About} />
            <Route path="/expertise" component={Expertise} />
            <Route path="/resources" component={Resources} />
            <Route path="/contact" component={Contact} />
            <Route path="/leo" component={Leo} />
            <Route path="/manifesto" component={Manifesto} />
            <Route path="/radar" component={AITrendRadar} />
            <Route path="/ai-trend-radar" component={AITrendRadar} />
            <Route path="/ai-readiness" component={AIReadinessAssessment} />
            <Route path="/ai-readiness-assessment" component={AIReadinessAssessment} />
            <Route path="/assessment" component={AIReadinessAssessment} />
            <Route path="/services/ai-strategy-marketing" component={AIStrategyMarketing} />
            <Route path="/services/digital-platforms" component={DigitalPlatforms} />
            <Route path="/services/intelligent-operations" component={IntelligentOperations} />
            <Route path="/glossary" component={Glossary} />
            <Route path="/glossary/:slug" component={GlossaryTerm} />
            <Route path="/ai-glossary" component={AIGlossary} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route path="/cookies" component={Cookies} />
            <Route path="/testimonials" component={Testimonials} />
            <Route path="/services" component={Services} />
            <Route path="/clients" component={Clients} />
            <Route path="/start-project" component={StartProject} />
            <Route path="/media-center" component={MediaCenter} />
            <Route path="/media" component={Media} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-of-service" component={TermsOfService} />
            <Route path="/cookie-policy" component={CookiePolicy} />
            <Route path="/faq" component={FAQ} />
            <Route path="/arts-culture" component={ArtsCulture} />
            <Route path="/lab" component={Lab} />
            <Route path="/bureau" component={Bureau} />
            <Route path="/studio" component={Studio} />
            <Route path="/services/ai-lab" component={AILabService} />
            <Route path="/services/strategic-bureau" component={StrategicBureauService} />
            <Route path="/services/creative-studio" component={CreativeStudioService} />
            <Route path="/agencies" component={Agencies} />
          <Route path="/arrow-demo" component={ArrowDemo} />
          <Route path="/arrow-demo-v2" component={ArrowDemoV2} />
          <Route path="/arrow-demo-v3" component={ArrowDemoV3} />
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin/agency-leads">
              <ProtectedAdminRoute><AdminAgencyLeads /></ProtectedAdminRoute>
            </Route>
            <Route path="/admin/leo-analytics">
              <ProtectedAdminRoute><AdminLEOAnalytics /></ProtectedAdminRoute>
            </Route>
            <Route path="/admin/leo-contacts">
              <ProtectedAdminRoute><AdminLEOContacts /></ProtectedAdminRoute>
            </Route>
            <Route path="/admin">
              <ProtectedAdminRoute><AdminHome /></ProtectedAdminRoute>
            </Route>
            <Route path="/admin/dashboard">
              <ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>
            </Route>
            <Route path="/admin/loaders">
              <ProtectedAdminRoute><AdminLoaders /></ProtectedAdminRoute>
            </Route>
            <Route path="/admin/ai-news-subscribers">
              <ProtectedAdminRoute><AdminAINewsSubscribers /></ProtectedAdminRoute>
            </Route>
            <Route path="/admin/sounds">
              <ProtectedAdminRoute><AdminSounds /></ProtectedAdminRoute>
            </Route>
            <Route path="/admin/start-project-submissions">
              <ProtectedAdminRoute><AdminStartProjectSubmissions /></ProtectedAdminRoute>
            </Route>
            <Route path="/admin/contact-messages">
              <ProtectedAdminRoute><AdminContactMessages /></ProtectedAdminRoute>
            </Route>
            <Route path="/create-first-admin" component={CreateFirstAdmin} />
            <Route component={NotFound404} />
          </Switch>
        </Suspense>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
