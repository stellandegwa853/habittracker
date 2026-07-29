export function getApiErrorMessage(requestError, fallbackMessage) {
  const responseData = requestError?.response?.data

  if (!responseData) {
    return fallbackMessage
  }

  if (typeof responseData === 'string') {
    return responseData
  }

  if (responseData.detail) {
    return responseData.detail
  }

  if (responseData.message) {
    return responseData.message
  }

  if (Array.isArray(responseData.non_field_errors)) {
    return responseData.non_field_errors[0] || fallbackMessage
  }

  const firstFieldError = Object.values(responseData)
    .flat()
    .find(Boolean)

  return typeof firstFieldError === 'string'
    ? firstFieldError
    : fallbackMessage
}
