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
  test('add/modify/delete envvar', async () => {
    // add
    await api.createProjectEnvVar({
      name: 'testName',
      value: 'testValue',
    })
    let vars = await api.listProjectEvnVars()
    expect(vars).toHaveLength(1)
    expect(vars[0]).toEqual({
      name: 'testName',
      value: 'xxxxalue',
    })

    // modify
    await api.createProjectEnvVar({
      name: 'testName',
      value: 'testValue2',
    })
    vars = await api.listProjectEvnVars()
    expect(vars).toHaveLength(1)
    expect(vars[0]).toEqual({
      name: 'testName',
      value: 'xxxxlue2',
    })

    // delete
    await api.deleteProjectEnvVar('testName')
    vars = await api.listProjectEvnVars()
    expect(vars).toHaveLength(0)
  })
})
