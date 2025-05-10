import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/ui/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashClient from "./pages/DashClient";
import DashProvider from "./pages/DashProvider";
import ProviderProducts from "./components/ProviderProducts";
import ProviderCreateForm from "./components/ProviderCreateForm";
import ProviderPreferences from "./components/ProviderPreferences";
import ProviderIndex from "./components/ProviderIndex";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Footer from "./components/ui/Footer";
import ProductDescription from "./pages/ProductDescription";
import ProductIndexPage from "./components/products/ProductIndexPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/products" element={<Products />}>
              <Route index element={<ProductIndexPage />} />
              <Route path=":id" element={<ProductDescription />} />
            </Route>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route path="client" element={<DashClient />} />
              <Route path="provider" element={<DashProvider />}>
                <Route index element={<ProviderIndex />} />
                <Route path="products" element={<ProviderProducts />} />
                <Route path="create" element={<ProviderCreateForm />} />
                <Route path="preferences" element={<ProviderPreferences />} />
              </Route>
            </Route>
          </Routes>
          <Footer />
          <Toaster position="bottom-center" richColors />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
