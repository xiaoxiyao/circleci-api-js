export interface CircleCIOptions {
  /**
   * Personal API token.
   * @see https://circleci.com/docs/managing-api-tokens/#creating-a-personal-api-token
   */
  token: string

  orgId: string

  projectId: string
}

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export interface EnvVar {
  name: string
  value: string
}
