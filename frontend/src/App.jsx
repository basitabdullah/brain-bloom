import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import SignupModal from "./components/SignupModal";
import LoginModal from "./components/LoginModal";
import SubscriptionModal from "./components/SubscriptionModal";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CoursesPage from "./pages/CoursesPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import VideoPlayerPage from "./pages/VideoPlayerPage";
import "./styles/main.scss";
import TearmsAndServices from "./components/TearmsAndServices";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import AdminLayout from "./components/AdminLayout";
import CoursesList from "./pages/admin/CoursesList";
import AddCourse from "./pages/admin/AddCourse";
import UsersManagement from "./pages/admin/UsersManagement";
import Payments from "./pages/admin/Payments";
import AppLayout from "./components/AppLayout";
import UpdateCourse from "./pages/admin/UpdateCourse";
import SuccessPage from "./components/SuccessPage";
import FailurePage from "./components/FailurePage";
import Profile from "./pages/Profile";
import SubDetails from "./pages/SubDetails";
import Subscribe from "./pages/Subscribe";
import Privacy from "./components/Privacy";

function App() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const { user } = useUserStore();

  const handleSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
    setIsSubscriptionOpen(false);
  };

  const handleLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
    setIsSubscriptionOpen(false);
  };

  const handleSubscription = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(false);
    setIsSubscriptionOpen(true);
  };

  return (
    <Router>
      <AppLayout>
        <Header
          onSignupClick={handleSignup}
          onLoginClick={handleLogin}
          onSubscriptionClick={handleSubscription}
        />

        <main>
          <ScrollToTop>
            <Toaster position="bottom-right" reverseOrder={false} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/terms" element={<TearmsAndServices />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/failure" element={<FailurePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/subscribe" element={<Subscribe />} />
              <Route path="/subscription-detail" element={<SubDetails />} />

              <Route
                path="/watch/:courseId"
                element={
                  user &&
                  (user.role === "admin" || user.role === "subscriber") ? (
                    <VideoPlayerPage />
                  ) : (
                    <Navigate to="/subscribe" />
                  )
                }
              />
              <Route
                path="/admin"
                element={
                  user &&
                  (user.role === "admin" || user.role === "subscriber") ? (
                    <AdminLayout />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              >
                <Route
                  index
                  element={<Navigate to="/admin/courses" replace />}
                />
                <Route path="courses" element={<CoursesList />} />
                <Route path="add-course" element={<AddCourse />} />
                <Route path="update-course/:id" element={<UpdateCourse />} />
                <Route path="users" element={<UsersManagement />} />
                <Route path="payments" element={<Payments />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ScrollToTop>
        </main>

        <SignupModal
          isOpen={isSignupOpen}
          onClose={() => setIsSignupOpen(false)}
          onLoginClick={handleLogin}
        />
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onSignupClick={handleSignup}
        />
        <SubscriptionModal
          isOpen={isSubscriptionOpen}
          onClose={() => setIsSubscriptionOpen(false)}
        />
      </AppLayout>
    </Router>
  );
}

export default App;
