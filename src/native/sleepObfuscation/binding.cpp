#include <napi.h>
#include <string>
#include <Windows.h>

// Forward declaration of the function
extern "C" BOOL SleepObfuscationViaVirtualProtect(_In_ DWORD dwSleepTimeInMilliseconds, _In_ PUCHAR Key);

/**
 * Wraps the SleepObfuscationViaVirtualProtect function for use in Node.js
 */
Napi::Boolean SleepObfuscationViaVirtualProtectWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  
  // Validate arguments
  if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsBuffer()) {
    Napi::TypeError::New(env, "Expected a number and a buffer as arguments").ThrowAsJavaScriptException();
    return Napi::Boolean::New(env, false);
  }
  
  // Get the sleep time from the first argument
  DWORD sleepTime = info[0].As<Napi::Number>().Uint32Value();
  
  // Get the key from the second argument
  Napi::Buffer<UCHAR> keyBuffer = info[1].As<Napi::Buffer<UCHAR>>();
  PUCHAR key = keyBuffer.Data();
  
  // Call the actual function
  BOOL result = SleepObfuscationViaVirtualProtect(sleepTime, key);
  
  // Return the result as a JavaScript boolean
  return Napi::Boolean::New(env, result);
}

/**
 * Initialize the module by registering the native function
 */
Napi::Object Init(Napi::Env env, Napi::Object exports) {
  // Export the function as a method that can be called from JavaScript
  exports.Set("sleepObfuscationViaVirtualProtect", 
              Napi::Function::New(env, SleepObfuscationViaVirtualProtectWrapped));
  
  return exports;
}

// Register the module with Node.js
NODE_API_MODULE(sleepObfuscation, Init) 