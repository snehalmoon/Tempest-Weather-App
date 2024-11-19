import React, { useState } from 'react';
import { useWeatherStore } from '../store/weatherStore';
import { Users, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CrowdReport() {
  const { isDarkMode, selectedCity } = useWeatherStore();
  const [report, setReport] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (report.trim()) {
      toast.success('Weather report submitted successfully!');
      setReport('');
    }
  };

  if (!selectedCity) return null;

  return (
    <div className={`w-full max-w-md p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mt-6`}>
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-6 w-6" />
        <h3 className="text-xl font-semibold">Community Weather Report</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={report}
          onChange={(e) => setReport(e.target.value)}
          placeholder="Share your local weather observations..."
          className={`w-full p-3 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700 text-white placeholder-gray-400' 
              : 'bg-gray-50 text-gray-900 placeholder-gray-500'
          } border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          rows={3}
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Send className="h-4 w-4" />
          Submit Report
        </button>
      </form>
    </div>
  );
}