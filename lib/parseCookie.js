function parseCookie(req) {
  const cookies = req.getHeader("Cookie") || "";
  const cookieObjects = {};
  cookies.split(";").map((cookie) => {
    const cookieParts = cookie.split("=");
    const cookieKey = cookieParts[0] || "";
    const cookieValue = cookieParts[1] || "";
    cookieObjects[cookieKey.trim()] = cookieValue.trim();
  });
  return cookieObjects;
}
