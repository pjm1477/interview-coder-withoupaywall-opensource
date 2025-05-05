#include <napi.h>
#include <string>
#include <Windows.h>

// Forward declaration of the function
extern "C" DWORD MpfComMonitorChromeSessionOnce(VOID);

/**
 * Wraps the MpfComMonitorChromeSessionOnce function for use in Node.js
 * This function allows monitoring Chrome browser sessions to extract content
 */
Napi::Number MpfComMonitorChromeSessionOnceWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  
  // Call the actual function
  DWORD result = MpfComMonitorChromeSessionOnce();
  
  // Return the result as a JavaScript number
  return Napi::Number::New(env, result);
}

/**
 * Initialize the module by registering the native function
 */
Napi::Object Init(Napi::Env env, Napi::Object exports) {
  // Export the function as a method that can be called from JavaScript
  exports.Set("mpfComMonitorChromeSessionOnce", 
              Napi::Function::New(env, MpfComMonitorChromeSessionOnceWrapped));
  
  return exports;
}

// Register the module with Node.js
NODE_API_MODULE(chromeMonitor, Init) 