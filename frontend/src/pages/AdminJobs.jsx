import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Briefcase, Users, Search, Download, ExternalLink,
  Trash2, Eye, FileText, MapPin, Mail, Phone,
  Plus, Edit3, XCircle, TrendingUp, CheckCircle,
  Clock, UserCheck, AlertCircle
} from 'lucide-react';
import * as XLSX from 'xlsx';
import API_BASE from '../utils/api';

const STATUS_CONFIG = {
  Pending:      { color: 'bg-amber-100 text-amber-700',   dot: 'bg-amber-400' },
  Reviewed:     { color: 'bg-gray-100 text-gray-600',     dot: 'bg-gray-400' },
  Shortlisted:  { color: 'bg-indigo-100 text-indigo-700', dot: 'bg-indigo-500' },
  Interviewing: { color: 'bg-blue-100 text-blue-700',     dot: 'bg-blue-500' },
  Selected:     { color: 'bg-green-100 text-green-700',   dot: 'bg-green-500' },
  Rejected:     { color: 'bg-red-100 text-red-700',       dot: 'bg-red-400' },
};

const EMPTY_JOB = {
  title: '', department: '', location: '', experience: '',
  type: 'Full-time', salary: '', description: '',
  responsibilities: '', requirements: '', skills: '', qualifications: ''
};

/* ─── Stat Card ─────────────────────────────────────────── */
const StatCard = ({ label, value, icon: Icon, color, trend }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between group hover:shadow-md transition-all duration-300">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} shadow-sm group-hover:scale-110 transition-transform`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-2xl font-extrabold text-gray-800 leading-tight">{value}</p>
      </div>
    </div>
    {trend && (
      <div className="text-right">
        <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">+{trend}%</span>
      </div>
    )}
  </div>
);

