import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import KundaliTool from '../components/tools/KundaliTool';
import HoroscopeTool from '../components/tools/HoroscopeTool';
import MoonTool from '../components/tools/MoonTool';
import ZodiacFinder from '../components/tools/ZodiacFinder';

function FreeTools() {
  const [activeTool, setActiveTool] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTool]);

  const tools = [
    { id: 'kundali', name: 'Kundali / Birth Chart', desc: 'Generate your free birth chart', icon: 'fa-star' },
    { id: 'horoscope', name: 'Daily Horoscope', desc: 'Read your daily predictions', icon: 'fa-sun' },
    { id: 'love', name: 'Love Calculator', desc: 'Check compatibility with your partner', icon: 'fa-heart', link: '/love' },
    { id: 'numerology', name: 'Numerology Calculator', desc: 'Calculate your life path number', icon: 'fa-calculator', link: '/numerology' },
    { id: 'tarot', name: 'Tarot Reading', desc: 'Draw a card for guidance', icon: 'fa-magic', link: '/tarot' },
    { id: 'moon', name: 'Moonsign Calculator', desc: 'Find your moon sign', icon: 'fa-moon' },
    { id: 'zodiac', name: 'Sun Sign Calculator', desc: 'Know your zodiac sign', icon: 'fa-certificate' },
  ];

  const handleBack = () => setActiveTool(null);

  if (activeTool === 'kundali') return <section className="tools-container py-5"><KundaliTool onBack={handleBack} /></section>;
  if (activeTool === 'horoscope') return <section className="tools-container py-5"><HoroscopeTool onBack={handleBack} /></section>;
  if (activeTool === 'moon') return <section className="tools-container py-5"><MoonTool onBack={handleBack} /></section>;
  if (activeTool === 'zodiac') return <section className="tools-container py-5"><ZodiacFinder onBack={handleBack} /></section>;

  return (
    <section className="freetools-section">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center mb-5 fade-in">
            <span className="cosmic-subtitle">Explore The Cosmos</span>
            <h1 className="cosmic-title mt-2 mb-3">Free Astrology Tools</h1>
            <p className="cosmic-desc lead">Explore our collection of free astrology calculators and divination tools to uncover the secrets of your journey.</p>
          </div>
        </div>
        
        <div className="row g-4 justify-content-center">
          {tools.map((tool, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-4 fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="tool-card text-center h-100 d-flex flex-column">
                <div className="tool-icon-wrapper mx-auto">
                  <i className={`fas ${tool.icon} fa-2x`}></i>
                </div>
                <h4 className="tool-name">{tool.name}</h4>
                <p className="tool-desc flex-grow-1">{tool.desc}</p>
                
                <div className="mt-4">
                  {tool.link ? (
                    <Link to={tool.link} className="btn mystic-btn-outline w-100">Access Tool <i className="fas fa-arrow-right ms-2"></i></Link>
                  ) : (
                    <button 
                      className="btn mystic-btn-outline w-100"
                      onClick={() => setActiveTool(tool.id)}
                    >
                      Access Tool <i className="fas fa-arrow-right ms-2"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .freetools-section {
          background-color: var(--cosmic-bg);
          min-height: 80vh;
          color: var(--cosmic-text);
          padding: 80px 0 100px;
        }
        
        .cosmic-subtitle {
          color: var(--cosmic-accent-pink);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 4px;
          font-weight: 800;
        }
        
        .cosmic-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          color: var(--cosmic-text);
        }
        
        .cosmic-desc {
          color: var(--cosmic-text-muted);
          font-size: 1.1rem;
          line-height: 1.7;
        }

        .tool-card {
          background: var(--cosmic-white);
          border: 1px solid var(--glass-border);
          border-radius: 30px;
          padding: 45px 35px;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: var(--premium-shadow);
        }
        
        .tool-card:hover {
          transform: translateY(-12px);
          border-color: var(--cosmic-accent-pink);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }
        
        .tool-icon-wrapper {
          width: 85px;
          height: 85px;
          background: var(--cosmic-accent-soft);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
          border: 1px solid var(--glass-border);
          transition: all 0.4s;
        }
        
        .tool-card:hover .tool-icon-wrapper {
          background: var(--cosmic-gradient);
          box-shadow: 0 10px 20px rgba(227, 27, 122, 0.2);
          transform: scale(1.1) rotate(5deg);
          border-color: transparent;
        }
        
        .tool-card:hover .tool-icon-wrapper i {
          color: #fff !important;
        }
        
        .tool-icon-wrapper i {
          color: var(--cosmic-accent-pink);
          transition: color 0.4s;
        }
        
        .tool-name {
          color: var(--cosmic-text);
          font-weight: 700;
          font-size: 1.5rem;
          margin-bottom: 15px;
          font-family: 'Playfair Display', serif;
        }
        
        .tool-desc {
          color: var(--cosmic-text-muted);
          font-size: 1rem;
          line-height: 1.6;
        }

        .mystic-btn-outline {
          background: var(--cosmic-white);
          color: var(--cosmic-text);
          border: 1px solid var(--glass-border);
          border-radius: 50px;
          padding: 14px 25px;
          font-weight: 800;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.8rem;
        }
        
        .mystic-btn-outline:hover {
          background: var(--cosmic-gradient);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 8px 20px rgba(227, 27, 122, 0.3);
          transform: translateY(-2px);
        }

        .fade-in { animation: fadeIn 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        
        .tools-container {
          background-color: var(--cosmic-bg);
          min-height: 100vh;
        }
      `}</style>
    </section>
  );
}

export default FreeTools;
