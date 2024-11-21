const EXPIRES_IN = +(process.env.JWT_EXPIRES_IN ?? 60 * 60 * 1); // 1 hour

export const jwtConfig = {
    secret: 'your-secret-key',
    signOptions: { expiresIn: EXPIRES_IN },
};

export const maxAge = EXPIRES_IN * 1000;
