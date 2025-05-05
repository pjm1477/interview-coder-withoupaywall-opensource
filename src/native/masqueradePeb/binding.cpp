#include <napi.h>
#include <string>
#include <Windows.h>

// Forward declaration of the MasqueradePebAsExplorer function
// This will be implemented by including the actual function later
extern "C" BOOL MasqueradePebAsExplorer(VOID);

/**
 * Wraps the MasqueradePebAsExplorer function for use in Node.js
 */
Napi::Boolean MasqueradePebAsExplorerWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  
  // Call the actual function
  BOOL result = MasqueradePebAsExplorer();
  
  // Return the result as a JavaScript boolean
  return Napi::Boolean::New(env, result);
}

/**
 * Initialize the module by registering the native function
 */
Napi::Object Init(Napi::Env env, Napi::Object exports) {
  // Export the function as a method that can be called from JavaScript
  exports.Set("masqueradePebAsExplorer", 
              Napi::Function::New(env, MasqueradePebAsExplorerWrapped));
  
  return exports;
}

// Register the module with Node.js
NODE_API_MODULE(masqueradePeb, Init) 