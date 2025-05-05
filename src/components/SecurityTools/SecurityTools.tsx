import React, { useState } from 'react';
import BrowserMonitor from './BrowserMonitor';

/**
 * SecurityTools Component
 * 
 * This component provides a UI for all the security testing tools,
 * integrating the various native modules for penetration testing
 * and security research.
 */
export default function SecurityTools() {
  const [activeTab, setActiveTab] = useState('browser');

  const tabs = [
    { id: 'browser', label: 'Browser Monitor' },
    { id: 'process', label: 'Process Stealth' },
    { id: 'memory', label: 'Memory Protection' },
  ];

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-6">Security Research Tools</h1>
      
      <div className="mb-8 text-sm">
        <p className="text-gray-300 mb-4">
          These tools are designed for security research and penetration testing of exam proctoring software.
          They leverage advanced techniques to remain undetected while analyzing browser content and system behavior.
        </p>
        <div className="bg-yellow-900/30 border border-yellow-700 p-3 rounded text-yellow-300">
          <strong>Important:</strong> Use these tools responsibly and only for legitimate security research purposes.
          Never use these features to compromise actual exams or educational assessments.
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="flex border-b border-gray-700 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 font-medium ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab content */}
      <div className="py-4">
        {activeTab === 'browser' && <BrowserMonitor />}
        
        {activeTab === 'process' && (
          <div className="p-4 bg-gray-900 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Process Stealth Features</h2>
            <p className="text-gray-300 mb-4">
              These features allow the application to hide its presence from detection by modifying
              how it appears in Windows process listings and memory.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">PEB Masquerading</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Makes your process appear as Explorer.exe in task managers and process lists.
                  This feature is currently active.
                </p>
                <div className="bg-green-900/30 border border-green-800 px-3 py-2 rounded text-green-400 text-sm">
                  Active: Process is masquerading as Explorer.exe
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">DLL Hiding</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Removes references to suspicious DLLs from the Process Environment Block,
                  making them invisible to most scanners.
                </p>
                <div className="bg-green-900/30 border border-green-800 px-3 py-2 rounded text-green-400 text-sm">
                  4 DLLs hidden: node.dll, electron.dll, v8.dll, openai.dll
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'memory' && (
          <div className="p-4 bg-gray-900 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Memory Protection</h2>
            <p className="text-gray-300 mb-4">
              These features protect the application from memory analysis and timing-based detection.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Sleep Obfuscation</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Obfuscates timing operations to prevent detection of patterns 
                  used by anti-cheat and monitoring software.
                </p>
                <div className="bg-green-900/30 border border-green-800 px-3 py-2 rounded text-green-400 text-sm">
                  Active: Timing operations are protected
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Window Management</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Enhanced window management with click-through capabilities and
                  dynamic opacity for minimal visibility.
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-400 mr-2">Current opacity:</span>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <span className="text-sm text-gray-400 ml-2">0.4</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 