import ImageGallery from '@/components/sections/imageGallery'
import InstagramGallery from '@/components/sections/instagramGallery'
import PageHeader from '@/components/sections/pageHeader'
import VideoSection from '@/components/sections/videoSection'
import TestimonialOne from '@/components/sections/testimonial/testimonialOne'
import React from 'react'

const Gallery = () => {
    return (
        <>
            <ImageGallery className={"pt-100"}/>
            <TestimonialOne />
            <VideoSection className={"vid-bg-1"}/>.
        </>
    )
}

export default Gallery