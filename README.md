# PluginLogger

[![npm version](https://img.shields.io/npm/v/@homebridge/plugin-logger.svg?style=flat-square)](https://www.npmjs.com/package/@homebridge/plugin-logger)
[![npm downloads](https://img.shields.io/npm/dm/@homebridge/plugin-logger.svg?style=flat-square)](https://www.npmjs.com/package/@homebridge/plugin-logger)

Async, variadic, device-aware logger utility for Homebridge plugins. Supports platform-wide and device-specific logging with filtering and Homebridge log integration.

## Install

```sh
npm install @homebridge/plugin-logger
```

## Why Use PluginLogger?

Homebridge plugin developers often need to:
- Log messages at different levels (info, warn, error, debug, etc.)
- Filter logs for specific devices or contexts
- Support dynamic log modes (debug, standard, none) at runtime
- Avoid leaking secrets or sensitive data in logs
- Integrate seamlessly with Homebridge's logging system

**PluginLogger** solves these needs with:

- **Device-aware logging:**
	- Log messages for a specific device using `logger.device(deviceId)`. This helps users and developers debug issues for individual accessories without cluttering the main log.
	- Device logs are only emitted if the device ID is enabled, reducing noise and improving focus during troubleshooting.

- **Async, variadic log methods:**
	- All log methods are async and accept any number of arguments, so you can log complex or dynamic data easily.
	- Async design allows for runtime log mode checks and future extensibility (e.g., remote log streaming).

- **Dynamic log mode support:**
	- Pass a `getLoggingMode` function to control log verbosity at runtime (e.g., 'debug', 'standard', 'none').
	- Enables plugins to respect user preferences or config changes without restart.

- **Homebridge integration:**
	- Works with the Homebridge log object, so logs appear in the UI and standard output as expected.
	- Supports Homebridge's custom log levels (e.g., `success`).

- **Security and privacy:**
	- Designed to avoid logging secrets or sensitive values.
	- Encourages best practices for log filtering and error handling.

## Features
- Info, success, warn, error, and debug log levels
- Device-specific logging with filtering
- Async, variadic log methods
- Dynamic runtime log mode switching
- Designed for Homebridge plugins (but reusable elsewhere)

## Usage
```ts
import { PluginLogger } from './PluginLogger.js';
const logger = new PluginLogger(homebridgeLog, { getLoggingMode, enabledDeviceIds: ['ABC123'] });
await logger.info('Platform log');
await logger.device('ABC123').info('Device log');
```

## API
- `info`, `success`, `warn`, `error`, `debug` (async, variadic)
- `device(deviceId)` returns a logger instance for that device
- Device logs are only emitted if the device ID is enabled
- All log methods respect the current logging mode
