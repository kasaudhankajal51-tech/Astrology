import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Briefcase, Users, Search, Download, ExternalLink,
  Trash2, Eye, FileText, MapPin, Mail, Phone,
  Plus, Edit3, XCircle, TrendingUp, CheckCircle,
  Clock, UserCheck, AlertCircle, ChevronDown,
  Sparkles, Building2, DollarSign, Calendar,
  ArrowUpRight, Filter, LayoutGrid, List
} from 'lucide-react';
import * as XLSX from 'xlsx';
import API_BASE from '../utils/api';

/* ─── Design Tokens ─────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=EB+Garamond:wght@400;500;600;700&display=swap');

  .aj-root { font-family: 'DM Sans', sans-serif; }
  .aj-heading { font-family: 'Syne', sans-serif; }
  .aj-serif { font-family: 'EB Garamond', serif; }

  .aj-grid-bg {
    background-image:
      linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
    background-size: 28px 28px;
  }

  @keyframes aj-slide-up {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes aj-fade-in {
    from { opacity:0; } to { opacity:1; }
  }
  @keyframes aj-spin-slow {
    to { transform: rotate(360deg); }
  }
  @keyframes aj-pulse-dot {
    0%,100% { transform:scale(1); opacity:1; }
    50%      { transform:scale(1.5); opacity:.6; }
  }

  .aj-slide-up   { animation: aj-slide-up .45s cubic-bezier(.22,1,.36,1) both; }
  .aj-fade-in    { animation: aj-fade-in .3s ease both; }
  .aj-stagger-1  { animation-delay: .06s; }
  .aj-stagger-2  { animation-delay: .12s; }
  .aj-stagger-3  { animation-delay: .18s; }
  .aj-stagger-4  { animation-delay: .24s; }

  .aj-card-hover {
    transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s ease;
  }
  .aj-card-hover:hover { transform: translateY(-3px); }

  .aj-row-hover { transition: background .15s ease; }
  .aj-row-hover:hover { background: rgba(99,102,241,.035); }

  .aj-btn-primary {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 8px 20px -6px rgba(79, 70, 229, 0.4);
  }
  .aj-btn-primary::after {
    content:''; position:absolute; inset:0;
    background: linear-gradient(135deg, rgba(255,255,255,.2) 0%, transparent 60%);
    opacity:0; transition:opacity .3s;
  }
  .aj-btn-primary:hover { 
    transform:translateY(-2px); 
    box-shadow: 0 12px 25px -5px rgba(79, 70, 229, 0.5);
    filter: brightness(1.05);
  }
  .aj-btn-primary:hover::after { opacity:1; }
  .aj-btn-primary:active { transform:translateY(0); }

  .aj-btn-secondary {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    color: #64748b;
    transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .aj-btn-secondary:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
    color: #1e293b;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }


  .aj-tab {
    position: relative;
    transition: color .2s ease;
  }
  .aj-tab::after {
    content:''; position:absolute; bottom:-2px; left:0; right:0;
    height:2px; background:#6366f1; border-radius:2px;
    transform:scaleX(0); transition:transform .25s cubic-bezier(.22,1,.36,1);
  }
  .aj-tab.active { color:#6366f1; }
  .aj-tab.active::after { transform:scaleX(1); }

  .aj-status-select {
    appearance: none;
    cursor: pointer;
    transition: box-shadow .15s ease;
  }
  .aj-status-select:focus { outline:none; box-shadow:0 0 0 3px rgba(99,102,241,.2); }

  .aj-modal-enter { animation: aj-slide-up .3s cubic-bezier(.22,1,.36,1) both; }
  .aj-modal-overlay { animation: aj-fade-in .2s ease both; }

  .aj-input {
    transition: border-color .15s, box-shadow .15s;
  }
  .aj-input:focus {
    outline:none;
    border-color:#6366f1;
    box-shadow:0 0 0 3px rgba(99,102,241,.08);
  }

  .aj-avatar {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    transition: transform .2s ease;
  }
  .aj-row-hover:hover .aj-avatar { transform: scale(1.06); }

  .aj-resume-btn {
    transition: all .2s ease;
    border: 1px solid rgba(99,102,241,.15);
  }
  .aj-resume-btn:hover { background:#6366f1; color:#fff; border-color:#6366f1; transform:scale(1.08); }

  .aj-del-btn {
    transition: all .2s ease;
    border: 1px solid rgba(239,68,68,.12);
  }
  .aj-del-btn:hover { background:#ef4444; color:#fff; border-color:#ef4444; transform:scale(1.08); }

  .aj-action-btn {
    transition: all .2s ease;
    border: 1px solid rgba(107,114,128,.12);
  }
  .aj-action-btn:hover { background:#111827; color:#fff; border-color:#111827; transform:scale(1.08); }

  .aj-scrollbar::-webkit-scrollbar { width:5px; height:5px; }
  .aj-scrollbar::-webkit-scrollbar-track { background:transparent; }
  .aj-scrollbar::-webkit-scrollbar-thumb { background:rgba(99,102,241,.2); border-radius:99px; }

  .aj-shine {
    position:relative; overflow:hidden;
  }
  .aj-shine::before {
    content:''; position:absolute; top:0; left:-100%;
    width:60%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);
    transition:left .5s ease;
  }
  .aj-shine:hover::before { left:150%; }

  .aj-dot-pulse { animation: aj-pulse-dot 1.8s ease-in-out infinite; }
  
  .aj-number-animate {
    display:inline-block;
    transition:transform .3s cubic-bezier(.22,1,.36,1);
  }

  /* Image specific styles */
  .aj-section-card {
    background: white;
    border-radius: 12px;
    border: 1px solid #F0F0F5;
    margin-bottom: 24px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
  }

  @media (min-width: 768px) {
    .aj-section-card {
      padding: 32px 48px;
    }
  }


  .aj-section-header {
    padding: 0;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }


  .aj-icon-box {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .aj-input-label {
    font-size: 9px;
    font-weight: 800;
    color: #94A3B8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 6px;
    display: block;
  }

  .aj-premium-input {
    width: 100%;
    padding: 8px 12px;
    font-size: 13px;
    color: #1E293B;
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    transition: all 0.2s;
  }


  .aj-premium-input:focus {
    outline: none;
    border-color: #6366F1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.05);
  }

`;

const STATUS_CONFIG = {
  Pending:      { color: 'bg-amber-50 text-amber-700',    dot: 'bg-amber-400',   ring: 'ring-amber-200' },
  Reviewed:     { color: 'bg-slate-50 text-slate-600',    dot: 'bg-slate-400',   ring: 'ring-slate-200' },
  Shortlisted:  { color: 'bg-violet-50 text-violet-700',  dot: 'bg-violet-500',  ring: 'ring-violet-200' },
  Interviewing: { color: 'bg-blue-50 text-blue-700',      dot: 'bg-blue-500',    ring: 'ring-blue-200' },
  Selected:     { color: 'bg-emerald-50 text-emerald-700',dot: 'bg-emerald-500', ring: 'ring-emerald-200' },
  Rejected:     { color: 'bg-rose-50 text-rose-700',      dot: 'bg-rose-400',    ring: 'ring-rose-200' },
};

const EMPTY_JOB = {
  title:'', department:'', location:'', experience:'',
  type:'Full-time', salary:'', description:'',
  responsibilities:'', requirements:'', skills:'', qualifications:''
};

/* ─── Stat Card ─────────────────────────────────────────── */
const StatCard = ({ label, value, icon: Icon, accent, delay = '' }) => (
  <div className={`aj-card-hover aj-slide-up ${delay} rounded-xl p-4 flex items-center justify-between overflow-hidden relative`}
    style={{ 
      background: `linear-gradient(135deg, ${accent}15 0%, #ffffff 100%)`,
      border: `1px solid ${accent}30`,
      boxShadow: `0 10px 25px -5px ${accent}15, 0 8px 10px -6px ${accent}15`
    }}>
    <div className="absolute inset-0 opacity-[0.05]"
      style={{ backgroundImage:`radial-gradient(circle at 80% 20%, ${accent} 0%, transparent 70%)` }} />
    <div className="relative z-10">
      <p className="aj-heading text-[9px] font-800 uppercase tracking-[.15em] mb-1" style={{ color: accent }}>{label}</p>
      <p className="aj-heading text-xl font-900 text-slate-900 leading-none">{value}</p>
    </div>
    <div className="w-9 h-9 rounded-xl flex items-center justify-center aj-shine relative z-10 shadow-md"
      style={{ background: accent }}>
      <Icon size={16} className="text-white" />
    </div>
  </div>
);

