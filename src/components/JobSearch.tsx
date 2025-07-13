import React from 'react';
import { Search, Filter, MapPin, Briefcase, Sliders } from 'lucide-react';

interface JobSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  locationFilter: string;
  onLocationChange: (location: string) => void;
  typeFilter: string;
  onTypeChange: (type: string) => void;
}

const JobSearch: React.FC<JobSearchProps> = ({
  searchTerm,
  onSearchChange,
  locationFilter,
  onLocationChange,
  typeFilter,
  onTypeChange,
}) => {
  return (
    <div className="card p-8 mb-8 slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Sliders className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Search & Filter</h2>
            <p className="text-slate-500 text-sm">Find your perfect opportunity</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-500">
          <Filter className="h-4 w-4" />
          <span>Advanced Filters</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Search Jobs
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Job title, company, keywords..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="input-field pl-12 text-slate-900 placeholder-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <select
              value={locationFilter}
              onChange={(e) => onLocationChange(e.target.value)}
              className="input-field pl-12 appearance-none bg-white text-slate-900"
            >
              <option value="">All Locations</option>
              <option value="San Francisco">San Francisco, CA</option>
              <option value="Austin">Austin, TX</option>
              <option value="New York">New York, NY</option>
              <option value="Seattle">Seattle, WA</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Job Type
          </label>
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <select
              value={typeFilter}
              onChange={(e) => onTypeChange(e.target.value)}
              className="input-field pl-12 appearance-none bg-white text-slate-900"
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;