// config.js
const env = process.env.NODE_ENV; // 'dev' or 'test'
const development = {
    app: {
        port: 4000,
    },
    db: {
        host: "localhost",
        port: 27017,
        name: "development",
    },
};
const production = {
    app: {
        port: 8080,
    },
    db: {
        host: "localhost",
        port: 27017,
        name: "test",
    },
};
const test = {
    app: {
        port: 3000,
    },
    db: {
        host: "localhost",
        port: 27017,
        name: "test",
    },
};
const config = {
    test,
    production,
    development,
};
export default config[env];
//# sourceMappingURL=config.js.map