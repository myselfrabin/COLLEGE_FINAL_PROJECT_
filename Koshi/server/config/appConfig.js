import "dotenv/config";

export const appConfig = {
  corsConfig: {
    origin: ["http://localhost:8080"], // or ["*"] for all origins (less secure)
    methods: ["GET", "POST"],
  },
};
