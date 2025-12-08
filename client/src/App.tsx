import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import CustomCursor from "./components/CustomCursor";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Expertise from "./pages/Expertise";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Leo from "./pages/Leo";
import Manifesto from "./pages/Manifesto";
import Radar from "./pages/Radar";
import AIReadinessAssessment from "./pages/AIReadinessAssessment";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/projects"} component={Projects} />
      <Route path={"/about"} component={About} />
      <Route path={"/expertise"} component={Expertise} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/leo"} component={Leo} />
      <Route path={"/manifesto"} component={Manifesto} />
      <Route path={"/radar"} component={Radar} />
      <Route path={"/ai-readiness"} component={AIReadinessAssessment} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <CustomCursor />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
