export default {
  preset: "@shelf/jest-mongodb",
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
