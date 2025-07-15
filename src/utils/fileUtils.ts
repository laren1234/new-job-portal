// File utilities for resume handling and downloads

export const generateResumeContent = (applicantName: string, email: string, phone: string, experience: string, coverLetter: string): string => {
  return `
RESUME - ${applicantName.toUpperCase()}

CONTACT INFORMATION
Name: ${applicantName}
Email: ${email}
Phone: ${phone}
Experience: ${experience} years

COVER LETTER
${coverLetter}

APPLICATION DETAILS
Application submitted via TalentHub Job Portal
Generated on: ${new Date().toLocaleString()}

---
This resume was generated from the job application system.
For the original uploaded resume file, please contact the applicant directly.
  `.trim();
};

export const downloadResume = (applicantName: string, email: string, phone: string, experience: string, coverLetter: string, resumeFile?: File): void => {
  try {
    let blob: Blob;
    let filename: string;

    if (resumeFile instanceof File) {
      // If original resume file exists, download it
      blob = resumeFile;
      const fileExtension = resumeFile.name.split('.').pop() || 'pdf';
      filename = `${applicantName.replace(/\s+/g, '_')}_Resume.${fileExtension}`;
    } else {
      // Generate a text resume from application data
      const resumeContent = generateResumeContent(applicantName, email, phone, experience, coverLetter);
      blob = new Blob([resumeContent], { type: 'text/plain' });
      filename = `${applicantName.replace(/\s+/g, '_')}_Resume.txt`;
    }

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    // Show success notification
    showDownloadNotification(filename);
  } catch (error) {
    console.error('Error downloading resume:', error);
    showErrorNotification('Failed to download resume. Please try again.');
  }
};

export const showDownloadNotification = (filename: string): void => {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2';
  notification.innerHTML = `
    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    <span>Downloaded: ${filename}</span>
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 3000);
};

export const showErrorNotification = (message: string): void => {
  // Create error notification element
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2';
  notification.innerHTML = `
    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 4 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 4000);
};

export const validateFileForDownload = (file: File): boolean => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  
  return allowedTypes.includes(file.type);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};