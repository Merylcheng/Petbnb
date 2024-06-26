import debug from "debug";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { LandingPage } from "../LandingPage";
import { getUser } from "../../utilities/users-service";
import NavBar from "../../components/NavBar/NavBar";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SitterDetails from "../SitterDetails";
import SitterProfileForm from "../../components/SitterProfileForm/SitterProfileForm";
import BeASitter from "../BeASitter";
import Messages from "../Messages";
import AuthPage from "../AuthPage/AuthPage";
import MyCalendar from "../../components/Calendar/MyCalendar";
import BookingPage from "../BookingPage";

const log = debug("mern:pages:App:App");

const App = () => {
  const [user, setUser] = useState(getUser());
  log("user %o", user);

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/beasitter" element={<BeASitter />} />
        <Route path="/auth" element={<AuthPage />} />
        {!user ? (
          <>
            <Route path="/login" element={<LoginForm setUser={setUser} />} />
            <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
          </>
        ) : user.role === "user" ? (
          <>
            <Route
              path="/sitters/:id"
              element={<SitterDetails userId={user._id} />}
            />
            <Route
              path="/messages/:receiverId"
              element={<Messages user={user} />}
            />
            <Route
              path="/calendar"
              element={<MyCalendar userId={user._id} userName={user.name} />}
            />
            <Route
              path="/bookingPage"
              element={<BookingPage userId={user._id} userName={user.name} />}
            />
          </>
        ) : user.role === "sitter" ? (
          <>
            <Route
              path="/sitters/:id"
              element={<SitterDetails userId={user._id} />}
            />
            <Route
              path="/profile"
              element={<SitterProfileForm user={user} />}
            />
            <Route
              path="/messages/:receiverId"
              element={<Messages user={user} />}
            />
            <Route
              path="/calendar"
              element={<MyCalendar userId={user._id} userName={user.name} />}
            />
            <Route
              path="/bookingPage"
              element={<BookingPage userId={user._id} />}
            />
          </>
        ) : null}

        <Route path="*" element={<Navigate to={user ? "/" : "/auth"} />} />
      </Routes>
    </main>
  ); //wildcard route (*) redirects to /auth. If user is logged in, redirects to home page
};

export default App;
