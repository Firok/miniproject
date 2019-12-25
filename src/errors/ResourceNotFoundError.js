export default class ResourceNotFoundError extends Error {
  constructor(message) {
    super(message)
    Error.captureStackTrace(this, ResourceNotFoundError)
  }
}
