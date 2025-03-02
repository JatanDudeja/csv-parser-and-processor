import { connectToDB } from "./database";
import app from "./server";

const PORT = process.env.PORT || 3000;

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servers is running on PORT ${PORT}`);
    });
  })

  .catch((err) => {
    console.log("Failed to connect to DB");
    throw new Error(JSON.stringify(err));
  });
