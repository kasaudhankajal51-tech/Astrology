import React from 'react';

function HeroSection({ onJoinNow }) {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-[#3B2261] text-white">
      {/* Subtle grid pattern for texture without glowing lights */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-10 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Badge */}
        <div className="flex justify-center mb-8" data-aos="fade-up">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
              <i className="fas fa-calendar-alt text-sm"></i>
            </div>
            <span className="font-bold tracking-wide text-sm md:text-base text-slate-200 uppercase">
              2-Days Mega Astrology Webinar
            </span>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-center leading-[1.15] max-w-5xl mx-auto mb-8 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }} data-aos="fade-up" data-aos-delay="100">
          <span className="text-white">Remove </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-rose-300">Uncertainty</span>
          <span className="text-white"> from Your </span>
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">Career, Relationships & Finances</span>
          <span className="text-white"> using Astrology</span>
        </h1>
        
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 mt-16 max-w-6xl mx-auto items-start">
          
          {/* Video Section */}
          <div className="relative group rounded-[2rem] overflow-hidden shadow-2xl shadow-purple-900/40 border border-white/10 bg-slate-800/50 backdrop-blur-sm" data-aos="fade-right" data-aos-delay="200">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-10" />
            
            <video 
              src="/videohomefinal.mp4" 
              controls 
              poster="/images/bg-bannerpic.jpg" 
              className="w-full h-auto aspect-video object-cover block relative z-0"
            ></video>
            
            <div className="absolute bottom-4 left-4 z-20">
              <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs font-bold tracking-widest text-white shadow-xl">
                BY – ASTRO AVA
              </div>
            </div>
          </div>

          {/* Info Side */}
          <div className="flex flex-col gap-6" data-aos="fade-left" data-aos-delay="300">
            {/* Info Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: 'fa-calendar-day', title: 'Date', val: '25th - 26th April', color: 'from-blue-500 to-cyan-400' },
                { icon: 'fa-clock', title: 'Time', val: '1:00 PM', color: 'from-orange-400 to-rose-400' },
                { icon: 'fa-hourglass-half', title: 'Duration', val: '4 Hours', color: 'from-purple-500 to-indigo-500' },
                { icon: 'fa-laptop', title: 'Format', val: '2 Days Live', color: 'from-emerald-400 to-teal-500' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex flex-col gap-3 hover:bg-white/10 transition-colors group">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{item.title}</h4>
                    <p className="text-sm lg:text-base font-bold text-white">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mentor Card */}
            <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <i className="fas fa-star text-6xl text-white"></i>
              </div>
              
              <div className="inline-block px-3 py-1 bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[10px] font-bold uppercase tracking-wider rounded-lg mb-6">
                Your Instructor
              </div>
              
              <div className="flex items-center gap-5 mb-6">
                <img src="/images/mentor-ava.png" alt="Mentor" className="w-20 h-20 rounded-full border-2 border-white/20 object-cover shadow-xl bg-slate-800" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Astro Ava</h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-[200px] lg:max-w-xs">
                    Expert in Vedic astrology, recognized as India's leading voice in astrology.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 pt-5 border-t border-white/10">
                <div className="text-center">
                  <h4 className="text-lg lg:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-rose-300">1L+</h4>
                  <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mt-1">Students</p>
                </div>
                <div className="text-center border-l border-r border-white/5">
                  <h4 className="text-lg lg:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">50M+</h4>
                  <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mt-1">Views</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg lg:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">50+</h4>
                  <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mt-1">Years Legacy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="text-center mt-16" data-aos="zoom-in" data-aos-delay="400">
          <button 
            onClick={onJoinNow} 
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-600 rounded-2xl text-white font-black text-lg lg:text-xl shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_rgba(249,115,22,0.6)] transition-all hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10">Uncover Life’s Secrets – Join Now</span>
            <i className="fas fa-arrow-right relative z-10 group-hover:translate-x-1 transition-transform"></i>
          </button>
          <p className="mt-5 text-sm font-medium text-slate-300">
            Book Your Seat Now – <span className="text-rose-400 font-bold animate-pulse">Few Seats Left</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
