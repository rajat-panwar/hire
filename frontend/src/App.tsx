import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Candidates } from "./pages/Candidates"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace={true} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/candidates" element={<Candidates />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App