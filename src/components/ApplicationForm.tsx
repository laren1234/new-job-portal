import React, { useState } from 'react';
import { X, Upload, User, Mail, Phone, FileText, Link, Briefcase, CheckCircle2 } from 'lucide-react';
import { Job, FormData } from '../types';
import { validateEmail, validatePhone, validateURL, validateFile } from '../utils/validation';

interface ApplicationFormProps {
  job: Job;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ job, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: '',
    portfolioUrl: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = validateFile(file);
      if (validation.valid) {
        setFormData(prev => ({ ...prev, resumeFile: file }));
        setErrors(prev => ({ ...prev, resumeFile: '' }));
      } else {
        setErrors(prev => ({ ...prev, resumeFile: validation.error || '' }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!validatePhone(formData.phone)) newErrors.phone = 'Please enter a valid phone number';
    if (!formData.experience.trim()) newErrors.experience = 'Experience information is required';
    if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';
    if (formData.coverLetter.length < 100) newErrors.coverLetter = 'Cover letter should be at least 100 characters';
    if (!formData.resumeFile) newErrors.resumeFile = 'Resume is required';
    if (formData.portfolioUrl && !validateURL(formData.portfolioUrl)) {
      newErrors.portfolioUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Apply for Position</h2>
                <p className="text-slate-600 font-medium">{job.title} at {job.company}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors duration-200"
            >
              <X className="h-6 w-6 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                  <User className="h-4 w-4 mr-2 text-slate-500" />
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`input-field ${errors.firstName ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-red-600 text-sm mt-2 font-medium">{errors.firstName}</p>}
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                  <User className="h-4 w-4 mr-2 text-slate-500" />
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`input-field ${errors.lastName ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-red-600 text-sm mt-2 font-medium">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <Mail className="h-4 w-4 mr-2 text-slate-500" />
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`input-field ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="text-red-600 text-sm mt-2 font-medium">{errors.email}</p>}
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <Phone className="h-4 w-4 mr-2 text-slate-500" />
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`input-field ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-600 text-sm mt-2 font-medium">{errors.phone}</p>}
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <Briefcase className="h-4 w-4 mr-2 text-slate-500" />
                Years of Experience *
              </label>
              <select
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className={`input-field ${errors.experience ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              >
                <option value="">Select your experience level</option>
                <option value="0-1">0-1 years (Entry Level)</option>
                <option value="2-3">2-3 years (Junior)</option>
                <option value="4-5">4-5 years (Mid-Level)</option>
                <option value="6-10">6-10 years (Senior)</option>
                <option value="10+">10+ years (Expert)</option>
              </select>
              {errors.experience && <p className="text-red-600 text-sm mt-2 font-medium">{errors.experience}</p>}
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <Upload className="h-4 w-4 mr-2 text-slate-500" />
                Resume *
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className={`input-field file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${errors.resumeFile ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                />
              </div>
              <p className="text-slate-500 text-sm mt-2">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
              {errors.resumeFile && <p className="text-red-600 text-sm mt-2 font-medium">{errors.resumeFile}</p>}
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <Link className="h-4 w-4 mr-2 text-slate-500" />
                Portfolio URL (Optional)
              </label>
              <input
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                className={`input-field ${errors.portfolioUrl ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                placeholder="https://your-portfolio.com"
              />
              {errors.portfolioUrl && <p className="text-red-600 text-sm mt-2 font-medium">{errors.portfolioUrl}</p>}
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                <FileText className="h-4 w-4 mr-2 text-slate-500" />
                Cover Letter *
              </label>
              <textarea
                value={formData.coverLetter}
                onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                rows={6}
                className={`input-field resize-none ${errors.coverLetter ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-slate-500 text-sm">
                  {formData.coverLetter.length}/100 characters minimum
                </p>
                {formData.coverLetter.length >= 100 && (
                  <div className="flex items-center text-emerald-600 text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    <span>Minimum reached</span>
                  </div>
                )}
              </div>
              {errors.coverLetter && <p className="text-red-600 text-sm mt-2 font-medium">{errors.coverLetter}</p>}
            </div>

            <div className="flex gap-4 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;