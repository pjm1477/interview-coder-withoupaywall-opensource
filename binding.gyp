{
  "targets": [
    {
      "target_name": "masqueradePeb",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [
        "src/native/masqueradePeb/binding.cpp",
        "src/native/masqueradePeb/implementation.cpp"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ],
      "conditions": [
        ["OS=='win'", {
          "msvs_settings": {
            "VCCLCompilerTool": {
              "AdditionalOptions": [ "/EHsc" ]
            }
          },
          "libraries": [
            "kernel32.lib",
            "user32.lib",
            "gdi32.lib",
            "winspool.lib",
            "comdlg32.lib",
            "advapi32.lib",
            "shell32.lib",
            "ole32.lib",
            "oleaut32.lib",
            "uuid.lib",
            "odbc32.lib",
            "odbccp32.lib"
          ]
        }]
      ]
    },
    {
      "target_name": "sleepObfuscation",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [
        "src/native/sleepObfuscation/binding.cpp",
        "src/native/sleepObfuscation/implementation.cpp"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ],
      "conditions": [
        ["OS=='win'", {
          "msvs_settings": {
            "VCCLCompilerTool": {
              "AdditionalOptions": [ "/EHsc" ]
            }
          },
          "libraries": [
            "kernel32.lib",
            "user32.lib",
            "gdi32.lib",
            "winspool.lib",
            "comdlg32.lib",
            "advapi32.lib",
            "shell32.lib",
            "ole32.lib",
            "oleaut32.lib",
            "uuid.lib",
            "odbc32.lib",
            "odbccp32.lib"
          ]
        }]
      ]
    },
    {
      "target_name": "removeDllFromPeb",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [
        "src/native/removeDllFromPeb/binding.cpp",
        "src/native/removeDllFromPeb/implementation.cpp"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ],
      "conditions": [
        ["OS=='win'", {
          "msvs_settings": {
            "VCCLCompilerTool": {
              "AdditionalOptions": [ "/EHsc" ]
            }
          },
          "libraries": [
            "kernel32.lib",
            "user32.lib",
            "gdi32.lib",
            "winspool.lib",
            "comdlg32.lib",
            "advapi32.lib",
            "shell32.lib",
            "ole32.lib",
            "oleaut32.lib",
            "uuid.lib",
            "odbc32.lib",
            "odbccp32.lib"
          ]
        }]
      ]
    },
    {
      "target_name": "chromeMonitor",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [
        "src/native/chromeMonitor/binding.cpp",
        "src/native/chromeMonitor/implementation.cpp"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ],
      "conditions": [
        ["OS=='win'", {
          "msvs_settings": {
            "VCCLCompilerTool": {
              "AdditionalOptions": [ "/EHsc" ]
            }
          },
          "libraries": [
            "kernel32.lib",
            "user32.lib",
            "gdi32.lib",
            "winspool.lib",
            "comdlg32.lib",
            "advapi32.lib",
            "shell32.lib",
            "ole32.lib",
            "oleaut32.lib",
            "uuid.lib",
            "odbc32.lib",
            "odbccp32.lib",
            "UIAutomationCore.lib",
            "UIAutomationClient.lib"
          ]
        }]
      ]
    }
  ]
} 