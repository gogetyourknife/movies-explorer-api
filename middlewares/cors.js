const allowedCors = [
  'https://localhost:3000',
  'http://localhost:3000',
  'https://best-movies.nomoredomains.icu',
  'https://api.best-movies.nomoredomains.icu',
  'http://api.best-movies.nomoredomains.icu',
  'http://best-movies.nomoredomains.icu',
  'https://api.nomoreparties.co/beatfilm-movies',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};