import type { PluginLoggerOptions } from './types';
/**
 * Async, variadic, DRY logging utility for Homebridge plugins with optional device-specific logging.
 *
 * Usage:
 *   import { PluginLogger } from './PluginLogger.js';
 *   const logger = new PluginLogger(homebridgeLog, { getLoggingMode, enabledDeviceIds: ['ABC123'] });
 *   await logger.info('Hello world');
 *   await logger.device('ABC123').info('Device-specific log');
 */
export declare class PluginLogger {
    private log;
    private getLoggingMode;
    private enabledDeviceIds?;
    private deviceId?;
    /**
     * @param log - Homebridge log object (with info, warn, error, debug, success).
     * @param options - Logger options, including getLoggingMode and enabledDeviceIds.
     * @param deviceId - (internal) Used for device-specific logger instances.
     */
    constructor(log: any, options: PluginLoggerOptions, deviceId?: string);
    /**
     * Returns a logger instance for a specific device ID. Device-specific logs are only emitted if the device ID is enabled.
     *
     * @param deviceId - The device ID to enable logging for.
     * @returns {PluginLogger} A logger instance bound to the device ID.
     */
    device(deviceId: string): PluginLogger;
    /**
     * Centralized log message handler to reduce duplication.
     * Handles log level, debug checks, prefixes, and device-specific filtering.
     */
    private logMessage;
    /** Log info messages. */
    info(...log: any[]): Promise<void>;
    /** Log success messages. */
    success(...log: any[]): Promise<void>;
    /** Log debug-level success messages. */
    debugSuccess(...log: any[]): Promise<void>;
    /** Log warning messages. */
    warn(...log: any[]): Promise<void>;
    /** Log debug-level warning messages. */
    debugWarn(...log: any[]): Promise<void>;
    /** Log error messages. */
    error(...log: any[]): Promise<void>;
    /** Log debug-level error messages. */
    debugError(...log: any[]): Promise<void>;
    /** Log debug messages. */
    debug(...log: any[]): Promise<void>;
}
//# sourceMappingURL=PluginLogger.d.ts.map