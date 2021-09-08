const { sanitizeArgv } = require('../sendTelemetry')

describe('sanitizeArgv', () => {
  it('ignores commands with no replacements', () => {
    const output = sanitizeArgv(['yarn', 'rw', 'foo', 'arg'])

    expect(output).toEqual('foo arg')
  })

  it('replaces sensitive args in first position', () => {
    const output = sanitizeArgv(['yarn', 'rw', 'g', 'page', 'Foo'])

    expect(output).toEqual('g page [name]')
  })

  it('replaces sensitive args in multiple positions', () => {
    const output = sanitizeArgv(['yarn', 'rw', 'g', 'page', 'Foo', '/foo'])

    expect(output).toEqual('g page [name] [path]')
  })

  it('does not replace --flag args in sensitive position', () => {
    const output = sanitizeArgv(['yarn', 'rw', 'g', 'page', 'Foo', '--force'])

    expect(output).toEqual('g page [name] --force')
  })
})
