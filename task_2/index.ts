import express, { Request, Response } from "express";
import axios from "axios";


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
  const clientIP = Array.isArray(clientIpHeader) ? clientIpHeader[0] : clientIpHeader || req.socket.remoteAddress || "Unknown";


  const isLocalIP = clientIP === "::1" || clientIP === "127.0.0.1" || clientIP.startsWith("192.168.") || clientIP.startsWith("10.");

  console.log(`Client IP: ${clientIP}`);

  if (isLocalIP) {
    // Provide default location and message for local IPs
    res.status(200).json({
      client_ip: clientIP,
      location: "Localhost",
      greeting: `Hello, ${visitorName}!, this is a local test. No real location or weather data available.`,
    });
    return;
  }
  


  try {

    const geoResponse = await axios.get<GeoResponse>(
      `http://ip-api.com/json/${clientIP}`
    );
    const location = geoResponse.data.city || "Unknown";

    const weatherResponse = await axios.get<WeatherResponse>(
      `api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=48c3baba43f99e9521a69d3463b3190c`
    );
    const temperature = weatherResponse.data.main.temp;

    res.status(200).json({
      client_ip: clientIP,
      location: location,
      greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}`,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve location or weather information" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
