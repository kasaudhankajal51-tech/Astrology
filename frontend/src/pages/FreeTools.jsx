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
        :root {
          --cosmic-accent: #c6843f;
          --cosmic-accent-dark: #9c5a1e;
          --cosmic-accent-deep: #65250c;
          --cosmic-gradient: linear-gradient(135deg, #c6843f, #9c5a1e);
          --cosmic-accent-soft: #ffefd6;
          --cosmic-text: #65250c;
          --cosmic-text-muted: #9c847b;
          --glass-border: #f3e5d8;
          --premium-shadow: 0 15px 35px rgba(198,132,63,0.08);
          --cosmic-bg: #ffffff;
          --cosmic-white: #ffffff;
        }

        .freetools-section {
          background-color: #ffffff;
          min-height: 80vh;
          color: #65250c;
          padding: 80px 0 100px;
        }
        
        .cosmic-subtitle {
          color: #c6843f;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 6px;
          font-weight: 800;
          margin-bottom: 20px;
          display: block;
        }
        
        .cosmic-title {
          font-size: clamp(3.2rem, 8vw, 5.2rem);
          font-weight: 900;
          font-family: 'Playfair Display', serif;
          color: #65250c;
          line-height: 1.1;
          margin-bottom: 30px;
        }
        
        .cosmic-desc {
          color: #9c847b;
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          line-height: 1.8;
          max-width: 850px;
          margin: 0 auto;
          font-weight: 500;
        }

        .tool-card {
          background: #ffffff;
          border: 1px solid #f3e5d8;
          border-radius: 32px;
          padding: 50px 40px;
          transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: 0 10px 30px rgba(198,132,63,0.05);
        }
        
        .tool-card:hover {
          transform: translateY(-15px);
          border-color: #c6843f;
          box-shadow: 0 25px 50px rgba(198,132,63,0.12);
        }
        
        .tool-icon-wrapper {
          width: 90px;
          height: 90px;
          background: #ffefd6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
          border: 1px solid #f3e5d8;
          transition: all 0.5s;
        }
        
        .tool-card:hover .tool-icon-wrapper {
          background: linear-gradient(135deg, #c6843f, #9c5a1e);
          box-shadow: 0 15px 30px rgba(198,132,63,0.3);
          transform: scale(1.1) rotate(8deg);
          border-color: transparent;
        }
        
        .tool-card:hover .tool-icon-wrapper i {
          color: #fff !important;
        }
        
        .tool-icon-wrapper i {
          color: #c6843f;
          transition: color 0.4s;
        }
        
        .tool-name {
          color: #65250c;
          font-weight: 800;
          font-size: 1.6rem;
          margin-bottom: 18px;
          font-family: 'Playfair Display', serif;
        }
        
        .tool-desc {
          color: #9c847b;
          font-size: 1rem;
          line-height: 1.7;
          font-weight: 500;
        }

        .mystic-btn-outline {
          background: #ffefd6;
          color: #9c5a1e;
          border: 1px solid #f3e5d8;
          border-radius: 50px;
          padding: 16px 30px;
          font-weight: 800;
          transition: all 0.4s;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.75rem;
          width: 100%;
        }
        
        .mystic-btn-outline:hover {
          background: linear-gradient(135deg, #c6843f, #9c5a1e);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 12px 25px rgba(198,132,63,0.3);
          transform: translateY(-3px);
        }

        .fade-in { animation: fadeIn 1s cubic-bezier(0.165, 0.84, 0.44, 1) both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        
        .tools-container {
          background-color: #ffffff;
          min-height: 100vh;
        }
      `}</style>
    </section>
  );
}

export default FreeTools;
