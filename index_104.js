import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import bodyParser from "body-parser";
import qr from "qr-image";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 0; // choose any free port

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

// QR code generation endpoint: returns PNG stream
app.get("/qr", async (req, res) => {
  const text = req.query.text || "";
  try {
    const delayMs = Number.parseInt(req.query.delay ?? "0", 10) || 0;
    try {
      // Optional artificial delay to test loaders
      if (delayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }

      // Prevent caching so each request fetches fresh data
      res.set({
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      });

      const png = qr.image(text, {
        type: "png",
        margin: 1,
        size: 6,
        ec_level: "M",
      });
      res.type("png");
      png.pipe(res);
    } catch (err) {
      console.error("/qr error:", err);
      res.status(400).send("Invalid QR request");
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).send("Server error");
  }
});

const server = app.listen(port, () => {
  const address = server.address();
  const actualPort = typeof address === "string" ? address : address.port;
  console.log(`listening on http://localhost:${actualPort} ...`);
});
