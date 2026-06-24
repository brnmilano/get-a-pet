import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

/* Páginas */
import { HomePage } from "./pages/Home";
import { RegisterPage } from "./pages/Auth/Register";
import { LoginPage } from "./pages/Auth/Login";
import { AddPet } from "./pages/Pets/AddPet/AddPet";
import { MyPets } from "./pages/Pets/MyPets/MyPets";
import { EditPet } from "./pages/Pets/EditPet/EditPet";
import { PetDetails } from "./pages/Pets/PetDetails/PetDetails";
import { MyAdoptions } from "./pages/Pets/MyAdoptions/MyAdoptions";

/* Componentes de Layout */
import { Navbar } from "./components/layout/Navbar/Navbar";
import { Footer } from "./components/layout/Footer/Footer";
import { Container } from "./components/layout/Container/Container";
import { Profile } from "./pages/User/Profile";

/* Contexts */
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <Router>
      <AuthProvider>
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

            <Route path="/user/profile" element={<Profile />} />

            <Route path="/pets/mypets" element={<MyPets />} />

            <Route path="/pets/add" element={<AddPet />} />

            <Route path="/pets/edit/:id" element={<EditPet />} />

            <Route path="/pet/:id" element={<PetDetails />} />

            <Route path="/pet/myadoptions" element={<MyAdoptions />} />
          </Routes>
        </Container>

        <Footer />
      </AuthProvider>
    </Router>
  );
}
