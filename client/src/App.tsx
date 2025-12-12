import { Suspense, lazy } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import CustomCursor from "./components/CustomCursor";
import ModernLoader from "./components/ModernLoader";
import SuspenseLoader from "./components/SuspenseLoader";
import { ThemeProvider } from "./contexts/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";
import { usePageTransition } from "./hooks/usePageTransition";

// Eager load only critical pages
import Home from "./pages/Home";
import NotFound404 from "@/pages/NotFound404";

// Lazy load all other pages
const Projects = lazy(() => import("./pages/Projects"));
const About = lazy(() => import("./pages/About"));
const Expertise = lazy(() => import("./pages/Expertise"));
const Resources = lazy(() => import("./pages/Resources"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const Leo = lazy(() => import("./pages/Leo"));
const Manifesto = lazy(() => import("./pages/Manifesto"));
const Radar = lazy(() => import("./pages/RadarNew").then(m => ({ default: m.RadarNew })));
const AIReadinessAssessment = lazy(() => import("./pages/AIReadinessAssessment"));
const AIStrategyMarketing = lazy(() => import("./pages/services/AIStrategyMarketing"));
const DigitalPlatforms = lazy(() => import("./pages/services/DigitalPlatforms"));
const IntelligentOperations = lazy(() => import("./pages/services/IntelligentOperations"));
const Glossary = lazy(() => import("./pages/Glossary"));
const GlossaryTerm = lazy(() => import("./pages/GlossaryTerm"));
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
const ArtsCulture = lazy(() => import("./pages/ArtsCulture"));
const Lab = lazy(() => import("./pages/Lab"));
const Bureau = lazy(() => import("./pages/Bureau"));
const Studio = lazy(() => import("./pages/Studio"));
const AILabService = lazy(() => import("./pages/services/AILab"));
const StrategicBureauService = lazy(() => import("./pages/services/StrategicBureau"));
const CreativeStudioService = lazy(() => import("./pages/services/CreativeStudio"));
const Agencies = lazy(() => import("./pages/Agencies"));
const ArrowDemo = lazy(() => import("./pages/ArrowDemo"));
const AdminAgencyLeads = lazy(() => import("./pages/admin/AdminAgencyLeads"));
const AdminLEOAnalytics = lazy(() => import("./pages/admin/AdminLEOAnalytics"));
const AdminLEOContacts = lazy(() => import("./pages/admin/AdminLEOContacts"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const CreateFirstAdmin = lazy(() => import("./pages/CreateFirstAdmin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

function App() {
  // Trigger animations on route change
  usePageTransition();
  
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <CustomCursor />
        <ScrollToTop />
        <Suspense fallback={<SuspenseLoader />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/projects" component={Projects} />
            <Route path="/about" component={About} />
            <Route path="/expertise" component={Expertise} />
            <Route path="/resources" component={Resources} />
            <Route path="/faq" component={FAQ} />
            <Route path="/contact" component={Contact} />
            <Route path="/leo" component={Leo} />
            <Route path="/manifesto" component={Manifesto} />
            <Route path="/radar" component={Radar} />
            <Route path="/assessment" component={AIReadinessAssessment} />
            <Route path="/services/ai-strategy-marketing" component={AIStrategyMarketing} />
            <Route path="/services/digital-platforms" component={DigitalPlatforms} />
            <Route path="/services/intelligent-operations" component={IntelligentOperations} />
            <Route path="/glossary" component={Glossary} />
            <Route path="/glossary/:slug" component={GlossaryTerm} />
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
            <Route path="/arts-culture" component={ArtsCulture} />
            <Route path="/lab" component={Lab} />
            <Route path="/bureau" component={Bureau} />
            <Route path="/studio" component={Studio} />
            <Route path="/services/ai-lab" component={AILabService} />
            <Route path="/services/strategic-bureau" component={StrategicBureauService} />
            <Route path="/services/creative-studio" component={CreativeStudioService} />
            <Route path="/agencies" component={Agencies} />
          <Route path="/arrow-demo" component={ArrowDemo} />
            <Route path="/admin/agency-leads" component={AdminAgencyLeads} />
            <Route path="/admin/leo-analytics" component={AdminLEOAnalytics} />
            <Route path="/admin/leo-contacts" component={AdminLEOContacts} />
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin/dashboard" component={AdminDashboard} />
            <Route path="/create-first-admin" component={CreateFirstAdmin} />
            <Route component={NotFound404} />
          </Switch>
        </Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
