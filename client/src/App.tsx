import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import CustomCursor from "./components/CustomCursor";
import { ThemeProvider } from "./contexts/ThemeContext";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Expertise from "./pages/Expertise";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Leo from "./pages/Leo";
import Manifesto from "./pages/Manifesto";
import { RadarNew as Radar } from "./pages/RadarNew";
import AIReadinessAssessment from "./pages/AIReadinessAssessment";
import AIStrategyMarketing from "./pages/services/AIStrategyMarketing";
import DigitalPlatforms from "./pages/services/DigitalPlatforms";
import IntelligentOperations from "./pages/services/IntelligentOperations";
import Glossary from "./pages/Glossary";
import GlossaryTerm from "./pages/GlossaryTerm";
import ScrollToTop from "./components/ScrollToTop";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Testimonials from "./pages/Testimonials";
import Services from "./pages/Services";
import Clients from "./pages/Clients";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/projects"} component={Projects} />
      <Route path={"/about"} component={About} />
      <Route path={"/expertise"} component={Expertise} />
      <Route path={"/services"} component={Services} />
      <Route path={"/clients"} component={Clients} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/leo"} component={Leo} />
      <Route path={"/manifesto"} component={Manifesto} />
      <Route path={"/radar"} component={Radar} />
      <Route path={"/ai-readiness"} component={AIReadinessAssessment} />
      <Route path={"/services/ai-strategy-marketing"} component={AIStrategyMarketing} />
      <Route path={"/services/digital-platforms"} component={DigitalPlatforms} />
      <Route path={"/services/intelligent-operations"} component={IntelligentOperations} />
      <Route path={"/glossary"} component={Glossary} />
      <Route path={"/glossary/:termId"} component={GlossaryTerm} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/cookies"} component={Cookies} />
      <Route path={"/testimonials"} component={Testimonials} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <LoadingScreen />
          <CustomCursor />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
