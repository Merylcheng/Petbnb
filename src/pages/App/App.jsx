// import debug from "debug";
// import { useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import NavBar from "../../components/NavBar/NavBar";
// import { LandingPage } from "../LandingPage";
// import { getUser } from "../../utilities/users-service";
// import AuthPage from "../AuthPage/AuthPage";
// import LoginForm from "../../components/LoginForm/LoginForm";
// import SitterForm from "../../components/SitterForm/SitterForm";
// import SitterDetails from "../SitterDetails";
// import SignUpForm from "../../components/SignUpForm/SignUpForm";

// const log = debug("mern:pages:App:App");

// function App() {
//   const [user, setUser] = useState(getUser());
//   log("user %o", user);

//   if (!user) {
//     return (
//       <main className="App">
//         <AuthPage setUser={setUser} />
//       </main>
//     );
//   }

//   return (
//     <>
//       <main className="App">
//         <NavBar setUser={setUser} />

//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/signup" element={<SignUpForm />} />
//           <Route path="/sitterform" element={<SitterForm />} />
//           <Route path="/sitters/:id" element={<SitterDetails />} />
//         </Routes>
//       </main>
//     </>
//   );
// }

// export default App;

import debug from "debug";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { LandingPage } from "../LandingPage";
import { getUser } from "../../utilities/users-service";
// import AuthPage from "../AuthPage/AuthPage";
import LoginForm from "../../components/LoginForm/LoginForm";
import SitterForm from "../../components/SitterForm/SitterForm";
import SitterDetails from "../SitterDetails";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SitterDashboard from "../SitterDashboard";
import SitterProfileForm from "../../components/SitterProfileForm/SitterProfileForm";

const log = debug("mern:pages:App:App");

function App() {
  const [user, setUser] = useState(getUser());
  log("user %o", user);

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {!user ? (
          <>
            <Route path="/login" element={<LoginForm setUser={setUser} />} />
            <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
          </>
        ) : (
          <>
            <Route path="/sitterform" element={<SitterForm />} />
            <Route path="/sitters/:id" element={<SitterDetails />} />
            <Route path="/sitterdashboard" element={<SitterDashboard />} />
            <Route path="/profile" element={<SitterProfileForm />} />
          </>
        )}
      </Routes>
    </main>
  );
}

export default App;
