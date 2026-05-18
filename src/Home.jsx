import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from './DataContext';
import CustomCursor from './CustomCursor';
import FacebookChat from './FacebookChat';

const uiText = {
  vi: {
    home: "Trang Chủ",
    about: "Giới Thiệu",
    skills: "Kỹ Năng",
    projects: "Dự Án",
    contact: "Liên Hệ",
    greeting: "Xin chào, tôi là",
    viewProjects: "Xem Dự Án",
    contactMe: "Liên Hệ Ngay",
    aboutTitle: "Học Vấn & Kinh Nghiệm",
    skillsTitle: "Kỹ Năng Chuyên Môn",
    projectsTitle: "Dự Án Nổi Bật",
    contactTitle: "Thông Tin Liên Hệ",
    address: "Địa chỉ",
    phone: "Điện thoại",
    visitSite: "Truy cập website →",
    rights: "All Rights Reserved."
  },
  en: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    greeting: "Hello, I am",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
    aboutTitle: "Education & Experience",
    skillsTitle: "Professional Skills",
    projectsTitle: "Featured Projects",
    contactTitle: "Contact Information",
    address: "Address",
    phone: "Phone",
    visitSite: "Visit website →",
    rights: "All Rights Reserved."
  }
};

function Home() {
  const { data } = useContext(DataContext);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'vi');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(lang === 'vi' ? 'en' : 'vi');

  const content = data[lang];
  const t = uiText[lang];

  return (
    <>
      <FacebookChat />
      <header className="header">
        <div className="logo">Ngọc Tech</div>
        
        <div className="mobile-controls">
          <button className="theme-toggle" onClick={toggleLang} aria-label="Toggle Language" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
            {lang === 'vi' ? 'EN' : 'VI'}
          </button>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="#home" onClick={() => setIsMenuOpen(false)}>{t.home}</a></li>
          <li><a href="#about" onClick={() => setIsMenuOpen(false)}>{t.about}</a></li>
          <li><a href="#skills" onClick={() => setIsMenuOpen(false)}>{t.skills}</a></li>
          <li><a href="#projects" onClick={() => setIsMenuOpen(false)}>{t.projects}</a></li>
          <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>{t.contact}</a></li>
        </ul>

        <div className="desktop-controls" style={{ display: 'flex', gap: '0.5rem', position: 'absolute', right: '5%' }}>
          <button className="theme-toggle" onClick={toggleLang} aria-label="Toggle Language" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
            {lang === 'vi' ? 'EN' : 'VI'}
          </button>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <p className="hero-subtitle">{t.greeting}</p>
              <h1 className="hero-title">{content.hero.name}</h1>
              <h2 className="hero-role"><span>{content.hero.role}</span></h2>
              <p className="hero-description">{content.hero.description}</p>
              <div className="hero-buttons">
                <a href="#projects" className="btn btn-primary">{t.viewProjects}</a>
                <a href="#contact" className="btn btn-secondary">{t.contactMe}</a>
              </div>
            </div>
            <div className="hero-image-container">
              <img src={content.hero.avatarUrl || "/avatar.jpg"} alt={content.hero.name} className="avatar" onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300.png?text=Avatar'; }} />
              <div className="avatar-glow"></div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <h2 className="section-title">{t.aboutTitle}</h2>
          <div className="timeline-container">
            {content.experience.map(item => (
              <div key={item.id} className="timeline-item">
                <h3>{item.title}</h3>
                <p className="timeline-date">{item.date}</p>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <h2 className="section-title">{t.skillsTitle}</h2>
          <div className="skills-grid">
            {content.skills.map(skill => (
              <div key={skill.id} className="skill-card">
                <h3>{skill.title}</h3>
                <p>{skill.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <h2 className="section-title">{t.projectsTitle}</h2>
          <div className="projects-grid">
            {content.projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="project-link">{t.visitSite}</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <h2 className="section-title">{t.contactTitle}</h2>
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <strong>{t.address}</strong>
                  <p>{content.contact.address}</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <strong>{t.phone}</strong>
                  <p><a href={`tel:${content.contact.phone}`}>{content.contact.phone}</a></p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div>
                  <strong>Email</strong>
                  <p><a href={`mailto:${content.contact.email}`}>{content.contact.email}</a></p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">💼</span>
                <div>
                  <strong>LinkedIn</strong>
                  <p><a href={`https://${content.contact.linkedin}`} target="_blank" rel="noreferrer">{content.contact.linkedin}</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--card-border)', marginTop: '2rem' }}>
        <p style={{ color: '#94a3b8' }}>© 2026 {content.hero.name}. {t.rights}</p>
      </footer>
    </>
  );
}

export default Home;
