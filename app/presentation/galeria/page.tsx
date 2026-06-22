"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import '../galeria/galeria.css';

interface ImagenData {
  id: number;
  year: string;
  category: string;
  title: string;
  url: string;
}

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
}

const imagenesData: ImagenData[] = [
  { id: 1,  year: "2025", category: "Defensas", title: "Defensa de proyecto de grado 2025", url: "https://ik.imagekit.io/sistemasInformaticos/Defensas/IMG_20251201_113059.jpg" },
  { id: 2,  year: "2025", category: "Defensas", title: "Defensa de proyecto de grado 2025", url: "https://ik.imagekit.io/sistemasInformaticos/Defensas/IMG_20251201_113125_1.jpg" },
  { id: 3,  year: "2025", category: "Defensas", title: "Defensa de proyecto de grado 2025", url: "https://ik.imagekit.io/sistemasInformaticos/Defensas/IMG_20251201_123426_1.jpg" },
  { id: 4,  year: "2025", category: "Defensas", title: "Defensa de proyecto de grado 2025", url: "https://ik.imagekit.io/sistemasInformaticos/Defensas/IMG_20251201_123512_1.jpg" },
  { id: 5,  year: "2025", category: "Defensas", title: "Defensa de proyecto de grado 2025", url: "https://ik.imagekit.io/sistemasInformaticos/Defensas/IMG_20251201_150010.jpg" },
  { id: 6,  year: "2025", category: "Defensas", title: "Defensa de proyecto de grado 2025", url: "https://ik.imagekit.io/sistemasInformaticos/Defensas/IMG_20251201_150035.jpg" },
  { id: 7,  year: "2025", category: "Defensas", title: "Defensa de proyecto de grado 2025", url: "https://ik.imagekit.io/sistemasInformaticos/Defensas/IMG_20251201_161259_1.jpg" },
  { id: 8,  year: "2025", category: "Defensas", title: "Defensa de proyecto de grado 2025", url: "https://ik.imagekit.io/sistemasInformaticos/Defensas/IMG_20251201_161409.jpg" },
  { id: 9,  year: "2025", category: "Defensas", title: "Defensa de proyecto de grado 2025", url: "https://ik.imagekit.io/sistemasInformaticos/Defensas/IMG_20251202_112846.jpg" },
  { id: 10, year: "2025", category: "Defensas", title: "Defensa de proyecto de grado 2025", url: "https://ik.imagekit.io/sistemasInformaticos/Defensas/IMG_20251202_112901.jpg" },
  { id: 11, year: "2025", category: "Defensas", title: "Defensa de proyecto de grado 2025", url: "https://ik.imagekit.io/sistemasInformaticos/Defensas/IMG_20251202_130724.jpg" },
  { id: 12, year: "2025", category: "Defensas", title: "Defensa de proyecto de grado 2025", url: "https://ik.imagekit.io/sistemasInformaticos/Defensas/IMG_20251202_130749.jpg" },
  { id: 13, year: "2025", category: "Defensas", title: "Defensa de proyecto de grado 2025", url: "https://ik.imagekit.io/sistemasInformaticos/Defensas/IMG_20251202_152742_1.jpg" },
  { id: 14, year: "2025", category: "Defensas", title: "Defensa de proyecto de grado 2025", url: "https://ik.imagekit.io/sistemasInformaticos/Defensas/IMG_20251202_152812.jpg" },
  { id: 15, year: "2025", category: "Defensas", title: "Defensa de proyecto de grado 2025", url: "https://ik.imagekit.io/sistemasInformaticos/Defensas/IMG_20251202_161723.jpg" },
  { id: 16, year: "2025", category: "Defensas", title: "Defensa de proyecto de grado 2025", url: "https://ik.imagekit.io/sistemasInformaticos/Defensas/IMG_20251202_161740.jpg" },
];

const YEARS: string[]      = [...new Set(imagenesData.map(img => img.year))].sort();
const CATEGORIES: string[] = [...new Set(imagenesData.map(img => img.category))];

