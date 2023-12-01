/**
 * CircleCI API (v2)
 * @see https://circleci.com/docs/api/v2/index.html
 */

import {
  CircleCIOptions,
  EnvVar,
  HTTPMethod,
} from './type'

export class CircleCI {
  static readonly #BASE_URL = 'https://circleci.com/api/v2/'
  #token: string
  #orgId: string
  #projectId: string
  #projectSlug: string

  constructor(args: CircleCIOptions) {
    this.#token = args.token
    this.#orgId = args.orgId
    this.#projectId = args.projectId
    this.#projectSlug = `circleci/${this.#orgId}/${this.#projectId}`
  }

  #fetch<T>(url: string, method: HTTPMethod, body?: object): Promise<T> {
    const headers = new Headers()
    headers.set('Circle-Token', this.#token)
    if (body && method !== HTTPMethod.GET) {
      headers.set('Content-Type', 'application/json')
    }
    headers.set('Accept', 'application/json')
    return fetch(CircleCI.#BASE_URL + url, {
      method,
      headers,
      body: JSON.stringify(body),
    }).then((response) => {
      if (!response.ok) {
        throw (response.statusText)
      }
      return response.json()
    }) as Promise<T>
  }

  /**
   * https://circleci.com/docs/api/v2/index.html#operation/createEnvVar
   * @param envvar
   * @returns
   */
  createProjectEnvVar(envvar: EnvVar): Promise<void> {
    return this.#fetch(`project/${this.#projectSlug}/envvar`, HTTPMethod.POST, envvar).then(() => { })
  }

  /**
   * https://circleci.com/docs/api/v2/index.html#operation/listEnvVars
   * @returns
   */
  listProjectEvnVars(): Promise<Array<EnvVar>> {
    return this.#fetch<{
      items: Array<EnvVar>
    }>(`project/${this.#projectSlug}/envvar`, HTTPMethod.GET).then(json => json.items.map((item) => {
      return {
        name: item.name,
        value: item.value,
      }
    }))
  }

  /**
   * https://circleci.com/docs/api/v2/index.html#operation/deleteEnvVar
   * @param varName
   * @returns
   */
  deleteProjectEnvVar(varName: string): Promise<string> {
    return this.#fetch<{
      message: string
    }>(`project/${this.#projectSlug}/envvar/${varName}`, HTTPMethod.DELETE).then(json => json.message)
  }
}
