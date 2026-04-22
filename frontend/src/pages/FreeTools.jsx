import { useState } from 'react';
import { Link } from 'react-router-dom';
import KundaliTool from '../components/tools/KundaliTool';
import HoroscopeTool from '../components/tools/HoroscopeTool';
import MoonTool from '../components/tools/MoonTool';
import ZodiacFinder from '../components/tools/ZodiacFinder';

function FreeTools() {
  const [activeTool, setActiveTool] = useState(null);

  const tools = [
    { id: 'kundali', name: 'Kundali / Birth Chart', desc: 'Generate your free birth chart', icon: 'fa-star' },
    { id: 'horoscope', name: 'Daily Horoscope', desc: 'Read your daily predictions', icon: 'fa-sun' },
    { id: 'love', name: 'Love Calculator', desc: 'Check compatibility with your partner', icon: 'fa-heart', link: '/love' },
    { id: 'numerology', name: 'Numerology Calculator', desc: 'Calculate your life path number', icon: 'fa-calculator', link: '/numerology' },
    { id: 'tarot', name: 'Tarot Reading', desc: 'Draw a card for guidance', icon: 'fa-cards', link: '/tarot' },
    { id: 'moon', name: 'Moonsign Calculator', desc: 'Find your moon sign', icon: 'fa-moon' },
    { id: 'zodiac', name: 'Sun Sign Calculator', desc: 'Know your zodiac sign', icon: 'fa-sun' },
  ];

  const handleBack = () => setActiveTool(null);

  if (activeTool === 'kundali') return <section className="container py-5"><KundaliTool onBack={handleBack} /></section>;
  if (activeTool === 'horoscope') return <section className="container py-5"><HoroscopeTool onBack={handleBack} /></section>;
  if (activeTool === 'moon') return <section className="container py-5"><MoonTool onBack={handleBack} /></section>;
  if (activeTool === 'zodiac') return <section className="container py-5"><ZodiacFinder onBack={handleBack} /></section>;

  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-12 text-center mb-5 fade-in">
          <h1>Free Astrology Tools</h1>
          <p className="lead">Explore our collection of free astrology calculators and tools</p>
        </div>
      </div>
      <div className="row g-4">
        {tools.map((tool, idx) => (
          <div key={idx} className="col-md-4 fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="tool-card text-center p-4 h-100 d-flex flex-column">
              <i className={`fas ${tool.icon || 'fa-star'} fa-3x mb-3`}></i>
              <h4>{tool.name}</h4>
              <p className="text-muted flex-grow-1">{tool.desc}</p>
              
              {tool.link ? (
                <Link to={tool.link} className="btn btn-outline-primary mt-3">Use Tool</Link>
              ) : (
                <button 
                  className="btn btn-outline-primary mt-3"
                  onClick={() => setActiveTool(tool.id)}
                >
                  Use Tool
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .tool-card { background: rgba(255,255,255,0.05); border-radius: 15px; transition: 0.3s; }
        .tool-card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.1); box-shadow: 0 10px 20px rgba(0,0,0,0.2); border-color: rgba(255,106,0,0.3); }
        .tool-card i { color: #ff6a00; }
        .tool-card h4 { color: #fff; margin: 15px 0; }
        .fade-in { animation: fadeIn 0.5s ease-in both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}

export default FreeTools;
