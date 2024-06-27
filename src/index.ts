import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";

const app = express();
app.use(express.json());
app.use("/api", rootRouter);
app.use(errorMiddleware)

export const prismaClient = new PrismaClient({
  log: ["query"],
}).$extends({
  result:{
    address:{
      formattedAddress: {
        needs: {
          lineOne: true,
          lineTwo: true,
          city: true,
          country: true,
          pincode: true
        },
        compute: (addr) => {
            return `${addr.lineOne}, ${addr.lineTwo}, ${addr.city}, ${addr.country}-${addr.pincode} `
        }  
      }
    }
  }
})

const server = app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});

export { app, server };
