import {
  UnauthorizedError,
  ResourceNotFoundError
} from "../errors"

export const onError = async (err, req, res) => {
  // Make sure error is a proper Error object
  if (!(err instanceof Error)) {
    console.error("DO NOT USE OBJECT LITERALS AS ERRORS", err)
    return res.status(500).json({
      type: "invalid_error_type"
    })
  }

  // Respond and log
  const respondAndLog = (statusCode, responseObject) => {
    if (statusCode >= 500) {
      console.error(err.stack)
    }

    // Always return JSON
    return res.status(statusCode).json(responseObject)
  }

  // Check error types
  switch (err.constructor) {
    case UnauthorizedError: {
      respondAndLog(401, {
        type: "unauthorized_access",
        message: err.message
      })
      break
    }

    case ResourceNotFoundError: {
      respondAndLog(404, {
        type: "resource_not_found",
        message: err.message
      })
      break
    }

    default: {
      console.warn(`Did not recognize ${err.constructor.name}.`)
      respondAndLog(500, {
        type: "unknown_error",
        message: err.message
      })
      break
    }
  }
}
