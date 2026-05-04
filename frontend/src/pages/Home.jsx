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
          <stop offset="0%" stopColor="#7a4020"/>
          <stop offset="100%" stopColor="#2e1008"/>
        </radialGradient>
        <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4915a" stopOpacity=".4"/>
          <stop offset="100%" stopColor="#2e1008" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="300" height="160" fill="url(#bg1)"/>
      <ellipse cx="150" cy="80" rx="90" ry="70" fill="url(#glow1)"/>
      <rect x="80" y="65" width="140" height="70" rx="3" fill="#c8884a" opacity=".9"/>
      <rect x="147" y="62" width="6" height="76" rx="2" fill="#8b4a1a"/>
      <rect x="83" y="68" width="62" height="64" rx="2" fill="#f5ddb8"/>
      <rect x="155" y="68" width="62" height="64" rx="2" fill="#f0d4a8"/>
      <line x1="90" y1="80" x2="138" y2="80" stroke="#c8a070" strokeWidth=".8"/>
      <line x1="90" y1="87" x2="138" y2="87" stroke="#c8a070" strokeWidth=".8"/>
      <line x1="90" y1="94" x2="138" y2="94" stroke="#c8a070" strokeWidth=".8"/>
      <line x1="90" y1="101" x2="138" y2="101" stroke="#c8a070" strokeWidth=".8"/>
      <line x1="90" y1="108" x2="138" y2="108" stroke="#c8a070" strokeWidth=".8"/>
      <line x1="90" y1="115" x2="138" y2="115" stroke="#c8a070" strokeWidth=".8"/>
      <circle cx="186" cy="100" r="22" fill="none" stroke="#9a6030" strokeWidth="1"/>
      <circle cx="186" cy="100" r="15" fill="none" stroke="#9a6030" strokeWidth=".7"/>
      <circle cx="186" cy="100" r="6" fill="#9a6030" opacity=".5"/>
      <line x1="186" y1="78" x2="186" y2="122" stroke="#9a6030" strokeWidth=".6"/>
      <line x1="164" y1="100" x2="208" y2="100" stroke="#9a6030" strokeWidth=".6"/>
      <line x1="170" y1="84" x2="202" y2="116" stroke="#9a6030" strokeWidth=".5"/>
      <line x1="202" y1="84" x2="170" y2="116" stroke="#9a6030" strokeWidth=".5"/>
      <text x="186" y="76" textAnchor="middle" fill="#c8903a" fontSize="6">♈</text>
      <text x="208" y="104" textAnchor="middle" fill="#c8903a" fontSize="6">♉</text>
      <text x="186" y="126" textAnchor="middle" fill="#c8903a" fontSize="6">♊</text>
      <text x="163" y="104" textAnchor="middle" fill="#c8903a" fontSize="6">♋</text>
      <path d="M83,68 Q150,58 217,68" fill="none" stroke="#a06030" strokeWidth="1" opacity=".6"/>
      <circle cx="50" cy="25" r="1.2" fill="#e8c080" opacity=".8"/>
      <circle cx="260" cy="40" r="1" fill="#e8c080" opacity=".7"/>
      <circle cx="30" cy="120" r=".8" fill="#e8c080" opacity=".6"/>
      <circle cx="275" cy="130" r="1.2" fill="#e8c080" opacity=".8"/>
      <circle cx="240" cy="20" r=".8" fill="#e8c080" opacity=".5"/>
      <circle cx="70" cy="140" r="1" fill="#e8c080" opacity=".6"/>
    </svg>
  );

  const Card2SVG = () => (
    <svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{width:"100%",height:"100%",display:"block"}}>
      <defs>
        <radialGradient id="bg2" cx="40%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#b09060"/>
          <stop offset="100%" stopColor="#5a3a10"/>
        </radialGradient>
        <radialGradient id="glow2" cx="55%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#f0d890" stopOpacity=".3"/>
          <stop offset="100%" stopColor="#5a3a10" stopOpacity="0"/>
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
          <stop offset="0%" stopColor="#1a1228"/>
          <stop offset="100%" stopColor="#0a0814"/>
        </radialGradient>
        <radialGradient id="jupGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c87830"/>
          <stop offset="60%" stopColor="#a05820"/>
          <stop offset="100%" stopColor="#6a3010"/>
        </radialGradient>
        <radialGradient id="jupAtm" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#e8a850" stopOpacity=".5"/>
          <stop offset="100%" stopColor="#c87830" stopOpacity="0"/>
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
          <stop offset="0%" stopColor="#8a6030"/>
          <stop offset="100%" stopColor="#3a2010"/>
        </radialGradient>
        <radialGradient id="cmpGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4a850" stopOpacity=".4"/>
          <stop offset="100%" stopColor="#8a6030" stopOpacity="0"/>
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Cinzel:wght@400;600&family=Jost:wght@300;400;500&display=swap');
        .aw { background: #f5ebe0; padding: 3rem 2rem; font-family: 'Jost', sans-serif; position: relative; overflow: hidden; }
        .aw::before { content: '✦'; position: absolute; top: 20px; left: 30px; font-size: 60px; opacity: .06; color: #4a2518; pointer-events: none; }
        .aw::after { content: '☽'; position: absolute; bottom: 30px; right: 40px; font-size: 80px; opacity: .06; color: #4a2518; pointer-events: none; }
        .ah { text-align: center; margin-bottom: 2.5rem; }
        .ah h2 { font-family: 'Cinzel', serif; font-size: clamp(1.8rem,5vw,2.8rem); color: #2d1506; letter-spacing: .02em; margin: 0 0 .4rem; font-weight: 600; }
        .atag { font-size: .72rem; letter-spacing: .15em; color: #7a4a2a; text-transform: uppercase; margin-bottom: .6rem; display: flex; align-items: center; gap: 10px; justify-content: center; }
        .atag::before, .atag::after { content: '—'; opacity: .4; }
        .asub { color: #6b4a32; font-size: .9rem; max-width: 460px; margin: 0 auto; line-height: 1.7; }
        .dl { display: flex; align-items: center; gap: 10px; justify-content: center; margin: .4rem 0 .8rem; }
        .dl::before, .dl::after { content: ''; flex: 1; max-width: 70px; height: .5px; background: #9a6040; }
        .dd { width: 5px; height: 5px; background: #9a6040; border-radius: 50%; }
        .cg { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1.2rem; margin-bottom: 2rem; }
        .cc { background: #fffaf5; border-radius: 18px; overflow: hidden; border: .5px solid #d4b896; display: flex; flex-direction: column; transition: transform .25s ease; cursor: pointer; }
        .cc:hover { transform: translateY(-5px); }
        .ci { width: 100%; height: 160px; display: block; position: relative; overflow: hidden; }
        .ci svg { width: 100%; height: 100%; display: block; }
        .badge-discount { position: absolute; top: 10px; left: 10px; background: #c8451a; color: #fff5ee; font-size: .6rem; letter-spacing: .1em; text-transform: uppercase; padding: 3px 9px; border-radius: 20px; font-family: 'Jost', sans-serif; font-weight: 500; z-index: 3; }
        .ico { position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 42px; height: 42px; background: #fffaf5; border: 2px solid #d4b896; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 17px; color: #5c3317; z-index: 2; font-family: 'Cinzel', serif; }
        .cb { padding: 1.8rem 1.1rem 1.1rem; text-align: center; flex: 1; display: flex; flex-direction: column; }
        .clvl { font-size: .62rem; letter-spacing: .18em; color: #9a6040; text-transform: uppercase; margin-bottom: .3rem; font-family: 'Jost', sans-serif; }
        .ctitle { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; color: #2d1506; margin: 0 0 .2rem; font-weight: 600; line-height: 1.3; }
        .cdesc { font-size: .8rem; color: #6b4a32; line-height: 1.55; flex: 1; margin-bottom: .8rem; }
        .price-hero { font-family: 'Cinzel', serif; font-size: 1.4rem; color: #2d1506; font-weight: 600; margin: .2rem 0 .6rem; }
        .price-hero span { font-size: .85rem; color: #9a6040; text-decoration: line-through; font-family: 'Jost', sans-serif; font-weight: 400; margin-left: 6px; }
        .divr { height: .5px; background: #e8d5c0; margin: .5rem 0 .75rem; }
        .cinstr { display: flex; align-items: center; gap: 8px; margin-bottom: .85rem; justify-content: center; }
        .iavt { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #c8906a, #8b5232); border: 2px solid #d4b896; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #fff; font-family: 'Cinzel', serif; flex-shrink: 0; }
        .iname { font-size: .75rem; color: #2d1506; font-weight: 500; font-family: 'Jost', sans-serif; margin: 0; text-align: left; }
        .iexp { font-size: .68rem; color: #9a6040; margin: 0; font-family: 'Jost', sans-serif; text-align: left; }
        .btnrow { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
        .btn-read { background: transparent; color: #4a2518; border: 1.5px solid #c4a060; border-radius: 8px; padding: .55rem .5rem; font-size: .78rem; font-family: 'Jost', sans-serif; cursor: pointer; transition: background .2s; }
        .btn-read:hover { background: #f0dfc8; }
        .btn-buy { background: #4a2518; color: #f5ebe0; border: none; border-radius: 8px; padding: .55rem .5rem; font-size: .78rem; font-family: 'Jost', sans-serif; cursor: pointer; transition: background .2s; }
        .btn-buy:hover { background: #6b3520; }
        .fb { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: .9rem; border-top: .5px solid #d4b896; padding-top: 1.4rem; }
        .fi { display: flex; flex-direction: column; align-items: center; gap: 5px; text-align: center; }
        .fic { width: 38px; height: 38px; border-radius: 50%; background: rgba(74,37,24,.08); display: flex; align-items: center; justify-content: center; font-size: 15px; }
        .ftt { font-size: .75rem; font-weight: 500; color: #2d1506; font-family: 'Jost', sans-serif; }
        .fts { font-size: .68rem; color: #9a6040; font-family: 'Jost', sans-serif; }
        .svgd { position: absolute; opacity: .07; pointer-events: none; }

        @media (max-width: 480px) {
          .aw { padding: 3rem 1.8rem; }
          .ah h2 { font-size: 2rem; margin-bottom: 0.8rem; }
          .asub { font-size: 0.95rem; line-height: 1.5; }
          .cg { gap: 1.8rem; }
          .cc { border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #eee5d8; max-width: 310px; margin: 0 auto; }
          .cb { padding: 1.6rem 1.25rem 1.25rem; text-align: left; }
          .clvl { font-size: 0.7rem; margin-bottom: 0.4rem; justify-content: flex-start; }
          .ctitle { font-size: 1.4rem; margin-bottom: 0.6rem; text-align: left; }
          .cdesc { font-size: 0.92rem; line-height: 1.5; margin-bottom: 1.2rem; text-align: left; }
          .price-hero { font-size: 1.6rem; margin: 0.2rem 0 1.2rem; text-align: left; }
          .price-hero span { font-size: 0.9rem; }
          .btnrow { grid-template-columns: 1fr 1fr; gap: 8px; width: 100%; }
          .btn-read, .btn-buy { padding: 0.8rem 0.5rem; font-size: 0.88rem; font-weight: 600; width: 100%; }
          .cinstr { justify-content: flex-start; margin-bottom: 1.2rem; }
          .iavt { width: 40px; height: 40px; font-size: 12px; }
          .iname { font-size: 0.95rem; }
          .iexp { font-size: 0.75rem; }
          .ico { left: 1.25rem; transform: none; width: 40px; height: 40px; font-size: 18px; bottom: -20px; }
          .fb { grid-template-columns: 1fr 1fr; gap: 1.5rem; padding-top: 2.5rem; }
          .fi { align-items: center; text-align: center; }
          .fic { width: 44px; height: 44px; font-size: 18px; }
          .ftt { font-size: 0.9rem; }
          .fts { font-size: 0.8rem; }
        }
      `}</style>

      <section className="aw">
        <svg className="svgd" style={{top:0,right:0,width:150,height:150}} viewBox="0 0 160 160">
          <circle cx="130" cy="30" r="50" fill="none" stroke="#4a2518" strokeWidth=".8"/>
          <circle cx="130" cy="30" r="35" fill="none" stroke="#4a2518" strokeWidth=".5"/>
          <line x1="130" y1="0" x2="130" y2="80" stroke="#4a2518" strokeWidth=".5"/>
          <line x1="100" y1="30" x2="160" y2="30" stroke="#4a2518" strokeWidth=".5"/>
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
      <section className="banner-section w-100">
        <div className="img-main-banner">
          <div className="banner-overlay"></div>
          <img alt="cosmic background" src="/images/bg-bannerpic.jpg" />
        </div>
        <div className="container">
          <div className="banner-text-home">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <span className="spm-small" data-aos="fade-up">The Complete Guide To Astrology</span>
                <h1 className="banner-title my-3" data-aos="fade-down">
                  Let the Stars Shape<br/>
                  <span className="text-gradient">Your Journey</span>
                </h1>
                <p className="banner-desc mb-5" data-aos="fade-up">
                  Discover the cosmic narrative written in the stars. Learn astrology
                  online and gain the skills to understand planetary influences,
                  houses, and signs. Predict outcomes, guide life journeys, and explore the
                  mysteries of yourself and others.
                </p>
                <div data-aos="fade-up">
                  <button onClick={handleOpenModal} className="btn mystic-btn-primary">ENROLL NOW <i className="fas fa-arrow-right ms-2"></i></button>
                </div>
              </div>
              <div className="col-lg-6 d-none d-lg-flex justify-content-center">
                <div className="cosmic-orbit-container">
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
                    <img alt="logo center" src="/images/middle-img.png" />
                  </div>
                </div>
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
                  <figure className="moon-img" data-aos="fade-right">
                    <img alt="moon" src="/images/moon.jpg" />
                  </figure>
                  <figure className="floating-element" data-aos="fade-left">
                    <img alt="woman" src="/images/bg-bannerpic.jpg" />
                  </figure>
                  <figure className="bottom-img" data-aos="fade-up">
                    <img alt="tarot" src="/images/premium_tarot.png" />
                  </figure>
                  <div className="experience-badge text-center" data-aos="zoom-in">
                    <h4>16+</h4>
                    <span>Years Experience</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <h5 className="section-subtitle" data-aos="fade-down">About Astro Ava</h5>
                <h2 className="section-title my-3" data-aos="fade-down">
                  Unlock a Brilliant Future with Astrology
                </h2>
                <p className="section-desc mt-3" data-aos="fade-up">
                  Discover Your True Potential with Expert Astrology Guidance!
                  Step into a life full of clarity, confidence, and success. Our professional astrology
                  consultants help you unlock the secrets of your future with accurate, personalized insights.
                </p>
                <a href="#" className="btn mystic-btn-outline mt-4" data-aos="fade-down">Read More</a>
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
              <p className="mx-auto mt-3" style={{maxWidth: '650px', fontSize: '1.2rem', fontWeight: '500', color: '#2c3e50'}} data-aos="fade-down">
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
          background-color: var(--cosmic-bg);
          color: var(--cosmic-text);
          font-family: 'Inter', sans-serif;
        }

        .section-title {
          font-size: clamp(2.5rem, 6vw, 3.8rem);
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          color: var(--cosmic-text);
          line-height: 1.1;
        }

        .section-subtitle {
          color: #000;
          font-size: 1.4rem;
          text-transform: none;
          letter-spacing: 1px;
          font-weight: 900;
          font-style: italic;
          margin-bottom: 20px;
          display: block;
          font-family: 'Playfair Display', serif;
        }

        .expertise-subtitle {
          color: var(--cosmic-accent-pink) !important;
          font-size: clamp(1.4rem, 4vw, 2rem) !important;
          font-weight: 800 !important;
          letter-spacing: 3px !important;
          text-transform: uppercase !important;
          font-style: normal !important;
          font-family: 'Inter', sans-serif !important;
        }

        .section-desc {
          color: #000 !important;
          font-size: 1.2rem;
          line-height: 1.8;
          font-weight: 500;
        }

        .text-gradient {
          background: var(--cosmic-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .mystic-btn-primary {
          background: var(--cosmic-gradient);
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 16px 40px;
          font-weight: 800;
          letter-spacing: 1.5px;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: 0 10px 25px rgba(227, 27, 122, 0.3);
          text-transform: uppercase;
          font-size: 1rem;
        }

        .mystic-btn-primary:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(227, 27, 122, 0.5);
          color: #fff;
        }

        .mystic-btn-outline {
          background: var(--cosmic-white);
          color: var(--cosmic-text);
          border: 1px solid var(--glass-border);
          border-radius: 50px;
          padding: 12px 35px;
          font-weight: 800;
          font-size: 1.15rem;
          transition: 0.3s;
          box-shadow: var(--premium-shadow);
          display: inline-block;
        }

        .mystic-btn-outline:hover {
          background: var(--cosmic-accent-soft);
          border-color: var(--cosmic-accent-pink);
          color: var(--cosmic-accent-pink);
          transform: translateY(-3px);
        }

        /* Banner Section */
        .banner-section {
          position: relative;
          padding: 180px 0 120px;
          min-height: 95vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--cosmic-bg);
        }

        .img-main-banner {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        .img-main-banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.15;
          filter: saturate(0.5);
        }

        .banner-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 30%, var(--cosmic-accent-soft), transparent 60%);
        }

        .banner-title {
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 800;
          line-height: 1;
          color: var(--cosmic-text);
          font-family: 'Playfair Display', serif;
        }

        .banner-desc {
          font-size: 1.35rem;
          color: var(--cosmic-text-muted) !important;
          line-height: 1.8;
          max-width: 90%;
          font-weight: 500;
        }

        .spm-small {
          color: #000;
          font-weight: 900;
          font-style: italic;
          text-transform: none;
          letter-spacing: 1px;
          font-size: 1.2rem;
          margin-bottom: 25px;
          display: block;
          font-family: 'Playfair Display', serif;
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
          border: 1px dashed var(--glass-border);
          animation: spinRight 40s linear infinite;
        }

        .small-circle {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          border: 1px dashed var(--cosmic-accent-pink);
          opacity: 0.3;
          animation: spinLeft 25s linear infinite;
        }

        .icon-block {
          position: absolute;
          width: 65px;
          height: 65px;
          background: var(--cosmic-white);
          border: 1.5px solid var(--glass-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--premium-shadow);
          transition: all 0.4s;
        }

        .icon-block img {
          width: 50%;
          filter: grayscale(1) brightness(0.2);
          opacity: 0.7;
        }

        .icon-block:hover {
          transform: scale(1.2) rotate(10deg);
          border-color: var(--cosmic-accent-pink);
          box-shadow: 0 15px 30px rgba(227, 27, 122, 0.2);
        }

        .icon-block:hover img {
          filter: none;
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
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));
          animation: float 5s ease-in-out infinite;
        }

        .glow-orb {
          position: absolute;
          width: 120%;
          height: 120%;
          background: var(--cosmic-gradient);
          border-radius: 50%;
          filter: blur(50px);
          opacity: 0.2;
          top: -10%;
          left: -10%;
        }

        @keyframes spinRight { 100% { transform: rotate(360deg); } }
        @keyframes spinLeft { 100% { transform: rotate(-360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

        /* About Section Staggered Layout */
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
          border: 12px solid var(--cosmic-bg);
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
          background: var(--cosmic-white);
          padding: 20px 30px;
          border-radius: 30px;
          border: 1px solid var(--glass-border);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          position: absolute;
          bottom: -20px;
          right: 20px;
          z-index: 10;
        }

        .experience-badge h4 { 
          font-size: 2.8rem; 
          font-weight: 800; 
          background: var(--cosmic-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0; 
        }
        .experience-badge span { 
          font-size: 0.9rem; 
          font-weight: 800; 
          text-transform: uppercase; 
          letter-spacing: 1px; 
          color: var(--cosmic-text-muted); 
        }

        @media (max-width: 991px) {
          .img-box01 {
            height: 450px;
            margin-bottom: 50px;
          }
          .moon-img { height: 180px; width: 90%; }
          .floating-element { height: 280px; top: 100px; width: 65%; }
          .bottom-img { height: 220px; width: 60%; }
        }

        @media (max-width: 576px) {
          .img-box01 {
            height: 380px;
          }
          .moon-img { height: 140px; border-width: 6px; border-radius: 20px; }
          .floating-element { height: 220px; top: 80px; border-radius: 20px; }
          .bottom-img { height: 180px; border-radius: 15px; }
          .experience-badge {
            padding: 12px 20px;
            bottom: -10px;
            right: 10px;
          }
          .experience-badge h4 { font-size: 1.8rem; }
          .experience-badge span { font-size: 0.6rem; }
        }

        /* Services */
        .services-section {
          padding: 120px 0;
          background: var(--cosmic-bg);
        }

        .service-card {
          background: var(--cosmic-white);
          padding: 25px 20px;
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: auto;
          min-height: 140px;
          margin-bottom: 10px;
          position: relative;
        }

        @media (min-width: 768px) {
          .service-card {
            padding: 35px;
            margin-bottom: 20px;
            min-height: 160px;
          }
        }

        .service-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 0;
          background: var(--cosmic-accent-pink);
          transition: 0.3s;
        }

        .service-card:hover::after {
          height: 100%;
        }

        @media (min-width: 992px) {
          .service-card {
            height: calc(50% - 12px);
            margin-bottom: 0;
          }
        }

        .service-card:hover {
          transform: translateY(-12px);
          border-color: var(--cosmic-accent-pink);
          box-shadow: 0 25px 50px rgba(0,0,0,0.06);
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
          background: #fdf5f2;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(93, 64, 55, 0.1);
        }

        .icon-wrapper img {
          width: 35px;
          height: 35px;
          object-fit: contain;
          /* Forced Dark Brown Filter */
          filter: brightness(0) saturate(100%) invert(18%) sepia(13%) saturate(2258%) hue-rotate(318deg) brightness(91%) contrast(93%) !important;
          transition: 0.4s;
        }

        .service-card:hover .icon-wrapper img {
          transform: scale(1.1);
        }

        .service-card h4 {
          font-size: clamp(1.2rem, 3vw, 1.6rem);
          font-weight: 800;
          color: #1a1a1a;
          margin: 0;
        }

        .service-card p {
          font-size: clamp(1.15rem, 2vw, 1.35rem);
          font-weight: 500;
          color: var(--cosmic-text-muted);
          line-height: 1.6;
          margin-bottom: 0;
        }

        /* Testimonials Section - Professional */
        .testimonial-section {
          padding: 100px 0;
          background: #fff;
          overflow: hidden;
          border-top: 1px solid #f1f5f9;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 25px;
          background: rgba(108,60,225,0.1);
          border-radius: 50px;
          color: #6C3CE1;
          font-weight: 800;
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .badge-icon {
          font-size: 1.1rem;
        }

        .section-description {
          max-width: 500px;
          font-size: 1.2rem;
          color: #6B7280;
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
          -ms-overflow-style: none;
          padding: 10px 40px;
        }

        .testimonial-track::-webkit-scrollbar {
          display: none;
        }

        .testimonial-card {
          flex: 0 0 320px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .testimonial-card:hover {
          transform: translateY(-8px);
        }

        .card-inner {
          background: #FFFFFF;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          border: 1px solid rgba(108,60,225,0.08);
          position: relative;
        }

        .testimonial-card:hover .card-inner {
          box-shadow: 0 20px 40px rgba(108,60,225,0.12);
          border-color: rgba(108,60,225,0.2);
        }

        .quote-icon {
          position: absolute;
          top: 15px;
          right: 20px;
          font-size: 4rem;
          font-family: Georgia, serif;
          color: rgba(108,60,225,0.1);
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

        .testimonial-card:hover .video-container video {
          transform: scale(1.05);
        }

        .play-btn-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.3);
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
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .play-circle i {
          color: #6C3CE1;
          font-size: 1.2rem;
          margin-left: 3px;
        }

        .play-circle:hover {
          transform: scale(1.1);
          background: #6C3CE1;
        }

        .play-circle:hover i {
          color: white;
        }

        .testimonial-content {
          padding: 20px;
        }

        .testimonial-text {
          font-size: 1.3rem;
          line-height: 1.7;
          color: #1a1a1a;
          margin-bottom: 20px;
          font-style: italic;
          min-height: 80px;
          font-weight: 500;
        }

        .client-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(108,60,225,0.1);
        }

        .client-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #6C3CE1;
        }

        .client-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .client-details h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 4px;
        }

        .rating {
          display: flex;
          gap: 3px;
        }

        .rating i {
          font-size: 0.7rem;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: 1px solid rgba(108,60,225,0.2);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .nav-btn:hover {
          background: #6C3CE1;
          border-color: #6C3CE1;
          transform: translateY(-50%) scale(1.1);
        }

        .nav-btn:hover svg {
          stroke: white;
        }

        .nav-btn svg {
          stroke: #6C3CE1;
          transition: stroke 0.3s ease;
        }

        .left-btn {
          left: -20px;
        }

        .right-btn {
          right: -20px;
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
          background: rgba(108,60,225,0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          width: 25px;
          border-radius: 10px;
          background: #6C3CE1;
        }

        .dot:hover {
          background: #6C3CE1;
          transform: scale(1.2);
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
          .section-badge { font-size: 1.1rem; padding: 8px 20px; }
          .section-description { font-size: 1.3rem !important; max-width: 100%; color: #4B5563; }
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