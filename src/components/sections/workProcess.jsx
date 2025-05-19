import React from 'react'

const processSteps = [
    {
        id: 1,
        title: 'Selección de Granos',
        description: 'Seleccionamos los mejores granos de café de origen único.',
        icon: '/src/assets/img/process-1.png'
    },
    {
        id: 2,
        title: 'Tostado Perfecto',
        description: 'Nuestro sistema de tostado controlado por IA garantiza el punto exacto.',
        icon: '/src/assets/img/process-2.png'
    },
    {
        id: 3,
        title: 'Preparación Inteligente',
        description: 'La cafetera aprende tus preferencias y ajusta cada preparación.',
        icon: '/src/assets/img/process-3.png'
    }
];

const WorkProcess = () => {
    return (
        <section className="work-process">
            <div className="container">
                <h2>Nuestro Proceso</h2>
                <div className="row">
                    {processSteps.map((step) => (
                        <div key={step.id} className="col-md-4">
                            <div className="process-card">
                                <div className="icon">
                                    <img src={step.icon} alt={step.title} />
                                </div>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WorkProcess