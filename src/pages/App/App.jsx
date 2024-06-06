// import debug from "debug";
// import { useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import NavBar from "../../components/NavBar/NavBar";
// import { LandingPage } from "../LandingPage";
// import { getUser } from "../../utilities/users-service";
// import LoginForm from "../../components/LoginForm/LoginForm";
// import SitterForm from "../../components/SitterForm/SitterForm";
// import SitterDetails from "../SitterDetails";
// import SignUpForm from "../../components/SignUpForm/SignUpForm";
// import Dashboard from "../Dashboard";
// import SitterProfileForm from "../../components/SitterProfileForm/SitterProfileForm";
// import BeASitter from "../BeASitter";
// import Messages from "../Messages";

// const log = debug("mern:pages:App:App");

// function App() {
//   const [user, setUser] = useState(getUser());
//   log("user %o", user);

//   return (
//     <main className="App">
//       <NavBar user={user} setUser={setUser} />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/beasitter" element={<BeASitter />} />
//         {!user ? (
//           <>
//             <Route path="/login" element={<LoginForm setUser={setUser} />} />
//             <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
//           </>
//         ) : user.role === "user" ? (
//           <>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/messages/:receiverId" element={<Messages />} />
//             <Route path="/sitters/:id" element={<SitterDetails />} />
//           </>
//         ) : (
//           user.role === "sitter" && (
//             <>
//               <Route path="/sitterform" element={<SitterForm />} />
//               {/* <Route path="/sitters/:id" element={<SitterDetails />} /> */}
//               <Route path="/profile" element={<SitterProfileForm />} />
//               <Route path="/messages/:receiverId" element={<Messages />} />
//             </>
//           )
//         )}
//       </Routes>
//     </main>
//   );
// }

// export default App;

import debug from "debug";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { LandingPage } from "../LandingPage";
import { getUser } from "../../utilities/users-service";
import LoginForm from "../../components/LoginForm/LoginForm";
import SitterForm from "../../components/SitterForm/SitterForm";
import SitterDetails from "../SitterDetails";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Dashboard from "../Dashboard";
import SitterProfileForm from "../../components/SitterProfileForm/SitterProfileForm";
import BeASitter from "../BeASitter";
import Messages from "../Messages";

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
        {!user ? (
          <>
            <Route path="/login" element={<LoginForm setUser={setUser} />} />
            <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
          </>
        ) : user.role === "user" ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sitters/:id" element={<SitterDetails />} />
            <Route path="/messages/:receiverId" element={<Messages />} />
          </>
        ) : (
          user.role === "sitter" && (
            <>
              <Route path="/sitterform" element={<SitterForm />} />
              <Route path="/sitters/:id" element={<SitterDetails />} />
              <Route path="/profile" element={<SitterProfileForm />} />
              <Route path="/messages/:receiverId" element={<Messages />} />
            </>
          )
        )}
      </Routes>
    </main>
  );
};

export default App;

//66616d21c8d23c91c8e50f46 owner
