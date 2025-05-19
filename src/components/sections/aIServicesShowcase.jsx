import React from 'react'
import { Link } from 'react-router-dom'

const portfolioItems = [
    { title: "Bird Art", image: "/img/all-img/protfolio1.jpg" },
    { title: "Brave Man", image: "/img/all-img/protfolio2.jpg" },
    { title: "Dragon Fire", image: "/img/all-img/protfolio3.jpg" },
];

const AIServicesShowcase = () => {
    return (
        <section className="work-section pt-100">
            <div className="container">
                <div className="title-section">
                    <div className="row align-items-end justify-content-between" data-animation="fade-down" >
                        <div className="col-xl-6 col-lg-7 col-md-7">
                            <div className="title-content">
                                <h2>Revolutionizing Your World with AI Services</h2>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-5">
                            <div className="title-content">
                                <p>Artificial Intelligence stands at the forefront, transforming the way we live and work. Our AI services are designed to propel your business into the future.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {portfolioItems.map((item, index) => (
                        <div key={index} className="col-lg-4 col-md-6">
                            <div className="work-box" data-animation="fade-up" data-aos-offset={(index + 1) * 100}>
                                <div className="image">
                                    <Link to="/services-details">
                                        <img width={416} height={518} src={item.image} alt={item.title} style={{width: '100%', height: 'auto'}} />
                                    </Link>
                                </div>
                                <Link className="content3" to="/services-details">
                                    <h3>{item.title}</h3>
                                    <i className="bx bx-arrow-back bx-rotate-180" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AIServicesShowcase