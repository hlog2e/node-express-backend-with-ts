import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import "./model";
import mainRouter from "./router/index";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.set("trust proxy", "127.0.0.1");
app.use(morgan("combined"));

// CORS
//   const whitelist = [
//    "~~~~"
//   ];
const corsOptions: cors.CorsOptions = {
  // origin: function (origin, callback) {
  //   if (!origin || whitelist.indexOf(origin!) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  origin: "*",
  credentials: true,
};

app.get("/", (req, res) => {
  res.json({ status: 200, message: "Welcome" });
});

app.use(cors(corsOptions)); // health checker 를 위해 CORS를 health checker 선언 후 선언
app.use(mainRouter);

//에러 핸들링
app.use((req, res, next) => {
  res.status(400).send({ status: 400, message: "올바르지 않은 접근입니다." });
});

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err);
    res.status(500).send({ status: 500, message: "internal error" });
  }
);

const port = Number(process.env.PORT) || 3001;

app.listen(port, "0.0.0.0", () => {
  console.log("on " + port);
});
