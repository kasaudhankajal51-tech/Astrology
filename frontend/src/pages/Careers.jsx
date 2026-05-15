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

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchJobs();
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
    <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-gray-200 border-t-[#C9A84C] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F4EE] pt-24 md:pt-32 pb-16 text-[#1a1714] font-sans">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <h1 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight">Cosmic Careers at DS Astro</h1>
          <p className="text-sm md:text-base text-[#6b6560] max-w-xl mx-auto leading-relaxed">
            Join India's leading astrology platform — spiritual guides, tech minds &amp; creative souls welcome.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
          
          {/* ── LEFT: Job List ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#9a8f85]">
                <Briefcase size={14} /> Open Positions
              </span>
              <span className="bg-[#C9A84C15] text-[#8a6e1e] text-[10px] font-bold px-3 py-1 rounded-full border border-[#C9A84C33]">
                {jobs.length} Roles
              </span>
            </div>

            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[800px] pb-4 lg:pb-0 scrollbar-hide">
              {jobs.map((job) => {
                const active = selectedJob?._id === job._id;
                return (
                  <motion.div
                    key={job._id}
                    className={`flex-shrink-0 w-[280px] lg:w-full p-4 rounded-2xl border transition-all cursor-pointer ${
                      active 
                        ? 'bg-[#FFFDF5] border-[#C9A84C] shadow-[0_0_0_2px_#C9A84C15]' 
                        : 'bg-white border-[#e5dfd7] hover:border-[#C9A84C88]'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <span className={`text-sm font-semibold leading-snug ${active ? 'text-[#8a6e1e]' : 'text-[#1a1714]'}`}>
                        {job.title}
                      </span>
                      <ChevronRight size={14} className={`mt-1 flex-shrink-0 transition-transform ${active ? 'text-[#C9A84C] rotate-90' : 'text-[#c4bbb4]'}`} />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#f0ede9] text-[#6b6560] border border-[#e0d9d1]">{job.department}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#FFF8E6] text-[#8a6e1e] border border-[#C9A84C22]">{job.type}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-1.5 text-[11px] text-[#9a8f85]">
                      <div className="flex items-center gap-1.5"><MapPin size={12} />{job.location}</div>
                      <div className="flex items-center gap-1.5"><Clock size={12} />{job.experience}</div>
                      <div className="col-span-2 flex items-center gap-1.5"><DollarSign size={12} />{job.salary}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: Detail + Form ── */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedJob?._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Job Detail Card */}
                <div className="bg-white rounded-3xl border border-[#e5dfd7] p-6 md:p-10 shadow-sm">
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">{selectedJob?.title}</h2>
                  <div className="flex flex-wrap gap-3 mb-8">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-lg bg-[#F0EFFE] text-[#5b4ec9] border border-[#AFA9EC55] uppercase tracking-wider">{selectedJob?.department}</span>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-lg bg-[#E6F1FB] text-[#185FA5] border border-[#85B7EB55] uppercase tracking-wider">{selectedJob?.location}</span>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-lg bg-[#EAF3DE] text-[#3B6D11] border border-[#97C45955] uppercase tracking-wider">{selectedJob?.type}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#C9A84C]">
                          <Star size={14} /> Description
                        </div>
                        <p className="text-sm text-[#4a4440] leading-relaxed">{selectedJob?.description}</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#C9A84C]">
                          <CheckCircle2 size={14} /> Responsibilities
                        </div>
                        <div className="space-y-2">
                          {selectedJob?.responsibilities?.map((r, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm text-[#4a4440]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-2 flex-shrink-0" />{r}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#C9A84C]">
                          <Zap size={14} /> Required Skills
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedJob?.skills?.map((s, i) => (
                            <span key={i} className="text-[11px] font-medium px-3 py-1 rounded-full bg-[#f7f4ee] border border-[#e0d9d1] text-[#4a4440]">{s}</span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#C9A84C]">
                          <BookOpen size={14} /> Qualifications
                        </div>
                        <div className="space-y-2">
                          {selectedJob?.qualifications?.map((q, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm text-[#4a4440]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-2 flex-shrink-0" />{q}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Form */}
                <div className="bg-white rounded-3xl border border-[#e5dfd7] p-6 md:p-10 shadow-sm">
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#f0ebe3]">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF8E6] border border-[#C9A84C33] flex items-center justify-center text-[#8a6e1e]">
                      <Send size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold">Apply for this role</h3>
                      <p className="text-xs text-[#9a8f85] mt-1">Currently viewing: <span className="text-[#C9A84C] font-bold uppercase tracking-wider">{selectedJob?.title}</span></p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Field label="Full Name" icon={<User size={13} />}>
                        <input className="w-full px-4 py-3 text-sm bg-[#FAFAF8] border border-[#e0d9d1] rounded-xl outline-none focus:border-[#C9A84C] transition-colors" type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="e.g. Rahul Sharma" />
                      </Field>
                      <Field label="Email Address" icon={<Mail size={13} />}>
                        <input className="w-full px-4 py-3 text-sm bg-[#FAFAF8] border border-[#e0d9d1] rounded-xl outline-none focus:border-[#C9A84C] transition-colors" type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="rahul@example.com" />
                      </Field>
                      <Field label="Phone Number" icon={<Phone size={13} />}>
                        <input className="w-full px-4 py-3 text-sm bg-[#FAFAF8] border border-[#e0d9d1] rounded-xl outline-none focus:border-[#C9A84C] transition-colors" type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                      </Field>
                      <Field label="Current City" icon={<Home size={13} />}>
                        <input className="w-full px-4 py-3 text-sm bg-[#FAFAF8] border border-[#e0d9d1] rounded-xl outline-none focus:border-[#C9A84C] transition-colors" type="text" name="city" required value={formData.city} onChange={handleChange} placeholder="e.g. Noida" />
                      </Field>
                      <Field label="Total Experience" icon={<Briefcase size={13} />}>
                        <input className="w-full px-4 py-3 text-sm bg-[#FAFAF8] border border-[#e0d9d1] rounded-xl outline-none focus:border-[#C9A84C] transition-colors" type="text" name="totalExperience" required value={formData.totalExperience} onChange={handleChange} placeholder="e.g. 4 Years" />
                      </Field>
                      <Field label="Current Role" icon={<Star size={13} />}>
                        <input className="w-full px-4 py-3 text-sm bg-[#FAFAF8] border border-[#e0d9d1] rounded-xl outline-none focus:border-[#C9A84C] transition-colors" type="text" name="currentOccupation" value={formData.currentOccupation} onChange={handleChange} placeholder="Current designation" />
                      </Field>
                      <Field label="Astro Experience" icon={<Sparkles size={13} />}>
                        <input className="w-full px-4 py-3 text-sm bg-[#FAFAF8] border border-[#e0d9d1] rounded-xl outline-none focus:border-[#C9A84C] transition-colors" type="text" name="astrologyExperience" value={formData.astrologyExperience} onChange={handleChange} placeholder="e.g. 2+ Years" />
                      </Field>
                      <Field label="Specialization" icon={<Globe size={13} />}>
                        <select className="w-full px-4 py-3 text-sm bg-[#FAFAF8] border border-[#e0d9d1] rounded-xl outline-none focus:border-[#C9A84C] transition-colors cursor-pointer" name="specialization" value={formData.specialization} onChange={handleChange}>
                          <option>Vedic Astrology</option>
                          <option>Tarot</option>
                          <option>Numerology</option>
                          <option>Palmistry</option>
                          <option>Face Reading</option>
                          <option>Kundli Analysis</option>
                          <option>Other</option>
                        </select>
                      </Field>
                      <Field label="Current Salary (LPA)" icon={<DollarSign size={13} />}>
                        <input className="w-full px-4 py-3 text-sm bg-[#FAFAF8] border border-[#e0d9d1] rounded-xl outline-none focus:border-[#C9A84C] transition-colors" type="text" name="currentSalary" value={formData.currentSalary} onChange={handleChange} placeholder="e.g. 5 LPA" />
                      </Field>
                      <Field label="Expected Salary (LPA)" icon={<DollarSign size={13} />}>
                        <input className="w-full px-4 py-3 text-sm bg-[#FAFAF8] border border-[#e0d9d1] rounded-xl outline-none focus:border-[#C9A84C] transition-colors" type="text" name="expectedSalary" value={formData.expectedSalary} onChange={handleChange} placeholder="e.g. 8 LPA" />
                      </Field>
                      <Field label="Notice Period" icon={<Clock size={13} />}>
                        <input className="w-full px-4 py-3 text-sm bg-[#FAFAF8] border border-[#e0d9d1] rounded-xl outline-none focus:border-[#C9A84C] transition-colors" type="text" name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} placeholder="e.g. 1 Month" />
                      </Field>
                      <Field label="Languages" icon={<Globe size={13} />}>
                        <input className="w-full px-4 py-3 text-sm bg-[#FAFAF8] border border-[#e0d9d1] rounded-xl outline-none focus:border-[#C9A84C] transition-colors" type="text" name="languages" value={formData.languages} onChange={handleChange} placeholder="English, Hindi…" />
                      </Field>
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#9a8f85]">
                        <Upload size={13} /> Resume / CV 
                        <span className="lowercase font-normal opacity-60">(PDF/DOC/DOCX - Max 5MB)</span>
                      </label>
                      <label htmlFor="resume-upload" className="block w-full py-10 border-2 border-dashed border-[#d4ccc2] rounded-2xl bg-[#FAFAF8] hover:bg-[#FFFDF5] hover:border-[#C9A84C] transition-all cursor-pointer text-center group">
                        <Upload size={24} className="mx-auto text-[#C9A84C] mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm text-[#9a8f85] font-medium">
                          {resume ? <span className="text-[#8a6e1e] font-bold">{resume.name}</span> : 'Click to upload or drag & drop'}
                        </span>
                        <input id="resume-upload" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setResume(e.target.files[0])} />
                      </label>
                    </div>

                    {/* Cover Message */}
                    <Field label="Cover Message" icon={<BookOpen size={13} />}>
                      <textarea className="w-full px-4 py-3 text-sm bg-[#FAFAF8] border border-[#e0d9d1] rounded-xl outline-none focus:border-[#C9A84C] transition-colors resize-none" rows={4} name="coverMessage" value={formData.coverMessage} onChange={handleChange} placeholder="Tell us about your journey and why you're a great fit…" />
                    </Field>

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-[#C9A84C] text-white rounded-xl font-bold shadow-lg shadow-[#C9A84C33] hover:bg-[#b8943d] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                      whileTap={{ scale: 0.98 }}
                    >
                      {submitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={18} /> Submit Application</>}
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

function Field({ label, icon, children }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#9a8f85]">
        {icon}{label}
      </label>
      {children}
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