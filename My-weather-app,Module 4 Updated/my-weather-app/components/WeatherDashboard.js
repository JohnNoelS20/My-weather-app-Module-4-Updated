import useSWR from 'swr';
import { Card, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ALERT_DANGER = "alert alert-danger";
const ALERT_INFO = "alert alert-info";

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function WeatherDashboard({ location }) {
    const { data, error } = useSWR(
        location
            ? `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
            : null,
        fetcher
    );

    if (error) return <div className={ALERT_DANGER}>Failed to load weather data. Please try again later.</div>;
    if (!data) return <div className={ALERT_INFO}>Loading...</div>;

    const { name, weather, main = {}, wind = {} } = data;

    // Default values for temperature, humidity, and wind speed
    const temperature = main.temp ? `${main.temp.toFixed(1)}°C` : 'N/A';
    const description = weather?.[0]?.description || 'N/A';
    const humidity = main.humidity ? `${main.humidity}%` : 'N/A';
    const windSpeed = wind.speed ? `${wind.speed.toFixed(1)} m/s` : 'N/A';

    return (
        <Card className="mt-4" style={{ padding: '50px', width: '500px' }}>
            <Card.Body>
                <Card.Title className="text-center mb-4">{name}</Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <span className="font-weight-bold">Temperature:</span>
                        <span>{temperature}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <span className="font-weight-bold">Description:</span>
                        <span>{description}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <span className="font-weight-bold">Humidity:</span>
                        <span>{humidity}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <span className="font-weight-bold">Wind Speed:</span>
                        <span>{windSpeed}</span>
                    </ListGroup.Item>
                </ListGroup>
                <div className="text-center mt-4">
                    <span className="font-weight-bold">The Weather for {name} is {description} with a humidity of {humidity} and wind speed of {windSpeed}</span>

                </div>
            </Card.Body>
        </Card>
    );
}
