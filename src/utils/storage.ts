import { Application, Job } from '../types';

const APPLICATIONS_KEY = 'job_applications';
const JOBS_KEY = 'job_postings';

// Application Management
export const saveApplication = (application: Application): void => {
  const existingApplications = getApplications();
  const updatedApplications = [...existingApplications, application];
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updatedApplications));
};

export const getApplications = (): Application[] => {
  const stored = localStorage.getItem(APPLICATIONS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const updateApplicationStatus = (id: string, status: Application['status']): void => {
  const applications = getApplications();
  const updatedApplications = applications.map(app => 
    app.id === id ? { ...app, status } : app
  );
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updatedApplications));
};

export const deleteApplication = (id: string): void => {
  const applications = getApplications();
  const filteredApplications = applications.filter(app => app.id !== id);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(filteredApplications));
};

// Job Management
export const saveJob = (job: Job): void => {
  const existingJobs = getJobs();
  const updatedJobs = [...existingJobs, job];
  localStorage.setItem(JOBS_KEY, JSON.stringify(updatedJobs));
};

export const getJobs = (): Job[] => {
  const stored = localStorage.getItem(JOBS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const updateJob = (id: string, updatedJob: Partial<Job>): void => {
  const jobs = getJobs();
  const updatedJobs = jobs.map(job => 
    job.id === id ? { ...job, ...updatedJob } : job
  );
  localStorage.setItem(JOBS_KEY, JSON.stringify(updatedJobs));
};

export const deleteJob = (id: string): void => {
  const jobs = getJobs();
  const filteredJobs = jobs.filter(job => job.id !== id);
  localStorage.setItem(JOBS_KEY, JSON.stringify(filteredJobs));
  
  // Also delete related applications
  const applications = getApplications();
  const filteredApplications = applications.filter(app => app.jobId !== id);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(filteredApplications));
};

export const getJobById = (id: string): Job | undefined => {
  const jobs = getJobs();
  return jobs.find(job => job.id === id);
};