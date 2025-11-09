export interface CSVExportOptions {
  filename: string;
  headers: string[];
  data: any[];
  dateFields?: string[];
}

export const exportToCSV = (options: CSVExportOptions): void => {
  const { filename, headers, data, dateFields = [] } = options;

  try {
    // Create CSV content
    const csvContent = generateCSVContent(headers, data, dateFields);
    
    // Create and download file
    downloadCSVFile(csvContent, filename);
    
    // Show success notification
    showExportNotification(filename, data.length);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    showExportErrorNotification('Failed to export CSV file. Please try again.');
  }
};

const generateCSVContent = (headers: string[], data: any[], dateFields: string[]): string => {
  // Escape CSV values
  const escapeCSVValue = (value: any): string => {
    if (value === null || value === undefined) return '';
    
    const stringValue = String(value);
    
    // Handle arrays (like requirements, benefits)
    if (Array.isArray(value)) {
      return `"${value.join('; ')}"`;
    }
    
    // Format dates
    if (dateFields.some(field => headers.includes(field))) {
      const fieldIndex = headers.findIndex(header => dateFields.includes(header));
      if (fieldIndex !== -1 && headers[fieldIndex] && value) {
        try {
          const date = new Date(value);
          return `"${date.toLocaleDateString()} ${date.toLocaleTimeString()}"`;
        } catch {
          return `"${stringValue}"`;
        }
      }
    }
    
    // Escape quotes and wrap in quotes if contains comma, quote, or newline
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    
    return stringValue;
  };

  // Create header row
  const headerRow = headers.map(header => escapeCSVValue(header)).join(',');
  
  // Create data rows
  const dataRows = data.map(row => {
    return headers.map(header => {
      const value = getNestedValue(row, header);
      return escapeCSVValue(value);
    }).join(',');
  });

  return [headerRow, ...dataRows].join('\n');
};

const getNestedValue = (obj: any, path: string): any => {
  // Handle nested object properties (e.g., 'user.name')
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : '';
  }, obj);
};

const downloadCSVFile = (content: string, filename: string): void => {
  // Create blob with UTF-8 BOM for proper Excel compatibility
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8;' });
  
  // Create download link
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

const showExportNotification = (filename: string, recordCount: number): void => {
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center space-x-3 slide-up';
  notification.innerHTML = `
    <svg class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    <div>
      <p class="font-semibold">CSV Export Successful!</p>
      <p class="text-sm opacity-90">${recordCount} records exported to ${filename}</p>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = 'translateX(100%)';
      notification.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 4000);
};

const showExportErrorNotification = (message: string): void => {
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center space-x-3 slide-up';
  notification.innerHTML = `
    <svg class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
      <p class="font-semibold">Export Failed</p>
      <p class="text-sm opacity-90">${message}</p>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = 'translateX(100%)';
      notification.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
};

// Predefined export configurations
export const exportApplicationsCSV = (applications: any[]): void => {
  exportToCSV({
    filename: 'job_applications',
    headers: [
      'Application ID',
      'Applicant Name',
      'Email',
      'Phone',
      'Job Title',
      'Company',
      'Experience',
      'Status',
      'Applied Date',
      'Portfolio URL'
    ],
    data: applications.map(app => ({
      'Application ID': app.id,
      'Applicant Name': app.applicantName,
      'Email': app.email,
      'Phone': app.phone,
      'Job Title': app.jobTitle,
      'Company': app.company,
      'Experience': app.experience,
      'Status': app.status,
      'Applied Date': app.submittedAt,
      'Portfolio URL': app.portfolioUrl || 'N/A'
    })),
    dateFields: ['Applied Date']
  });
};

export const exportJobsCSV = (jobs: any[]): void => {
  exportToCSV({
    filename: 'job_postings',
    headers: [
      'Job ID',
      'Title',
      'Company',
      'Location',
      'Type',
      'Salary',
      'Status',
      'Posted Date',
      'Deadline',
      'Requirements',
      'Benefits'
    ],
    data: jobs.map(job => ({
      'Job ID': job.id,
      'Title': job.title,
      'Company': job.company,
      'Location': job.location,
      'Type': job.type,
      'Salary': job.salary,
      'Status': job.status,
      'Posted Date': job.postedDate,
      'Deadline': job.deadline,
      'Requirements': job.requirements,
      'Benefits': job.benefits
    })),
    dateFields: ['Posted Date', 'Deadline']
  });
};

export const exportFilteredApplicationsCSV = (applications: any[], filters: any): void => {
  const filterSuffix = [];
  if (filters.status) filterSuffix.push(`status_${filters.status}`);
  if (filters.job) filterSuffix.push(`job_${filters.job}`);
  
  const filename = filterSuffix.length > 0 
    ? `job_applications_${filterSuffix.join('_')}`
    : 'job_applications_filtered';

  exportApplicationsCSV(applications);
};

// Bulk export functionality
export const exportAllData = (applications: any[], jobs: any[]): void => {
  // Export applications
  exportApplicationsCSV(applications);
  
  // Export jobs after a short delay to prevent browser blocking
  setTimeout(() => {
    exportJobsCSV(jobs);
  }, 1000);
  
  // Show bulk export notification
  setTimeout(() => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center space-x-3 slide-up';
    notification.innerHTML = `
      <svg class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
      <div>
        <p class="font-semibold">Bulk Export Complete!</p>
        <p class="text-sm opacity-90">Applications and Jobs exported successfully</p>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 4000);
  }, 2000);
};