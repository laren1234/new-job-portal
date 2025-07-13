import React, { useState } from 'react';
import { Plus, X, Building2, MapPin, DollarSign, Calendar, FileText, Users, CheckCircle2, Trash2 } from 'lucide-react';
import { JobFormData } from '../types';

interface JobPostingFormProps {
  onSubmit: (jobData: JobFormData) => void;
}

const JobPostingForm: React.FC<JobPostingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: [''],
    benefits: [''],
    deadline: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleArrayChange = (field: 'requirements' | 'benefits', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'requirements' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'requirements' | 'benefits', index: number) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.salary.trim()) newErrors.salary = 'Salary range is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (formData.description.length < 100) newErrors.description = 'Description should be at least 100 characters';
    if (!formData.deadline) newErrors.deadline = 'Application deadline is required';
    
    const today = new Date().toISOString().split('T')[0];
    if (formData.deadline && formData.deadline <= today) {
      newErrors.deadline = 'Deadline must be in the future';
    }

    const validRequirements = formData.requirements.filter(req => req.trim());
    if (validRequirements.length === 0) newErrors.requirements = 'At least one requirement is needed';

    const validBenefits = formData.benefits.filter(benefit => benefit.trim());
    if (validBenefits.length === 0) newErrors.benefits = 'At least one benefit is needed';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      const cleanedData = {
        ...formData,
        requirements: formData.requirements.filter(req => req.trim()),
        benefits: formData.benefits.filter(benefit => benefit.trim())
      };
      
      onSubmit(cleanedData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      salary: '',
      description: '',
      requirements: [''],
      benefits: [''],
      deadline: ''
    });
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-xl flex items-center justify-center">
            <Plus className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Post New Job</h1>
            <p className="text-slate-600">Create a new job posting to attract top talent</p>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-900 flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-slate-600" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`input-field ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    placeholder="e.g. Senior Frontend Developer"
                  />
                  {errors.title && <p className="text-red-600 text-sm mt-2 font-medium">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className={`input-field ${errors.company ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    placeholder="e.g. TechCorp Solutions"
                  />
                  {errors.company && <p className="text-red-600 text-sm mt-2 font-medium">{errors.company}</p>}
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                    <MapPin className="h-4 w-4 mr-2 text-slate-500" />
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`input-field ${errors.location ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    placeholder="e.g. San Francisco, CA or Remote"
                  />
                  {errors.location && <p className="text-red-600 text-sm mt-2 font-medium">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Job Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value as any)}
                    className="input-field"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                    <DollarSign className="h-4 w-4 mr-2 text-slate-500" />
                    Salary Range *
                  </label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    className={`input-field ${errors.salary ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    placeholder="e.g. $80,000 - $120,000"
                  />
                  {errors.salary && <p className="text-red-600 text-sm mt-2 font-medium">{errors.salary}</p>}
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-slate-700 mb-3">
                    <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                    Application Deadline *
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                    className={`input-field ${errors.deadline ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                  />
                  {errors.deadline && <p className="text-red-600 text-sm mt-2 font-medium">{errors.deadline}</p>}
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-slate-600" />
                Job Description
              </h3>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                  className={`input-field resize-none ${errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="Provide a detailed description of the role, responsibilities, and what the candidate will be working on..."
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-slate-500 text-sm">
                    {formData.description.length}/100 characters minimum
                  </p>
                  {formData.description.length >= 100 && (
                    <div className="flex items-center text-emerald-600 text-sm">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      <span>Minimum reached</span>
                    </div>
                  )}
                </div>
                {errors.description && <p className="text-red-600 text-sm mt-2 font-medium">{errors.description}</p>}
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-900 flex items-center">
                <Users className="h-5 w-5 mr-2 text-slate-600" />
                Requirements
              </h3>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Job Requirements *
                </label>
                <div className="space-y-3">
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                        className="input-field flex-1"
                        placeholder={`Requirement ${index + 1}`}
                      />
                      {formData.requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('requirements', index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('requirements')}
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Requirement
                  </button>
                </div>
                {errors.requirements && <p className="text-red-600 text-sm mt-2 font-medium">{errors.requirements}</p>}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-900 flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2 text-slate-600" />
                Benefits & Perks
              </h3>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Benefits *
                </label>
                <div className="space-y-3">
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                        className="input-field flex-1"
                        placeholder={`Benefit ${index + 1}`}
                      />
                      {formData.benefits.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('benefits', index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('benefits')}
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Benefit
                  </button>
                </div>
                {errors.benefits && <p className="text-red-600 text-sm mt-2 font-medium">{errors.benefits}</p>}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 btn-secondary"
              >
                Reset Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Publishing Job...</span>
                  </div>
                ) : (
                  'Publish Job Posting'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPostingForm;