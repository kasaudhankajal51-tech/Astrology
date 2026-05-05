import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ConsultationModal from '../components/ConsultationModal';

const AstrologyCourses = () => {
  const features = [
    { icon: "👥", title: "Learn from Experts", sub: "20+ Years of Experience" },
    { icon: "▶", title: "Self-Paced Learning", sub: "Study Anytime, Anywhere" },
    { icon: "🏅", title: "Certificate of Completion", sub: "Boost Your Credibility" },
    { icon: "🎧", title: "Lifetime Support", sub: "We're Here for You" },
  ];

  const Card1SVG = () => (
    <svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{width:"100%",height:"100%",display:"block"}}>
      <defs>
        <radialGradient id="bg1" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#8B4A1E"/>
          <stop offset="100%" stopColor="#2A0F02"/>
        </radialGradient>
        <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8832A" stopOpacity=".4"/>
          <stop offset="100%" stopColor="#2A0F02" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="300" height="160" fill="url(#bg1)"/>
      <ellipse cx="150" cy="80" rx="90" ry="70" fill="url(#glow1)"/>
      <rect x="80" y="65" width="140" height="70" rx="3" fill="#C8832A" opacity=".9"/>
      <rect x="147" y="62" width="6" height="76" rx="2" fill="#5C2D12"/>
      <rect x="83" y="68" width="62" height="64" rx="2" fill="#FDF6EE"/>
      <rect x="155" y="68" width="62" height="64" rx="2" fill="#FFFBF5"/>
      <line x1="90" y1="80" x2="138" y2="80" stroke="#C8832A" strokeWidth=".8"/>
      <line x1="90" y1="87" x2="138" y2="87" stroke="#C8832A" strokeWidth=".8"/>
      <line x1="90" y1="94" x2="138" y2="94" stroke="#C8832A" strokeWidth=".8"/>
      <line x1="90" y1="101" x2="138" y2="101" stroke="#C8832A" strokeWidth=".8"/>
      <line x1="90" y1="108" x2="138" y2="108" stroke="#C8832A" strokeWidth=".8"/>
      <line x1="90" y1="115" x2="138" y2="115" stroke="#C8832A" strokeWidth=".8"/>
      <circle cx="186" cy="100" r="22" fill="none" stroke="#5C2D12" strokeWidth="1"/>
      <circle cx="186" cy="100" r="15" fill="none" stroke="#5C2D12" strokeWidth=".7"/>
      <circle cx="186" cy="100" r="6" fill="#5C2D12" opacity=".5"/>
      <line x1="186" y1="78" x2="186" y2="122" stroke="#5C2D12" strokeWidth=".6"/>
      <line x1="164" y1="100" x2="208" y2="100" stroke="#5C2D12" strokeWidth=".6"/>
      <line x1="170" y1="84" x2="202" y2="116" stroke="#5C2D12" strokeWidth=".5"/>
      <line x1="202" y1="84" x2="170" y2="116" stroke="#5C2D12" strokeWidth=".5"/>
      <text x="186" y="76" textAnchor="middle" fill="#C8832A" fontSize="6">♈</text>
      <text x="208" y="104" textAnchor="middle" fill="#C8832A" fontSize="6">♉</text>
      <text x="186" y="126" textAnchor="middle" fill="#C8832A" fontSize="6">♊</text>
      <text x="163" y="104" textAnchor="middle" fill="#C8832A" fontSize="6">♋</text>
      <path d="M83,68 Q150,58 217,68" fill="none" stroke="#8B4A1E" strokeWidth="1" opacity=".6"/>
      <circle cx="50" cy="25" r="1.2" fill="#C8832A" opacity=".8"/>
      <circle cx="260" cy="40" r="1" fill="#C8832A" opacity=".7"/>
      <circle cx="30" cy="120" r=".8" fill="#C8832A" opacity=".6"/>
      <circle cx="275" cy="130" r="1.2" fill="#C8832A" opacity=".8"/>
      <circle cx="240" cy="20" r=".8" fill="#C8832A" opacity=".5"/>
      <circle cx="70" cy="140" r="1" fill="#C8832A" opacity=".6"/>
    </svg>
  );

  const Card2SVG = () => (
    <svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{width:"100%",height:"100%",display:"block"}}>
      <defs>
        <radialGradient id="bg2" cx="40%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#C8832A"/>
          <stop offset="100%" stopColor="#8B4A1E"/>
        </radialGradient>
        <radialGradient id="glow2" cx="55%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#FDF6EE" stopOpacity=".3"/>
          <stop offset="100%" stopColor="#8B4A1E" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="300" height="160" fill="url(#bg2)"/>
      <ellipse cx="170" cy="75" rx="100" ry="65" fill="url(#glow2)"/>
      <rect x="75" y="20" width="120" height="120" fill="none" stroke="#f0d070" strokeWidth="1.2" opacity=".8"/>
      <polygon points="135,20 195,80 135,140 75,80" fill="none" stroke="#f0d070" strokeWidth="1" opacity=".7"/>
      <rect x="105" y="50" width="60" height="60" fill="rgba(240,210,100,.08)" stroke="#f0d070" strokeWidth=".8" opacity=".6"/>
      <line x1="75" y1="20" x2="195" y2="140" stroke="#f0d070" strokeWidth=".6" opacity=".5"/>
      <line x1="195" y1="20" x2="75" y2="140" stroke="#f0d070" strokeWidth=".6" opacity=".5"/>
      <text x="135" y="38" textAnchor="middle" fill="#f0d890" fontSize="8" fontFamily="serif" opacity=".9">1</text>
      <text x="180" y="55" textAnchor="middle" fill="#f0d890" fontSize="7" fontFamily="serif" opacity=".8">2</text>
      <text x="188" y="82" textAnchor="middle" fill="#f0d890" fontSize="7" fontFamily="serif" opacity=".8">3</text>
      <text x="180" y="112" textAnchor="middle" fill="#f0d890" fontSize="7" fontFamily="serif" opacity=".8">4</text>
      <text x="135" y="130" textAnchor="middle" fill="#f0d890" fontSize="8" fontFamily="serif" opacity=".9">7</text>
      <text x="88" y="112" textAnchor="middle" fill="#f0d890" fontSize="7" fontFamily="serif" opacity=".8">10</text>
      <text x="82" y="82" textAnchor="middle" fill="#f0d890" fontSize="7" fontFamily="serif" opacity=".8">11</text>
      <text x="88" y="55" textAnchor="middle" fill="#f0d890" fontSize="7" fontFamily="serif" opacity=".8">12</text>
      <text x="135" y="76" textAnchor="middle" fill="#f8e8a0" fontSize="9" fontFamily="serif">☿ ♀</text>
      <text x="135" y="90" textAnchor="middle" fill="#f8e8a0" fontSize="9" fontFamily="serif">♃ ♄</text>
      <line x1="230" y1="40" x2="245" y2="120" stroke="#d4b060" strokeWidth="2" strokeLinecap="round" opacity=".7"/>
      <line x1="230" y1="40" x2="215" y2="120" stroke="#d4b060" strokeWidth="2" strokeLinecap="round" opacity=".7"/>
      <line x1="218" y1="90" x2="242" y2="90" stroke="#d4b060" strokeWidth="1.5" opacity=".7"/>
      <circle cx="40" cy="30" r="1.2" fill="#f0e080" opacity=".7"/>
      <circle cx="270" cy="50" r="1" fill="#f0e080" opacity=".6"/>
      <circle cx="255" cy="130" r=".8" fill="#f0e080" opacity=".5"/>
      <circle cx="25" cy="110" r="1" fill="#f0e080" opacity=".6"/>
    </svg>
  );

  const Card3SVG = () => (
    <svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{width:"100%",height:"100%",display:"block"}}>
      <defs>
        <radialGradient id="bg3" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#3D1A08"/>
          <stop offset="100%" stopColor="#2A0F02"/>
        </radialGradient>
        <radialGradient id="jupGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8832A"/>
          <stop offset="60%" stopColor="#8B4A1E"/>
          <stop offset="100%" stopColor="#5C2D12"/>
        </radialGradient>
        <radialGradient id="jupAtm" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#EBC9A3" stopOpacity=".5"/>
          <stop offset="100%" stopColor="#C8832A" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="300" height="160" fill="url(#bg3)"/>
      <circle cx="20" cy="15" r=".8" fill="white" opacity=".8"/>
      <circle cx="45" cy="8" r="1" fill="white" opacity=".6"/>
      <circle cx="80" cy="20" r=".6" fill="white" opacity=".7"/>
      <circle cx="10" cy="50" r=".8" fill="white" opacity=".5"/>
      <circle cx="260" cy="12" r="1" fill="white" opacity=".8"/>
      <circle cx="285" cy="35" r=".7" fill="white" opacity=".6"/>
      <circle cx="270" cy="60" r=".9" fill="white" opacity=".7"/>
      <circle cx="250" cy="140" r=".8" fill="white" opacity=".5"/>
      <circle cx="30" cy="130" r=".7" fill="white" opacity=".6"/>
      <circle cx="180" cy="145" r=".8" fill="white" opacity=".6"/>
      <circle cx="130" cy="15" r=".5" fill="white" opacity=".7"/>
      <circle cx="160" cy="10" r=".8" fill="white" opacity=".6"/>
      <ellipse cx="155" cy="78" rx="75" ry="12" fill="none" stroke="#d4a050" strokeWidth="2.5" opacity=".35"/>
      <ellipse cx="155" cy="78" rx="68" ry="10" fill="none" stroke="#e0b860" strokeWidth="1.2" opacity=".25"/>
      <circle cx="155" cy="78" r="52" fill="url(#jupGlow)"/>
      <circle cx="155" cy="78" r="52" fill="url(#jupAtm)"/>
      <ellipse cx="155" cy="62" rx="51" ry="7" fill="#8a4818" opacity=".5"/>
      <ellipse cx="155" cy="72" rx="52" ry="4" fill="#d09040" opacity=".35"/>
      <ellipse cx="155" cy="82" rx="52" ry="6" fill="#7a3e14" opacity=".45"/>
      <ellipse cx="155" cy="92" rx="51" ry="4" fill="#c88038" opacity=".3"/>
      <ellipse cx="155" cy="100" rx="50" ry="5" fill="#8a4818" opacity=".4"/>
      <ellipse cx="135" cy="86" rx="10" ry="7" fill="#a03818" opacity=".7"/>
      <ellipse cx="140" cy="60" rx="18" ry="12" fill="white" opacity=".08"/>
    </svg>
  );

  const Card4SVG = () => (
    <svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{width:"100%",height:"100%",display:"block"}}>
      <defs>
        <radialGradient id="bg4" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#8B4A1E"/>
          <stop offset="100%" stopColor="#5C2D12"/>
        </radialGradient>
        <radialGradient id="cmpGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8832A" stopOpacity=".4"/>
          <stop offset="100%" stopColor="#8B4A1E" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="300" height="160" fill="url(#bg4)"/>
      <ellipse cx="155" cy="80" rx="100" ry="70" fill="url(#cmpGlow)"/>
      <circle cx="155" cy="80" r="56" fill="#c89850" opacity=".15"/>
      <circle cx="155" cy="80" r="56" fill="none" stroke="#d4a840" strokeWidth="2" opacity=".7"/>
      <circle cx="155" cy="80" r="50" fill="none" stroke="#c89830" strokeWidth=".8" opacity=".5"/>
      <circle cx="155" cy="80" r="42" fill="#a07828" opacity=".2"/>
      <circle cx="155" cy="80" r="42" fill="none" stroke="#c89830" strokeWidth=".8" opacity=".5"/>
      <line x1="155" y1="24" x2="155" y2="32" stroke="#e8c050" strokeWidth="2" opacity=".9"/>
      <line x1="155" y1="128" x2="155" y2="136" stroke="#e8c050" strokeWidth="2" opacity=".9"/>
      <line x1="99" y1="80" x2="107" y2="80" stroke="#e8c050" strokeWidth="2" opacity=".9"/>
      <line x1="203" y1="80" x2="211" y2="80" stroke="#e8c050" strokeWidth="2" opacity=".9"/>
      <line x1="115" y1="40" x2="120" y2="47" stroke="#d4b040" strokeWidth="1.2" opacity=".7"/>
      <line x1="190" y1="113" x2="195" y2="120" stroke="#d4b040" strokeWidth="1.2" opacity=".7"/>
      <line x1="115" y1="120" x2="120" y2="113" stroke="#d4b040" strokeWidth="1.2" opacity=".7"/>
      <line x1="190" y1="47" x2="195" y2="40" stroke="#d4b040" strokeWidth="1.2" opacity=".7"/>
      <text x="155" y="22" textAnchor="middle" fill="#f0d060" fontSize="9" fontFamily="serif" fontWeight="bold">N</text>
      <text x="155" y="146" textAnchor="middle" fill="#d4b040" fontSize="8" fontFamily="serif">S</text>
      <text x="96" y="84" textAnchor="middle" fill="#d4b040" fontSize="8" fontFamily="serif">W</text>
      <text x="214" y="84" textAnchor="middle" fill="#d4b040" fontSize="8" fontFamily="serif">E</text>
      <polygon points="155,38 150,80 155,68 160,80" fill="#e84030" opacity=".9"/>
      <polygon points="155,122 150,80 155,92 160,80" fill="#d0c890" opacity=".8"/>
      <circle cx="155" cy="80" r="6" fill="#e8c050" opacity=".9"/>
      <circle cx="155" cy="80" r="3.5" fill="#a07020"/>
      <circle cx="30" cy="30" r="1.5" fill="#f0d060" opacity=".6"/>
      <circle cx="55" cy="50" r="1.5" fill="#f0d060" opacity=".6"/>
      <circle cx="45" cy="75" r="1.5" fill="#f0d060" opacity=".6"/>
      <line x1="30" y1="30" x2="55" y2="50" stroke="#d4b040" strokeWidth=".5" opacity=".3"/>
      <line x1="55" y1="50" x2="45" y2="75" stroke="#d4b040" strokeWidth=".5" opacity=".3"/>
      <circle cx="260" cy="25" r="1.5" fill="#f0d060" opacity=".5"/>
      <circle cx="278" cy="45" r="1.2" fill="#f0d060" opacity=".4"/>
      <line x1="260" y1="25" x2="278" y2="45" stroke="#d4b040" strokeWidth=".5" opacity=".3"/>
    </svg>
  );

  const courses = [
    {
      id: 1, level: "Beginner Level", title: "Foundation in Astrology",
      desc: "Start your journey. Learn the basics of planets, signs, houses and their impact on our lives.",
      icon: "☸", price: "₹699", original: "₹4100", SVG: Card1SVG,
    },
    {
      id: 2, level: "Intermediate Level", title: "Vedic Astrology Deep Dive",
      desc: "Deepen your understanding of planetary dasha, yogas, and divisional charts in Vedic astrology.",
      icon: "☽", price: "₹999", original: "₹5100", SVG: Card2SVG,
    },
    {
      id: 3, level: "Advanced Level", title: "KP Astrology Mastery",
      desc: "Master the precision of KP system with practical techniques for accurate predictions.",
      icon: "24", price: "₹1299", original: "₹6500", SVG: Card3SVG, isBold: true,
    },
    {
      id: 4, level: "Practitioner Level", title: "Astrology for Guidance & Counseling",
      desc: "Learn how to guide, empower and bring positive change in others' lives using astrology.",
      icon: "✦", price: "₹1499", original: "₹7000", SVG: Card4SVG,
    },
  ];

  return (
    <>
      <style>{`
        .aw { 
          background: radial-gradient(circle at center, #FFFDF8 0%, #FFF4E8 100%); 
          padding: 5rem 2rem; 
          font-family: var(--font-sans); 
          position: relative; 
          overflow: hidden; 
        }
        .aw::before { content: '✦'; position: absolute; top: 20px; left: 30px; font-size: 60px; opacity: .08; color: #8B4A1E; pointer-events: none; }
        .aw::after { content: '☽'; position: absolute; bottom: 30px; right: 40px; font-size: 80px; opacity: .08; color: #8B4A1E; pointer-events: none; }
        
        .ah { text-align: center; margin-bottom: 3.5rem; }
        .ah h2 { 
          font-family: var(--font-serif); 
          font-size: clamp(2.2rem, 5vw, 3.2rem); 
          color: #3A1900; 
          letter-spacing: -0.01em; 
          margin: 0 0 .6rem; 
          font-weight: 700; 
        }
        .atag { 
          font-size: .85rem; 
          letter-spacing: .15em; 
          color: #8B4A1E; 
          text-transform: uppercase; 
          margin-bottom: .8rem; 
          font-weight: 700;
          display: flex; 
          align-items: center; 
          gap: 15px; 
          justify-content: center; 
        }
        .atag::before, .atag::after { content: ''; width: 40px; height: 1px; background: #C8832A; opacity: .4; }
        
        .asub { 
          color: #5C3D26; 
          font-size: 1.1rem; 
          max-width: 600px; 
          margin: 0 auto; 
          line-height: 1.6; 
          font-weight: 500;
        }

        .dl { display: flex; align-items: center; gap: 10px; justify-content: center; margin: 1rem 0; }
        .dl::before, .dl::after { content: ''; flex: 1; max-width: 60px; height: 1px; background: #C8832A; opacity: 0.3; }
        .dd { width: 6px; height: 6px; background: #C8832A; border-radius: 50%; box-shadow: 0 0 10px rgba(200,131,42,0.4); }

        .cg { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
          gap: 2rem; 
          margin-bottom: 3rem; 
        }
        .cc { 
          background: #FFFFFF; 
          border-radius: 24px; 
          overflow: hidden; 
          border: 1px solid rgba(139, 74, 30, 0.1); 
          display: flex; 
          flex-direction: column; 
          transition: all .4s cubic-bezier(0.165, 0.84, 0.44, 1); 
          cursor: pointer; 
          box-shadow: 0 10px 30px rgba(139, 74, 30, 0.04); 
        }
        .cc:hover { 
          transform: translateY(-10px); 
          box-shadow: 0 20px 40px rgba(139, 74, 30, 0.1); 
          border-color: rgba(200, 131, 42, 0.3);
        }
        
        .ci { width: 100%; height: 180px; display: block; position: relative; overflow: hidden; }
        .badge-discount { 
          position: absolute; 
          top: 15px; 
          left: 15px; 
          background: #8B4A1E; 
          color: #fff; 
          font-size: .7rem; 
          letter-spacing: .05em; 
          text-transform: uppercase; 
          padding: 6px 14px; 
          border-radius: 30px; 
          font-weight: 700; 
          z-index: 3; 
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .ico { 
          position: absolute; 
          bottom: -22px; 
          left: 50%; 
          transform: translateX(-50%); 
          width: 50px; 
          height: 50px; 
          background: #FFFFFF; 
          border: 2px solid #C8832A; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 20px; 
          color: #8B4A1E; 
          z-index: 2; 
          box-shadow: 0 4px 12px rgba(139, 74, 30, 0.15);
        }
        
        .cb { padding: 2.5rem 1.5rem 1.5rem; text-align: center; flex: 1; display: flex; flex-direction: column; }
        .clvl { 
          font-size: .75rem; 
          letter-spacing: .12em; 
          color: #C8832A; 
          text-transform: uppercase; 
          margin-bottom: .6rem; 
          font-weight: 700; 
        }
        .ctitle { 
          font-family: var(--font-serif); 
          font-size: 1.6rem; 
          color: #3A1900; 
          margin: 0 0 .6rem; 
          font-weight: 700; 
          line-height: 1.2; 
        }
        .cdesc { 
          font-size: .95rem; 
          color: #5C3D26; 
          line-height: 1.6; 
          flex: 1; 
          margin-bottom: 1.2rem; 
          font-weight: 400;
        }
        
        .price-hero { 
          font-family: var(--font-serif); 
          font-size: 1.8rem; 
          color: #3A1900; 
          font-weight: 700; 
          margin: .4rem 0 1rem; 
        }
        .price-hero span { 
          font-size: 1rem; 
          color: #A08C7D; 
          text-decoration: line-through; 
          font-family: var(--font-sans); 
          font-weight: 500; 
          margin-left: 10px; 
        }
        
        .divr { height: 1px; background: rgba(139, 74, 30, 0.1); margin: .5rem 0 1.2rem; }
        
        .cinstr { 
          display: flex; 
          align-items: center; 
          gap: 12px; 
          margin-bottom: 1.5rem; 
          justify-content: center; 
          background: rgba(139, 74, 30, 0.03);
          padding: 10px;
          border-radius: 12px;
        }
        .iavt { 
          width: 40px; 
          height: 40px; 
          border-radius: 50%; 
          background: #8B4A1E; 
          border: 2px solid #C8832A; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 14px; 
          color: #fff; 
          font-weight: 700;
          flex-shrink: 0; 
        }
        .iname { font-size: .9rem; color: #3A1900; font-weight: 700; margin: 0; text-align: left; }
        .iexp { font-size: .75rem; color: #5C3D26; margin: 0; font-family: var(--font-sans); text-align: left; opacity: 0.8; }
        
        .btnrow { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .btn-read { 
          background: transparent; 
          color: #8B4A1E; 
          border: 1.5px solid #C8832A; 
          border-radius: 12px; 
          padding: .75rem .5rem; 
          font-size: .9rem; 
          font-weight: 700; 
          cursor: pointer; 
          transition: all .3s; 
        }
        .btn-read:hover { background: rgba(200, 131, 42, 0.08); }
        .btn-buy { 
          background: #8B4A1E; 
          color: #fff; 
          border: none; 
          border-radius: 12px; 
          padding: .75rem .5rem; 
          font-size: .9rem; 
          font-weight: 700; 
          cursor: pointer; 
          transition: all .3s; 
          box-shadow: 0 4px 15px rgba(139, 74, 30, 0.2);
        }
        .btn-buy:hover { background: #3A1900; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(139, 74, 30, 0.3); }

        .fb { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
          gap: 2rem; 
          border-top: 1px solid rgba(139, 74, 30, 0.1); 
          padding-top: 3rem; 
          margin-top: 2rem;
        }
        .fi { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
        .fic { 
          width: 60px; 
          height: 60px; 
          border-radius: 20px; 
          background: #FFF4E8; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 24px; 
          color: #8B4A1E; 
          border: 1px solid rgba(200, 131, 42, 0.2);
        }
        .ftt { font-size: 1.1rem; font-weight: 700; color: #3A1900; font-family: var(--font-sans); }
        .fts { font-size: 0.9rem; color: #5C3D26; font-family: var(--font-sans); font-weight: 500; opacity: 0.8; }
        .svgd { position: absolute; opacity: .05; pointer-events: none; color: #8B4A1E; }

        @media (max-width: 768px) {
          .aw { padding: 4rem 1.5rem; }
          .ah h2 { font-size: 2.2rem; }
          .cg { grid-template-columns: 1fr; gap: 2.5rem; }
          .cc { max-width: 450px; margin: 0 auto; }
        }
      `}</style>

      <section className="aw">
        <svg className="svgd" style={{top:0,right:0,width:150,height:150}} viewBox="0 0 160 160">
          <circle cx="130" cy="30" r="50" fill="none" stroke="#4a2508" strokeWidth=".8"/>
          <circle cx="130" cy="30" r="35" fill="none" stroke="#4a2508" strokeWidth=".5"/>
          <line x1="130" y1="0" x2="130" y2="80" stroke="#4a2508" strokeWidth=".5"/>
          <line x1="100" y1="30" x2="160" y2="30" stroke="#4a2508" strokeWidth=".5"/>
        </svg>

        <div className="ah">
          <h2>Astrology Courses</h2>
          <div className="dl"><div className="dd"/></div>
          <div className="atag">Ancient Wisdom &nbsp;·&nbsp; Modern Learning &nbsp;·&nbsp; Meaningful Transformation</div>
          <p className="asub">Explore our carefully designed courses from beginner to advanced level by experienced astrologers.</p>
        </div>

        <div className="cg">
          {courses.map(({ id, level, title, desc, icon, price, original, SVG, isBold }) => (
            <div key={id} className="cc">
              <div className="ci" style={{position:"relative"}}>
                <SVG />
                <span className="badge-discount">Mega DISCOUNT</span>
                <div className="ico" style={isBold ? {fontSize:"13px",fontWeight:600} : {}}>
                  {icon}
                </div>
              </div>
              <div className="cb">
                <p className="clvl">{level}</p>
                <h3 className="ctitle">{title}</h3>
                <p className="cdesc">{desc}</p>
                <div className="price-hero">{price} <span>{original}</span></div>
                <div className="divr"/>
                <div className="cinstr">
                  <div className="iavt">MS</div>
                  <div>
                    <p className="iname">Acharya Meera Sharma</p>
                    <p className="iexp">20+ Years of Experience</p>
                  </div>
                </div>
                <div className="btnrow">
                  <button className="btn-read">Read More</button>
                  <button className="btn-buy">Buy Now →</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fb">
          {features.map((f, i) => (
            <div key={i} className="fi">
              <div className="fic">{f.icon}</div>
              <div className="ftt">{f.title}</div>
              <div className="fts">{f.sub}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};



function Home() {
  const trackRef = useRef(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    consultationType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Proper Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    
    if (!formData.name || formData.name.length < 3) {
      toast.error('Please enter a valid name (min 3 chars).');
      return;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!formData.consultationType) {
      toast.error('Please select a consultation type.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'Consultation', courseName: 'Professional Consultation' }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Consultation booked successfully!');
        setIsModalOpen(false);
        setFormData({ name: '', email: '', phone: '', consultationType: '', message: '' });
      } else {
        toast.error(data.error || data.message || 'Failed to book. Please try again.');
      }
    } catch (err) {
      toast.error('Connection Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenModal = (e) => {
    if (e) e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  // --- Unique 5-Slide Banner Carousel State & Data ---
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerSlides = [
    {
      badge: "Vedic Astrology & Spiritual Guidance",
      title1: "A Deeper Understanding of",
      title2: "Your Life Begins Here",
      desc: "Refined Vedic insights designed to guide your decisions",
      bgImage: "/images/bg-bannerpic.jpg",
      centerImg: "/images/middle-img.png",
      themeRust: true
    },
    {
      badge: "Master Vedic Astrology",
      title1: "Align Your Life With",
      title2: "The Stars & Planets",
      desc: "Discover the ancient wisdom of Vedic Astrology. Make confident decisions in your career, relationships, and spiritual journey.",
      bgImage: "/images/moon.jpg",
      centerImg: "/images/mentor-ava.png",
      themeRust: true
    },
    {
      badge: "Expert Tarot Reading",
      title1: "Unveil Hidden Truths",
      title2: "Through The Cards",
      desc: "Connect with divine energies. Our expert tarot readers provide intuitive guidance to help you navigate life's biggest challenges.",
      bgImage: "/images/premium_tarot.png",
      centerImg: "/images/homu.png",
      themeRust: true
    },
    {
      badge: "Daily Horoscopes & Panchang",
      title1: "Master Time,",
      title2: "Not Just Muhurat",
      desc: "A complete Panchang Jyotish mastery course to decode Muhurat and perfectly time your most important life events.",
      bgImage: "/images/bhok.png",
      centerImg: "/images/round.png"
    },
    {
      badge: "Personal Consultations",
      title1: "Experience True",
      title2: "Astrological Precision",
      desc: "Get personalized remedies, exact Muhurat timings, and complete life predictions from verified experts with 20+ years of experience.",
      bgImage: "/images/service_img2.png",
      centerImg: "/images/middle-img.png"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (window.AOS) {
      window.AOS.refresh();
    }
  }, []);

  const scrollTestimonials = (direction) => {
    if (trackRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 250 : 350;
      trackRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Banner Section */}
      <section className={`banner-section w-100 ${bannerSlides[currentSlide].themeRust ? 'theme-rust' : ''}`}>
        <div className="img-main-banner" key={`bg-${currentSlide}`}>
          <div className="banner-overlay"></div>
          <img alt="cosmic background" src={bannerSlides[currentSlide].bgImage} className="animate__animated animate__fadeIn" style={{ animationDuration: '2s' }} />
        </div>
        <div className="container">
          <div className="banner-text-home">
            <div className="row align-items-center g-5">
              <div className="col-lg-6 position-relative z-1" key={`text-${currentSlide}`}>
                {/* Floating Ethereal Elements */}
                <div className="ethereal-sparkle s-1">✦</div>
                <div className="ethereal-sparkle s-2">✧</div>
                
                <div className="cosmic-badge animate__animated animate__zoomIn" style={{ animationDelay: '0.1s' }}>
                  <span className="badge-glow"></span>
                  <i className="fas fa-moon me-2"></i> {bannerSlides[currentSlide].badge}
                </div>
                
                <h1 className="banner-title my-4 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.2s' }}>
                  {bannerSlides[currentSlide].title1}<br/>
                  <span className="text-gradient drop-glow">{bannerSlides[currentSlide].title2}</span>
                </h1>
                
                <p className="banner-desc mb-4 animate__animated animate__fadeInUp" style={{ animationDelay: '0.3s' }}>
                  {bannerSlides[currentSlide].desc}
                </p>

                {bannerSlides[currentSlide].themeRust ? null : (
                  <ul className="banner-feature-list" data-aos="fade-up" data-aos-delay="400">
                    <li><i className="fas fa-check-circle"></i> Precise Chart Analysis</li>
                    <li><i className="fas fa-check-circle"></i> Karma & Destiny Decoding</li>
                    <li><i className="fas fa-check-circle"></i> Personalized Remedies</li>
                  </ul>
                )}
                
                <div className="banner-btn-row mt-5 animate__animated animate__fadeInUp" style={{ animationDelay: '0.5s' }}>
                  <button onClick={handleOpenModal} className="btn mystic-btn-primary">
                    Book a Consultation {bannerSlides[currentSlide].themeRust ? null : <i className="fas fa-sparkles ms-2"></i>}
                  </button>
                  <button className="btn mystic-btn-ghost">
                    {bannerSlides[currentSlide].themeRust ? "Explore Your Reports" : "Explore Courses"}
                  </button>
                </div>

                <div className="carousel-dots mt-5 animate__animated animate__fadeInUp" style={{ animationDelay: '0.6s' }}>
                  {bannerSlides.map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`c-dot ${idx === currentSlide ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(idx)}
                    ></span>
                  ))}
                </div>

                <div className="trust-indicator mt-4 animate__animated animate__fadeInUp" style={{ animationDelay: '0.7s' }}>
                  <div className="trust-avatars">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="user" />
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="user" />
                    <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="user" />
                    <div className="avatar-plus">+10k</div>
                  </div>
                  <div className="trust-text">
                    <div className="stars">
                      <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                    </div>
                    <span>Trusted by seekers globally</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 d-none d-lg-flex justify-content-center position-relative">
                {bannerSlides[currentSlide].themeRust ? (
                  <div className="zodiac-hero-graphic animate__animated animate__fadeInRight" key="rust-graphic">
                    <svg className="rotating-zodiac-mandala" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>

                      {/* Outer Constellation Ring (Spins Slowly Left) */}
                      <g className="spin-slow-left" style={{ transformOrigin: '200px 200px' }}>
                        <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 6"/>
                        <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
                        <circle cx="200" cy="200" r="155" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
                        {[...Array(12)].map((_, i) => (
                          <g key={i} transform={`rotate(${i * 30} 200 200)`}>
                            <path d="M 200 12 L 215 35 L 190 50 L 205 60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
                            <circle cx="200" cy="12" r="2" fill="#fff" filter="url(#glow)"/>
                            <circle cx="215" cy="35" r="1" fill="#fff"/>
                            <circle cx="190" cy="50" r="2.5" fill="#fff" filter="url(#glow)"/>
                            <circle cx="205" cy="60" r="1.5" fill="#fff"/>
                            <line x1="200" y1="10" x2="200" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                          </g>
                        ))}
                      </g>

                      {/* Middle Zodiac Ring (Spins Right) */}
                      <g className="spin-right" style={{ transformOrigin: '200px 200px' }}>
                        <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                        <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                        {[...Array(12)].map((_, i) => (
                          <line key={i} x1="200" y1="60" x2="200" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="1" transform={`rotate(${i * 30} 200 200)`}/>
                        ))}
                        {['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'].map((sign, i) => (
                          <text key={i} x="200" y="88" fill="rgba(255,255,255,0.9)" fontSize="24" textAnchor="middle" transform={`rotate(${i * 30 + 15} 200 200)`} style={{ fontFamily: 'sans-serif' }} filter="url(#glow)">
                            {sign}
                          </text>
                        ))}
                      </g>

                      {/* Inner Astrolabe Geometry (Spins Fast Left) */}
                      <g className="spin-fast-left" style={{ transformOrigin: '200px 200px' }}>
                        <circle cx="200" cy="200" r="90" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 4"/>
                        <path d="M 200 110 L 263 263 L 110 165 L 290 165 L 137 263 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                        <path d="M 200 290 L 137 137 L 290 235 L 110 235 L 263 137 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                        <circle cx="200" cy="200" r="50" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5"/>
                        {[...Array(8)].map((_, i) => (
                           <circle key={`node-${i}`} cx="200" cy="150" r="3" fill="rgba(255,255,255,0.8)" transform={`rotate(${i * 45} 200 200)`} filter="url(#glow)" />
                        ))}
                      </g>
                      
                      {/* Center Static Sun/Moon/Focus Point */}
                      <circle cx="200" cy="200" r="14" fill="rgba(255,255,255,0.95)" filter="url(#glow)"/>
                      <circle cx="200" cy="200" r="30" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" strokeDasharray="3 3"/>
                    </svg>
                    {/* Image removed based on user request */}
                    
                    {currentSlide === 0 && (
                      <>
                        <div className="float-badge fb-1">
                          <div className="fb-icon"><i className="fas fa-award"></i></div>
                          <div className="fb-text"><span>53+ Years</span><br/>of Legacy</div>
                        </div>
                        <div className="float-badge fb-2">
                          <div className="fb-icon"><i className="fas fa-users"></i></div>
                          <div className="fb-text"><span>2 Lakhs +</span> Consultation<br/>Completed</div>
                        </div>
                        <div className="float-badge fb-3">
                          <div className="fb-icon"><i className="fas fa-thumbs-up"></i></div>
                          <div className="fb-text"><span>98% Positive</span><br/>Clients Feedback</div>
                        </div>
                      </>
                    )}
                    
                  </div>
                ) : (
                  <div className="cosmic-orbit-container animate__animated animate__fadeInRight" key="light-graphic">
                    <div className="big-circle">
                      <div className="icon-block"><img alt="planet" src="/images/as6.png" /></div>
                      <div className="icon-block"><img alt="stars" src="/images/as7.png" /></div>
                      <div className="icon-block"><img alt="moon" src="/images/as8.png" /></div>
                      <div className="icon-block"><img alt="sun" src="/images/as9.png" /></div>
                      <div className="icon-block"><img alt="zodiac" src="/images/as10.png" /></div>
                    </div>
                    <div className="small-circle">
                      <div className="icon-block"><img alt="app" src="/images/as1.png" /></div>
                      <div className="icon-block"><img alt="constellation" src="/images/as2.png" /></div>
                      <div className="icon-block"><img alt="galaxy" src="/images/as3.png" /></div>
                    </div>
                    <div className="center-logo">
                      <div className="glow-orb"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <main className="w-100 body-main">
        <section className="about-part-section w-100">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="img-box01 position-relative">
                  <figure className="moon-img" data-aos="fade-right" data-aos-once="true">
                    <img alt="moon" src="/images/moon.jpg" />
                  </figure>
                  <figure className="floating-element" data-aos="fade-left" data-aos-once="true" data-aos-delay="100">
                    <img alt="woman" src="/images/bg-bannerpic.jpg" />
                  </figure>
                  <figure className="bottom-img" data-aos="fade-up" data-aos-once="true" data-aos-delay="200">
                    <img alt="tarot" src="/images/premium_tarot.png" />
                  </figure>
                  <div className="experience-badge text-center" data-aos="zoom-in" data-aos-once="true" data-aos-delay="300">
                    <h4>16+</h4>
                    <span>Years Experience</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <h5 className="section-subtitle about-subtitle" data-aos="fade-up" data-aos-once="true">About Astro Ava</h5>
                <h2 className="section-title my-3" data-aos="fade-up" data-aos-once="true" data-aos-delay="100">
                  Unlock a Brilliant Future with Astrology
                </h2>
                <p className="section-desc mt-3" data-aos="fade-up" data-aos-once="true" data-aos-delay="200">
                  Discover Your True Potential with Expert Astrology Guidance!
                  Step into a life full of clarity, confidence, and success. Our professional astrology
                  consultants help you unlock the secrets of your future with accurate, personalized insights.
                </p>
                <a href="#" className="btn mystic-btn-outline mt-4" data-aos="fade-up" data-aos-once="true" data-aos-delay="300">Read More</a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        {/* Services Section */}
        <section className="services-section w-100">
          <div className="container">
            <div className="text-center mb-5">
              <h5 className="section-subtitle expertise-subtitle" data-aos="fade-up">⭐ Our Expertise ⭐</h5>
              <h2 className="section-title mt-2" data-aos="fade-up">Guiding You Through Life</h2>
              <p className="mx-auto mt-3" style={{maxWidth: '650px', fontSize: '1.2rem', fontWeight: '500', color: 'var(--text-content)'}} data-aos="fade-down">
                Our Astrologers Are Dedicated to Providing Clarity and Direction
              </p>
            </div>
            
            <div className="row g-4 align-items-center mt-4">
              <div className="col-md-6 col-lg-4">
                <div className="service-card" data-aos="fade-up" data-aos-delay="100">
                  <div className="service-card-header">
                    <div className="icon-wrapper"><img alt="horoscope" src="/images/3013143.png" /></div>
                    <h4 className="">Personal Horoscope</h4>
                  </div>
                  <p className="mt-3">Learn astrology from experienced and trusted mentors for life clarity.</p>
                </div>
                <div className="service-card mt-4" data-aos="fade-up" data-aos-delay="200">
                  <div className="service-card-header">
                    <div className="icon-wrapper"><img alt="marriage" src="/images/8596897.png" /></div>
                    <h4 className="">Relationships</h4>
                  </div>
                  <p className="mt-3">Gain practical knowledge with real-life case studies and guidance.</p>
                </div>
              </div>
              
              <div className="col-lg-4 d-none d-lg-block text-center" data-aos="zoom-in">
                <div className="service-center-img position-relative">
                  <div className="img-anim"><img alt="zodiac wheel" src="/images/service_img2.png" className="img-fluid" /></div>
                  <img alt="meditation" src="/images/sop.png" className="img-fluid center-overlay" />
                </div>
              </div>
              
              <div className="col-md-6 col-lg-4">
                <div className="service-card" data-aos="fade-up" data-aos-delay="300">
                  <div className="service-card-header">
                    <div className="icon-wrapper"><img alt="career" src="/images/867780.png" /></div>
                    <h4 className="">Career & Business</h4>
                  </div>
                  <p className="mt-3">Understand career and financial predictions deeply with experts.</p>
                </div>
                <div className="service-card mt-4" data-aos="fade-up" data-aos-delay="400">
                  <div className="service-card-header">
                    <div className="icon-wrapper"><img alt="muhurat" src="/images/9289285.png" /></div>
                    <h4 className="">Muhurat Timing</h4>
                  </div>
                  <p className="mt-3">Find the most auspicious time for your life's important endeavors.</p>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Video Testimonials - Professional Production Level */}
    {/* Video Testimonials */}
<section className="testimonial-section">
  <div className="container">
    <div className="section-header text-center mb-5">
      <span className="section-badge" data-aos="fade-up">
        Real Stories
      </span>
      {/* Heading with gradient color on "Clients Say" only */}
      <h2 className="section-title mt-3">
        What Our <span className="text-gradient">Clients Say</span>
      </h2>
      <p className="section-description mx-auto mt-3">
        Trusted by thousands of satisfied clients worldwide
      </p>
    </div>
    
    <div className="testimonial-slider-wrapper position-relative">
      <button className="nav-btn left-btn" onClick={() => scrollTestimonials('left')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <div className="testimonial-track" ref={trackRef}>
        {/* Testimonial Card 1 */}
        <div className="testimonial-card">
          <div className="card-inner">
            <div className="quote-icon">“</div>
            <div className="video-container">
              <video src="/videohomefinal.mp4" poster="/images/bg-bannerpic.jpg" preload="auto" muted loop playsInline></video>
              <div className="play-btn-overlay">
                <div className="play-circle">
                  <i className="fas fa-play"></i>
                </div>
              </div>
            </div>
            <div className="testimonial-content">
              <p className="testimonial-text">
                "The astrological guidance I received completely transformed my perspective. Highly recommended!"
              </p>
              <div className="client-info">
                <div className="client-avatar">
                  <img src="/images/avatar1.jpg" alt="client" onError={(e) => e.target.src = 'https://randomuser.me/api/portraits/women/1.jpg'} />
                </div>
                <div className="client-details">
                  <h4>Priya Sharma</h4>
                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
        {/* Testimonial Card 3 */}
        <div className="testimonial-card">
          <div className="card-inner">
            <div className="quote-icon">“</div>
            <div className="video-container">
              <video src="/videohomefinal.mp4" poster="/images/bg-bannerpic.jpg" preload="auto" muted loop playsInline></video>
              <div className="play-btn-overlay">
                <div className="play-circle">
                  <i className="fas fa-play"></i>
                </div>
              </div>
            </div>
            <div className="testimonial-content">
              <p className="testimonial-text">
                "The career guidance helped me make the right decisions. I'm now in a much better place professionally."
              </p>
              <div className="client-info">
                <div className="client-avatar">
                  <img src="/images/avatar3.jpg" alt="client" onError={(e) => e.target.src = 'https://randomuser.me/api/portraits/women/3.jpg'} />
                </div>
                <div className="client-details">
                  <h4>Anjali Patel</h4>
                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial Card 4 */}
        <div className="testimonial-card">
          <div className="card-inner">
            <div className="quote-icon">“</div>
            <div className="video-container">
              <video src="/videohomefinal.mp4" poster="/images/bg-bannerpic.jpg" preload="auto" muted loop playsInline></video>
              <div className="play-btn-overlay">
                <div className="play-circle">
                  <i className="fas fa-play"></i>
                </div>
              </div>
            </div>
            <div className="testimonial-content">
              <p className="testimonial-text">
                "Amazing experience! The remedies suggested were simple yet effective. Feeling blessed."
              </p>
              <div className="client-info">
                <div className="client-avatar">
                  <img src="/images/avatar4.jpg" alt="client" onError={(e) => e.target.src = 'https://randomuser.me/api/portraits/men/4.jpg'} />
                </div>
                <div className="client-details">
                  <h4>Vikram Singh</h4>
                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial Card 5 */}
        <div className="testimonial-card">
          <div className="card-inner">
            <div className="quote-icon">“</div>
            <div className="video-container">
              <video src="/videohomefinal.mp4" poster="/images/bg-bannerpic.jpg" preload="auto" muted loop playsInline></video>
              <div className="play-btn-overlay">
                <div className="play-circle">
                  <i className="fas fa-play"></i>
                </div>
              </div>
            </div>
            <div className="testimonial-content">
              <p className="testimonial-text">
                "The relationship compatibility analysis was spot on! Truly grateful for this service."
              </p>
              <div className="client-info">
                <div className="client-avatar">
                  <img src="/images/avatar5.jpg" alt="client" onError={(e) => e.target.src = 'https://randomuser.me/api/portraits/women/5.jpg'} />
                </div>
                <div className="client-details">
                  <h4>Neha Gupta</h4>
                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button className="nav-btn right-btn" onClick={() => scrollTestimonials('right')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
    
    {/* Navigation Dots */}
    <div className="slider-dots">
      <span className="dot active"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  </div>
</section>



        {/* Astrology Courses Section */}
        <AstrologyCourses />
      </main>

      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <style jsx>{`
        body {
          background-color: var(--bg-color);
          color: var(--text-content);
          font-family: var(--font-sans);
        }
        
        .section-title {
          font-family: var(--font-serif) !important;
          font-size: clamp(42px, 5vw, 48px) !important;
          font-weight: 700 !important;
          color: var(--text-heading) !important;
          line-height: 1.2;
        }

        .section-subtitle {
          font-family: var(--font-sans) !important;
          font-size: 18px !important;
          font-weight: 500 !important;
          color: var(--text-muted) !important;
          text-transform: none !important;
          letter-spacing: 0.5px !important;
          font-style: normal !important;
          margin-bottom: 15px;
          display: block;
        }

        .expertise-subtitle {
          color: var(--primary-color) !important;
          font-size: clamp(1.4rem, 4vw, 2rem) !important;
          font-weight: 700 !important;
          letter-spacing: 2px !important;
          text-transform: uppercase !important;
          font-family: var(--font-sans) !important;
        }

        .section-desc {
          color: var(--text-content) !important;
          font-size: 1.1rem;
          line-height: 1.7;
          font-weight: 400;
          font-family: var(--font-sans);
        }

        .text-gradient {
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .mystic-btn-primary {
          background: #2A0F02;
          color: #fff !important;
          border: none;
          border-radius: 12px;
          padding: 16px 40px;
          font-weight: 700;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          text-transform: none;
          font-size: 1rem;
          font-family: var(--font-sans);
        }

        .mystic-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          background-color: #000000;
          color: #fff !important;
        }

        .mystic-btn-outline {
          background: #FFFFFF;
          color: #000000;
          border: 1.5px solid #000000;
          border-radius: 12px;
          padding: 12px 35px;
          font-weight: 700;
          font-size: 1.1rem;
          transition: 0.3s;
          box-shadow: var(--premium-shadow);
          display: inline-block;
          font-family: var(--font-sans);
        }

        .mystic-btn-outline:hover {
          background: #000000;
          color: #FFFFFF;
          transform: translateY(-3px);
          color: var(--primary-color);
        }

        /* Banner Section */
        .banner-section {
          position: relative;
          padding: 20px 0 120px;
          min-height: 95vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: radial-gradient(circle at center, #FFFDF8 0%, #FFF2E1 100%);
        }

        .banner-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-conic-gradient(from 0deg, transparent 0deg 10deg, rgba(200, 131, 42, 0.03) 10deg 20deg);
          z-index: 0;
        }

        .img-main-banner {
          display: none;
        }

        .banner-title {
          font-family: var(--font-serif) !important;
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 700;
          line-height: 1.1;
          color: #3A1900;
        }

        .banner-title .text-gradient {
          background: linear-gradient(135deg, #B36B22, #D4903D);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .banner-desc {
          font-size: 1.2rem;
          color: #5C3D26 !important;
          line-height: 1.7;
          max-width: 90%;
          font-weight: 500;
          font-family: var(--font-sans);
        }

        .carousel-dots {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .c-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(139, 74, 30, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .c-dot.active {
          background: #5C2D12;
          transform: scale(1.3);
          box-shadow: 0 0 10px rgba(92, 45, 18, 0.3);
        }

        .c-dot:hover {
          background: rgba(139, 74, 30, 0.5);
        }

        .cosmic-badge {
          display: inline-flex;
          align-items: center;
          background: transparent;
          border: 1px solid #C78235;
          padding: 8px 20px;
          border-radius: 50px;
          color: #8B4A1E;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .badge-glow {
          position: absolute;
          top: -50%; left: -100%;
          width: 50%; height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);
          transform: rotate(30deg);
          animation: badgeShine 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes badgeShine { 
          0%, 20% { left: -100%; } 
          80%, 100% { left: 200%; } 
        }

        .drop-glow {
          filter: drop-shadow(0 0 15px rgba(200, 131, 42, 0.3));
          animation: textPulse 4s ease-in-out infinite alternate;
        }

        @keyframes textPulse {
          0% { filter: drop-shadow(0 0 10px rgba(200, 131, 42, 0.2)); }
          100% { filter: drop-shadow(0 0 25px rgba(200, 131, 42, 0.6)); }
        }

        .ethereal-sparkle {
          position: absolute;
          color: var(--accent-color);
          font-size: 24px;
          opacity: 0.5;
          animation: mysticTwinkle 5s ease-in-out infinite;
        }
        .s-1 { top: -20px; left: 10%; }
        .s-2 { bottom: 20%; right: -5%; font-size: 32px; animation-delay: 1.5s; }

        @keyframes mysticTwinkle { 
          0%, 100% { opacity: 0.1; transform: scale(0.6) rotate(0deg); } 
          50% { opacity: 0.9; transform: scale(1.3) rotate(45deg); filter: drop-shadow(0 0 10px var(--accent-color)); } 
        }

        .banner-feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .banner-feature-list li {
          font-size: 1.1rem;
          color: #3A1900;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
        }

        .banner-feature-list i {
          color: #C78235;
          font-size: 1.2rem;
        }

        .banner-btn-row {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .banner-btn-row .mystic-btn-primary {
          background: #8B4A1E;
          color: #ffffff !important;
          border: none;
          box-shadow: 0 8px 20px rgba(139, 74, 30, 0.3);
        }

        .mystic-btn-ghost {
          background: transparent;
          color: #3A1900;
          font-weight: 700;
          padding: 12px 25px;
          border: none;
          border-radius: 12px;
          transition: 0.3s;
          font-family: var(--font-sans);
        }
        .mystic-btn-ghost:hover {
          background: rgba(139, 74, 30, 0.08);
          color: #8B4A1E;
        }

        .trust-indicator {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .trust-avatars {
          display: flex;
          align-items: center;
        }

        .trust-avatars img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #fff;
          margin-left: -12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .trust-avatars img:first-child { margin-left: 0; }

        .avatar-plus {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-color);
          border: 2px solid var(--accent-color);
          margin-left: -12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary-color);
          z-index: 1;
        }

        .trust-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .trust-text .stars i {
          color: #F59E0B;
          font-size: 0.8rem;
        }

        .trust-text span {
          font-size: 0.85rem;
          color: #8C6A4F;
          font-weight: 600;
        }

        /* Cosmic Orbit */
        .cosmic-orbit-container {
          position: relative;
          width: 500px;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .big-circle {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          border: 1px dashed #A67C52;
          animation: spinRight 40s linear infinite;
        }

        .small-circle {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          border: 1px dashed #A67C52;
          opacity: 0.8;
          animation: spinLeft 25s linear infinite;
        }

        .icon-block {
          position: absolute;
          width: 65px;
          height: 65px;
          background: #5C2D12;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(92, 45, 18, 0.4);
          transition: all 0.4s;
        }

        .icon-block img {
          width: 50%;
          filter: brightness(0) invert(1);
          opacity: 0.9;
        }

        .icon-block:hover {
          transform: scale(1.2) rotate(10deg);
          box-shadow: 0 15px 30px rgba(92, 45, 18, 0.6);
        }

        .icon-block:hover img {
          opacity: 1;
        }

        .center-logo {
          position: absolute;
          z-index: 10;
          width: 180px;
          height: 180px;
        }

        .center-logo img {
          width: 100%;
          filter: brightness(0) sepia(1) hue-rotate(-30deg) saturate(2) opacity(0.12);
          animation: etherealFloat 6s ease-in-out infinite;
        }

        .glow-orb {
          display: none;
        }

        /* Theme Rust Specifics */
        .banner-section.theme-rust {
          background: #975427 !important;
        }
        .banner-section.theme-rust::before { display: none; }
        .banner-section.theme-rust .banner-title,
        .banner-section.theme-rust .banner-desc,
        .banner-section.theme-rust .banner-feature-list li {
          color: #ffffff !important;
        }
        .banner-section.theme-rust .banner-title .text-gradient {
          background: none;
          -webkit-text-fill-color: #ffffff;
          color: #ffffff;
        }
        .banner-section.theme-rust .cosmic-badge {
          border-color: rgba(255,255,255,0.3);
          color: #ffffff;
          background: rgba(255,255,255,0.1);
        }
        .banner-section.theme-rust .banner-btn-row .mystic-btn-primary {
          background: linear-gradient(135deg, #F9C369, #D98925) !important;
          color: #000000 !important;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .banner-section.theme-rust .mystic-btn-ghost {
          color: #ffffff !important;
          border: 1px solid rgba(255,255,255,0.5) !important;
          background: transparent !important;
        }
        .banner-section.theme-rust .mystic-btn-ghost:hover {
          background: rgba(255,255,255,0.1) !important;
        }
        .banner-section.theme-rust .c-dot {
          background: rgba(255,255,255,0.3);
        }
        .banner-section.theme-rust .c-dot.active {
          background: #ffffff;
          box-shadow: 0 0 10px rgba(255,255,255,0.5);
        }

        /* Zodiac Hero Graphic */
        .zodiac-hero-graphic {
          position: relative;
          width: 500px;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rotating-zodiac-mandala {
          position: absolute;
          width: 75%;
          height: 75%;
          opacity: 0.9;
          right: 5%;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .spin-slow-left {
          animation: spinLeft 100s linear infinite;
        }
        .spin-right {
          animation: spinRight 60s linear infinite;
        }
        .spin-fast-left {
          animation: spinLeft 30s linear infinite;
        }
        
        .hero-expert-portrait {
          position: relative;
          z-index: 5;
          width: 105%;
          object-fit: contain;
          filter: drop-shadow(0 20px 30px rgba(0,0,0,0.3));
          transform: translateY(20px);
        }

        .float-badge {
          position: absolute;
          background: rgba(255, 250, 240, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid #E2D1B8;
          padding: 8px 15px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          z-index: 10;
          color: #3A1900;
        }
        .float-badge.fb-1 { bottom: 15%; left: -10%; animation: floatBadge 4s ease-in-out infinite alternate; }
        .float-badge.fb-2 { top: 30%; right: -25%; animation: floatBadge 5s ease-in-out infinite alternate-reverse; }
        .float-badge.fb-3 { bottom: 5%; right: -15%; animation: floatBadge 4.5s ease-in-out infinite alternate; }
        
        .fb-icon i {
          font-size: 1.5rem;
          color: #C78235;
        }
        .fb-text {
          font-size: 0.8rem;
          line-height: 1.2;
          font-weight: 600;
        }
        .fb-text span {
          font-size: 1rem;
          font-weight: 800;
        }
        @keyframes floatBadge {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }

        @keyframes spinRight { 100% { transform: rotate(360deg); } }
        @keyframes spinLeft { 100% { transform: rotate(-360deg); } }
        
        @keyframes etherealFloat { 
          0%, 100% { transform: translateY(0) rotate(0deg); } 
          50% { transform: translateY(-18px) rotate(2deg); filter: drop-shadow(0 30px 50px rgba(139, 74, 30, 0.3)); } 
        }

        @keyframes orbPulse {
          0% { opacity: 0.15; transform: scale(0.9); }
          100% { opacity: 0.4; transform: scale(1.1); filter: blur(40px); }
        }

        /* About Section Staggered Layout */
        .section-subtitle.about-subtitle {
          color: var(--primary-color) !important;
          font-weight: 700;
          font-family: var(--font-sans);
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 10px;
          display: block;
        }

        .img-box01 {
          position: relative;
          height: 550px;
          width: 100%;
        }

        .moon-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 85%;
          height: 220px;
          border-radius: 40px;
          border: 12px solid var(--bg-color);
          box-shadow: var(--premium-shadow);
          overflow: hidden;
          z-index: 1;
          margin: 0;
        }

        .moon-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .floating-element {
          position: absolute;
          top: 120px;
          right: 0;
          width: 60%;
          height: 350px;
          z-index: 2;
          margin: 0;
        }

        .floating-element img {
          width: 100%;
          height: 100%;
          border-radius: 30px;
          object-fit: cover;
          box-shadow: var(--premium-shadow);
          transform: perspective(1000px) rotateY(-5deg);
        }

        .bottom-img {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 55%;
          height: 280px;
          z-index: 3;
          margin: 0;
        }

        .bottom-img img {
          width: 100%;
          height: 100%;
          border-radius: 20px;
          object-fit: cover;
          box-shadow: var(--premium-shadow);
          transform: perspective(1000px) rotateY(5deg);
        }

        .experience-badge {
          background: #2A0F02;
          padding: 20px 30px;
          border-radius: 30px;
          border: 1px solid var(--accent-color);
          box-shadow: 0 15px 35px rgba(200, 131, 42, 0.2);
          position: absolute;
          bottom: -20px;
          right: 20px;
          z-index: 10;
        }

        .experience-badge h4 { 
          font-size: 2.8rem; 
          font-weight: 700; 
          color: var(--accent-color);
          margin: 0; 
          font-family: var(--font-serif);
        }
        .experience-badge span { 
          font-size: 0.9rem; 
          font-weight: 600; 
          text-transform: uppercase; 
          letter-spacing: 1px; 
          color: #FDF6EE; 
          font-family: var(--font-sans);
        }

        /* Services */
        .services-section {
          padding: 120px 0;
          background: var(--bg-color);
        }

        .service-card {
          background: var(--card-color);
          padding: 25px 20px;
          border-radius: 20px;
          border: 1px solid var(--glass-border);
          box-shadow: 0 8px 25px rgba(139, 74, 30, 0.05);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: auto;
          min-height: 140px;
          margin-bottom: 10px;
          position: relative;
          overflow: hidden;
        }

        .service-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 0;
          background: linear-gradient(to bottom, var(--accent-color), var(--primary-color));
          transition: 0.4s ease;
        }

        .service-card:hover::after {
          height: 100%;
        }

        .service-card:hover {
          transform: translateY(-8px);
          border-color: var(--accent-color);
          box-shadow: 0 20px 40px rgba(200, 131, 42, 0.15);
        }

        .service-card-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 10px;
        }

        .icon-wrapper {
          width: 55px;
          height: 55px;
          background: linear-gradient(135deg, rgba(200, 131, 42, 0.15), rgba(139, 74, 30, 0.05));
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid var(--glass-border);
          transition: 0.4s ease;
        }

        .service-card:hover .icon-wrapper {
          background: var(--primary-color);
          border-color: var(--primary-color);
        }

        .icon-wrapper img {
          width: 35px;
          height: 35px;
          object-fit: contain;
          filter: brightness(0) saturate(100%) invert(18%) sepia(13%) saturate(2258%) hue-rotate(318deg) brightness(91%) contrast(93%);
          transition: 0.4s;
        }

        .service-card:hover .icon-wrapper img {
          filter: brightness(0) invert(1) !important;
        }

        .service-card h4 {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--text-card-heading);
          margin: 0;
        }

        .service-card p {
          font-size: 1rem;
          font-weight: 400;
          color: var(--text-content);
          line-height: 1.6;
          margin-bottom: 0;
          font-family: var(--font-sans);
        }

        /* Testimonials Section */
        .testimonial-section {
          padding: 100px 0;
          background: #FFFFFF;
          overflow: hidden;
          border-top: 1px solid var(--glass-border);
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 25px;
          background: rgba(139, 74, 30, 0.08);
          border-radius: 50px;
          color: var(--primary-color);
          font-weight: 600;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-family: var(--font-sans);
        }

        .section-description {
          max-width: 500px;
          font-size: 1.1rem;
          color: var(--text-muted);
          font-family: var(--font-sans);
        }

        .testimonial-slider-wrapper {
          position: relative;
          padding: 20px 0;
          max-width: 1400px;
          margin: 0 auto;
        }

        .testimonial-track {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scrollbar-width: none;
          padding: 10px 40px;
        }

        .testimonial-card {
          flex: 0 0 320px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .card-inner {
          background: var(--card-color);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(139, 74, 30, 0.08);
          border: 1px solid var(--glass-border);
          position: relative;
          transition: 0.4s ease;
        }

        .testimonial-card:hover .card-inner {
          box-shadow: 0 25px 45px rgba(200, 131, 42, 0.15);
          border-color: var(--accent-color);
          transform: translateY(-5px);
        }

        .quote-icon {
          position: absolute;
          top: 15px;
          right: 20px;
          font-size: 4rem;
          font-family: var(--font-serif);
          color: rgba(139, 74, 30, 0.05);
          line-height: 1;
          z-index: 1;
        }

        .video-container {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
          cursor: pointer;
        }

        .video-container video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .play-btn-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .video-container:hover .play-btn-overlay {
          opacity: 1;
        }

        .play-circle {
          width: 50px;
          height: 50px;
          background: #FFFFFF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .play-circle i {
          color: var(--primary-color);
          font-size: 1.2rem;
        }

        .play-circle:hover {
          transform: scale(1.1);
          background: var(--primary-color);
        }

        .play-circle:hover i {
          color: #FFFFFF;
        }

        .testimonial-content {
          padding: 20px;
        }

        .testimonial-text {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-content);
          margin-bottom: 20px;
          font-style: italic;
          min-height: 80px;
          font-weight: 400;
          font-family: var(--font-sans);
        }

        .client-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--glass-border);
        }

        .client-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--accent-color);
        }

        .client-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .client-details h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-card-heading);
          margin-bottom: 4px;
          font-family: var(--font-serif);
        }

        .rating {
          display: flex;
          gap: 3px;
        }

        .rating i {
          font-size: 0.7rem;
          color: var(--accent-color);
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid var(--glass-border);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .nav-btn:hover {
          background: var(--primary-color);
          border-color: var(--primary-color);
          transform: translateY(-50%) scale(1.1);
        }

        .nav-btn:hover svg {
          stroke: #FFFFFF;
        }

        .nav-btn svg {
          stroke: var(--primary-color);
        }

        .slider-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 40px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(139, 74, 30, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          width: 25px;
          border-radius: 10px;
          background: var(--primary-color);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1200px) {
          .banner-title { font-size: 3.5rem; }
          .cosmic-orbit-container { width: 400px; height: 400px; }
          .big-circle { width: 380px; height: 380px; }
          .small-circle { width: 250px; height: 250px; }
        }

        @media (max-width: 991px) {
          .banner-section { text-align: center; padding: 120px 0 80px; }
          .banner-desc { margin: 0 auto 30px; }
          .img-box01 { margin-bottom: 80px; }
          .experience-badge { left: 50%; transform: translateX(-50%); bottom: -30px; }
          .cosmic-orbit-container { width: 350px; height: 350px; margin: 40px auto 0; }
          .big-circle { width: 320px; height: 320px; }
          .small-circle { width: 220px; height: 220px; }
          .icon-block { width: 45px; height: 45px; }
          .section-title { font-size: 2.8rem; }
        }

        @media (max-width: 767px) {
          .banner-section { padding-top: 100px; }
          .banner-title { font-size: 2.5rem; }
          .banner-desc { font-size: 1.1rem; }
          .about-part-section, .services-section, .testimonial-section { padding: 80px 0; }
          .section-title { font-size: 2.2rem; }
          .testimonial-card { flex: 0 0 280px; }
          .video-container { height: 160px; }
          .testimonial-text { font-size: 1.15rem; min-height: 80px; }
          .section-badge { font-size: 1rem; padding: 8px 20px; }
          .section-description { font-size: 1.1rem !important; max-width: 100%; }
          .nav-btn { width: 32px; height: 32px; }
          .left-btn { left: -10px; }
          .right-btn { right: -10px; }
          .cosmic-orbit-container { width: 280px; height: 280px; }
          .big-circle { width: 260px; height: 260px; }
          .small-circle { width: 180px; height: 180px; }
          .icon-block { width: 40px; height: 40px; }
          .experience-badge { padding: 20px 25px; border-radius: 18px; }
          .experience-badge h4 { font-size: 2rem; }
        }

        @media (max-width: 576px) {
          .banner-title { font-size: 2.2rem; }
          .testimonial-card { flex: 0 0 260px; }
          .video-container { height: 140px; }
          .testimonial-content { padding: 16px; }
          .client-avatar { width: 38px; height: 38px; }
          .client-details h4 { font-size: 1.1rem; }
          .rating i { font-size: 0.9rem; }
          .cosmic-orbit-container { width: 240px; height: 240px; }
          .big-circle { width: 220px; height: 220px; }
          .small-circle { width: 150px; height: 150px; }
          .icon-block { width: 35px; height: 35px; }
          .action-btns { flex-direction: column; width: 100%; max-width: 300px; margin: 0 auto; }
          .mystic-btn-primary { width: 100%; text-align: center; }
          .mystic-btn-outline { 
            width: auto !important; 
            padding: 10px 25px !important; 
            font-size: 0.95rem !important;
            margin: 0 auto;
            display: inline-block;
          }
          .experience-badge { width: 160px; padding: 15px; }
          .experience-badge h4 { font-size: 1.8rem; }
        }
      `}</style>
    </>
  );
}

export default Home;