import { useState } from 'react';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import './Page.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Azure Heights',
      location: 'Gulshan 2, Dhaka',
      status: 'ongoing',
      statusText: 'Under Construction',
      beds: 3,
      baths: 3,
      area: '1,850',
      price: '1. 85',
      completion: '2026'
    },
    {
      id: 2,
      title: 'Pearl Residency',
      location: 'Banani, Dhaka',
      status: 'completed',
      statusText: 'Ready to Move',
      beds: 4,
      baths: 4,
      area: '2,450',
      price: '2.75',
      completion: 'Ready'
    },
    {
      id: 3,
      title: 'Crown Towers',
      location: 'Dhanmondi, Dhaka',
      status: 'upcoming',
      statusText: 'Launching Soon',
      beds: 4,
      baths: 4,
      area: '3,200',
      price: '4.20',
      completion: '2027'
    },
    {
      id: 4,
      title: 'Emerald Gardens',
      location: 'Uttara, Dhaka',
      status: 'completed',
      statusText: 'Ready to Move',
      beds:  3,
      baths:  2,
      area: '1,650',
      price: '1.45',
      completion: 'Ready'
    },
    {
      id: 5,
      title: 'Diamond Plaza',
      location: 'Mirpur DOHS, Dhaka',
      status: 'ongoing',
      statusText: 'Under Construction',
      beds: 4,
      baths: 3,
      area: '2,100',
      price: '2.15',
      completion: '2025'
    },
    {
      id: 6,
      title: 'Sapphire Residence',
      location: 'Bashundhara, Dhaka',
      status: 'upcoming',
      statusText: 'Launching Soon',
      beds:  3,
      baths:  3,
      area: '1,950',
      price: '1.95',
      completion: '2027'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects. filter(project => project.status === filter);

  return (
    <div className="page-container">
      <div className="page-hero">
        <span className="section-label">Our Portfolio</span>
        <h1>Featured Projects</h1>
        <p>Discover our range of premium residential developments</p>
      </div>

      <div className="page-content">
        {/* Filter Buttons */}
        <div className="filter-section">
          <button 
            className={filter === 'all' ?  'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('all')}
          >
            All Projects
          </button>
          <button 
            className={filter === 'ongoing' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('ongoing')}
          >
            Ongoing
          </button>
          <button 
            className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('completed')}
          >
            Ready
          </button>
          <button 
            className={filter === 'upcoming' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
        </div>

        {/* Projects Grid */}
        <div className="projects-list">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card-page">
              <div className="project-image-page">
                <div className="placeholder-image-page">
                  <span>Property Image</span>
                </div>
                <span className={`status-badge-page ${project.status}`}>
                  {project.statusText}
                </span>
              </div>
              <div className="project-info-page">
                <div className="project-header-page">
                  <h3>{project.title}</h3>
                  <div className="price-tag-page">৳{project.price} Cr</div>
                </div>
                <p className="location-page">
                  <FaMapMarkerAlt /> {project.location}
                </p>
                <div className="project-features-page">
                  <div className="feature-item-page">
                    <FaBed />
                    <span>{project. beds} Beds</span>
                  </div>
                  <div className="feature-item-page">
                    <FaBath />
                    <span>{project.baths} Baths</span>
                  </div>
                  <div className="feature-item-page">
                    <FaRulerCombined />
                    <span>{project.area} sqft</span>
                  </div>
                </div>
                <button className="details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;