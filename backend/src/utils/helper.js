import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );
};

export const sendUserResponse = (res, user, message = "Success") => {
    const token = generateToken(user);
    res.status(200).json({
        message,
        data: {
            id: user._id,
            username: user.username,
            email: user.email,
            token
        }
    });
};
