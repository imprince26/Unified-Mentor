/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventCreate from "./pages/EventCreate";
import EventDetails from "./components/events/EventDetails";
import SportsBuddyLoader from "./components/layout/Loader";
import NotFound from "./pages/NotFound";
// import UpdateEventForm from "./components/events/UpdateEventForm";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <SportsBuddyLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      {/* Protected Routes */}

      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events/create"
        element={
          <ProtectedRoute>
            <EventCreate />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/events/edit/:id"
        element={
          <ProtectedRoute>
           <UpdateEventForm />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/events/:id"
        element={
          <ProtectedRoute>
            <EventDetails />
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