/* ─── Main Component ─────────────────────────────────────── */
const AdminJobs = () => {
  const [view, setView] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm]   = useState('');
  const [roleFilter, setRoleFilter]   = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob]     = useState(null);
  const [jobFormData, setJobFormData]   = useState(EMPTY_JOB);

  const token  = localStorage.getItem('adminToken');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  /* ── Fetch ── */
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

  /* ── Stats ── */
  const stats = useMemo(() => ({
    total:        applications.length,
    shortlisted:  applications.filter(a => a.status === 'Shortlisted').length,
    interviewing: applications.filter(a => a.status === 'Interviewing').length,
    selected:     applications.filter(a => a.status === 'Selected').length,
  }), [applications]);

  /* ── Client-side search filter ── */
  const visibleApps = useMemo(() => {
    if (!searchTerm.trim()) return applications;
    const q = searchTerm.toLowerCase();
    return applications.filter(a =>
      a.fullName?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q)
    );
  }, [applications, searchTerm]);

  /* ── Handlers ── */
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
        closeModal();
        fetchJobs();
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
    XLSX.writeFile(wb, `DS_Astro_Applications_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const field = (key) => ({
    value: jobFormData[key],
    onChange: (e) => setJobFormData(prev => ({ ...prev, [key]: e.target.value }))
  });

  /* ─────────────────────────────────── RENDER ──────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50/30 p-4 md:p-8 space-y-10">

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 px-1">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <span className="bg-indigo-600 w-2.5 h-8 rounded-full"></span>
            Careers &amp; Hiring
          </h2>
          <p className="text-sm text-gray-500 font-medium ml-5 italic">Streamline your recruitment process and job management</p>
        </div>
        
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button
            onClick={() => setView(v => v === 'applications' ? 'jobs' : 'applications')}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all active:scale-95"
          >
            {view === 'applications' ? <><Briefcase size={18} className="text-indigo-500" /> Manage Jobs</> : <><Users size={18} className="text-indigo-500" /> Applications</>}
          </button>
          
          {view === 'applications' ? (
            <button onClick={exportToExcel} className="flex-1 lg:flex-none flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-black shadow-lg shadow-gray-200 transition-all active:scale-95">
              <Download size={18} /> Export Data
            </button>
          ) : (
            <button onClick={openAddJob} className="flex-1 lg:flex-none flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">
              <Plus size={18} /> New Posting
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      {view === 'applications' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Applications" value={stats.total}        icon={TrendingUp}  color="bg-indigo-100 text-indigo-600" trend="12" />
          <StatCard label="Shortlisted"       value={stats.shortlisted}  icon={UserCheck}   color="bg-blue-100 text-blue-600" />
          <StatCard label="Interviewing"      value={stats.interviewing} icon={Clock}       color="bg-amber-100 text-amber-600" />
          <StatCard label="Final Selected"    value={stats.selected}     icon={CheckCircle} color="bg-green-100 text-green-600" />
        </div>
      )}

      {/* Filter Section */}
      {view === 'applications' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Search size={16} className="text-indigo-600" />
            </div>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest pt-7">Filter Candidates</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input
                type="text" placeholder="Search by name / email…"
                value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && fetchApplications()}
                className="w-full pl-12 pr-4 py-3.5 text-sm bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all outline-none shadow-sm"
              />
            </div>
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
              className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all appearance-none cursor-pointer shadow-sm">
              <option value="">All Job Roles</option>
              {jobs.map(j => <option key={j._id} value={j.title}>{j.title}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3.5 text-sm bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all appearance-none cursor-pointer shadow-sm">
              <option value="">All Statuses</option>
              {Object.keys(STATUS_CONFIG).map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={fetchApplications}
              className="bg-gray-900 text-white text-sm px-6 py-3.5 rounded-2xl hover:bg-black font-bold shadow-lg shadow-gray-200 transition-all active:scale-95">
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Main Table Content */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">

        {/* ── Applications Table ── */}
        {view === 'applications' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  {['Candidate Information', 'Role Details', 'Experience & Pay', 'Application Status', 'Actions'].map(h => (
                    <th key={h} className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={5} className="text-center py-24 text-gray-400 font-medium">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                      Processing candidate data…
                    </div>
                  </td></tr>
                ) : visibleApps.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-24 text-gray-400 font-medium italic">No applications found in the database.</td></tr>
                ) : visibleApps.map(app => (
                  <tr key={app._id} className="hover:bg-indigo-50/20 transition-all duration-200 group">

                    {/* Candidate */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white text-sm font-black flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
                          {app.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-extrabold text-gray-900 text-base">{app.fullName}</p>
                          <div className="flex flex-col gap-1">
                            <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5"><Mail size={12} className="text-indigo-400" />{app.email}</p>
                            <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5"><Phone size={12} className="text-indigo-400" />{app.phone}</p>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-8 py-6">
                      <div className="space-y-2">
                        <span className="text-[10px] font-black bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm">{app.appliedRole}</span>
                        <div>
                          <p className="text-sm text-gray-700 font-bold">{app.specialization}</p>
                          <p className="text-[11px] text-gray-400 font-semibold flex items-center gap-1.5 mt-1"><MapPin size={11} className="text-red-400" />{app.city}</p>
                        </div>
                      </div>
                    </td>

                    {/* Exp */}
                    <td className="px-8 py-6">
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1">
                        <p className="text-[11px] text-gray-500 font-bold uppercase">Total Exp: <span className="text-gray-900">{app.totalExperience}</span></p>
                        <p className="text-[11px] text-gray-500 font-bold uppercase">Astro Exp: <span className="text-gray-900">{app.astrologyExperience}</span></p>
                        <p className="text-xs text-indigo-600 font-black pt-1 border-t border-gray-200 mt-1">Exp. {app.expectedSalary}</p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-8 py-6">
                      <div className="relative inline-block w-full">
                        <select
                          value={app.status}
                          onChange={e => handleStatusUpdate(app._id, e.target.value)}
                          className={`w-full text-[11px] font-black px-4 py-2 rounded-xl border-none ring-1 ring-inset shadow-sm cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none ${STATUS_CONFIG[app.status]?.color || 'bg-gray-100 text-gray-600 ring-gray-200'}`}
                        >
                          {Object.keys(STATUS_CONFIG).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                          <Edit3 size={12} />
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <a href={`${API_BASE}${app.resumeUrl}`} target="_blank" rel="noopener noreferrer"
                          className="w-9 h-9 flex items-center justify-center text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white rounded-xl transition-all" title="View Resume">
                          <FileText size={18} />
                        </a>
                        <button onClick={() => alert(`Cover Message:\n\n${app.coverMessage || 'No cover message provided.'}`)}
                          className="w-9 h-9 flex items-center justify-center text-gray-500 bg-gray-50 hover:bg-gray-200 rounded-xl transition-all" title="View Message">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => handleDeleteApplication(app._id)}
                          className="w-9 h-9 flex items-center justify-center text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition-all" title="Delete Candidate">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Jobs Table ── */}
        {view === 'jobs' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  {['Position / Title', 'Department', 'Job Location', 'Commitment', 'Actions'].map(h => (
                    <th key={h} className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jobs.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-24 text-gray-400 font-medium italic">No job postings currently active.</td></tr>
                ) : jobs.map(job => (
                  <tr key={job._id} className="hover:bg-indigo-50/20 transition-all duration-200 group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <Briefcase size={20} />
                        </div>
                        <p className="font-extrabold text-gray-900 text-base">{job.title}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">{job.department}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-1.5 text-gray-600 font-medium text-sm">
                        <MapPin size={14} className="text-red-400" />
                        {job.location}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm">{job.type}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEditJob(job)}
                          className="w-10 h-10 flex items-center justify-center text-amber-500 bg-amber-50 hover:bg-amber-500 hover:text-white rounded-xl transition-all" title="Edit Job Details">
                          <Edit3 size={18} />
                        </button>
                        <button onClick={() => handleDeleteJob(job._id)}
                          className="w-10 h-10 flex items-center justify-center text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition-all" title="Remove Job Posting">
                          <Trash2 size={18} />
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

      {/* ── Job Modal ── */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">

            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{editingJob ? 'Update the details below' : 'Fill in the details to post a new opening'}</p>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <XCircle size={22} />
              </button>
            </div>

            <form onSubmit={handleJobSubmit} className="p-6 space-y-5">
              {/* Row 1: Core Details */}
              <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                  Primary Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    { key: 'title',      label: 'Job Title',          ph: 'e.g. Vedic Astrology Consultant' },
                    { key: 'department', label: 'Department',         ph: 'e.g. Consultation, Sales' },
                    { key: 'location',   label: 'Location',           ph: 'e.g. Remote, Noida' },
                  ].map(({ key, label, ph }) => (
                    <div key={key} className="space-y-1.5">
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider">{label}</label>
                      <input type="text" required placeholder={ph} {...field(key)}
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all shadow-sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Terms & Salary */}
              <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Employment Terms
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider">Experience</label>
                    <input type="text" required placeholder="e.g. 5+ Years" {...field('experience')}
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider">Job Type</label>
                    <select {...field('type')} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm cursor-pointer">
                      {['Full-time', 'Part-time', 'Freelance', 'Contract'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider">Salary Range</label>
                    <input type="text" required placeholder="e.g. ₹50k – ₹80k / month" {...field('salary')}
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5 px-1">
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider">Comprehensive Job Description</label>
                <textarea required rows={4} {...field('description')}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm resize-none" />
              </div>

              {/* Responsibilities + Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider">Key Responsibilities <span className="font-normal lowercase tracking-normal opacity-60">(one per line)</span></label>
                  <textarea rows={5} {...field('responsibilities')}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm resize-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider">Required Skills/Traits <span className="font-normal lowercase tracking-normal opacity-60">(one per line)</span></label>
                  <textarea rows={5} {...field('requirements')}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm resize-none" />
                </div>
              </div>

              {/* Skills + Qualifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider">Technical Skills <span className="font-normal lowercase tracking-normal opacity-60">(comma separated)</span></label>
                  <input type="text" placeholder="Vedic Astrology, Sales, Communication" {...field('skills')}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider">Educational Qualifications <span className="font-normal lowercase tracking-normal opacity-60">(one per line)</span></label>
                  <textarea rows={2} {...field('qualifications')}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm resize-none" />
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white pt-6 pb-2 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={closeModal}
                  className="px-6 py-3 text-sm font-bold border border-gray-200 rounded-xl hover:bg-gray-50 transition-all active:scale-95">
                  Discard Changes
                </button>
                <button type="submit"
                  className="px-10 py-3 text-sm font-black bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">
                  {editingJob ? 'Update Posting' : 'Publish Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobs;