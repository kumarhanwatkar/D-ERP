export const notFound = (request, response) => {
  response.status(404).json({
    message: 'Route not found',
    path: request.path,
  });
};

export const errorHandler = (error, request, response, next) => {
  console.error(error);
  const statusCode = error.statusCode || error.status || 500;
  response.status(statusCode).json({
    message: error.message || 'Internal server error',
  });
};
