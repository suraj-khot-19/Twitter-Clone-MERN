import jwt from 'jsonwebtoken'
export const generateToken = (userId, res) => {
    //create a token
    const token = jwt.sign({ userId }, process.env.JWT_SECURE_CODE, { expiresIn: '15d' });

    ///send as res
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //15 days
        httpOnly: true, // XSS attack
        sameSite: 'strict', //CSRF attack
        secure: process.env.NODE_ENV !== "development", //for deve
    });
}

export default generateToken;