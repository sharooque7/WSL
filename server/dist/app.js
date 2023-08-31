import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/userRoute.js";
import skillRouter from "./routes/skillRoute.js";
import express from "express";
const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 5000 }));
app.use(cors({
    origin: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));
if (app.get("env") === "development") {
    app.use((req, res, next) => {
        console.log("Development");
        return next();
    });
}
if (app.get("env") === "Production") {
    app.use((req, res, next) => {
        console.log("Production");
        return next();
    });
}
// app.use(express.static(path.join(__dirname, "..", "public")));
app.post("/v", (req, res, next) => {
    res.json("dhh");
});
app.use("/v1/user", userRouter);
app.use("/v1/skill", skillRouter);
// app.get("/*", (req: Request, res: Response, next: NextFunction) => {
//   res.sendFile(path.join(__dirname, "..", "public", "index.html"));
// });
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            ...error,
        },
    });
});
export default app;
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map