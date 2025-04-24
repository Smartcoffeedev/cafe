import AboutOne from '@/components/sections/about/aboutOne'
import Features from '@/components/sections/features/features'
import ImageGallery from '@/components/sections/imageGallery'
import HeroOne from '@/components/sections/heros/heroOne'
import TeamSlider from '@/components/sections/team/teamSlider'
import TestimonialOne from '@/components/sections/testimonial/testimonialOne'
import React from 'react'

const Home = () => {
    return (
        <>
            <HeroOne />
            <AboutOne />
            <Features />
            <TeamSlider />
            <ImageGallery isTitleShow={true}/>
            <TestimonialOne />
        </>
    )
}

export default Home