type BentoSize = 'bento-hero' | 'bento-large' | 'bento-wide' | 'bento-tall' | 'bento-small';

/**
 * Genera tamaños bento con patrón dinámico para grilla de 5 columnas.
 * - Primera imagen: héroe (3 cols × 2 filas)
 * - Distribución rítmica del resto para llenar columnas 4 y 5
 *   y las filas siguientes con variedad geométrica.
 */
function getBentoSizes(images: ImagenData[]): BentoSize[] {
  // Patrón cíclico diseñado para 5 columnas:
  // pos 0: hero (3×2) → ocupa cols 1-3, filas 1-2
  // pos 1: tall (1×2) → cols 4, filas 1-2
  // pos 2: small      → col 5, fila 1
  // pos 3: small      → col 5, fila 2
  // pos 4: wide (2×1) → cols 1-2, fila 3
  // pos 5: wide (2×1) → cols 3-4, fila 3
  // pos 6: small      → col 5, fila 3
  // pos 7+: variación libre
  const fixedPattern: BentoSize[] = [
    'bento-hero',
    'bento-tall',
    'bento-small',
    'bento-small',
    'bento-wide',
    'bento-wide',
    'bento-small',
  ];

  // Patrón libre cíclico para el resto (cada 5 imágenes en una fila)
  const freePattern: BentoSize[] = [
    'bento-large',
    'bento-small',
    'bento-small',
    'bento-wide',
    'bento-small',
  ];

  return images.map((_, i) => {
    if (i < fixedPattern.length) return fixedPattern[i];
    return freePattern[(i - fixedPattern.length) % freePattern.length];
  });
}

