import React, { useState } from 'react';

/**
 * BrowserMonitor Component
 * 
 * This component provides a UI for monitoring browser sessions using our native
 * Chrome session monitoring functionality. It allows users to extract content from
 * browser windows during security testing.
 */
export default function BrowserMonitor() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capturedContent, setCapturedContent] = useState<string | null>(null);

  // Call the native module to monitor Chrome sessions
  const startMonitoring = async () => {
    setIsMonitoring(true);
    setError(null);
    setCapturedContent(null);
    
    try {
      // Call the native module through the Electron API
      const response = await window.electronAPI.monitorChromeSession();
      
      if (response.success) {
        setResult(response.result);
        if (response.capturedContent) {
          setCapturedContent(response.capturedContent);
        }
      } else {
        setError(response.error || 'Unknown error during browser monitoring');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error monitoring browser session:', err);
    } finally {
      setIsMonitoring(false);
    }
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">Browser Session Monitor</h2>
      
      <div className="mb-4">
        <p className="text-gray-300 mb-2">
          This tool allows you to monitor Chrome browser sessions to extract content for security analysis.
          It uses UI Automation to access browser content without being detected by monitoring software.
        </p>
      </div>
      
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={startMonitoring}
          disabled={isMonitoring}
          className={`px-4 py-2 rounded-md font-medium ${
            isMonitoring 
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isMonitoring ? 'Monitoring...' : 'Monitor Chrome Session'}
        </button>
        
        {result !== null && (
          <div className="text-green-400">
            Result code: {result}
          </div>
        )}
      </div>
      
      {error && (
        <div className="bg-red-900/50 border border-red-800 p-3 rounded-md text-red-300 mb-4">
          {error}
        </div>
      )}
      
      {capturedContent && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-white mb-2">Captured Content:</h3>
          <div className="bg-gray-800 p-3 rounded-md text-gray-200 font-mono text-sm whitespace-pre-wrap max-h-80 overflow-y-auto">
            {capturedContent}
          </div>
        </div>
      )}
    </div>
  );
} 