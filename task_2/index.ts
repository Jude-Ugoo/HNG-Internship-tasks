import express, { Request, Response } from "express";
import axios from "axios";
import "dotenv/config";

const app = express();
const port = 8001;

app.use(express.json());

interface GeoResponse {
  city: string;
}

interface WeatherResponse {
  main: {
    temp: number;
  };
}

app.get("/api/hello", async (req: Request, res: Response) => {
  const visitorName = req.query.visitor_name as string;

  // Get the client's IP address
  const clientIpHeader = req.headers["x-forwarded-for"];
  const clientIP = Array.isArray(clientIpHeader)
    ? clientIpHeader[0]
    : clientIpHeader || req.socket.remoteAddress || "Unknown";
  console.log(clientIP);

  try {
    const geoResponse = await axios.get<GeoResponse>(
      `http://ip-api.com/json/102.88.71.33?fields=61439`
    );
    console.log(geoResponse)

    const location = geoResponse.data.city || "Unknown";
    console.log(location);

    const weatherResponse = await axios.get<WeatherResponse>(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.WEATHER_API_KEY}`
    );
    const temperature = weatherResponse.data.main.temp;
    console.log(temperature);

    res.status(200).json({
      client_ip: clientIP,
      location: location,
      greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve location or weather information" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
