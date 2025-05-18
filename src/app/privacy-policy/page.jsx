import InstagramGallery from '@/components/sections/instagramGallery'
import PageHeader from '@/components/sections/pageHeader'
import React from 'react'

const PrivacyPolicy = () => {
    return (
        <>
            <PageHeader
                className={"sbg-6"}
                currentPage={"Privacy Policy"}
                title={"Privacy Policy"}
            />
            <div className="cookie-section ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="cookie-content">
                                <div className="pera-list">
                                    <h2>Intellectual Property</h2>
                                    <p>All content and materials on this website, including but not limited to text, images, graphics, logos, and software, are the property of [Your Company] and are protected by intellectual property laws.</p>
                                </div>
                                <div className="pera-list">
                                    <h2> Your Data Protection Rights Under General Data Protection Regulation (GDPR)</h2>
                                    <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. [Your Company Name] aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</p>
                                    <p>If you wish to be informed about what Personal Data we hold about you and if you want it to be removed from our systems, please contact us.</p>
                                </div>
                                <div className="pera-list">
                                    <h2>Links to Other Sites</h2>
                                    <p>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
                                    <p>We have no control over and assume no responsibility for the content, privacy policies, or practices of any third party sites or services.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <InstagramGallery />
        </>
    )
}

export default PrivacyPolicy