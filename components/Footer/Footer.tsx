'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import styles from './Footer.module.css'

const socialIcons = [
  { icon: Facebook, url: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, url: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, url: 'https://youtube.com', label: 'YouTube' },
]

const sedes = [
  {
    nombre: "SEDE LA PAZ",
    direccion: "Calle Chichas N° 1280, Miraflores",
    telefono: "2222141 / 2242000",
    fax: "2221435",
    whatsapp: "76797031"
  },
  {
    nombre: "SEDE EL ALTO",
    direccion: "Avenida 6 de Marzo N° 340",
    telefono: "2826030 / 2829294",
    fax: "2829394",
    whatsapp: "76768708"
  }
]

export default function Footer() {
  return (
    <footer className={styles.footer}>

      <div className="max-w-7xl mx-auto px-8 py-12">

        {/* Secciones */}
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {sedes.map((sede) => (
            <div key={sede.nombre} className={styles.section}>
              <h3>{sede.nombre}</h3>

              <p>{sede.direccion}</p>
              <p>Teléfono: {sede.telefono}</p>
              <p>Fax: {sede.fax}</p>
              <p>Whatsapp: {sede.whatsapp}</p>
            </div>
          ))}

          <div className={styles.section}>
            <h3>SÍGUENOS</h3>

            <ul className="flex gap-5 mt-4">
              {socialIcons.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={social.label}
                  >
                    <social.icon size={22} />
                  </a>
                </li>
              ))}
            </ul>

          </div>

           <div className={styles.section}>
            <h3>ENLACES DE INTERES</h3>

            <ul className="flex flex-col gap-2 mt-4">
              <li>
                <Link href="/Términos y condiciones" className={styles.link}>Términos y condiciones</Link>
              </li>
              <li>
                <Link href="/Políticas de privacidad" className={styles.link}>Políticas de privacidad </Link>
              </li>
              <li>
                <Link href="/Todos los derechos reservados" className={styles.link}>Todos los derechos reservados</Link>  
              </li>
            </ul>

          </div>

        </div>

      </div>

    </footer>
  )
}