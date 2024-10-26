import express from 'express';
import client from 'prom-client'

const app = express();

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const appStatusGauge = new client.Gauge({
  name: 'customer',
  help: 'Indicates if the application is up (1) or down (0)',
});

app.use(express.json());

app.get('/customer', (req, res) => {

});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => {
  appStatusGauge.set(1);
  console.log(`Customer running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  appStatusGauge.set(0);
  process.exit(0);
});