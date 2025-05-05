#include <napi.h>
#include <string>
#include <Windows.h>

// Forward declaration of the function
extern "C" BOOL RemoveDllFromPebW(_In_ LPCWSTR lpModuleName);

/**
 * Wraps the RemoveDllFromPebW function for use in Node.js
 */
Napi::Boolean RemoveDllFromPebWWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  
  // Validate arguments
  if (info.Length() < 1 || !info[0].IsString()) {
    Napi::TypeError::New(env, "Expected a string as the module name").ThrowAsJavaScriptException();
    return Napi::Boolean::New(env, false);
  }
  
  // Get the DLL name from the first argument
  std::string moduleName = info[0].As<Napi::String>().Utf8Value();
  
  // Convert to wide string (UTF-16) for Windows API
  int wstrSize = MultiByteToWideChar(CP_UTF8, 0, moduleName.c_str(), -1, NULL, 0);
  if (wstrSize == 0) {
    Napi::Error::New(env, "Failed to convert module name to wide string").ThrowAsJavaScriptException();
    return Napi::Boolean::New(env, false);
  }
  
  wchar_t* wideModuleName = new wchar_t[wstrSize];
  if (MultiByteToWideChar(CP_UTF8, 0, moduleName.c_str(), -1, wideModuleName, wstrSize) == 0) {
    delete[] wideModuleName;
    Napi::Error::New(env, "Failed to convert module name to wide string").ThrowAsJavaScriptException();
    return Napi::Boolean::New(env, false);
  }
  
  // Call the actual function
  BOOL result = RemoveDllFromPebW(wideModuleName);
  
  // Clean up
  delete[] wideModuleName;
  
  // Return the result as a JavaScript boolean
  return Napi::Boolean::New(env, result);
}

/**
 * Initialize the module by registering the native function
 */
Napi::Object Init(Napi::Env env, Napi::Object exports) {
  // Export the function as a method that can be called from JavaScript
  exports.Set("removeDllFromPebW", 
              Napi::Function::New(env, RemoveDllFromPebWWrapped));
  
  return exports;
}

// Register the module with Node.js
NODE_API_MODULE(removeDllFromPeb, Init) 