import Hero from "../components/Hero"
import About from "../components/About"
import Features from "../components/Features"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

export default function Home() {
  return (
    <div className="w-full relative">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Footer />
    </div>
  )
}