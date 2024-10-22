const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret_key = process.env.SECRET_KEY;

const auth = (request, response, next) => {
    try {

        const token = request.header('Authorization');
        console.log('auth', token)
        if (!token) return res.status(401).json({ error: 'Access denied' });
        jwt.verify(token, secret_key, (err) => {
            if(err) {
                console.log('errrr', err);
                return response.status(403).json({ error: 'Invalid token' })
            } else {
                next();
            }
        })
      
    } catch (error) {
        console.log('error')
        response.status(403).json({})
    }
}

module.exports = {
  auth,
}