function FilterDropdown({ label, options, value, onChange }: FilterDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="filtro-dropdown" ref={ref}>
      <button
        className={`filtro-dropdown-trigger ${open ? 'open' : ''} ${value ? 'selected' : ''}`}
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        <span>{value || label}</span>
        <svg className={`filtro-chevron ${open ? 'rotated' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <ul className="filtro-dropdown-list">
          <li
            className={`filtro-dropdown-item ${!value ? 'active' : ''}`}
            onClick={() => { onChange(null); setOpen(false); }}
          >
            {label}
          </li>
          {options.map(opt => (
            <li
              key={opt}
              className={`filtro-dropdown-item ${value === opt ? 'active' : ''}`}
              onClick={() => { onChange(opt); setOpen(false); }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Galeria() {
  const [panelOpen,        setPanelOpen]        = useState<boolean>(false);
  const [selectedYear,     setSelectedYear]     = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searched,         setSearched]         = useState<boolean>(false);
  const [activeIndex,      setActiveIndex]      = useState<number>(0);

  const bentoSizes = useMemo<BentoSize[]>(
    () => getBentoSizes(imagenesData),
    []
  );

  const filteredImages = useMemo<ImagenData[]>(() => {
    if (!searched) return [];
    return imagenesData.filter(img => {
      const matchYear     = !selectedYear     || img.year     === selectedYear;
      const matchCategory = !selectedCategory || img.category === selectedCategory;
      return matchYear && matchCategory;
    });
  }, [selectedYear, selectedCategory, searched]);

  const handleSearch = (): void => {
    setSearched(true);
    setActiveIndex(0);
    setPanelOpen(false);
  };

  const handleReset = (): void => {
    setSelectedYear(null);
    setSelectedCategory(null);
    setSearched(false);
    setActiveIndex(0);
  };

  const prev = useCallback(() =>
    setActiveIndex(i => (i - 1 + filteredImages.length) % filteredImages.length),
    [filteredImages.length]
  );
  const next = useCallback(() =>
    setActiveIndex(i => (i + 1) % filteredImages.length),
    [filteredImages.length]
  );

  const activeImage: ImagenData | undefined = filteredImages[activeIndex];

  return (
    /* ── CONTENEDOR PRINCIPAL NEGRO ── */
    <div className="galeria-outer">

      {/* ── SECCIÓN 1: HEADER / BIENVENIDA ── */}
      <div className="galeria-section galeria-section--header">
        <h1>
          <span>Gale</span>ría
        </h1>
        <p>Explora los momentos más importantes de nuestra institución</p>
      </div>

      {/* ── SECCIÓN 2: FILTROS ── */}
      <div className="galeria-section galeria-section--filters">
        <div className="filtrar-bar">
          <button
            className={`btn-filtrar ${panelOpen ? 'active' : ''}`}
            onClick={() => setPanelOpen(o => !o)}
            type="button"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 010 2H4a1 1 0 01-1-1zM5 9a1 1 0 011-1h8a1 1 0 010 2H6a1 1 0 01-1-1zm2 4a1 1 0 011-1h4a1 1 0 010 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            FILTRAR
          </button>

          {searched && (
            <button className="btn-limpiar" onClick={handleReset} type="button">
              ✕ Limpiar filtros
            </button>
          )}
        </div>

        {panelOpen && (
          <div className="filtros-panel">
            <FilterDropdown
              label="Gestión"
              options={YEARS}
              value={selectedYear}
              onChange={(v) => {
                setSelectedYear(v);
                setSearched(false);
              }}
            />

            <FilterDropdown
              label="Categoría"
              options={CATEGORIES}
              value={selectedCategory}
              onChange={(v) => {
                setSelectedCategory(v);
                setSearched(false);
              }}
            />

          <div className="filtros-actions">
            <button
              className="btn-aceptar"
              onClick={handleSearch}
              type="button"
            >
              ACEPTAR
            </button>
          </div>
        </div>
        )}  
      </div> 
      {/* ── SECCIÓN 3: BENTO / CARRUSEL ── */}
      <div className="galeria-section galeria-section--bento">

        {/* Bento grid (estado inicial sin filtros activos) */}
        {!searched && (
          <div className="bento-grid">
            {imagenesData.map((img, idx) => (
              <div
                key={img.id}
                className={`bento-item ${bentoSizes[idx] ?? 'bento-small'}`}
                onClick={() => {
                  setActiveIndex(idx);
                  setSearched(true);
                }}
              >
                <img src={img.url} alt={img.title} loading="lazy" />
                <div className="bento-overlay">
                  <h3>{img.title}</h3>
                  <p>{img.year} · {img.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sin resultados */}
        {searched && filteredImages.length === 0 && (
          <p className="no-results">
            No hay imágenes que coincidan con los filtros seleccionados.
          </p>
        )}

        {/* Resultados: carrusel + miniaturas */}
        {searched && filteredImages.length > 0 && activeImage && (
          <>
            <p className="resultados-label">
              Mostrando <strong>{filteredImages.length}</strong> resultado(s)
              {selectedYear     && <> de <strong>{selectedYear}</strong></>}
              {selectedCategory && <> — <strong>{selectedCategory}</strong></>}
            </p>

            <div className="carousel-wrapper">
              <img
                key={activeImage.id}
                src={activeImage.url}
                alt={activeImage.title}
                className="carousel-main-img"
              />
              <div className="carousel-label">
                <span>{activeImage.title}</span>
                <div className="carousel-label-line" />
              </div>
              <button className="carousel-btn carousel-btn--prev" onClick={prev} type="button">‹</button>
              <button className="carousel-btn carousel-btn--next" onClick={next} type="button">›</button>
              <div className="carousel-counter">{activeIndex + 1} / {filteredImages.length}</div>
            </div>

            <div className="galeria-mosaic galeria-mosaic--filtered">
              {filteredImages.map((img, idx) => (
                <button
                  key={img.id}
                  className={`mosaic-item ${activeIndex === idx ? 'mosaic-item--active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  type="button"
                >
                  <img src={img.url} alt={img.title} loading="lazy" />
                  <div className="mosaic-overlay">
                    <h3>{img.title}</h3>
                    <p>{img.year} · {img.category}</p>
                  </div>
                  {activeIndex === idx && (
                    <div className="mosaic-active-badge">✓</div>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  );
}
