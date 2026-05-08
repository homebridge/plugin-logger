export type LogLevel = 'info' | 'success' | 'warn' | 'error' | 'debug';
export interface PluginLoggerOptions {
    getLoggingMode: () => Promise<string> | string;
    enabledDeviceIds?: string[];
}
//# sourceMappingURL=types.d.ts.map