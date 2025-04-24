import ContinuousLearning from '@/components/sections/continuousLearning'
import FaqSection from '@/components/sections/faqSection'
import InstagramGallery from '@/components/sections/instagramGallery'
import PageHeader from '@/components/sections/pageHeader'
import React from 'react'

const Faq = () => {
    return (
        <>
            <PageHeader
                className={"sbg-3"}
                currentPage={"Faq"}
                title={"Faq"}
            />
            <FaqSection/>
            <ContinuousLearning/>
            <InstagramGallery/>
        </>
    )
}

export default Faq