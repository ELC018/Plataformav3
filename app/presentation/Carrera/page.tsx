"use client";

import { useState, useRef } from "react";
import "../Carrera/carrera.css";
// Importamos los iconos de FontAwesome
import { 
  FaMoneyBillWave, 
  FaBook, 
  FaChalkboardTeacher, 
  FaLaptopCode, 
  FaCertificate, 
  FaHandshake, 
  FaHeart 
} from "react-icons/fa";

interface VideoItem {
  id: number;
  src: string;
  title: string;
}

interface Materia {
  nombre: string;
  descripcion: string;
}

interface YearCard {
  id: number;
  year: string;
  img: string;
  materias: Materia[];
}

interface RazonItem {
  id: number;
  icon: string;
  titulo: string;
  texto: string;
}

const videos: VideoItem[] = [
  { id: 1, src: "/videos/video1.mp4", title: "Intro a la Carrera" },
  { id: 2, src: "/videos/video2.mp4", title: "Plan de Estudios" },
  { id: 3, src: "/videos/video3.mp4", title: "Vida Universitaria" },
];

const yearCards: YearCard[] = [
  {
    id: 1,
    year: "Primer año",
    img: "/images/img1.jpg",
    materias: [
      { nombre: "Matemática para la informática.", descripcion: "Fundamentos de álgebra, cálculo y lógica aplicados a la computación." },
      { nombre: "Programación I.", descripcion: "Introducción a la algoritmia, variables, estructuras de control. Lenguaje Python." },
      { nombre: "Inglés técnico.", descripcion: "Vocabulario y comprensión de textos técnicos en el área de sistemas." },
      { nombre: "Hardware de computadoras.", descripcion: "Arquitectura de computadoras, componentes, ensamblaje y mantenimiento." },
      { nombre: "Taller de sistemas operativos.", descripcion: "Administración básica de Windows y Linux, línea de comandos." },
      { nombre: "Ofirmática y tecnología multimedia.", descripcion: "Herramientas de oficina, edición de imagen y video." },
      { nombre: "Diseño y programación web 1.", descripcion: "HTML, CSS, fundamentos de diseño responsive." },
    ],
  },
  {
    id: 2,
    year: "Segundo año",
    img: "/images/img2.jpg",
    materias: [
      { nombre: "Estadística.", descripcion: "Análisis de datos, probabilidad, distribuciones." },
      { nombre: "Programación 2.", descripcion: "Programación orientada a objetos con Java." },
      { nombre: "Estructura de datos.", descripcion: "Listas, pilas, colas, árboles, algoritmos de ordenamiento." },
      { nombre: "Redes de computadoras 1.", descripcion: "Modelo OSI, TCP/IP, direccionamiento IP." },
      { nombre: "Programación para dispositivos móviles 1.", descripcion: "Desarrollo básico con Android Studio." },
      { nombre: "Análisis y diseño de sistemas 1.", descripcion: "Ciclo de vida del software, diagramas UML." },
      { nombre: "Base de datos 1.", descripcion: "Modelo relacional, SQL, consultas básicas." },
    ],
  },
  {
    id: 3,
    year: "Tercer año",
    img: "/images/img3.jpg",
    materias: [
      { nombre: "Emprendimiento productivo.", descripcion: "Modelos de negocio en TI, plan de negocio." },
      { nombre: "Diseño y programación web 3.", descripcion: "Frameworks frontend (React), backend con Node.js." },
      { nombre: "Gestión y mejoramiento de la calidad de software.", descripcion: "Pruebas, métricas, mejora continua." },
      { nombre: "Redes de computadoras 2.", descripcion: "Configuración de routers, VLANs, seguridad en redes." },
      { nombre: "Taller de modalidad de graduación.", descripcion: "Preparación de proyecto final o examen de grado." },
      { nombre: "Análisis y diseño de sistemas 2.", descripcion: "Arquitectura de software, patrones de diseño." },
      { nombre: "Programación para dispositivos móviles 2.", descripcion: "Aplicaciones nativas con Kotlin y Swift." },
      { nombre: "Base de datos 2.", descripcion: "Optimización, procedimientos almacenados, NoSQL." },
    ],
  },
];

const razones: RazonItem[] = [
  { id: 1, titulo: "Educación accesible", texto: "Precios competitivos al alcance de todos los estudiantes." },
  { id: 2, titulo: "Programas actualizados", texto: "Planes académicos alineados con la demanda del mercado tecnológico." },
  { id: 3, titulo: "Docentes calificados", texto: "Profesionales especializados en programación, redes y soporte técnico." },
  { id: 4, titulo: "Talleres equipados", texto: "Laboratorios modernos para el aprendizaje práctico en tecnología." },
  { id: 5, titulo: "Certificaciones técnicas", texto: "Títulos que aumentan tus oportunidades en el mercado laboral." },
  { id: 6, titulo: "Convenio con IBNORCA", texto: "Respaldo internacional que valida la calidad de nuestra formación." },
  { id: 7, titulo: "Enseñanza en valores", texto: "Formación basada en eficiencia, ética y respeto profesional." },
];

