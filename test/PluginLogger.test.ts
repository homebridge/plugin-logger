import type { PluginLoggerOptions } from '../src/types'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PluginLogger } from '../src/PluginLogger'

describe('pluginLogger', () => {
  const log = {
    info: vi.fn(),
    success: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  }

  const getLoggingMode = vi.fn().mockResolvedValue('debugMode')
  const options: PluginLoggerOptions = { getLoggingMode }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('logs info messages', async () => {
    const logger = new PluginLogger(log, options)
    await logger.info('test info')
    expect(log.info).toHaveBeenCalledWith('test info')
  })

  it('logs success messages', async () => {
    const logger = new PluginLogger(log, options)
    await logger.success('test success')
    expect(log.success).toHaveBeenCalledWith('test success')
  })

  it('logs warn messages', async () => {
    const logger = new PluginLogger(log, options)
    await logger.warn('test warn')
    expect(log.warn).toHaveBeenCalledWith('test warn')
  })

  it('logs error messages', async () => {
    const logger = new PluginLogger(log, options)
    await logger.error('test error')
    expect(log.error).toHaveBeenCalledWith('test error')
  })

  it('logs debug messages in debugMode', async () => {
    const logger = new PluginLogger(log, options)
    await logger.debug('test debug')
    expect(log.debug).toHaveBeenCalledWith('test debug')
  })

  it('logs device-specific messages', async () => {
    const logger = new PluginLogger(log, { ...options, enabledDeviceIds: ['dev1'] })
    await logger.device('dev1').info('device log')
    expect(log.info).toHaveBeenCalledWith('[Device:dev1]', 'device log')
  })

  it('does not log for disabled device', async () => {
    const logger = new PluginLogger(log, { ...options, enabledDeviceIds: ['dev2'] })
    await logger.device('dev1').info('should not log')
    expect(log.info).not.toHaveBeenCalled()
  })

  it('respects logging mode none', async () => {
    const getNone = vi.fn().mockResolvedValue('none')
    const logger = new PluginLogger(log, { getLoggingMode: getNone })
    await logger.info('no log')
    expect(log.info).not.toHaveBeenCalled()
  })
})
