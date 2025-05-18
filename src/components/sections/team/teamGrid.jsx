import React, { useEffect, useState } from 'react'
import TeamCard from './teamCard'

const TeamGrid = () => {
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        fetch('/api/team')
            .then(res => res.json())
            .then(data => setTeamMembers(Array.isArray(data) ? data : []));
    }, []);

    return (
        <div className="team-section-2 pt-100">
            <div className="container">
                <div className="row">
                    {
                        teamMembers.map((member, index) => (
                            <div key={member.id} className="col-lg-4 col-sm-6" data-animation="fade-up" data-delay={index * 0.1}>
                                <TeamCard {...member} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TeamGrid