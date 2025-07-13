import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import JobCard from './components/JobCard';
import ApplicationForm from './components/ApplicationForm';
import AdminDashboard from './components/AdminDashboard';
import JobPostingForm from './components/JobPostingForm';
import SuccessMessage from './components/SuccessMessage';
import { sampleJobs } from './data/jobs';
import { Job, Application, FormData, JobFormData } from './types';
import { saveApplication, saveJob, getJobs } from './utils/storage';

function App() {
  const [currentView, setCurrentView] = useState<'jobs' | 'admin' | 'post-job'>('jobs');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showJobSuccess, setShowJobSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Load jobs from storage and combine with sample jobs
    const storedJobs = getJobs();
    const allJobs = [...sampleJobs, ...storedJobs];
    setJobs(allJobs);
  }, []);

  const handleJobApplication = (job: Job) => {
    setSelectedJob(job);
  };

  const handleFormSubmit = (formData: FormData) => {
    if (!selectedJob) return;

    const application: Application = {
      id: Date.now().toString(),
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      company: selectedJob.company,
      applicantName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      experience: formData.experience,
      coverLetter: formData.coverLetter,
      resumeFile: formData.resumeFile,
      portfolioUrl: formData.portfolioUrl,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };

    saveApplication(application);
    setSelectedJob(null);
    setShowSuccess(true);
  };

  const handleJobPost = (jobData: JobFormData) => {
    const newJob: Job = {
      id: Date.now().toString(),
      ...jobData,
      postedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      postedBy: 'Admin'
    };

    saveJob(newJob);
    
    // Update local jobs state
    const storedJobs = getJobs();
    const allJobs = [...sampleJobs, ...storedJobs];
    setJobs(allJobs);
    
    setShowJobSuccess(true);
    setCurrentView('jobs');
  };

  const handleBrowseJobs = () => {
    const jobsSection = document.getElementById('jobs-section');
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCreateAccount = () => {
    // This would typically open a registration modal or navigate to a signup page
    alert('Create Account functionality would be implemented here');
  };

  const filteredJobs = jobs.filter(job => {
    // Only show active jobs on the job board
    if (job.status !== 'active') return false;
    
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = !typeFilter || job.type === typeFilter;

    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      {currentView === 'jobs' ? (
        <>
          <HeroSection
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            locationFilter={locationFilter}
            onLocationChange={setLocationFilter}
            onBrowseJobs={handleBrowseJobs}
            onCreateAccount={handleCreateAccount}
          />
          
          <main id="jobs-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12 fade-in">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Featured Job Opportunities
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Discover amazing career opportunities from top companies worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredJobs.map((job, index) => (
                <div key={job.id} style={{ animationDelay: `${index * 100}ms` }}>
                  <JobCard
                    job={job}
                    onApply={handleJobApplication}
                  />
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-20 fade-in">
                <div className="w-32 h-32 bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <span className="text-6xl">🔍</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">No jobs found</h3>
                <p className="text-slate-500 text-xl">Try adjusting your search criteria to find more opportunities</p>
              </div>
            )}
          </main>
        </>
      ) : currentView === 'post-job' ? (
        <JobPostingForm onSubmit={handleJobPost} />
      ) : (
        <AdminDashboard />
      )}

      {selectedJob && (
        <ApplicationForm
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onSubmit={handleFormSubmit}
        />
      )}

      {showSuccess && (
        <SuccessMessage onClose={() => setShowSuccess(false)} />
      )}

      {showJobSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 slide-up">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Job Posted Successfully!</h2>
              <p className="text-slate-600 mb-8 text-lg">Your job posting is now live and accepting applications.</p>
              <button
                onClick={() => setShowJobSuccess(false)}
                className="w-full btn-primary text-lg"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;