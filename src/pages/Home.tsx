// Home : page principale du portfolio (ce que voient les visiteurs et recruteurs)
// Elle assemble tous les composants dans l'ordre
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      {/* pt-16 pour compenser la navbar fixe en haut */}
      <main className="pt-16">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}
