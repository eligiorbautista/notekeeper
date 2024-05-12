import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import MyNotes from "./pages/MyNotes";
import NewNote from "./pages/NewNote";
import Home from "./pages/Home";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" replace />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Registration />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthenticatedRoute><Home /></AuthenticatedRoute>} />
        <Route path="/new-note" element={<AuthenticatedRoute><NewNote /></AuthenticatedRoute>} />
        <Route path="/my-notes" element={<AuthenticatedRoute><MyNotes /></AuthenticatedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
