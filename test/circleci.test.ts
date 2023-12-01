import {
  describe,
  expect,
  test,
} from '@jest/globals'
import { CircleCI } from '../src/circleci'
import 'dotenv/config'

const api = new CircleCI({
  token: process.env.TOKEN as string,
  orgId: process.env.ORGID as string,
  projectId: process.env.PROJECTID as string,
})

describe('project APIs', () => {
  test('add project envvar', async () => {
    await api.createProjectEnvVar({
      name: 'testName',
      value: 'testValue',
    })
    const vars = await api.listProjectEvnVars()
    expect(vars).toHaveLength(1)
    expect(vars[0]).toEqual({
      name: 'testName',
      value: 'xxxxalue',
    })
  })

  test('delete project envvar', async () => {
    await api.deleteProjectEnvVar('testName')
    const vars = await api.listProjectEvnVars()
    expect(vars).toHaveLength(0)
  })
})
