import React from 'react';
import { MapPin, Clock, DollarSign, Calendar, Building2, Users, ArrowRight, Star } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Part-time':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Contract':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Remote':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="card p-8 group job-card-hover">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="h-8 w-8 text-slate-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                  {job.title}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-slate-500 font-medium">4.8</span>
                </div>
              </div>
              <p className="text-slate-600 font-semibold text-lg">{job.company}</p>
            </div>
          </div>
        </div>
        <span className={`status-badge border ${getTypeColor(job.type)} shadow-sm`}>
          {job.type}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center text-slate-600 bg-slate-50 rounded-xl p-3">
          <MapPin className="h-5 w-5 mr-3 text-slate-400" />
          <span className="font-medium">{job.location}</span>
        </div>
        <div className="flex items-center text-slate-600 bg-slate-50 rounded-xl p-3">
          <DollarSign className="h-5 w-5 mr-3 text-slate-400" />
          <span className="font-medium">{job.salary}</span>
        </div>
        <div className="flex items-center text-slate-600 bg-slate-50 rounded-xl p-3">
          <Calendar className="h-5 w-5 mr-3 text-slate-400" />
          <span className="text-sm">Posted {formatDate(job.postedDate)}</span>
        </div>
        <div className="flex items-center text-slate-600 bg-slate-50 rounded-xl p-3">
          <Clock className="h-5 w-5 mr-3 text-slate-400" />
          <span className="text-sm">Due {formatDate(job.deadline)}</span>
        </div>
      </div>

      <p className="text-slate-700 mb-6 line-clamp-3 leading-relaxed text-lg">{job.description}</p>

      <div className="mb-8">
        <h4 className="font-bold text-slate-900 mb-4 flex items-center text-lg">
          <Users className="h-5 w-5 mr-2 text-slate-500" />
          Key Requirements
        </h4>
        <div className="space-y-3">
          {job.requirements.slice(0, 3).map((req, index) => (
            <div key={index} className="flex items-start">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
              <span className="text-slate-600 leading-relaxed">{req}</span>
            </div>
          ))}
          {job.requirements.length > 3 && (
            <p className="text-blue-600 font-semibold ml-6">
              +{job.requirements.length - 3} more requirements
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() => onApply(job)}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group/btn flex items-center justify-center space-x-3"
      >
        <span className="text-lg">Apply Now</span>
        <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default JobCard;