// chrome-headers.js — Fixed CORS for Chrome (strict origin matching)

const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:4173",
  "https://digi-edu.vercel.app",
];

const chromeHeaders = (req, res, next) => {
  const origin = req.headers.origin;

  // ✅ FIX: Chrome blocks credentials:true with wildcard "*"
  // Must echo back the EXACT origin, never use "*" when credentials are involved
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  } else if (!origin) {
    // Same-origin or server-to-server request (Postman, curl, health checks)
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  // If origin exists but is NOT in the list → no CORS headers → Chrome will block it (correct behavior)

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept, X-Requested-With, Origin"
  );

  // Chrome caches preflight for 24h — reduces repeated OPTIONS calls
  res.setHeader("Access-Control-Max-Age", "86400");

  // ✅ Chrome ALWAYS sends OPTIONS preflight before POST — must respond 204 immediately
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
};

module.exports = chromeHeaders;