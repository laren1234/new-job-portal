import React from 'react';
import { CheckCircle, X, Sparkles, ArrowRight } from 'lucide-react';

interface SuccessMessageProps {
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 slide-up">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center relative">
              <CheckCircle className="h-8 w-8 text-white" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-yellow-800" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Application Submitted!</h2>
              <p className="text-slate-600">Your application is now under review</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors duration-200"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50">
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center">
              <ArrowRight className="h-5 w-5 mr-2 text-blue-600" />
              What happens next?
            </h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Our hiring team will review your application within 2-3 business days</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>You'll receive an email update on your application status</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>If selected, we'll schedule an interview within 5-7 business days</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-900">Application ID:</strong> #{Date.now().toString().slice(-6)}
              <br />
              Keep this reference number for your records. You can contact our HR team at 
              <span className="text-blue-600 font-medium"> careers@talenthub.com</span> for any questions.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full btn-primary"
          >
            Continue Browsing Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;