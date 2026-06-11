import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const expertiseTags = ['Vedic Astrology', 'Tarot Reading', 'Numerology', 'Spiritual Guidance'];

const uniquePoints = [
  { icon: 'fa-moon', text: 'Rooted in classical Vedic principles with practical, modern interpretation' },
  { icon: 'fa-user-check', text: 'Personalised guidance for education, career, relationships, and life decisions' },
  { icon: 'fa-shield-alt', text: 'Confidential consultations with an ethical, client-first approach' },
  { icon: 'fa-graduation-cap', text: 'Structured live and recorded programmes led by experienced mentors' },
];

const aims = [
  'Deliver methodical astrology education that removes fear and superstition',
  'Make quality learning accessible through live batches and recorded courses',
  'Blend traditional scriptures with techniques students can apply confidently',
  'Support learners from first enquiry through certification and practice',
  'Help individuals make clearer, spiritually aware life choices',
  'Build a trusted institute known for integrity, depth, and results',
];

function About() {
  useEffect(() => {
    if (window.AOS) window.AOS.refresh();
  }, []);

  return (
    <div className="about-page site-page w-full overflow-x-hidden bg-site-bg text-site-text">
      <SEO
        title="About Us"
        description="Learn about DS Astro Institute — our mission, mentors, and approach to Vedic astrology education and consultations."
        url="/about"
      />

      {/* Banner */}
      <section className="relative overflow-hidden border-b border-site-border bg-site-bg">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(200,131,42,0.12),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="site-container site-about-hero-inner relative z-[1]">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
            <div data-aos="fade-right" data-aos-duration="700">
              <span className="site-mb-3 inline-block text-kicker font-extrabold uppercase tracking-[0.14em] text-site-accent">
                About Us
              </span>
              <h1 className="font-heading text-display font-extrabold leading-[1.12] text-site-text">
                DS Astro Institute
              </h1>
              <p className="site-mt-4 max-w-xl text-body leading-relaxed text-site-text-muted">
                We are an astrology education and consultation platform dedicated to authentic Vedic learning,
                professional mentorship, and meaningful guidance for students across India and abroad.
              </p>
              <div className="site-mt-6 flex flex-wrap gap-3">
                <div className="site-stat-pad rounded-xl border border-site-border bg-white shadow-[0_8px_20px_rgba(42,15,2,0.06)]">
                  <p className="font-heading text-2xl font-bold leading-none text-site-primary md:text-[1.65rem]">5000+</p>
                  <p className="site-mt-3 text-caption font-semibold uppercase tracking-wide text-site-text-muted">Students trained</p>
                </div>
                <div className="site-stat-pad rounded-xl border border-site-border bg-white shadow-[0_8px_20px_rgba(42,15,2,0.06)]">
                  <p className="font-heading text-2xl font-bold leading-none text-site-primary md:text-[1.65rem]">15+</p>
                  <p className="site-mt-3 text-caption font-semibold uppercase tracking-wide text-site-text-muted">Specialised courses</p>
                </div>
              </div>
              <div className="site-mt-8 flex flex-wrap gap-3">
                <Link
                  to="/live-courses"
                  className="site-btn site-btn-primary site-about-btn-lg inline-flex items-center gap-2"
                >
                  <i className="fas fa-chalkboard-teacher" aria-hidden="true" />
                  Explore our courses
                </Link>
                <Link
                  to="/consultations"
                  className="site-btn site-btn-outline site-about-btn-lg inline-flex items-center gap-2 bg-white"
                >
                  <i className="fas fa-comments" aria-hidden="true" />
                  Book a consultation
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end" data-aos="fade-left" data-aos-duration="700" data-aos-delay="80">
              <div className="relative w-full max-w-[240px] sm:max-w-[260px] md:max-w-[280px]">
                <div
                  className="absolute -inset-3 rounded-2xl bg-site-accent/20 blur-2xl"
                  aria-hidden="true"
                />
                <img
                  src="/manimage.png"
                  alt="DS Astro mentor"
                  className="relative z-[1] h-auto max-h-[300px] w-full rounded-2xl border-4 border-white object-cover object-top shadow-[0_16px_40px_rgba(42,15,2,0.18)] sm:max-h-[320px]"
                />
                <p className="site-mt-3 relative z-[1] text-center text-caption text-site-text-muted">
                  Guided by experienced practitioners and educators
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="site-section bg-white">
        <div className="site-container">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div data-aos="fade-up" data-aos-duration="700">
              <p className="site-mb-2 text-kicker font-bold uppercase tracking-[0.12em] text-site-accent">Who we are</p>
              <h2 className="font-heading text-heading font-extrabold text-site-text">
                A trusted home for <span className="text-site-accent">astrology education</span>
              </h2>
              <p className="site-mt-4 text-body leading-relaxed text-site-text-muted">
                DS Astro Institute was built to make serious astrology training approachable — whether you want to
                start a professional practice, deepen your spiritual understanding, or seek clarity through
                personalised consultations.
              </p>
              <p className="site-mt-4 text-body leading-relaxed text-site-text-muted">
                Under the guidance of <strong className="font-semibold text-site-primary">Damini Ma&apos;am</strong> and
                our faculty, we combine classical Vedic frameworks with structured teaching, live mentorship, and
                self-paced recorded programmes.
              </p>
              <div className="site-mt-6 flex flex-wrap gap-2">
                {expertiseTags.map((tag) => (
                  <span
                    key={tag}
                    className="site-tag-pad rounded-lg border border-site-accent-dark/15 bg-site-bg text-body-sm font-semibold text-site-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div data-aos="zoom-in" data-aos-duration="700" data-aos-delay="80">
              <div className="site-card-pad rounded-2xl border border-site-border bg-site-bg shadow-[0_10px_24px_rgba(42,15,2,0.06)]">
                <div className="aspect-video overflow-hidden rounded-xl border border-site-border bg-black">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="About DS Astro Institute"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="site-mt-3 text-center text-body-sm text-site-text-muted">
                  Hear how we teach, consult, and support our student community
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What makes us unique */}
      <section className="site-section-sm bg-site-bg">
        <div className="site-container">
          <div className="site-mb-10 mx-auto max-w-2xl text-center" data-aos="fade-up">
            <h2 className="font-heading text-heading font-extrabold text-site-text">
              What makes us <span className="text-site-accent">different</span>
            </h2>
            <p className="site-mt-3 text-body text-site-text-muted">
              Education, ethics, and real-world application — not vague predictions or fear-based advice.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {uniquePoints.map((item, idx) => (
              <div
                key={item.text}
                className="site-card-pad flex h-full flex-col items-center rounded-2xl border border-site-border bg-white text-center shadow-[0_10px_24px_rgba(42,15,2,0.06)] transition hover:-translate-y-0.5 hover:border-site-accent/40"
                data-aos="fade-up"
                data-aos-delay={idx * 80}
              >
                <div className="site-mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-site-accent/10 text-site-accent">
                  <i className={`fas ${item.icon} text-xl`} aria-hidden="true" />
                </div>
                <p className="text-body-sm leading-relaxed text-site-text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & aims */}
      <section className="site-section bg-white">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            <div data-aos="fade-right" data-aos-duration="700">
              <h2 className="font-heading text-heading font-extrabold text-site-text">
                Our mission & <span className="text-site-accent">objectives</span>
              </h2>
              <p className="site-mt-4 text-body leading-relaxed text-site-text-muted">
                In a fast-changing world, astrology remains a bridge between timeless wisdom and everyday decisions.
                Our goal is to teach it clearly, responsibly, and with outcomes students can trust.
              </p>
              <blockquote className="site-card-pad site-mt-6 rounded-2xl border border-site-border border-l-4 border-l-site-accent bg-site-bg">
                <p className="text-body-sm italic leading-relaxed text-site-text">
                  &ldquo;Our mission is to simplify astrology and make it practical, accessible, and result-oriented
                  for every sincere learner.&rdquo;
                </p>
              </blockquote>
            </div>

            <div className="space-y-4" data-aos="fade-left" data-aos-duration="700" data-aos-delay="80">
              {aims.map((aim) => (
                <div
                  key={aim}
                  className="site-list-row-pad flex gap-3 border-b border-site-border/80 last:border-0 last:pb-0"
                >
                  <i className="fas fa-check-circle mt-0.5 shrink-0 text-lg text-site-accent" aria-hidden="true" />
                  <p className="text-body-sm leading-relaxed text-site-text-muted">{aim}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="site-section-sm bg-site-bg">
        <div className="site-container">
          <div
            className="site-card-pad mx-auto max-w-3xl rounded-2xl border border-site-border bg-white text-center shadow-[0_10px_24px_rgba(42,15,2,0.06)]"
            data-aos="zoom-in"
          >
            <h2 className="font-heading text-subheading font-extrabold text-site-text">
              Ready to learn or consult with us?
            </h2>
            <p className="site-mt-3 mx-auto max-w-xl text-body text-site-text-muted">
              Browse live batches, recorded courses, or book a one-to-one session with our team.
            </p>
            <div className="site-mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/recorded-courses"
                className="site-btn site-btn-primary site-about-btn-lg inline-flex items-center gap-2"
              >
                <i className="fas fa-play-circle" aria-hidden="true" />
                View recorded courses
              </Link>
              <Link
                to="/contact"
                className="site-btn site-btn-outline site-about-btn-lg inline-flex items-center gap-2 bg-white"
              >
                <i className="fas fa-envelope" aria-hidden="true" />
                Contact our team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
