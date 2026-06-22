"use client";

import { useState, useMemo } from 'react';
import '../avisos/avisos.css';

export default function Avisos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  
  const sampleJobs = [
    {
      id: 1,
      title: "Encargado de seguridad industrial",
      company: "Isocret",
      location: "Senkata",
      type: "full-time",
      salary: "3500",
      description: "Conocimientos en el programa de gestión de seguridad y salud en el trabajo, conocimiento de sistemas de gestión ambiental ISO 14001 (valorable), conocimiento de sistemas de gestión y prevención de accidentes de tránsito.",
      requirements: ["Titulado en Ingeniería Industrial, Ambiental o ramas afines.", "Experiencia mínima de 2 años en funciones similares (deseable rubro de construcción).", "Disponibilidad inmediata."],
      postedDate: "2026-05-25",
      tags: ["Ingeniería Industrial", "sistemas de gestión", "gestión de seguridad"],
      logo: "https://via.placeholder.com/80x80/667eea/ffffff?text=TC",
      image: "https://ik.imagekit.io/sistemasInformaticos/avisos_laborales/oferta_01_banc.jfif"
    },
    {
      id: 2,
      title: "Agente de promocion medica",
      company: "Imfar SRL",
      location: "La Paz",
      type: "part-time",
      salary: "3500",
      description: "Formación en carreras Comerciales, Salud, Marketing, Comunicación o afines, experiencia demostrable en ventas, de preferencia en el área de productos intangibles (seguros, servicios, membresías, etc.), persona dinámica, con habilidades de negociación, comunicación efectiva y orientación a resultados.",
      requirements: ["Manejo de Word y Excel para elaboración de informes.", "Conocimientos de Close Up (deseable).", "Contar con medio de transporte propio."],
      postedDate: "2026-05-18",
      tags: ["Marketing", "Word", "Excel"],
      logo: "https://via.placeholder.com/80x80/764ba2/ffffff?text=DS",
      image: "https://ik.imagekit.io/sistemasInformaticos/avisos_laborales/oferta_02_AG.jfif"
    },
    {
      id: 3,
      title: "Docente facilitador",
      company: "SAID",
      location: "El Alto",
      type: "full-time",
      salary: "2500",
      description: "Se solicita docente experto en esamblaje de computadoras",
      requirements: ["Experiencia en capacitacion de ensamblado", "Jornada laboral por las tardes.", "Ambiente de trabajo estable."],
      postedDate: "2026-05-15",
      tags: ["Ensamblaje", "Electronica", "Tecnologia"],
      logo: "https://via.placeholder.com/80x80/10b981/ffffff?text=DS",
      image: "https://ik.imagekit.io/sistemasInformaticos/avisos_laborales/oferta_03_Sist.jpeg"
    },
    {
      id: 4,
      title: "Asesores inmobiliarios",
      company: "WebSolutions",
      location: "Remoto",
      type: "full-time",
      salary: "Comisiones",
      description: "Buscamos asesores inmobiliarios independientes, comisiones altas por cada venta, crecimiento real",
      requirements: ["Eres mayor de edad.", "Te gusta hablar y negociar.", "Usas redes sociales.", "Tienes disponibilidad inmediata."],
      postedDate: "2026-05-19",
      tags: ["Inmobiliaria"],
      logo: "https://via.placeholder.com/80x80/ef4444/ffffff?text=WS",
      image: "https://ik.imagekit.io/sistemasInformaticos/avisos_laborales/oferta_04_Inm.jpeg"
    },
    {
      id: 5,
      title: "Sub gerente de estratetegia y control de gestion",
      company: "Caja de salud",
      location: "La Paz",
      type: "contract",
      salary: "4500",
      description: "Liderar la planificación estratégica y financiera de la institución, integrando control de gestión, formulación y seguimiento de proyectos, y analítica de datos como soporte para la toma de decisiones. Asegurar que la estrategia institucional esté alineada con la planificación financiera, utilizando enfoques innovadores y adaptativos que fortalezcan la eficiencia operativa, la sostenibilidad y la generación de resultados medibles.",
      requirements: ["Experiencia laboral general mínima de ocho (8) años.", "Experiencia específica mínima de cuatro (4) años en cargos similares de Subgerencia o Jefatura.", "Elaboración y gestión del presupuesto, indicadores financieros, análisis de rentabilidad, costos u optimización de recursos.", "Metodologías ágiles como SCRUM, Kanban, o tradicionales como PMBOK; formulación, evaluación y seguimiento de proyectos.", "Herramientas de análisis de datos e inteligencia de negocios como Power BI, Tableau, SQL, Excel Avanzado o Python (deseable).", "Dominio en reportes automatizados y construcción de basuras gerenciales. (Nota: probablemente quiso decir dashboards gerenciales", "Manejo de herramientas de análisis de datos e inteligencia de negocios (Power BI, Tableau, SQL, Excel Avanzado y similares) (deseable)."],
      postedDate: "2026-05-10",
      tags: ["Control", "Gestion", "Scrum"],
      logo: "https://via.placeholder.com/80x80/f59e0b/ffffff?text=CT",
      image: "https://ik.imagekit.io/sistemasInformaticos/avisos_laborales/oferta_05_contGest.jpeg"
    }
  ];

  
  const filteredJobs = useMemo(() => {
    return sampleJobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = selectedType === 'all' || job.type === selectedType;

      const matchesLocation = selectedLocation === 'all' || 
        job.location.toLowerCase() === selectedLocation.toLowerCase() ||
        (selectedLocation === 'remote' && job.location === 'Remoto');

      return matchesSearch && matchesType && matchesLocation;
    });
  }, [searchTerm, selectedType, selectedLocation]);

  return (
    <div className="avisos-container">
      <div className="avisos-header">
        <h1>Ofertas Laborales</h1>
        <p>Encuentra tu próxima oportunidad profesional</p>
      </div>

      
      <div className="search-section">
        <input
          type="text"
          placeholder="Buscar por título, empresa o descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <div className="filters">
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="all">Todos los tipos</option>
            <option value="full-time">Tiempo completo</option>
            <option value="part-time">Medio tiempo</option>
            <option value="contract">Contrato</option>
            <option value="freelance">Freelance</option>
          </select>

          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
            <option value="all">Todas las ubicaciones</option>
            <option value="remote">Remoto</option>
            <option value="madrid">La Paz</option>
            <option value="barcelona">El ALto</option>
            <option value="valencia">Senkata</option>
          </select>

          <button className="clear-filters" onClick={() => {
            setSearchTerm('');
            setSelectedType('all');
            setSelectedLocation('all');
          }}>
            Limpiar filtros
          </button>
        </div>
      </div>

      
      <div className="jobs-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => <JobCardDetailed key={job.id} job={job} />)
        ) : (
          <div className="no-results">
            <p>No se encontraron ofertas que coincidan con tu búsqueda</p>
            <button onClick={() => {
              setSearchTerm('');
              setSelectedType('all');
              setSelectedLocation('all');
            }}>
              Ver todas las ofertas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


const JobCardDetailed = ({ job }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getJobTypeColor = (type) => {
    const colors = {
      'full-time': 'green',
      'part-time': 'orange',
      'contract': 'blue',
      'freelance': 'purple'
    };
    return colors[type] || 'gray';
  };

  const getJobTypeText = (type) => {
    const texts = {
      'full-time': 'Tiempo completo',
      'part-time': 'Medio tiempo',
      'contract': 'Contrato',
      'freelance': 'Freelance'
    };
    return texts[type] || type;
  };

  const handleViewDetails = (e) => {
    e.stopPropagation(); 
    setShowModal(true);
  };

  return (
    <>
      <div className="job-card-detailed">
        
        <div className="job-image-container">
          {!imageError ? (
            <img 
              src={job.image} 
              alt={`${job.company} - ${job.title}`}
              className="job-image"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="job-image-placeholder">
              <span>🏢</span>
              <p>{job.company}</p>
            </div>
          )}
        </div>
        
        <div className="job-content">
          <div className="card-header">
            <div className="header-left">
              <div className="company-logo">
                <img 
                  src={job.logo} 
                  alt={job.company}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/40x40/cccccc/ffffff?text=?";
                  }}
                />
              </div>
              <div className="company-info">
                <h3>{job.title}</h3>
                <div className="card-company">
                  <strong>{job.company}</strong>
                  <span>📍 {job.location}</span>
                </div>
              </div>
            </div>
            <span className={`job-type-badge ${getJobTypeColor(job.type)}`}>
              {getJobTypeText(job.type)}
            </span>
          </div>
          
          <p className="card-description">{job.description.substring(0, 120)}...</p>
          
          <div className="card-footer">
            <span className="salary">💰 {job.salary}</span>
            <div className="tags">
              {job.tags?.slice(0, 3).map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            
            <button className="view-details" onClick={handleViewDetails}>
              Ver detalles
            </button>
          </div>
        </div>
      </div>

      
      {showModal && (
        <JobModal job={job} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

const JobModal = ({ job, onClose }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        
        <div className="modal-image-container">
          {!imageError ? (
            <img 
              src={job.image} 
              alt={job.title}
              className="modal-image"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="modal-image-placeholder">
              <span>🏢</span>
            </div>
          )}
        </div>
        
        <div className="modal-header">
          <div className="modal-logo">
            <img src={job.logo} alt={job.company} />
          </div>
          <div>
            <h2>{job.title}</h2>
            <p className="modal-company">{job.company} · {job.location}</p>
          </div>
        </div>
        
        <div className="modal-section">
          <h3>Descripción del puesto</h3>
          <p>{job.description}</p>
        </div>
        
        <div className="modal-section">
          <h3>Requisitos</h3>
          <ul>
            {job.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>
        
        <div className="modal-section">
          <h3>Información adicional</h3>
          <p><strong>💰 Rango salarial:</strong> {job.salary}</p>
          <p><strong>📅 Publicado:</strong> {new Date(job.postedDate).toLocaleDateString()}</p>
          <p><strong>🏷️ Tipo:</strong> {getJobTypeText(job.type)}</p>
        </div>
        
        <div className="modal-actions">
          <button className="apply-now">Postularme ahora</button>
          <button className="save-job">Guardar oferta</button>
        </div>
      </div>
    </div>
  );
};


const getJobTypeText = (type) => {
  const texts = {
    'full-time': 'Tiempo completo',
    'part-time': 'Medio tiempo',
    'contract': 'Contrato',
    'freelance': 'Freelance'
  };
  return texts[type] || type;
};