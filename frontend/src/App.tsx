import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

/* Páginas */
import { HomePage } from "./pages/Home";
import { RegisterPage } from "./pages/Auth/Register";
import { LoginPage } from "./pages/Auth/Login";

/* Componentes de Layout */
import { Navbar } from "./components/layout/Navbar/Navbar";
import { Footer } from "./components/layout/Footer/Footer";
import { Container } from "./components/layout/Container/Container";

/* Contexts */
import { UserProvider } from "./context/UserContext";

export default function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 5000,
            success: {
              duration: 5000,
            },
            error: {
              duration: 5000,
            },
          }}
        />

        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Container>

        <Footer />
      </UserProvider>
    </Router>
  );
}
