import React, { useState, useEffect } from 'react';
import { FileText, Mail, Phone, Calendar, Download, Trash2, Eye, CheckCircle, XCircle, Clock, TrendingUp, Users, Building2, Edit, MoreVertical, Briefcase } from 'lucide-react';
import { Application, Job } from '../types';
import { getApplications, updateApplicationStatus, deleteApplication, getJobs, deleteJob, updateJob } from '../utils/storage';

const AdminDashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'applications' | 'jobs'>('applications');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const apps = getApplications();
    const jobPostings = getJobs();
    setApplications(apps);
    setJobs(jobPostings);
  };

  const handleStatusChange = (id: string, status: Application['status']) => {
    updateApplicationStatus(id, status);
    loadData();
  };

  const handleDeleteApplication = (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplication(id);
      loadData();
      setSelectedApplication(null);
    }
  };

  const handleDeleteJob = (id: string) => {
    if (window.confirm('Are you sure you want to delete this job posting? This will also delete all related applications.')) {
      deleteJob(id);
      loadData();
    }
  };

  const handleJobStatusChange = (id: string, status: Job['status']) => {
    updateJob(id, { status });
    loadData();
  };

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'reviewed':
        return <Eye className="h-4 w-4" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'reviewed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'accepted':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const getJobStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'closed':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'draft':
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filteredApplications = applications.filter(app => 
    !statusFilter || app.status === statusFilter
  );

  const stats = {
    totalApplications: applications.length,
    totalJobs: jobs.length,
    activeJobs: jobs.filter(job => job.status === 'active').length,
    pending: applications.filter(app => app.status === 'pending').length,
    reviewed: applications.filter(app => app.status === 'reviewed').length,
    accepted: applications.filter(app => app.status === 'accepted').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-600">Manage job postings and track hiring progress</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Total Jobs</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalJobs}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-emerald-600 font-medium">{stats.activeJobs} active</span>
          </div>
        </div>

        <div className="card p-6 hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Applications</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalApplications}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
            <span className="text-emerald-600 font-medium">+12%</span>
            <span className="text-slate-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="card p-6 hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Pending Review</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Accepted</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats.accepted}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="card mb-8">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'applications'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Applications ({stats.totalApplications})
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'jobs'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Job Postings ({stats.totalJobs})
          </button>
        </div>
      </div>

      {activeTab === 'applications' ? (
        <>
          {/* Filter */}
          <div className="card p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Filter Applications</h3>
                <p className="text-slate-500 text-sm">Narrow down your search</p>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field w-48"
              >
                <option value="">All Applications</option>
                <option value="pending">Pending Review</option>
                <option value="reviewed">Under Review</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Applications List */}
            <div className="card overflow-hidden">
              <div className="p-6 border-b border-slate-200 bg-slate-50">
                <h2 className="text-xl font-semibold text-slate-900">
                  Applications ({filteredApplications.length})
                </h2>
              </div>
              <div className="divide-y divide-slate-200 max-h-[600px] overflow-y-auto">
                {filteredApplications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Building2 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-medium">No applications found</p>
                    <p className="text-slate-400 text-sm">Try adjusting your filters</p>
                  </div>
                ) : (
                  filteredApplications.map((application) => (
                    <div
                      key={application.id}
                      className={`p-6 hover:bg-slate-50 cursor-pointer transition-all duration-200 ${
                        selectedApplication?.id === application.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                      }`}
                      onClick={() => setSelectedApplication(application)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 text-lg">{application.applicantName}</h3>
                          <p className="text-slate-600 font-medium">{application.jobTitle}</p>
                          <p className="text-slate-500 text-sm">{application.company}</p>
                        </div>
                        <span className={`status-badge border flex items-center space-x-1 ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          <span className="capitalize">{application.status}</span>
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-slate-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Applied {new Date(application.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Application Details */}
            <div className="card overflow-hidden">
              <div className="p-6 border-b border-slate-200 bg-slate-50">
                <h2 className="text-xl font-semibold text-slate-900">Application Details</h2>
              </div>
              {selectedApplication ? (
                <div className="p-6 max-h-[600px] overflow-y-auto">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          {selectedApplication.applicantName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">{selectedApplication.applicantName}</h3>
                        <p className="text-slate-600 font-medium">{selectedApplication.jobTitle}</p>
                        <p className="text-slate-500">{selectedApplication.company}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteApplication(selectedApplication.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200"
                      title="Delete Application"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="flex items-center p-4 bg-slate-50 rounded-xl">
                      <Mail className="h-5 w-5 text-slate-400 mr-3" />
                      <span className="text-slate-900 font-medium">{selectedApplication.email}</span>
                    </div>
                    <div className="flex items-center p-4 bg-slate-50 rounded-xl">
                      <Phone className="h-5 w-5 text-slate-400 mr-3" />
                      <span className="text-slate-900 font-medium">{selectedApplication.phone}</span>
                    </div>
                    <div className="flex items-center p-4 bg-slate-50 rounded-xl">
                      <Calendar className="h-5 w-5 text-slate-400 mr-3" />
                      <span className="text-slate-900 font-medium">{selectedApplication.experience} years experience</span>
                    </div>
                    {selectedApplication.portfolioUrl && (
                      <div className="flex items-center p-4 bg-slate-50 rounded-xl">
                        <FileText className="h-5 w-5 text-slate-400 mr-3" />
                        <a
                          href={selectedApplication.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                        >
                          View Portfolio
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-3 text-lg">Cover Letter</h4>
                    <div className="bg-slate-50 rounded-xl p-6">
                      <p className="text-slate-700 leading-relaxed">{selectedApplication.coverLetter}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-3 text-lg">Resume</h4>
                    <div className="flex items-center p-4 bg-slate-50 rounded-xl">
                      <Download className="h-5 w-5 text-slate-400 mr-3" />
                      <span className="text-slate-600 font-medium">Resume file uploaded</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-4 text-lg">Update Status</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleStatusChange(selectedApplication.id, 'reviewed')}
                        className="px-4 py-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors font-medium"
                      >
                        Mark as Reviewed
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedApplication.id, 'accepted')}
                        className="px-4 py-3 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-200 transition-colors font-medium"
                      >
                        Accept Candidate
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedApplication.id, 'rejected')}
                        className="px-4 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors font-medium"
                      >
                        Reject Application
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedApplication.id, 'pending')}
                        className="px-4 py-3 bg-amber-100 text-amber-700 rounded-xl hover:bg-amber-200 transition-colors font-medium"
                      >
                        Mark Pending
                      </button>
                    </div>
                  </div>

                  <div className="text-sm text-slate-500 p-4 bg-slate-50 rounded-xl">
                    <p className="font-medium">Application submitted on {new Date(selectedApplication.submittedAt).toLocaleString()}</p>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                  <p className="text-slate-500 font-medium text-lg">Select an application</p>
                  <p className="text-slate-400">Choose an application from the list to view details</p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Job Postings Tab */
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50">
            <h2 className="text-xl font-semibold text-slate-900">
              Job Postings ({jobs.length})
            </h2>
          </div>
          <div className="divide-y divide-slate-200">
            {jobs.length === 0 ? (
              <div className="p-8 text-center">
                <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No job postings found</p>
                <p className="text-slate-400 text-sm">Create your first job posting to get started</p>
              </div>
            ) : (
              jobs.map((job) => (
                <div key={job.id} className="p-6 hover:bg-slate-50 transition-all duration-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>
                        <span className={`status-badge border ${getJobStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </div>
                      <p className="text-slate-600 font-medium mb-2">{job.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Posted {new Date(job.postedDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Deadline {new Date(job.deadline).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          {applications.filter(app => app.jobId === job.id).length} applications
                        </span>
                      </div>
                      <p className="text-slate-700 line-clamp-2">{job.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <div className="relative">
                        <select
                          value={job.status}
                          onChange={(e) => handleJobStatusChange(job.id, e.target.value as Job['status'])}
                          className="input-field text-sm pr-8"
                        >
                          <option value="active">Active</option>
                          <option value="closed">Closed</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Job"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;