# Security Tools for Research & Testing

This module provides security research tools specifically designed for analyzing and testing exam proctoring software. These tools leverage various techniques to remain undetected while examining proctoring software behavior.

## Purpose

The security tools are designed for legitimate security research purposes:

- Testing the resilience of exam proctoring software
- Identifying vulnerabilities in monitoring systems
- Helping develop stronger countermeasures
- Supporting academic research on privacy and security

## Features

### Browser Monitoring

The Browser Monitoring tool uses UI Automation APIs to extract content from Chrome browser sessions without being detected by most screen monitoring software. This allows security researchers to:

- Analyze how proctoring software monitors browser activity
- Extract exam questions for security testing
- Test the limits of browser restrictions in proctoring environments

### Process Stealth

These features allow the application to evade detection by modifying how it appears in the system:

- **PEB Masquerading**: Makes the process appear as Explorer.exe in task managers and process monitors
- **DLL Hiding**: Removes references to suspicious DLLs from the Process Environment Block

### Memory Protection

These features protect against memory analysis and timing-based detection:

- **Sleep Obfuscation**: Prevents detection of timing patterns used by anti-cheat software
- **Window Management**: Provides enhanced opacity control and click-through capabilities

## Technical Details

This component uses native modules that bridge to low-level Windows APIs:

1. `masqueradePeb`: Uses the Process Environment Block (PEB) technique to disguise the process
2. `removeDllFromPeb`: Removes DLL references from the PEB
3. `sleepObfuscation`: Uses memory protection techniques to obfuscate timing operations
4. `chromeMonitor`: Uses UI Automation to extract content from Chrome sessions

## Building the Security Features

To build the security modules:

```bash
# Install dependencies
npm install

# Build the native modules
npm run build:security

# Run the application with security features
npm run dev:security
```

## Responsible Use

These tools are provided for legitimate security research only. Please adhere to these guidelines:

1. Only use these tools on systems you own or have explicit permission to test
2. Never use these tools to compromise actual exams or educational assessments
3. Report any vulnerabilities you discover to the software vendors
4. Follow responsible disclosure practices

## Contribution

Security researchers are encouraged to contribute improvements to these tools by:

1. Adding new detection evasion techniques
2. Improving existing features
3. Documenting additional vulnerabilities
4. Creating testing methodologies

Please follow the project's contribution guidelines when submitting changes. 