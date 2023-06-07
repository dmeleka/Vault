import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, masterPassword: req.body.masterPassword })
        const userData = { id: user._id }
        if (user) {
            // , { expiresIn: '3600s' }
            const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
            const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET)
            user.refreshToken = refreshToken
            await user.save()
            res.json({ auth: true, accessToken: accessToken, refreshToken: refreshToken })
        }
        else
            res.json({ auth: false, message: "No user found" })

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const verifyJWT = (req, res, next) => {
    const token = req.headers["token"]
    if (!token) {
        res.json({ auth: false, message: "No token found" })
    }
    else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "failed to auth" })
            }
            else {
                req.userId = decoded.id;;
                next();
            }
        })
    }
}

// const REFRESH_TIME = 1 * 60 * 1000; // 1 minutes in milliseconds
// let tokenExpirationTimer;

// export const refreshToken = () => {
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//         if (err) {
//             res.json({ auth: false, message: "failed to auth" })
//         }
//         else {
//             const accessToken = jwt.sign(decoded.id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '120s' })
//             res.json({ auth: true, accessToken: accessToken, refreshToken: refreshToken })
//         }
//     })
//     startTokenExpirationTimer();
// };

// const startTokenExpirationTimer = () => {
//     clearTimeout(tokenExpirationTimer);
//     tokenExpirationTimer = setTimeout(refreshToken, new Date(localStorage.getItem('tokenExpiry')).getTime() - Date.now() - REFRESH_TIME);
// };


// localStorage.setItem('myTokenExpiry', JSON.stringify(Date.now() + (2 * 60 * 1000))); // Set expiry time to 1 hour from now
// startTokenExpirationTimer();


export const logout = (req, res) => {
    User.updateOne({ username: req.body.username }, { refreshToken: null })
}