const getIconForRazon = (id: number) => {
  switch (id) {
    case 1: return <FaMoneyBillWave className="nos-card__icon" />;
    case 2: return <FaBook className="nos-card__icon" />;
    case 3: return <FaChalkboardTeacher className="nos-card__icon" />;
    case 4: return <FaLaptopCode className="nos-card__icon" />;
    case 5: return <FaCertificate className="nos-card__icon" />;
    case 6: return <FaHandshake className="nos-card__icon" />;
    case 7: return <FaHeart className="nos-card__icon" />;
    default: return null;
  }
};

export default function Carrera() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [expandedMaterias, setExpandedMaterias] = useState<{ [key: string]: boolean }>({});

  const toggleMateria = (yearId: number, materiaIndex: number) => {
    const key = `${yearId}-${materiaIndex}`;
    setExpandedMaterias(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const goToSlide = (index: number): void => setCurrentSlide(index);
  const prevSlide = (): void =>
    setCurrentSlide((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  const nextSlide = (): void =>
    setCurrentSlide((prev) => (prev === videos.length - 1 ? 0 : prev + 1));

    return (
    <div className="carrera-page">
      {/* Sección top (carrusel y texto) - sin cambios */}
      <section className="section-top">
        <div className="carousel-wrapper">
          <div className="carousel" ref={carouselRef}>
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {videos.map((video) => (
                <div className="carousel-slide" key={video.id}>
                  <video className="carousel-video" src={video.src} controls muted playsInline>
                    Tu navegador no soporta video.
                  </video>
                  <div className="carousel-caption">{video.title}</div>
                </div>
              ))}
            </div>
            <button className="carousel-btn carousel-btn--prev" onClick={prevSlide} aria-label="Anterior">‹</button>
            <button className="carousel-btn carousel-btn--next" onClick={nextSlide} aria-label="Siguiente">›</button>
            <div className="carousel-dots">
              {videos.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${i === currentSlide ? "active" : ""}`}
                  onClick={() => goToSlide(i)}
                  aria-label={`Ir al slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-box">
          <h1 className="text-box__title">BIENVENIDO A LA CARRERA</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula libero vel nisi tincidunt.</p>
          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
          <p>Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.</p>
        </div>
      </section>

      {/* Sección Plan de estudios - sin cambios */}
      <section className="section-plan">
        <h2 className="section-plan__title">PLAN DE ESTUDIOS</h2>
        <div className="plan-cards">
          {yearCards.map((card) => (
            <div className="plan-card" key={card.id}>
              <div className="plan-card__img">
                <img src={card.img} alt={card.year} />
              </div>
              <div className="plan-card__body">
                <h3>{card.year}</h3>
                <div className="materias-list">
                  {card.materias.map((materia, idx) => {
                    const key = `${card.id}-${idx}`;
                    const isExpanded = expandedMaterias[key];
                    return (
                      <div key={idx} className="materia-item">
                        <div
                          className="materia-nombre"
                          onClick={() => toggleMateria(card.id, idx)}
                        >
                          {materia.nombre}
                        </div>
                        {isExpanded && (
                          <div className="materia-descripcion">
                            <p>{materia.descripcion}</p>
                            <button
                              className="materia-cerrar"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleMateria(card.id, idx);
                              }}
                            >
                              Cerrar
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección "¿Por qué estudiar con nosotros?" con iconos de FontAwesome */}
      <section className="section-nos">
        <h2 className="nos-titulo">¿POR QUÉ ESTUDIAR CON NOSOTROS?</h2>
        <div className="nos-grid nos-grid--3">
          {razones.slice(0, 3).map((r) => (
            <div className="nos-card" key={r.id}>
              {getIconForRazon(r.id)}
              <h3 className="nos-card__titulo">{r.titulo}</h3>
              <p className="nos-card__texto">{r.texto}</p>
            </div>
          ))}
        </div>
        <div className="nos-grid nos-grid--4">
          {razones.slice(3, 7).map((r) => (
            <div className="nos-card" key={r.id}>
              {getIconForRazon(r.id)}
              <h3 className="nos-card__titulo">{r.titulo}</h3>
              <p className="nos-card__texto">{r.texto}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}