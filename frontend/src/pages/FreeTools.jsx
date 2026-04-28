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
          background-color: #0b0c10;
          background-image: radial-gradient(circle at 50% 0%, rgba(30,10,60,0.5) 0%, rgba(10,5,20,0.9) 70%, #050508 100%);
          min-height: 80vh;
          color: #fff;
          padding: 40px 0 80px;
        }
        
        .cosmic-subtitle {
          color: #ff6a00;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-weight: 600;
        }
        
        .cosmic-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          font-family: 'Merriweather Sans', serif;
          background: linear-gradient(135deg, #ffd700, #ff6a00, #ff0080);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .cosmic-desc {
          color: #aaa;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .tool-card {
          background: rgba(20, 15, 30, 0.6);
          border: 1px solid rgba(255, 106, 0, 0.15);
          border-radius: 20px;
          padding: 40px 30px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        
        .tool-card:hover {
          transform: translateY(-2px);
          background: rgba(30, 20, 45, 0.8);
          border-color: rgba(255, 106, 0, 0.5);
          box-shadow: 0 20px 40px rgba(255, 106, 0, 0.15);
        }
        
        .tool-icon-wrapper {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, rgba(255,106,0,0.1), rgba(255,0,128,0.1));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
          border: 1px solid rgba(255, 106, 0, 0.3);
          transition: all 0.4s;
        }
        
        .tool-card:hover .tool-icon-wrapper {
          background: linear-gradient(135deg, #ff6a00, #ff0080);
          box-shadow: 0 0 20px rgba(255, 106, 0, 0.4);
          transform: scale(1.1) rotate(10deg);
        }
        
        .tool-card:hover .tool-icon-wrapper i {
          color: #fff !important;
        }
        
        .tool-icon-wrapper i {
          color: #ff6a00;
          transition: color 0.4s;
        }
        
        .tool-name {
          color: #fff;
          font-weight: 700;
          font-size: 1.4rem;
          margin-bottom: 15px;
          font-family: 'Merriweather Sans', serif;
        }
        
        .tool-desc {
          color: #999;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .mystic-btn-outline {
          background: transparent;
          color: #ff6a00;
          border: 1px solid #ff6a00;
          border-radius: 30px;
          padding: 12px 25px;
          font-weight: 600;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
        }
        
        .mystic-btn-outline:hover {
          background: linear-gradient(135deg, #ff6a00, #ff0080);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 5px 15px rgba(255, 106, 0, 0.4);
        }

        .fade-in { animation: fadeIn 0.6s ease-out both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        
        /* Tools Container wrapper for inner tools */
        .tools-container {
          background-color: #0b0c10;
          min-height: 100vh;
        }
      `}</style>
    </section>
  );
}

export default FreeTools;
