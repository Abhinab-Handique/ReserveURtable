import React from 'react'
import About from '../components/About'
import HeroSection from '../components/HeroSection'
import Menu from '../components/Menu'
import Qualities from '../components/Qualities'
import Reservation from '../components/Reservation'
import Team from '../components/team'
import WhoAreWe from '../components/WhoAreWE'
function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <About></About>
      <Qualities></Qualities>
      <Menu></Menu>
      <WhoAreWe></WhoAreWe>
      <Team></Team>

      
    </div>
  )
}

export default Home
