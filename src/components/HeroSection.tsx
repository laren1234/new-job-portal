import React from 'react';
import { Search, MapPin, Briefcase, Users, TrendingUp } from 'lucide-react';

interface HeroSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  locationFilter: string;
  onLocationChange: (location: string) => void;
  onBrowseJobs: () => void;
  onCreateAccount: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  searchTerm,
  onSearchChange,
  locationFilter,
  onLocationChange,
  onBrowseJobs,
  onCreateAccount,
}) => {
  const handleSearch = () => {
    const jobsSection = document.getElementById('jobs-section');
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-container relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Find Your Dream{' '}
            <span className="text-yellow-400">
              Career
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-medium">
            Discover thousands of job opportunities and connect with top
            <br />
            employers worldwide. Your next career milestone starts here.
          </p>
        </div>

        <div className="max-w-5xl mx-auto slide-up">
          <div className="search-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
              <div className="lg:col-span-5">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="hero-input pl-16"
                  />
                </div>
              </div>
              
              <div className="lg:col-span-4">
                <div className="relative">
                  <MapPin className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={locationFilter}
                    onChange={(e) => onLocationChange(e.target.value)}
                    className="hero-input pl-16"
                  />
                </div>
              </div>
              
              <div className="lg:col-span-3">
                <button
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-5 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
                >
                  Search Jobs
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onBrowseJobs}
                className="bg-white text-blue-600 hover:bg-blue-50 border-2 border-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Browse All Jobs
              </button>
              <button
                onClick={onCreateAccount}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-4 px-8 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">10K+</div>
            <div className="text-white/80 font-medium">Active Jobs</div>
          </div>
          
          <div className="text-center fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">50K+</div>
            <div className="text-white/80 font-medium">Companies</div>
          </div>
          
          <div className="text-center fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">95%</div>
            <div className="text-white/80 font-medium">Success Rate</div>
          </div>
          
          <div className="text-center fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">1M+</div>
            <div className="text-white/80 font-medium">Job Seekers</div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl float-animation"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl float-animation" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl float-animation" style={{ animationDelay: '4s' }}></div>
    </div>
  );
};

export default HeroSection;