import React from 'react';
import { Briefcase, Users, FileText, Plus, LogOut, User, Shield } from 'lucide-react';
import { getCurrentUser, logout, isAdmin } from '../utils/auth';

interface HeaderProps {
  currentView: 'jobs' | 'admin' | 'post-job';
  onViewChange: (view: 'jobs' | 'admin' | 'post-job') => void;
  onAuthRequired: () => void;
  onAuthChange: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, onAuthRequired, onAuthChange }) => {
  const user = getCurrentUser();
  const userIsAdmin = isAdmin();

  const handleLogout = () => {
    logout();
    onAuthChange();
    onViewChange('jobs');
  };

  const handleViewChange = (view: 'jobs' | 'admin' | 'post-job') => {
    if ((view === 'admin' || view === 'post-job') && !user) {
      onAuthRequired();
      return;
    }
    if ((view === 'admin' || view === 'post-job') && !userIsAdmin) {
      alert('Admin access required');
      return;
    }
    onViewChange(view);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  TalentHub
                </h1>
                <p className="text-xs text-slate-500 font-medium">Professional Portal</p>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => handleViewChange('jobs')}
              className={`flex items-center px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                currentView === 'jobs'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileText className="h-5 w-5 mr-2" />
              Job Board
            </button>
            
            {user && userIsAdmin && (
              <>
                <button
                  onClick={() => handleViewChange('post-job')}
                  className={`flex items-center px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    currentView === 'post-job'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Post Job
                </button>
                
                <button
                  onClick={() => handleViewChange('admin')}
                  className={`flex items-center px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    currentView === 'admin'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Admin Panel
                </button>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className="flex items-center space-x-3 px-4 py-2 bg-slate-50 rounded-2xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center">
                    {userIsAdmin ? (
                      <Shield className="h-4 w-4 text-white" />
                    ) : (
                      <User className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-slate-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {userIsAdmin ? 'Administrator' : 'Job Seeker'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <button
                onClick={onAuthRequired}
                className="btn-primary"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;