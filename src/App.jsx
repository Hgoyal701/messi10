
import { useEffect, useState } from 'react';
import {
  ArrowDown, ArrowRight, Menu, X, Trophy, Globe2,
  Star, Instagram, ChevronUp, Sparkles, Play
} from 'lucide-react';

const photos = {
  final: 'https://commons.wikimedia.org/wiki/Special:FilePath/Argentina_3-3_Francia_-_Copa_Mundial_2022_-_Argentina_campe%C3%B3n.jpg',
  messi: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lionel_Messi_WC2022.jpg',
  worldcup: 'https://commons.wikimedia.org/wiki/Special:FilePath/Argentina_3-3_Francia_-_Copa_Mundial_2022_-_Celebraci%C3%B3n_de_victoria.jpg',
  action: 'https://commons.wikimedia.org/wiki/Special:FilePath/Argentina_3-3_Francia_-_Copa_Mundial_2022_-_Messi_patea_un_penal.jpg',
  celebration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Celebraci%C3%B3n_del_partido_Argentina-Croacia.jpg'
};

const timeline = [
  {
    year: '2004',
    title: 'THE BEGINNING',
    club: 'FC Barcelona',
    text: 'A teenager with a dream steps onto the biggest stage. A new era of football begins.'
  },
  {
    year: '2009',
    title: 'THE WORLD TAKES NOTICE',
    club: 'Barcelona',
    text: 'A first Ballon d’Or. The beginning of a collection of individual honours and unforgettable nights.'
  },
  {
    year: '2012',
    title: 'UNREAL',
    club: 'Barcelona',
    text: 'A calendar year that redefined what people thought was possible in front of goal.'
  },
  {
    year: '2021',
    title: 'A NATION REJOICES',
    club: 'Argentina',
    text: 'Copa América glory. A dream shared with an entire country finally becomes reality.'
  },
  {
    year: '2022',
    title: 'THE PROMISED LAND',
    club: 'Argentina',
    text: 'Seven matches, a legendary final, and the World Cup. The story finds its perfect chapter.'
  },
  {
    year: '2023',
    title: 'A NEW CHAPTER',
    club: 'Inter Miami',
    text: 'A new continent, a new challenge, and a new generation inspired by the number ten.'
  }
];

const trophies = [
  { number: '01', name: 'FIFA WORLD CUP', detail: 'Qatar · 2022', icon: '♛' },
  { number: '02', name: 'COPA AMÉRICA', detail: '2021 · 2024', icon: '✦' },
  { number: '03', name: 'BALLON D’OR', detail: 'Eight-time winner', icon: '★' },
  { number: '04', name: 'UEFA CHAMPIONS LEAGUE', detail: 'Four titles', icon: '✧' }
];