/* ─── Main Component ─────────────────────────────────────── */
const AdminJobs = () => {
  const [view, setView]               = useState('applications');
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs]               = useState([]);
  const [loading, setLoading]         = useState(false);
  const [searchTerm, setSearchTerm]   = useState('');
  const [roleFilter, setRoleFilter]   = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob]   = useState(null);
  const [jobFormData, setJobFormData] = useState(EMPTY_JOB);
  const [selectedApp, setSelectedApp] = useState(null);

  const token  = localStorage.getItem('adminToken');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => { fetchApplications(); fetchJobs(); }, []);
  useEffect(() => { fetchApplications(); }, [roleFilter, statusFilter]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_BASE}/api/jobs/applications?role=${roleFilter}&status=${statusFilter}&search=${searchTerm}`,
        config
      );
      if (data.success) setApplications(data.applications);
    } catch { toast.error('Failed to fetch applications'); }
    finally { setLoading(false); }
  };

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/jobs`);
      if (data.success) setJobs(data.jobs);
    } catch (e) { console.error(e); }
  };

  const stats = useMemo(() => ({
    total:        applications.length,
    shortlisted:  applications.filter(a => a.status === 'Shortlisted').length,
    interviewing: applications.filter(a => a.status === 'Interviewing').length,
    selected:     applications.filter(a => a.status === 'Selected').length,
  }), [applications]);

  const visibleApps = useMemo(() => {
    if (!searchTerm.trim()) return applications;
    const q = searchTerm.toLowerCase();
    return applications.filter(a =>
      a.fullName?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q)
    );
  }, [applications, searchTerm]);

  const handleStatusUpdate = async (id, status) => {
    try {
      const { data } = await axios.put(`${API_BASE}/api/jobs/applications/${id}`, { status }, config);
      if (data.success) {
        setApplications(prev => prev.map(a => a._id === id ? { ...a, status } : a));
        toast.success('Status updated');
      }
    } catch { toast.error('Failed to update status'); }
  };

  const handleDeleteApplication = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      const { data } = await axios.delete(`${API_BASE}/api/jobs/applications/${id}`, config);
      if (data.success) {
        setApplications(prev => prev.filter(a => a._id !== id));
        toast.success('Application deleted');
      }
    } catch { toast.error('Failed to delete'); }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Delete this job posting?')) return;
    try {
      await axios.delete(`${API_BASE}/api/jobs/${id}`, config);
      setJobs(prev => prev.filter(j => j._id !== id));
      toast.success('Job removed');
    } catch { toast.error('Failed to delete job'); }
  };

  const openEditJob = (job) => {
    setEditingJob(job);
    setJobFormData({
      ...job,
      responsibilities: job.responsibilities?.join('\n') || '',
      requirements:     job.requirements?.join('\n') || '',
      skills:           job.skills?.join(', ') || '',
      qualifications:   job.qualifications?.join('\n') || '',
    });
    setShowJobModal(true);
  };

  const openAddJob = () => {
    setEditingJob(null);
    setJobFormData(EMPTY_JOB);
    setShowJobModal(true);
  };

  const closeModal = () => { setShowJobModal(false); setEditingJob(null); };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...jobFormData,
      responsibilities: jobFormData.responsibilities.split('\n').filter(r => r.trim()),
      requirements:     jobFormData.requirements.split('\n').filter(r => r.trim()),
      skills:           jobFormData.skills.split(',').map(s => s.trim()).filter(Boolean),
      qualifications:   jobFormData.qualifications.split('\n').filter(q => q.trim()),
    };
    try {
      let res;
      if (editingJob) {
        res = await axios.put(`${API_BASE}/api/jobs/${editingJob._id}`, payload, config);
      } else {
        res = await axios.post(`${API_BASE}/api/jobs`, payload, config);
      }
      if (res.data.success) {
        toast.success(editingJob ? 'Job updated' : 'Job posted');
        closeModal(); fetchJobs();
      }
    } catch { toast.error('Operation failed'); }
  };

  const exportToExcel = () => {
    const rows = applications.map(app => ({
      'Applied Date':     new Date(app.createdAt).toLocaleDateString(),
      'Full Name':        app.fullName,
      'Email':            app.email,
      'Phone':            app.phone,
      'City':             app.city,
      'Position':         app.appliedRole,
      'Status':           app.status,
      'Total Experience': app.totalExperience,
      'Astrology Exp':    app.astrologyExperience,
      'Specialization':   app.specialization,
      'Current Salary':   app.currentSalary,
      'Expected Salary':  app.expectedSalary,
      'Notice Period':    app.noticePeriod,
      'Languages':        app.languages,
      'Resume Link':      `${API_BASE}${app.resumeUrl}`,
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Applications');
    XLSX.writeFile(wb, `Applications_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const field = (key) => ({
    value: jobFormData[key],
    onChange: (e) => setJobFormData(prev => ({ ...prev, [key]: e.target.value }))
  });

  const getInitials = (name = '') =>
    name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  /* ─────────────────────────────────── RENDER ─────── */
  return (
    <>
      <style>{css}</style>
      <div className="aj-root aj-grid-bg min-h-screen bg-[#f7f7fb] px-4 md:px-12 lg:px-24 py-10 space-y-10">

        {/* ── Top Header ── */}
        <div className="aj-slide-up flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                <Sparkles size={16} className="text-white" />
              </div>
              <h1 className="aj-heading text-2xl font-800 text-slate-900 tracking-tight">Careers Hub</h1>
            </div>
            <p className="text-sm text-slate-400 font-400 ml-11">Recruitment pipeline & job management</p>
          </div>

          {/* Tab Switch + CTA */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Pill Tabs */}
            <div className="flex items-center bg-white rounded-xl p-1 border border-slate-200/80 shadow-sm">
              <button
                onClick={() => setView('applications')}
                className={`aj-tab flex items-center gap-2 px-4 py-2 text-sm font-600 rounded-lg transition-all duration-200 ${view === 'applications' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Users size={15} /> Candidates
              </button>
              <button
                onClick={() => setView('jobs')}
                className={`aj-tab flex items-center gap-2 px-4 py-2 text-sm font-600 rounded-lg transition-all duration-200 ${view === 'jobs' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Briefcase size={15} /> Positions
              </button>
            </div>

            {view === 'applications' ? (
              <button onClick={exportToExcel}
                className="aj-btn-primary aj-shine flex items-center gap-2 px-5 py-2.5 text-sm font-600 text-white rounded-xl shadow-lg shadow-slate-900/20">
                <Download size={16} /> Export
              </button>
            ) : (
              <button onClick={openAddJob}
                className="aj-shine flex items-center gap-2 px-5 py-2.5 text-sm font-600 text-white rounded-xl shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
                style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                <Plus size={16} /> New Position
              </button>
            )}
          </div>
        </div>

        {/* ── Stats Row ── */}
        {view === 'applications' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-2">
            <StatCard label="Total Applied"  value={stats.total}        icon={TrendingUp}  accent="#6366f1" delay="aj-stagger-1" />
            <StatCard label="Shortlisted"    value={stats.shortlisted}  icon={UserCheck}   accent="#8b5cf6" delay="aj-stagger-2" />
            <StatCard label="Interviewing"   value={stats.interviewing} icon={Clock}       accent="#f59e0b" delay="aj-stagger-3" />
            <StatCard label="Offer Extended" value={stats.selected}     icon={CheckCircle} accent="#10b981" delay="aj-stagger-4" />
          </div>
        )}

        {/* ── Filter Bar ── */}
        {view === 'applications' && (
          <div className="aj-slide-up aj-stagger-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 min-w-[280px] group">
                <input
                  type="text"
                  placeholder="Search by candidate name or email…"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && fetchApplications()}
                  className="aj-input w-full px-5 pr-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all"
                />
              </div>

              {/* Role Filter */}
              <div className="relative min-w-[180px]">
                <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
                  className="aj-input aj-status-select w-full px-4 py-3 pr-10 text-sm bg-slate-50/50 border border-slate-200 rounded-xl text-slate-700 appearance-none focus:bg-white transition-all">
                  <option value="">All Job Roles</option>
                  {jobs.map(j => <option key={j._id} value={j.title}>{j.title}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* Status Filter */}
              <div className="relative min-w-[170px]">
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                  className="aj-input aj-status-select w-full px-4 py-3 pr-10 text-sm bg-slate-50/50 border border-slate-200 rounded-xl text-slate-700 appearance-none focus:bg-white transition-all">
                  <option value="">All Statuses</option>
                  {Object.keys(STATUS_CONFIG).map(s => <option key={s}>{s}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

            </div>
          </div>
        )}

        {/* ── Main Table Panel ── */}
        <div className="aj-slide-up aj-stagger-3 bg-white rounded-2xl border border-slate-200/80 overflow-hidden"
          style={{ boxShadow:'0 2px 8px rgba(0,0,0,.05), 0 12px 40px rgba(0,0,0,.04)' }}>

          {/* ── Applications Table ── */}
          {view === 'applications' && (
            <div className="overflow-x-auto aj-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ borderBottom:'1px solid #f1f5f9' }}>
                    {[
                      { label:'Candidate', w:'min-w-[220px]' },
                      { label:'Applied Role', w:'min-w-[150px]' },
                      { label:'Experience', w:'min-w-[140px]' },
                      { label:'Compensation', w:'min-w-[130px]' },
                      { label:'Status', w:'min-w-[140px]' },
                      { label:'Actions', w:'min-w-[100px]' },
                    ].map(({ label, w }) => (
                      <th key={label}
                        className={`${w} px-4 py-4`}
                        style={{ background:'#fafafa' }}>
                        <span className="aj-heading text-[10px] font-800 uppercase tracking-[.12em] text-slate-400">{label}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-24 text-center">
                        <div className="flex flex-col items-center gap-3 text-slate-400">
                          <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500"
                            style={{ animation:'aj-spin-slow 1s linear infinite' }} />
                          <span className="text-sm font-500">Loading candidates…</span>
                        </div>
                      </td>
                    </tr>
                  ) : visibleApps.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-24 text-center">
                        <div className="flex flex-col items-center gap-2 text-slate-400">
                          <Users size={32} className="opacity-30" />
                          <span className="text-sm">No applications found</span>
                        </div>
                      </td>
                    </tr>
                  ) : visibleApps.map((app, i) => {
                    const sc = STATUS_CONFIG[app.status] || STATUS_CONFIG.Pending;
                    return (
                      <tr key={app._id} className="aj-row-hover" style={{ borderBottom:'1px solid #f8fafc' }}>

                        {/* Candidate */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="aj-avatar w-10 h-10 rounded-xl text-white text-xs font-800 flex items-center justify-center shrink-0 shadow-md shadow-indigo-200/60">
                              {getInitials(app.fullName)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="aj-heading font-700 text-slate-900 text-sm truncate">{app.fullName}</p>
                              <p className="text-[11px] text-slate-400 truncate mt-0.5 flex items-center gap-1">
                                <Mail size={10} className="shrink-0" />{app.email}
                              </p>
                              <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                                <MapPin size={10} className="shrink-0 text-rose-400" />{app.city}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="px-4 py-4">
                          <div className="max-w-[150px]">
                            <span className="inline-block aj-heading text-[9px] font-800 uppercase tracking-wider px-2 py-0.5 rounded-lg text-indigo-700 bg-indigo-50 border border-indigo-100 truncate w-full text-center">
                              {app.appliedRole}
                            </span>
                            {app.specialization && (
                              <p className="text-[10px] text-slate-500 mt-1.5 font-500 truncate">{app.specialization}</p>
                            )}
                          </div>
                        </td>

                        {/* Experience */}
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0"></span>
                              <span className="text-[11px] text-slate-500 truncate">Total: <b className="text-slate-700 font-600">{app.totalExperience}</b></span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0"></span>
                              <span className="text-[11px] text-slate-500 truncate">Astro: <b className="text-slate-700 font-600">{app.astrologyExperience}</b></span>
                            </div>
                          </div>
                        </td>

                        {/* Compensation */}
                        <td className="px-4 py-4">
                          <div className="bg-slate-50 rounded-xl px-2.5 py-1.5 border border-slate-100 w-fit min-w-[100px]">
                            <p className="text-[9px] text-slate-400 font-700 uppercase tracking-wide">Expected</p>
                            <p className="aj-heading text-xs font-800 text-emerald-700 mt-0.5 truncate">{app.expectedSalary}</p>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <div className="relative max-w-[140px]">
                            <div className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${sc.dot} aj-dot-pulse z-10 pointer-events-none`} />
                            <select
                              value={app.status}
                              onChange={e => handleStatusUpdate(app._id, e.target.value)}
                              className={`aj-status-select w-full text-[10px] font-800 pl-6 pr-6 py-1.5 rounded-xl ring-1 ring-inset ${sc.color} ${sc.ring}`}
                            >
                              {Object.keys(STATUS_CONFIG).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <a href={`${API_BASE}${app.resumeUrl}`} target="_blank" rel="noopener noreferrer"
                              className="aj-resume-btn w-7 h-7 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600" title="View Resume">
                              <FileText size={14} />
                            </a>
                            <button onClick={() => setSelectedApp(app)}
                              className="aj-action-btn w-7 h-7 flex items-center justify-center rounded-lg bg-slate-50 text-slate-500" title="Quick View">
                              <Eye size={14} />
                            </button>
                            <button onClick={() => handleDeleteApplication(app._id)}
                              className="aj-del-btn w-7 h-7 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500" title="Delete">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Jobs Table ── */}
          {view === 'jobs' && (
            <div className="overflow-x-auto aj-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ borderBottom:'1px solid #f1f5f9' }}>
                    {['Position', 'Department', 'Location', 'Type', 'Experience', 'Actions'].map((h, i) => (
                      <th key={h} className={`${i === 0 ? 'pl-5' : 'px-6'} py-4`} style={{ background:'#fafafa' }}>
                        <span className="aj-heading text-[10px] font-700 uppercase tracking-[.12em] text-slate-400">{h}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {jobs.length === 0 ? (
                    <tr><td colSpan={6} className="py-24 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <Briefcase size={32} className="opacity-30" />
                        <span className="text-sm">No active job postings</span>
                      </div>
                    </td></tr>
                  ) : jobs.map(job => (
                    <tr key={job._id} className="aj-row-hover" style={{ borderBottom:'1px solid #f8fafc' }}>
                      <td className="pl-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                            <Briefcase size={16} className="text-indigo-600" />
                          </div>
                          <span className="aj-heading font-700 text-slate-900 text-sm">{job.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                          <Building2 size={13} className="text-slate-400 shrink-0" />
                          {job.department}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                          <MapPin size={13} className="text-rose-400 shrink-0" />
                          {job.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-700 uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                          {job.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-600 font-500">{job.experience}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => openEditJob(job)}
                            className="aj-action-btn w-8 h-8 flex items-center justify-center rounded-xl bg-amber-50 text-amber-600 border-amber-100 hover:!bg-amber-500 hover:!text-white hover:!border-amber-500">
                            <Edit3 size={15} />
                          </button>
                          <button onClick={() => handleDeleteJob(job._id)}
                            className="aj-del-btn w-8 h-8 flex items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Cover Message Preview ── */}
        {selectedApp && (
          <div className="aj-modal-overlay fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedApp(null)}>
            <div className="aj-modal-enter bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="aj-heading font-700 text-slate-900">{selectedApp.fullName}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedApp.appliedRole}</p>
                </div>
                <button onClick={() => setSelectedApp(null)}
                  className="text-slate-400 hover:text-slate-600 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors">
                  <XCircle size={18} />
                </button>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-sm text-slate-600 leading-relaxed min-h-[100px]">
                {selectedApp.coverMessage || <span className="italic text-slate-400">No cover message provided.</span>}
              </div>
            </div>
          </div>
        )}

        {/* ── Job Modal ── */}
        {showJobModal && (
          <div className="aj-modal-overlay fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="aj-modal-enter bg-[#F8F9FB] rounded-[24px] w-full max-w-5xl max-h-[96vh] flex flex-col shadow-2xl overflow-hidden">

              {/* Modal Header */}
              <div className="pl-14 pr-10 py-8 bg-white flex justify-between items-center shrink-0">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#5E46E5] flex items-center justify-center shadow-lg shadow-indigo-100 ml-2">
                    <Plus size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="aj-serif font-700 text-[#43241C] text-3xl leading-tight">
                      {editingJob ? 'Update Job Posting' : 'New Job Posting'}
                    </h3>
                    <p className="text-base text-[#8B6D5C] mt-1">
                      {editingJob ? 'Refine the details of this opening' : 'Fill in the details to publish this opening'}
                    </p>
                  </div>
                </div>
                <button onClick={closeModal}
                  className="text-slate-300 hover:text-slate-500 transition-colors">
                  <XCircle size={32} strokeWidth={1.5} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto aj-scrollbar px-10 py-10 flex-1">
                <form onSubmit={handleJobSubmit} id="job-form" className="space-y-8">


                  {/* Section: Core Details */}
                  <div className="aj-section-card shadow-sm border border-slate-100 mt-4">
                    <div className="aj-section-header">
                      <div className="aj-icon-box bg-[#6366F120]">
                        <Briefcase size={18} className="text-[#6366F1]" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-700 uppercase tracking-wider text-[#4D4D99]">Core Job Details</h4>
                        <p className="text-[11px] text-[#8B6D5C]">Essential identification for the role</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">


                      {[
                        { key:'title',      label:'Job Title',   ph:'e.g. Vedic Astrologer' },
                        { key:'department', label:'Department',  ph:'e.g. Consultation' },
                        { key:'location',   label:'Location',    ph:'e.g. Remote, Delhi' },
                      ].map(({ key, label, ph }) => (
                        <div key={key}>
                          <label className="aj-input-label">{label}</label>
                          <input type="text" required placeholder={ph} {...field(key)}
                            className="aj-premium-input" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section: Employment Terms */}
                  <div className="aj-section-card shadow-sm border border-slate-100">
                    <div className="aj-section-header">
                      <div className="aj-icon-box bg-[#4F46E520]">
                        <DollarSign size={18} className="text-[#4F46E5]" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-700 uppercase tracking-wider text-[#4D4D99]">Employment Terms</h4>
                        <p className="text-[11px] text-[#8B6D5C]">Contractual and financial specifics</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">


                      <div>
                        <label className="aj-input-label">Experience Required</label>
                        <input type="text" required placeholder="e.g. 2–5 Years" {...field('experience')}
                          className="aj-premium-input" />
                      </div>
                      <div>
                        <label className="aj-input-label">Employment Type</label>
                        <div className="relative">
                          <select {...field('type')}
                            className="aj-premium-input appearance-none pr-10">
                            {['Full-time','Part-time','Freelance','Contract'].map(t => <option key={t}>{t}</option>)}
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="aj-input-label">Salary Range</label>
                        <input type="text" required placeholder="₹40k – ₹70k / mo" {...field('salary')}
                          className="aj-premium-input" />
                      </div>
                    </div>
                  </div>

                  {/* Section: Job Content */}
                  <div className="aj-section-card shadow-sm border border-slate-100">
                    <div className="aj-section-header">
                      <div className="aj-icon-box bg-[#10B98120]">
                        <FileText size={18} className="text-[#10B981]" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-700 uppercase tracking-wider text-[#4D4D99]">Job Content</h4>
                        <p className="text-[11px] text-[#8B6D5C]">Detailed role responsibilities and requirements</p>
                      </div>
                    </div>
                    <div className="space-y-5">


                      <div>
                        <label className="aj-input-label">Detailed Description</label>
                        <textarea required rows={4} {...field('description')}
                          className="aj-premium-input resize-none" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>
                          <label className="aj-input-label">Responsibilities <span className="lowercase font-500 opacity-60">(one per line)</span></label>
                          <textarea rows={4} {...field('responsibilities')}
                            className="aj-premium-input resize-none" />
                        </div>
                        <div>
                          <label className="aj-input-label">Requirements <span className="lowercase font-500 opacity-60">(one per line)</span></label>
                          <textarea rows={4} {...field('requirements')}
                            className="aj-premium-input resize-none" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="aj-input-label">Skills <span className="lowercase font-500 opacity-60">(comma separated)</span></label>
                          <input type="text" placeholder="Vedic Astrology, Sales, Communication" {...field('skills')}
                            className="aj-premium-input" />
                        </div>
                        <div>
                          <label className="aj-input-label">Qualifications <span className="lowercase font-500 opacity-60">(one per line)</span></label>
                          <textarea rows={2} {...field('qualifications')}
                            className="aj-premium-input resize-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="px-10 py-6 bg-white border-t border-slate-100 flex justify-center items-center shrink-0">
                <div className="w-full max-w-[600px] flex justify-end items-center gap-4 px-12">
                  <button type="button" onClick={closeModal}
                    className="aj-btn-secondary px-10 py-3 text-sm font-600 rounded-xl active:scale-95">
                    Cancel
                  </button>
                  <button type="submit" form="job-form"
                    className="aj-btn-primary aj-shine px-10 py-3 text-sm font-800 text-white rounded-xl active:scale-95 flex items-center gap-2">
                    {editingJob ? <Edit3 size={16} /> : <CheckCircle size={16} />}
                    {editingJob ? 'Update Position' : 'Publish Position'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>
    </>
  );
};

export default AdminJobs;