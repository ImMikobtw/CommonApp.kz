const requiredEnv = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
};

for (const [key, value] of Object.entries(requiredEnv)) {
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
}

export const env = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
};