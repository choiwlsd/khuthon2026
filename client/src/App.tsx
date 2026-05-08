import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ContentInput from "./pages/ContentInput";
import BubbleAudit from "./pages/BubbleAudit";
import SpectrumMap from "./pages/SpectrumMap";
import Roulette from "./pages/Roulette";

/**
 * Router: 애플리케이션 라우팅
 * 
 * 모든 페이지 경로를 정의합니다.
 */
function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/input"} component={ContentInput} />
      <Route path={"/audit"} component={BubbleAudit} />
      <Route path={"/spectrum"} component={SpectrumMap} />
      <Route path={"/roulette"} component={Roulette} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
