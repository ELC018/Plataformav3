'use client'

import { useState } from 'react'
import { Menu as MenuIcon, X, Facebook, Twitter, Instagram, Youtube, ChevronDown } from 'lucide-react'
import styles from './menu.module.css'
import Link from 'next/link'

const menuItems = [
  { name: 'Inicio', path: '/' },
  { name: 'Carrera', path: '/presentation/Carrera' },
  {
    name: 'Academico',
    path: '#', // El padre no navega, solo abre submenú
    submenu: [
      { name: 'Saga', path: '/academico/saga' },
      { name: 'Chat', path: '/academico/chat' },
      { name: 'Consultas', path: '/academico/consultas' },
      { name: 'Información', path: '/academico/informacion' },
      { name: 'Repositorio', path: '/academico/repositorio' },
      { name: 'Biblioteca', path: '/academico/biblioteca' }
    ]
  },
  { name: 'Galeria', path: '/presentation/galeria' },
  { name: 'Avisos', path: '/avisos' }
]


const socialIcons = [
  { icon: Facebook, url: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, url: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, url: 'https://youtube.com', label: 'YouTube' }
]

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState(false)      // para desktop
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(false) // para móvil

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleSubmenu = () => setOpenSubmenu(!openSubmenu)
  const toggleMobileSubmenu = () => setOpenMobileSubmenu(!openMobileSubmenu)

  return (
    <nav className={`${styles.navbar} sticky top-0 z-50`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <h1 className={`${styles.logo} cursor-pointer`} onClick={toggleMenu}>
          Mi Sitio {isOpen ? '🔓' : '🔒'}
        </h1>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          className={`${styles.menuButton} md:hidden p-2 rounded-md`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>

        {/* ========== MENÚ DESKTOP ========== */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className={`${styles.desktopMenu} flex space-x-8`}>
            {menuItems.map((item, index) => (
              <li key={index} className="relative">
                {item.submenu ? (
                  <div>
                    <button
                      onClick={toggleSubmenu}
                      className={styles.linkButton}
                    >
                      {item.name}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${openSubmenu ? styles.rotate : ''}`}
                      />
                    </button>
                    {openSubmenu && (
                      <ul className={styles.submenu}>
                        {item.submenu.map((sub, idx) => (
                          <li key={idx}>
                            <Link
                              href={sub.path}
                              className={styles.submenuLink}
                              onClick={() => setOpenSubmenu(false)}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link href={item.path} className={styles.link}>
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <p></p>

          {/* Separador e iconos sociales en desktop */}
          <span className="w-px h-6 bg-white/30"></span>
          <ul className="flex space-x-4">
            {socialIcons.map((social, index) => (
              <li key={index}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ========== MENÚ MÓVIL DESPLEGABLE ========== */}
        {isOpen && (
          <div className={`${styles.mobileMenu} absolute top-16 left-0 w-full md:hidden`}>
            <ul className="flex flex-col p-4 space-y-3">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={toggleMobileSubmenu}
                        className={`${styles.link} w-full flex justify-between items-center py-2 px-4 rounded`}
                      >
                        {item.name}
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${openMobileSubmenu ? styles.rotate : ''}`}
                        />
                      </button>
                      {openMobileSubmenu && (
                        <ul className={styles.mobileSubmenu}>
                          {item.submenu.map((sub, idx) => (
                            <li key={idx}>
                              <Link
                                href={sub.path}
                                className={styles.mobileSubmenuLink}
                                onClick={() => {
                                  toggleMenu()
                                  setOpenMobileSubmenu(false)
                                }}
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`${styles.link} block py-2 px-4 rounded`}
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Iconos sociales en móvil */}
            <div className="border-t border-white/20 mt-2 pt-4 px-4 pb-2">
              <ul className="flex justify-center space-x-6">
                {socialIcons.map((social, index) => (
                  <li key={index}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={social.label}
                      onClick={toggleMenu}
                    >
                      <social.icon size={24} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}