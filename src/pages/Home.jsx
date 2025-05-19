import Hero from '../components/sections/Hero'
import Features from '../components/sections/Features'
import About from '../components/sections/About'
import Services from '../components/sections/Services'
import TeamSlider from '../components/sections/team/teamSlider'
import Contact from '../components/sections/Contact'

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <Services />
      <TeamSlider />
      <Contact />
    </>
  )
}

export default Home 