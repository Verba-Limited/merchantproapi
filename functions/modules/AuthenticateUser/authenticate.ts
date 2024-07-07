var { expressjwt: jwt } = require("express-jwt");

const getTokenFromHeaders = (req: any) => {
  const { headers: { authorization } } = req;
  if(authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

export const authenticate = {
  required: jwt({
    secret: 'secret',
    algorithms: ['HS256'],
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'secret',
    algorithms: ['HS256'],
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};


// const authenticate = (req, res, next) => {
//   const accessToken = req.headers['authorization'];
//   const refreshToken = req.cookies['refreshToken'];

//   if (!accessToken && !refreshToken) {
//     return res.status(401).send('Access Denied. No token provided.');
//   }

//   try {
//     const decoded = jwt.verify(accessToken, secretKey);
//     req.user = decoded.user;
//     next();
//   } catch (error) {
//     if (!refreshToken) {
//       return res.status(401).send('Access Denied. No refresh token provided.');
//     }

//     try {
//       const decoded = jwt.verify(refreshToken, secretKey);
//       const accessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: '1h' });

//       res
//         .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
//         .header('Authorization', accessToken)
//         .send(decoded.user);
//     } catch (error) {
//       return res.status(400).send('Invalid Token.');
//     }
//   }
// };