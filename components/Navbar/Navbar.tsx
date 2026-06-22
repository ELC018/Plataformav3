'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu as MenuIcon, X, Facebook, Twitter, Instagram, Youtube, ChevronDown, LogIn, LogOut, User } from 'lucide-react'
import styles from './Navbar.module.css'
import Link from 'next/link'


type Rol = 'externo' | 'estudiante' | 'egresado' | 'docente' | 'jefa_carrera'

interface SubMenuItem {
  name: string
  path: string
}

interface MenuItem {
  name: string
  path: string
  submenu?: SubMenuItem[]
  soloAutenticado?: boolean
}

interface Usuario {
  nombre: string
  rol: Rol
}


const menuItems: MenuItem[] = [
  { name: 'Inicio',           path: '/' },
  { name: 'Carrera',          path: '/presentation/Carrera' },
  {
    name: 'Académico',
    path: '#',
    soloAutenticado: true,
    submenu: [
      { name: 'Saga',        path: 'https://saga.infocallp.info/backend/web/user/login.html' },
      { name: 'Chat',        path: '/presentation/academico/chat' },
      
      { name: 'Información', path: '/presentation/academico/infor' },
      { name: 'Repositorio', path: '/presentation/academico/repositorio' },
      { name: 'Biblioteca',  path: '/presentation/academico/biblioteca' },
    ],
  },
  { name: 'Galería',          path: '/presentation/galeria' },
  { name: 'Avisos Laborales', path: '/presentation/avisos' },
]

const socialIcons = [
  { icon: Facebook,  url: 'https://facebook.com',  label: 'Facebook' },
  { icon: Twitter,   url: 'https://twitter.com',   label: 'Twitter' },
  { icon: Instagram, url: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube,   url: 'https://youtube.com',   label: 'YouTube' },
]


function esAutenticado(rol: Rol): boolean {
  return rol !== 'externo'
}


export default function Navbar() {
  const [isOpen,            setIsOpen]            = useState<boolean>(false)
  const [openSubmenu,       setOpenSubmenu]       = useState<boolean>(false)
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<boolean>(false)

  
  const [usuario, setUsuario] = useState<Usuario | null>({ nombre: 'Juan', rol: 'estudiante' })
  

  const pathname = usePathname()
  const autenticado = usuario ? esAutenticado(usuario.rol) : false

  const toggleMenu          = () => setIsOpen(o => !o)
  const toggleSubmenu       = () => setOpenSubmenu(o => !o)
  const toggleMobileSubmenu = () => setOpenMobileSubmenu(o => !o)

  // Filtra ítems según rol
  const itemsVisibles = menuItems.filter(item =>
    item.soloAutenticado ? autenticado : true
  )

  return (
    <nav className={`${styles.navbar} sticky top-0 z-50`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-16">

        
        <Link href="/" className={styles.logo}>
          Mi Sitio 🔒
        </Link>

       
        <button
          className={`${styles.menuButton} md:hidden p-2 rounded-md`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>

        
        <div className="hidden md:flex items-center space-x-8">
          <ul className={`${styles.desktopMenu} flex space-x-8`}>
            {itemsVisibles.map((item, index) => (
              <li key={index} className="relative">
                {item.submenu ? (
                  <div>
                    <button onClick={toggleSubmenu} className={styles.linkButton}>
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
                  <Link
                    href={item.path}
                    className={`${styles.link} ${pathname === item.path ? styles.linkActive : ''}`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          
          <span className="w-px h-6 bg-white/30" />

          
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

         
          <span className="w-px h-6 bg-white/30" />

          
          {autenticado && usuario ? (
            <div className={styles.userArea}>
              <User size={16} />
              <span className={styles.userName}>{usuario.nombre}</span>
              <span className={styles.userRol}>{usuario.rol}</span>
              <button
                className={styles.authBtn}
                onClick={() => setUsuario(null)}
                title="Cerrar sesión"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link href="/login" className={styles.authBtn} title="Iniciar sesión">
              <LogIn size={18} />
              <span>Ingresar</span>
            </Link>
          )}
        </div>

        
        {isOpen && (
          <div className={`${styles.mobileMenu} absolute top-16 left-0 w-full md:hidden`}>
            <ul className="flex flex-col p-4 space-y-3">
              {itemsVisibles.map((item, index) => (
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
                                onClick={() => { toggleMenu(); setOpenMobileSubmenu(false) }}
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
                      className={`${styles.link} ${pathname === item.path ? styles.linkActive : ''} block py-2 px-4 rounded`}
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            
            <div className="border-t border-white/20 mt-2 pt-4 px-4 pb-4 flex flex-col gap-4">
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

              {autenticado && usuario ? (
                <div className={styles.mobileUserArea}>
                  <span>{usuario.nombre} — {usuario.rol}</span>
                  <button
                    className={styles.mobileAuthBtn}
                    onClick={() => { setUsuario(null); toggleMenu() }}
                  >
                    <LogOut size={16} /> Cerrar sesión
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className={styles.mobileAuthBtn}
                  onClick={toggleMenu}
                >
                  <LogIn size={16} /> Ingresar
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
