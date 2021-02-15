// Global error handler
const errorHandler = (err, req, res, next) => {
  // Log error
  console.log(err.name, err.message)

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' && err.stack,
  })
}

// Unhandled routes [NB: app.all('*', (req, res, next) => {}) works as well]
const unhandledRoutes = (req, res, next) => {
  const error = new Error(`${req.originalUrl} not available on this server!`)
  res.status(404)
  next(error)
}

export { unhandledRoutes, errorHandler }
