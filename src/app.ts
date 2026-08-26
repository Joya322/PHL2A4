import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { authRoute } from "./modules/auth/auth.route";
import { adminRoute } from "./modules/admin/admin.route";
import { reviewRoute } from "./modules/review/review.route";
import { paymentRoute } from "./modules/payment/payment.route";
import { rentalRoute } from "./modules/rentalRequest/rentalRequest.route";
import { landlordRoute } from "./modules/landlord/landlord.route";
import { propertyRoute } from "./modules/property/property.route";
import { notFound } from "./middlewares/notFound";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoute);
app.use("/api/properties", propertyRoute);
app.use("/api/landlord", landlordRoute);
app.use("/api/rentals", rentalRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/admin", adminRoute);

app.use(notFound);



export default app;
