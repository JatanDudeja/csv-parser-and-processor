import express from "express";
import ParsingRouter from "./routers/parsing.router.js";

const app = express();

app.use("/v1/parse", ParsingRouter);

export default app;
