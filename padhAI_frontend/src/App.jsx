import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/navbar'

import Home from './Home';
import Login from './Login'
import Signup from './SignUp'
import JEE from './JEE'
import ShortNotes from './ShortNotes'
import Upload from './Upload'
import VideoInput from './VideoInput'
import Loading from './Loading'
import DownloadNotes from './Download'
import ToDoList from './ToDoList'

import Lectures from './lectures'
import Teachers from './teachers'
import Questions from './questions'

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* APP FEATURES */}
        <Route path="/jee" element={<ProtectedRoute><JEE /></ProtectedRoute>}>
          <Route index element={<Lectures />} />
          <Route path="lectures" element={<Lectures />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="questions" element={<Questions />} />
        </Route>
        <Route path="/short-notes" element={<ShortNotes />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/video-input" element={<VideoInput />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/download" element={<DownloadNotes />} />
        <Route path="/todo" element={<ToDoList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
