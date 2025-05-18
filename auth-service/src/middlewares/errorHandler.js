export const ConnectionError = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      error: 'Internal Server Error',
      message: err.message
    });
  };

export const JsonError = ((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({ error: "Invalid JSON format" });
    }
    next();
  });