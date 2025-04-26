import { BrowserRouter, Routes , Route }  from "react-router-dom"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import About from "./pages/About"
import Projects from "./pages/Projects"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import Header from "./components/Header"

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/Projects" element={<Projects />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/DashBoard" element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}