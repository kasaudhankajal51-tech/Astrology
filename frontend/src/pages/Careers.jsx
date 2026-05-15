import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, MapPin, Clock, DollarSign, ChevronRight,
  Upload, CheckCircle2, Star, Sparkles, Send,
  User, Mail, Phone, Home, BookOpen, Globe, Zap
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_BASE from '../utils/api';

/* ─── Inline styles (no Tailwind dependency) ─── */
const S = {
  root: {
    minHeight: '100vh',
    background: '#F7F4EE',
    fontFamily: "'DM Sans', sans-serif",
    paddingTop: '96px',
    paddingBottom: '60px',
    color: '#1a1714',
  },
  inner: { maxWidth: 1100, margin: '0 auto', padding: '0 24px' },

  /* Header */
  pageHeader: { textAlign: 'center', marginBottom: 48 },
  pageTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 38, fontWeight: 600,
    color: '#1a1714', letterSpacing: -0.5,
    marginBottom: 10,
  },
  pageSub: { fontSize: 14.5, color: '#6b6560', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 },

  /* Layout */
  layout: { display: 'grid', gridTemplateColumns: '300px 1fr', gap: 28, alignItems: 'start' },

  /* Panel label */
  panelLabel: {
    fontSize: 10, fontWeight: 500, letterSpacing: '0.12em',
    textTransform: 'uppercase', color: '#9a8f85',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 12,
  },
  rolesBadge: {
    background: '#C9A84C22', color: '#8a6e1e', fontSize: 10,
    padding: '2px 8px', borderRadius: 20, border: '0.5px solid #C9A84C55',
  },

  /* Job list card */
  jobItem: (active) => ({
    background: active ? '#FFFDF5' : '#fff',
    border: active ? '0.5px solid #C9A84C' : '0.5px solid #e5dfd7',
    boxShadow: active ? '0 0 0 2px #C9A84C22' : 'none',
    borderRadius: 12, padding: '14px 16px', marginBottom: 10,
    cursor: 'pointer', transition: 'all 0.15s',
  }),
  jobItemTitle: (active) => ({
    fontSize: 13.5, fontWeight: 500,
    color: active ? '#8a6e1e' : '#1a1714',
    marginBottom: 8, lineHeight: 1.3,
  }),
  jobItemTags: { display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 },
  tagDept: {
    fontSize: 10, padding: '2px 7px', borderRadius: 4,
    background: '#f0ede9', color: '#6b6560', border: '0.5px solid #e0d9d1',
  },
  tagType: {
    fontSize: 10, padding: '2px 7px', borderRadius: 4,
    background: '#FFF8E6', color: '#8a6e1e', border: '0.5px solid #C9A84C44',
  },
  jobItemMeta: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 },
  metaItem: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#9a8f85' },

  /* Detail card */
  detailCard: {
    background: '#fff', border: '0.5px solid #e5dfd7',
    borderRadius: 16, padding: 32, marginBottom: 20,
  },
  detailTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 24, fontWeight: 600, color: '#1a1714', marginBottom: 12,
  },
  badgeRow: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 },
  badge: (variant) => {
    const map = {
      purple: { bg: '#F0EFFE', color: '#5b4ec9', border: '#AFA9EC' },
      blue:   { bg: '#E6F1FB', color: '#185FA5', border: '#85B7EB' },
      green:  { bg: '#EAF3DE', color: '#3B6D11', border: '#97C459' },
    };
    const v = map[variant];
    return { fontSize: 11, padding: '3px 10px', borderRadius: 6, background: v.bg, color: v.color, border: `0.5px solid ${v.border}` };
  },
  detailGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 },
  sectionLabel: {
    fontSize: 10.5, fontWeight: 500, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: '#C9A84C',
    display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10,
  },
  desc: { fontSize: 13, color: '#4a4440', lineHeight: 1.65, marginBottom: 18 },
  listItem: { display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 12.5, color: '#4a4440', lineHeight: 1.5, marginBottom: 6 },
  bullet: { width: 5, height: 5, borderRadius: '50%', background: '#C9A84C', marginTop: 5, flexShrink: 0 },
  skillChip: {
    fontSize: 11.5, padding: '4px 10px', borderRadius: 6,
    background: '#f7f4ee', color: '#4a4440', border: '0.5px solid #e0d9d1',
    margin: '0 4px 4px 0', display: 'inline-block',
  },

  /* Form card */
  formCard: { background: '#fff', border: '0.5px solid #e5dfd7', borderRadius: 16, padding: 32 },
  formHeader: {
    display: 'flex', alignItems: 'center', gap: 12,
    marginBottom: 24, paddingBottom: 16, borderBottom: '0.5px solid #f0ebe3',
  },
  formIconBox: {
    width: 38, height: 38, borderRadius: 8,
    background: '#FFF8E6', border: '0.5px solid #C9A84C44',
    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a6e1e',
    flexShrink: 0,
  },
  formTitle: { fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: '#1a1714' },
  formSub: { fontSize: 12, color: '#9a8f85', marginTop: 2 },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 },
  fieldWrap: { display: 'flex', flexDirection: 'column', gap: 5 },
  fieldLabel: {
    fontSize: 10.5, fontWeight: 500, letterSpacing: '0.07em',
    textTransform: 'uppercase', color: '#9a8f85',
    display: 'flex', alignItems: 'center', gap: 4,
  },
  input: {
    width: '100%', background: '#FAFAF8',
    border: '0.5px solid #e0d9d1', borderRadius: 8,
    padding: '9px 12px', fontSize: 13, fontFamily: "'DM Sans', sans-serif",
    color: '#1a1714', outline: 'none',
  },
  select: {
    width: '100%', background: '#FAFAF8',
    border: '0.5px solid #e0d9d1', borderRadius: 8,
    padding: '9px 12px', fontSize: 13, fontFamily: "'DM Sans', sans-serif",
    color: '#1a1714', outline: 'none', cursor: 'pointer',
  },
  textarea: {
    width: '100%', background: '#FAFAF8',
    border: '0.5px solid #e0d9d1', borderRadius: 8,
    padding: '9px 12px', fontSize: 13, fontFamily: "'DM Sans', sans-serif",
    color: '#1a1714', outline: 'none', resize: 'vertical', lineHeight: 1.55,
  },
  uploadZone: {
    background: '#FAFAF8', border: '1px dashed #d4ccc2',
    borderRadius: 10, padding: '20px', textAlign: 'center', cursor: 'pointer',
  },
  uploadText: { fontSize: 12.5, color: '#9a8f85', marginTop: 4 },
  submitBtn: {
    width: '100%', background: '#C9A84C', color: '#fff',
    border: 'none', borderRadius: 10, padding: '13px',
    fontSize: 14, fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
    cursor: 'pointer', display: 'flex', alignItems: 'center',
    justifyContent: 'center', gap: 8, marginTop: 20, letterSpacing: '0.02em',
  },
  divider: { height: '0.5px', background: '#f0ebe3', margin: '24px 0' },
  spinner: {
    width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)',
    borderTop: '2px solid #fff', borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loader: {
    minHeight: '100vh', background: '#F7F4EE',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  loaderSpinner: {
    width: 40, height: 40, border: '2px solid #e0d9d1',
    borderTop: '2px solid #C9A84C', borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};

const FALLBACK_JOBS = [
  {
    _id: '1',
    title: 'Vedic Astrology Consultant',
    department: 'Consultation',
    location: 'Remote / Noida',
    experience: '5+ Years',
    type: 'Full-time',
    salary: '₹50,000 – ₹80,000 / month',
    description: 'We are seeking an experienced Vedic Astrologer to join our premium consultation team and serve clients across the globe.',
    responsibilities: ['Provide accurate birth-chart readings', 'Conduct live client consultations', 'Maintain session logs and follow-ups'],
    skills: ['Vedic Astrology', 'Kundli Reading', 'Client Communication', 'Hindi / English'],
    qualifications: ['Certification in Astrology', 'Minimum 5 years of practice', 'Online consultation experience preferred'],
  },
  {
    _id: '2',
    title: 'Tarot Reader',
    department: 'Consultation',
    location: 'Remote',
    experience: '2+ Years',
    type: 'Part-time',
    salary: 'Commission Based',
    description: 'Join our team of spiritual guides as a professional Tarot Reader, delivering online sessions to clients seeking clarity.',
    responsibilities: ['Conduct live online Tarot sessions', 'Prepare email-based readings', 'Maintain a client journal'],
    skills: ['Tarot Spreads', 'Intuitive Reading', 'English / Hindi', 'Empathy'],
    qualifications: ['2+ years Tarot experience', 'Online platform experience preferred', 'Strong communication skills'],
  },
];

const EMPTY_FORM = {
  fullName: '', email: '', phone: '', city: '',
  totalExperience: '', currentOccupation: '', astrologyExperience: '',
  specialization: 'Vedic Astrology', currentSalary: '', expectedSalary: '',
  noticePeriod: '', languages: '', coverMessage: '',
};

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchJobs();
    /* Inject fonts once */
    if (!document.getElementById('careers-fonts')) {
      const link = document.createElement('link');
      link.id = 'careers-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/jobs`);
      if (data.success && data.jobs.length) {
        setJobs(data.jobs);
        setSelectedJob(data.jobs[0]);
      } else throw new Error('empty');
    } catch {
      setJobs(FALLBACK_JOBS);
      setSelectedJob(FALLBACK_JOBS[0]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) return toast.error('Please upload your resume');
    setSubmitting(true);
    const fd = new FormData();
    Object.keys(formData).forEach((k) => fd.append(k, formData[k]));
    fd.append('resume', resume);
    fd.append('appliedRole', selectedJob?.title || 'General Application');
    try {
      const { data } = await axios.post(`${API_BASE}/api/jobs/apply`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (data.success) {
        toast.success('Application submitted! Our team will contact you soon.');
        setFormData(EMPTY_FORM);
        setResume(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div style={S.loader}>
      <div style={S.loaderSpinner} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={S.root}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .careers-input:focus { border-color: #C9A84C !important; }
        .careers-upload:hover { border-color: #C9A84C !important; background: #FFFDF5 !important; }
        .job-item-card:hover { border-color: #C9A84C88 !important; }
        .submit-btn-inner:hover { background: #b8943d !important; }
        .submit-btn-inner:active { transform: scale(0.99); }
      `}</style>

      <div style={S.inner}>
        {/* Page Header */}
        <div style={S.pageHeader}>
          <h1 style={S.pageTitle}>Cosmic Careers at DS Astro</h1>
          <p style={S.pageSub}>
            Join India's leading astrology platform — spiritual guides, tech minds &amp; creative souls welcome.
          </p>
        </div>

        <div style={S.layout}>
          {/* ── LEFT: Job List ── */}
          <div>
            <div style={S.panelLabel}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Briefcase size={13} /> Open Positions
              </span>
              <span style={S.rolesBadge}>{jobs.length} Roles</span>
            </div>

            <div style={{ maxHeight: 800, overflowY: 'auto', paddingRight: 4 }}>
              {jobs.map((job) => {
                const active = selectedJob?._id === job._id;
                return (
                  <motion.div
                    key={job._id}
                    className="job-item-card"
                    style={S.jobItem(active)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedJob(job)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <span style={S.jobItemTitle(active)}>{job.title}</span>
                      <ChevronRight size={14} style={{ color: active ? '#C9A84C' : '#c4bbb4', transform: active ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s', marginTop: 1, flexShrink: 0 }} />
                    </div>

                    <div style={S.jobItemTags}>
                      <span style={S.tagDept}>{job.department}</span>
                      <span style={S.tagType}>{job.type}</span>
                    </div>

                    <div style={S.jobItemMeta}>
                      <div style={S.metaItem}><MapPin size={11} />{job.location}</div>
                      <div style={S.metaItem}><Clock size={11} />{job.experience}</div>
                      <div style={{ ...S.metaItem, gridColumn: '1 / -1' }}><DollarSign size={11} />{job.salary}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: Detail + Form ── */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedJob?._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {/* Job Detail Card */}
                <div style={S.detailCard}>
                  <h2 style={S.detailTitle}>{selectedJob?.title}</h2>
                  <div style={S.badgeRow}>
                    <span style={S.badge('purple')}>{selectedJob?.department}</span>
                    <span style={S.badge('blue')}>{selectedJob?.location}</span>
                    <span style={S.badge('green')}>{selectedJob?.type}</span>
                  </div>

                  <div style={S.detailGrid}>
                    {/* Left column */}
                    <div>
                      <div style={S.sectionLabel}><Star size={12} /> Description</div>
                      <p style={S.desc}>{selectedJob?.description}</p>

                      <div style={S.sectionLabel}><CheckCircle2 size={12} /> Responsibilities</div>
                      {selectedJob?.responsibilities?.map((r, i) => (
                        <div key={i} style={S.listItem}>
                          <span style={S.bullet} />{r}
                        </div>
                      ))}
                    </div>

                    {/* Right column */}
                    <div>
                      <div style={S.sectionLabel}><Zap size={12} /> Required Skills</div>
                      <div style={{ marginBottom: 20 }}>
                        {selectedJob?.skills?.map((s, i) => (
                          <span key={i} style={S.skillChip}>{s}</span>
                        ))}
                      </div>

                      <div style={S.sectionLabel}><BookOpen size={12} /> Qualifications</div>
                      {selectedJob?.qualifications?.map((q, i) => (
                        <div key={i} style={S.listItem}>
                          <span style={S.bullet} />{q}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Application Form */}
                <div style={S.formCard}>
                  <div style={S.formHeader}>
                    <div style={S.formIconBox}><Send size={16} /></div>
                    <div>
                      <div style={S.formTitle}>Apply for this role</div>
                      <div style={S.formSub}>{selectedJob?.title}</div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div style={S.formGrid}>
                      {/* Row 1 */}
                      <Field label="Full Name" icon={<User size={11} />}>
                        <input className="careers-input" style={S.input} type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Your full name" />
                      </Field>
                      <Field label="Email Address" icon={<Mail size={11} />}>
                        <input className="careers-input" style={S.input} type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                      </Field>

                      {/* Row 2 */}
                      <Field label="Phone Number" icon={<Phone size={11} />}>
                        <input className="careers-input" style={S.input} type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                      </Field>
                      <Field label="City" icon={<Home size={11} />}>
                        <input className="careers-input" style={S.input} type="text" name="city" required value={formData.city} onChange={handleChange} placeholder="e.g. Mumbai" />
                      </Field>

                      {/* Row 3 */}
                      <Field label="Total Experience" icon={<Briefcase size={11} />}>
                        <input className="careers-input" style={S.input} type="text" name="totalExperience" required value={formData.totalExperience} onChange={handleChange} placeholder="e.g. 5 Years" />
                      </Field>
                      <Field label="Current Occupation" icon={<Star size={11} />}>
                        <input className="careers-input" style={S.input} type="text" name="currentOccupation" value={formData.currentOccupation} onChange={handleChange} placeholder="Current role" />
                      </Field>

                      {/* Row 4 */}
                      <Field label="Astrology Experience" icon={<Sparkles size={11} />}>
                        <input className="careers-input" style={S.input} type="text" name="astrologyExperience" value={formData.astrologyExperience} onChange={handleChange} placeholder="Years in astrology" />
                      </Field>
                      <Field label="Specialization" icon={<Globe size={11} />}>
                        <select className="careers-input" style={S.select} name="specialization" value={formData.specialization} onChange={handleChange}>
                          <option>Vedic Astrology</option>
                          <option>Tarot</option>
                          <option>Numerology</option>
                          <option>Palmistry</option>
                          <option>Face Reading</option>
                          <option>Kundli Analysis</option>
                          <option>Other</option>
                        </select>
                      </Field>

                      {/* Row 5 */}
                      <Field label="Current Salary (LPA)" icon={<DollarSign size={11} />}>
                        <input className="careers-input" style={S.input} type="text" name="currentSalary" value={formData.currentSalary} onChange={handleChange} placeholder="e.g. 6 LPA" />
                      </Field>
                      <Field label="Expected Salary (LPA)" icon={<DollarSign size={11} />}>
                        <input className="careers-input" style={S.input} type="text" name="expectedSalary" value={formData.expectedSalary} onChange={handleChange} placeholder="e.g. 9 LPA" />
                      </Field>

                      {/* Row 6 */}
                      <Field label="Notice Period" icon={<Clock size={11} />}>
                        <input className="careers-input" style={S.input} type="text" name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} placeholder="e.g. 1 Month" />
                      </Field>
                      <Field label="Languages Known" icon={<Globe size={11} />}>
                        <input className="careers-input" style={S.input} type="text" name="languages" value={formData.languages} onChange={handleChange} placeholder="English, Hindi…" />
                      </Field>
                    </div>

                    {/* Resume Upload */}
                    <div style={{ ...S.fieldWrap, marginBottom: 16 }}>
                      <label style={S.fieldLabel}>
                        <Upload size={11} /> Resume / CV
                        <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: '#c4bbb4', marginLeft: 4 }}>
                          (PDF, DOC, DOCX – max 5MB)
                        </span>
                      </label>
                      <label
                        className="careers-upload"
                        style={S.uploadZone}
                        htmlFor="resume-upload"
                      >
                        <Upload size={22} style={{ color: '#C9A84C', marginBottom: 4 }} />
                        <div style={S.uploadText}>
                          {resume ? (
                            <span style={{ color: '#8a6e1e', fontWeight: 500 }}>{resume.name}</span>
                          ) : (
                            'Click to upload or drag & drop'
                          )}
                        </div>
                      </label>
                      <input
                        id="resume-upload" type="file" accept=".pdf,.doc,.docx"
                        style={{ display: 'none' }}
                        onChange={(e) => setResume(e.target.files[0])}
                      />
                    </div>

                    {/* Cover Message */}
                    <div style={{ ...S.fieldWrap, marginBottom: 4 }}>
                      <label style={S.fieldLabel}><BookOpen size={11} /> Cover Message</label>
                      <textarea
                        className="careers-input"
                        style={S.textarea}
                        name="coverMessage"
                        rows={4}
                        value={formData.coverMessage}
                        onChange={handleChange}
                        placeholder="Tell us why you are a great fit for DS Astro…"
                      />
                    </div>

                    <motion.button
                      className="submit-btn-inner"
                      type="submit"
                      disabled={submitting}
                      style={S.submitBtn}
                      whileTap={{ scale: 0.99 }}
                    >
                      {submitting ? (
                        <div style={S.spinner} />
                      ) : (
                        <><Send size={16} /> Submit Application</>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small helper component */
function Field({ label, icon, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{
        fontSize: 10.5, fontWeight: 500, letterSpacing: '0.07em',
        textTransform: 'uppercase', color: '#9a8f85',
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        {icon}{label}
      </label>
      {children}
    </div>
  );
}