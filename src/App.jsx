import { HashRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import MobileBottomNav from './components/MobileBottomNav'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Book from './pages/Book'
import Events from './pages/Events'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <LanguageProvider>
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/book" element={<Book />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <MobileBottomNav />
      </div>
    </HashRouter>
    </LanguageProvider>
  )
}

export default App
