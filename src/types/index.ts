export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  deadline: string;
  status: 'active' | 'closed' | 'draft';
  postedBy: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  applicantName: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  resumeFile?: File;
  portfolioUrl?: string;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  resumeFile?: File;
  portfolioUrl?: string;
}

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  deadline: string;
}