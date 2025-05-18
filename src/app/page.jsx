'use client';

import AboutOne from '@/components/sections/about/aboutOne'
import Features from '@/components/sections/features/features'
import ImageGallery from '@/components/sections/imageGallery'
import HeroOne from '@/components/sections/heros/heroOne'
import TeamSlider from '@/components/sections/team/teamSlider'
import TestimonialOne from '@/components/sections/testimonial/testimonialOne'
import Expertise from '@/components/sections/expertise'
import React from 'react'

const Home = () => {
    return (
        <main>
            <HeroOne />
            <AboutOne />
            <Expertise />
            <Features />
            <TeamSlider />
            <ImageGallery isTitleShow={true}/>
            <TestimonialOne />
        </main>
    )
}

export default Home