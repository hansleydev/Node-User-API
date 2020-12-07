// --------------------- Create Route Protection Middleware ---------------------

const protectRoute = async (req, res, next) => {
  try {
    // Get Authentication Status

    const userAuthenticated = await req.isAuthenticated();

    // Check Authorization Status

    if (req.user) {
      if (userAuthenticated) {
        if (req.user.email === req.params.email) {
          return next();
        } else {
          const response = {
            message: "User not authorized.",
          };

          console.error(response);

          return res.status(403).json(response);
        }
      } else {
        const response = {
          message: "User not authenticated.",
        };

        console.error(response);

        return res.status(403).json(response);
      }
    } else {
      const response = {
        message: "User not signed in.",
      };

      console.error(response);

      return res.status(403).json(response);
    }
  } catch (error) {
    const response = {
      message: "Could check authentication and authorization status.",
      error,
    };

    console.error(response);

    return res.status(500).json(response);
  }
};

module.exports = protectRoute;
