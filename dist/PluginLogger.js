/**
 * Async, variadic, DRY logging utility for Homebridge plugins with optional device-specific logging.
 *
 * Usage:
 *   import { PluginLogger } from './PluginLogger.js';
 *   const logger = new PluginLogger(homebridgeLog, { getLoggingMode, enabledDeviceIds: ['ABC123'] });
 *   await logger.info('Hello world');
 *   await logger.device('ABC123').info('Device-specific log');
 */
export class PluginLogger {
    log;
    getLoggingMode;
    enabledDeviceIds;
    deviceId;
    /**
     * @param log - Homebridge log object (with info, warn, error, debug, success).
     * @param options - Logger options, including getLoggingMode and enabledDeviceIds.
     * @param deviceId - (internal) Used for device-specific logger instances.
     */
    constructor(log, options, deviceId) {
        this.log = log;
        this.getLoggingMode = options.getLoggingMode;
        this.enabledDeviceIds = options.enabledDeviceIds ? new Set(options.enabledDeviceIds) : undefined;
        this.deviceId = deviceId;
    }
    /**
     * Returns a logger instance for a specific device ID. Device-specific logs are only emitted if the device ID is enabled.
     *
     * @param deviceId - The device ID to enable logging for.
     * @returns {PluginLogger} A logger instance bound to the device ID.
     */
    device(deviceId) {
        return new PluginLogger(this.log, {
            getLoggingMode: this.getLoggingMode,
            enabledDeviceIds: this.enabledDeviceIds ? Array.from(this.enabledDeviceIds) : undefined,
        }, deviceId);
    }
    /**
     * Centralized log message handler to reduce duplication.
     * Handles log level, debug checks, prefixes, and device-specific filtering.
     */
    async logMessage(level, args, debugOnly = false, prefix) {
        const mode = await this.getLoggingMode();
        if (mode === 'none') {
            return;
        }
        if (debugOnly && mode !== 'debugMode' && mode !== 'debug') {
            return;
        }
        if (this.deviceId && this.enabledDeviceIds && !this.enabledDeviceIds.has(this.deviceId)) {
            return;
        }
        const msg = [
            ...(this.deviceId ? [`[Device:${this.deviceId}]`] : []),
            ...(prefix ? [prefix] : []),
            ...args,
        ];
        switch (level) {
            case 'info':
                this.log.info(...msg);
                break;
            case 'success':
                this.log.success ? this.log.success(...msg) : this.log.info(...msg);
                break;
            case 'warn':
                this.log.warn(...msg);
                break;
            case 'error':
                this.log.error(...msg);
                break;
            case 'debug':
                this.log.debug(...msg);
                break;
        }
    }
    /** Log info messages. */
    async info(...log) {
        await this.logMessage('info', log);
    }
    /** Log success messages. */
    async success(...log) {
        await this.logMessage('success', log);
    }
    /** Log debug-level success messages. */
    async debugSuccess(...log) {
        await this.logMessage('success', log, true, '[DEBUG]');
    }
    /** Log warning messages. */
    async warn(...log) {
        await this.logMessage('warn', log);
    }
    /** Log debug-level warning messages. */
    async debugWarn(...log) {
        await this.logMessage('warn', log, true, '[DEBUG]');
    }
    /** Log error messages. */
    async error(...log) {
        await this.logMessage('error', log);
    }
    /** Log debug-level error messages. */
    async debugError(...log) {
        await this.logMessage('error', log, true, '[DEBUG]');
    }
    /** Log debug messages. */
    async debug(...log) {
        const mode = await this.getLoggingMode();
        if (mode === 'debugMode') {
            await this.logMessage('debug', log);
        }
        else if (mode === 'debug') {
            await this.logMessage('info', log, false, '[DEBUG]');
        }
    }
}
//# sourceMappingURL=PluginLogger.js.map