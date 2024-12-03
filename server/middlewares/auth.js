import jwt from 'jsonwebtoken';

// Middleware function to decode jwt token to get clerkId

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res
        .status(401)
        .json({ sucess: false, message: 'Not Authorized Login Again' });
    }

    const token_decode = jwt.decode(token);
    req.body.clerkId = token_decode.clerkId;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ sucess: false, message: error.message });
  }
};

export { authUser };
