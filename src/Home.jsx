import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from './DataContext';
import CustomCursor from './CustomCursor';
import FacebookChat from './FacebookChat';
import { 
  Sun, Moon, Menu, X, ArrowRight, Mail, Phone, MapPin, 
  Star, GitFork, ExternalLink, FolderGit2, GraduationCap, Briefcase
} from 'lucide-react';

const GithubIcon = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const isEducationItem = (item) => {
  if (item.type === 'education') return true;
  if (item.type === 'work') return false;
  
  const text = `${item.title || ''} ${item.desc || ''}`.toLowerCase();
  const eduKeywords = ['trường', 'đại học', 'university', 'thpt', 'cao đẳng', 'học viện', 'academy', 'school', 'education', 'học vấn', 'thành tích'];
  return eduKeywords.some(keyword => text.includes(keyword));
};

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
    githubProjectsTitle: "Dự Án Từ GitHub Của Tôi",
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
    githubProjectsTitle: "My GitHub Projects",
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
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const content = data[lang];
  const t = uiText[lang];

  useEffect(() => {
    const githubUser = content.contact.github;
    if (!githubUser) {
      setLoadingRepos(false);
      return;
    }

    // Lọc danh sách repository bị ẩn
    const hiddenReposStr = content.contact.hiddenRepos || "";
    const hiddenList = hiddenReposStr.split(',').map(name => name.trim().toLowerCase());
    
    setLoadingRepos(true);
    fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=12`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        // Lọc bỏ repo fork và các repo bị ẩn trong danh sách
        const sortedRepos = data
          .filter(repo => !repo.fork && !hiddenList.includes(repo.name.toLowerCase()))
          .slice(0, 6);
        setRepos(sortedRepos);
        setLoadingRepos(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingRepos(false);
      });
  }, [content.contact.github, content.contact.hiddenRepos]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(lang === 'vi' ? 'en' : 'vi');

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
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="#home" onClick={() => setIsMenuOpen(false)}><span className="nav-dot"></span>{t.home}</a></li>
          <li><a href="#about" onClick={() => setIsMenuOpen(false)}><span className="nav-dot"></span>{t.about}</a></li>
          <li><a href="#skills" onClick={() => setIsMenuOpen(false)}><span className="nav-dot"></span>{t.skills}</a></li>
          <li><a href="#projects" onClick={() => setIsMenuOpen(false)}><span className="nav-dot"></span>{t.projects}</a></li>
          <li><a href="#contact" onClick={() => setIsMenuOpen(false)}><span className="nav-dot"></span>{t.contact}</a></li>
        </ul>

        <div className="desktop-controls" style={{ display: 'flex', gap: '0.5rem', position: 'absolute', right: '5%' }}>
          <button className="theme-toggle" onClick={toggleLang} aria-label="Toggle Language" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
            {lang === 'vi' ? 'EN' : 'VI'}
          </button>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
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
                <a href="#projects" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  {t.viewProjects} <ArrowRight size={18} />
                </a>
                <a href="#contact" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={18} /> {t.contactMe}
                </a>
              </div>
            </div>
            <div className="hero-image-container">
              <div className="avatar-wrapper">
                <div className="avatar-ring"></div>
                <img src={content.hero.avatarUrl || "/avatar.jpg"} alt={content.hero.name} className="avatar" onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300.png?text=Avatar'; }} />
              </div>
              <div className="avatar-glow"></div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <h2 className="section-title"><span className="title-dot"></span>{t.aboutTitle}</h2>
          <div className="timeline-container">
            {content.experience.map(item => (
              <div key={item.id} className="timeline-item" style={{ position: 'relative' }}>
                <div className="timeline-item-content" style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                  <div className="timeline-logo-container">
                    {item.logoUrl ? (
                      <img src={item.logoUrl} alt={item.title} className="timeline-logo" />
                    ) : (
                      <div className="timeline-logo-placeholder">
                        {isEducationItem(item) ? <GraduationCap size={20} /> : <Briefcase size={20} />}
                      </div>
                    )}
                  </div>
                  <div className="timeline-text" style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>{item.title}</h3>
                    <p className="timeline-date" style={{ margin: '0.3rem 0 0.6rem 0' }}>{item.date}</p>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <h2 className="section-title"><span className="title-dot"></span>{t.skillsTitle}</h2>
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
          <h2 className="section-title"><span className="title-dot"></span>{t.projectsTitle}</h2>
          <div className="projects-grid">
            {content.projects.filter(project => project.visible !== false).map(project => (
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

          {content.contact.github && content.contact.showGithub !== false && (
            <div className="github-repos-section">
              <h3 className="github-title">
                <GithubIcon size={28} style={{ color: 'var(--accent-color)' }} /> {t.githubProjectsTitle}
              </h3>
              
              {loadingRepos ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--accent-color)', fontWeight: 'bold' }}>
                  Loading repositories...
                </div>
              ) : (
                <div className="projects-grid">
                  {repos.map(repo => (
                    <div key={repo.id} className="project-card repo-card">
                      <div className="project-content" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                        <div>
                          <div className="repo-header">
                            <FolderGit2 size={24} style={{ color: 'var(--accent-secondary)' }} />
                            <h3 className="project-title" style={{ margin: 0, fontSize: '1.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{repo.name}</h3>
                          </div>
                          <p className="project-desc" style={{ fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '4.5rem' }}>
                            {repo.description || (lang === 'vi' ? 'Không có mô tả cho kho lưu trữ này.' : 'No description provided for this repository.')}
                          </p>
                        </div>
                        <div>
                          <div className="repo-stats">
                            {repo.language && (
                              <span className="repo-lang-badge">{repo.language}</span>
                            )}
                            <span className="repo-stat-item" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                              <Star size={14} style={{ fill: 'currentColor' }} /> {repo.stargazers_count}
                            </span>
                            <span className="repo-stat-item" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                              <GitFork size={14} /> {repo.forks_count}
                            </span>
                          </div>
                          <a href={repo.html_url} target="_blank" rel="noreferrer" className="project-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '1rem' }}>
                            {lang === 'vi' ? 'Xem trên GitHub' : 'View on GitHub'} <ExternalLink size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        <section id="contact" className="section">
          <h2 className="section-title"><span className="title-dot"></span>{t.contactTitle}</h2>
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-item">
                <span className="contact-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={22} style={{ color: 'var(--accent-color)' }} />
                </span>
                <div>
                  <strong>{t.address}</strong>
                  <p>{content.contact.address}</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={22} style={{ color: 'var(--accent-color)' }} />
                </span>
                <div>
                  <strong>{t.phone}</strong>
                  <p><a href={`tel:${content.contact.phone}`}>{content.contact.phone}</a></p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={22} style={{ color: 'var(--accent-color)' }} />
                </span>
                <div>
                  <strong>Email</strong>
                  <p><a href={`mailto:${content.contact.email}`}>{content.contact.email}</a></p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LinkedinIcon size={22} style={{ color: 'var(--accent-color)' }} />
                </span>
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
