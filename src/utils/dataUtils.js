import {
    testimonials,
    team,
    services,
    projects,
    faq,
    contactInfo,
    navigation,
    footerData
} from '@/data/siteData';

// Funciones para obtener datos
export const getTestimonials = () => testimonials;
export const getTeam = () => team;
export const getServices = () => services;
export const getProjects = () => projects;
export const getFaq = () => faq;
export const getContactInfo = () => contactInfo;
export const getNavigation = () => navigation;
export const getFooterData = () => footerData;

// Funciones para obtener datos por ID
export const getTestimonialById = (id) => testimonials.find(t => t.id === id);
export const getTeamMemberById = (id) => team.find(t => t.id === id);
export const getServiceById = (id) => services.find(s => s.id === id);
export const getProjectById = (id) => projects.find(p => p.id === id);
export const getFaqById = (id) => faq.find(f => f.id === id);

// Funciones para filtrar datos
export const getProjectsByCategory = (category) => projects.filter(p => p.category === category); 