function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span />
      {children}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [activeTrophy, setActiveTrophy] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? window.scrollY / max * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const closeMenu = () => setMenuOpen(false);

  const goTo = (id) => {
    closeMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const photo = (key, className = '', alt = 'Lionel Messi') => (
    <img
      className={className}
      src={photos[key]}
      alt={alt}
      loading={key === 'final' ? 'eager' : 'lazy'}
      onError={() => setImageErrors(prev => ({ ...prev, [key]: true }))}
    />
  );

  const navItems = [
    ['Legacy', 'legacy'],
    ['The Journey', 'journey'],
    ['Trophies', 'trophies'],
    ['Moments', 'moments']
  ];

  return (
    <div className="site-shell">
      <div className="scroll-progress" style={{ width: `${scroll}%` }} />

      <header className="navbar">
        <button className="brand" onClick={() => goTo('home')} aria-label="Back to home">
          <span className="brand-mark">M<span>10</span></span>
          <span className="brand-copy">THE GOAT <small>EXPERIENCE</small></span>
        </button>

        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => goTo(id)}>{label}</button>
          ))}
          <button className="nav-cta" onClick={() => goTo('finale')}>
            THE LEGACY <ArrowRight size={15} />
          </button>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid" />
          <div className="hero-glow" />
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot" /> THE GREATEST STORY EVER TOLD</div>
            <p className="hero-pretitle">LIONEL ANDRÉS</p>
            <h1>MESSI<span className="hero-period">.</span></h1>
            <div className="hero-subtitle">
              <span className="line" />
              <span>ONE DREAM. ONE NATION. ONE LEGEND.</span>
            </div>
            <p className="hero-description">
              More than a player. More than a champion.
              A story that made the entire world believe.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => goTo('legacy')}>
                DISCOVER THE LEGACY <ArrowRight size={17} />
              </button>
              <button className="btn-play" onClick={() => goTo('moments')}>
                <span className="play-circle"><Play size={15} fill="currentColor" /></span>
                RELIVE THE MOMENTS
              </button>
            </div>
            <div className="hero-footnote">
              <span>ARGENTINA</span><span className="foot-separator">/</span>
              <span>NUMBER 10</span><span className="foot-separator">/</span>
              <span>ETERNAL</span>
            </div>
          </div>

          <div className="hero-image-wrap">
            <div className="hero-image-backdrop" />
            {!imageErrors.final ? (
              photo('final', 'hero-image', 'Argentina celebrate winning the 2022 FIFA World Cup final')
            ) : (
              <div className="image-fallback">
                <Trophy size={60} />
                <span>QATAR 2022</span>
                <small>THE NIGHT HISTORY WAS MADE</small>
              </div>
            )}
            <div className="hero-image-shade" />
            <div className="image-corner corner-tl" />
            <div className="image-corner corner-br" />
            <div className="hero-image-tag">
              <span className="tag-star">✦</span>
              <div><strong>18.12.2022</strong><small>THE NIGHT OF NIGHTS</small></div>
            </div>
            <div className="vertical-label">THE WORLD CHAMPION · ARGENTINA</div>
            <div className="hero-image-number">10</div>
          </div>

          <div className="hero-side-note">A LEGACY WRITTEN IN GOLD</div>
          <button className="scroll-cue" onClick={() => goTo('legacy')}>
            <span>SCROLL TO EXPLORE</span><ArrowDown size={16} />
          </button>
          <div className="hero-index">01 <span>/</span> 04</div>
        </section>

        <section className="stat-strip" id="legacy">
          <div className="stat-intro">
            <SectionLabel>THE NUMBERS</SectionLabel>
            <p>A career beyond comparison.</p>
          </div>
          <div className="stat-item">
            <strong>8<span>.</span></strong>
            <span>BALLON D’OR</span>
          </div>
          <div className="stat-item">
            <strong>1<span>0</span></strong>
            <span>ICONIC NUMBER</span>
          </div>
          <div className="stat-item">
            <strong>4<span>+</span></strong>
            <span>CHAMPIONS LEAGUE TITLES</span>
          </div>
          <div className="stat-item">
            <strong>1<span>×</span></strong>
            <span>WORLD CUP CHAMPION</span>
          </div>
        </section>

        <section className="story-section section-pad" id="journey">
          <div className="story-heading">
            <SectionLabel>CHAPTERS OF GREATNESS</SectionLabel>
            <h2>NOT GIVEN.<br /><span>GREATNESS EARNED.</span></h2>
            <p>Every legend has a beginning. This one changed football forever.</p>
          </div>

          <div className="story-feature">
            <div className="story-image">
              {!imageErrors.messi ? photo('messi', '', 'Lionel Messi representing Argentina at Qatar 2022') : (
                <div className="image-fallback"><span>LA PULGA</span></div>
              )}
              <div className="story-image-caption">THE MAGICIAN <span>01 — IN FRAME</span></div>
            </div>
            <div className="story-text">
              <span className="story-number">10</span>
              <span className="gold-kicker">A DIFFERENT KIND OF GREATNESS</span>
              <h3>THE GAME<br />WAS NEVER<br /><em>THE SAME.</em></h3>
              <p>
                From Rosario to the summit of world football, Messi's journey
                is a reminder that greatness isn't simply about talent.
                It's about showing up, again and again, when the world is watching.
              </p>
              <button className="text-link" onClick={() => goTo('timeline')}>
                FOLLOW THE JOURNEY <ArrowRight size={17} />
              </button>
            </div>
          </div>

          <div className="timeline" id="timeline">
            <div className="timeline-top">
              <SectionLabel>THE ROAD TO IMMORTALITY</SectionLabel>
              <span className="timeline-range">2004 — FOREVER</span>
            </div>
            {timeline.map((item, i) => (
              <article className="timeline-item" key={item.year}>
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-marker"><span /></div>
                <div className="timeline-content">
                  <span>{item.club}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <span className="timeline-index">0{i + 1}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="trophy-section section-pad" id="trophies">
          <div className="trophy-header">
            <div>
              <SectionLabel>THE CABINET</SectionLabel>
              <h2>PROOF OF<br /><span>GREATNESS.</span></h2>
            </div>
            <p>Some chase history.<br />Some become it.</p>
          </div>

          <div className="trophy-layout">
            <div className="trophy-list">
              {trophies.map((t, i) => (
                <button
                  key={t.number}
                  className={`trophy-row ${activeTrophy === i ? 'trophy-active' : ''}`}
                  onClick={() => setActiveTrophy(i)}
                >
                  <span className="trophy-number">{t.number}</span>
                  <span className="trophy-icon">{t.icon}</span>
                  <span className="trophy-info">
                    <strong>{t.name}</strong><small>{t.detail}</small>
                  </span>
                  <ArrowRight className="trophy-arrow" size={18} />
                </button>
              ))}
            </div>

            <div className="trophy-display">
              <div className="trophy-orbit orbit-one" />
              <div className="trophy-orbit orbit-two" />
              <Sparkles className="trophy-spark" size={22} />
              <div className="trophy-art">
                {activeTrophy === 0 ? '♛' : activeTrophy === 1 ? '✦' : activeTrophy === 2 ? '★' : '✧'}
              </div>
              <span className="trophy-display-kicker">THE COLLECTION</span>
              <h3>{trophies[activeTrophy].name}</h3>
              <p>{trophies[activeTrophy].detail}</p>
              <div className="trophy-display-footer">
                <span>THE MESSI LEGACY</span><span>{trophies[activeTrophy].number} / 04</span>
              </div>
            </div>
          </div>
          <p className="fine-print">Selected career honours. This is an independent fan tribute and not an official player website.</p>
        </section>

        <section className="moments-section section-pad" id="moments">
          <div className="moments-heading">
            <div>
              <SectionLabel>FROZEN IN TIME</SectionLabel>
              <h2>MORE THAN<br /><span>A GAME.</span></h2>
            </div>
            <p>Some moments last seconds.<br />Others last forever.</p>
          </div>

          <div className="gallery">
            <button className="gallery-card gallery-large" onClick={() => setLightbox('worldcup')}>
              {photo('worldcup', '', 'Argentina celebrates the 2022 World Cup victory')}
              <div className="gallery-overlay">
                <span>01 / THE DREAM</span><strong>WORLD CHAMPIONS.</strong>
                <span className="gallery-open"><ArrowRight size={18} /></span>
              </div>
            </button>
            <button className="gallery-card gallery-tall" onClick={() => setLightbox('action')}>
              {photo('action', '', 'Messi takes a penalty in the 2022 World Cup final')}
              <div className="gallery-overlay">
                <span>02 / THE PRESSURE</span><strong>MADE FOR THE MOMENT.</strong>
                <span className="gallery-open"><ArrowRight size={18} /></span>
              </div>
            </button>
            <button className="gallery-card gallery-wide" onClick={() => setLightbox('celebration')}>
              {photo('celebration', '', 'Argentina celebrate during the 2022 World Cup')}
              <div className="gallery-overlay">
                <span>03 / THE PASSION</span><strong>FOR THE SHIRT.</strong>
                <span className="gallery-open"><ArrowRight size={18} /></span>
              </div>
            </button>
          </div>
          {Object.keys(imageErrors).some(k => imageErrors[k]) && (
            <p className="fine-print">Some photographs may not load if their source is unavailable. You can replace the image URLs in App.jsx with your own hosted photographs.</p>
          )}
        </section>

        <section className="finale" id="finale">
          <div className="finale-glow" />
          <div className="finale-content">
            <SectionLabel>THE FINAL WORD</SectionLabel>
            <div className="finale-quote-mark">“</div>
            <h2>THE DREAM<br />WAS <span>REAL.</span></h2>
            <p>For every kid with a ball and a dream.<br />For every believer who never gave up.</p>
            <div className="finale-signature">LIONEL MESSI <span>·</span> THE ETERNAL NUMBER 10</div>
            <button className="btn-primary finale-btn" onClick={() => goTo('home')}>
              BACK TO THE BEGINNING <ChevronUp size={17} />
            </button>
          </div>
          <div className="finale-watermark">10</div>
        </section>
      </main>

      <footer className="footer">
        <button className="footer-brand" onClick={() => goTo('home')}>M<span>10</span></button>
        <p>MADE FOR THE LOVE OF FOOTBALL.</p>
        <a href="https://www.fifa.com/" target="_blank" rel="noreferrer">FOOTBALL HISTORY <Globe2 size={14} /></a>
        <span className="footer-copy">FAN-MADE WEBSITE · NOT AFFILIATED WITH LIONEL MESSI</span>
      </footer>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true" aria-label="Photo viewer">
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close photo"><X /></button>
          {!imageErrors[lightbox] ? photo(lightbox, 'lightbox-image', 'Lionel Messi and Argentina at the World Cup') : <p>Image unavailable.</p>}
          <span className="lightbox-caption">QATAR 2022 · A MOMENT FOR ETERNITY</span>
        </div>
      )}

      <a className="instagram-float" href="https://www.instagram.com/leomessi/" target="_blank" rel="noreferrer" aria-label="Visit Messi's Instagram">
        <Instagram size={19} />
      </a>
    </div>
  );
}
