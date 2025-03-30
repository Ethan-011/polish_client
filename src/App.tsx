
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChatButton from "./components/ChatButton";
import EditIndex from "./pages/EditIndex";
import Login from "./pages/Login";

const queryClient = new QueryClient();

// Custom component to conditionally render ChatButton
const ChatButtonWrapper = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Only show chat button on main page and 404 page
  const showChatButton = currentPath === '/' || (currentPath !== '/login' && currentPath !== '/edit');
  
  return showChatButton ? <ChatButton /> : null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edit" element={<EditIndex />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatButtonWrapper />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
