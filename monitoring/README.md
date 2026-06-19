# Monitoring

This folder contains Prometheus configuration for the app's `/metrics` endpoint.

## Local Docker Prometheus

Run the app and Prometheus together:

```sh
docker compose up --build
```

Open the app at `http://localhost:3000`. Open Prometheus at `http://localhost:9090` and query:

```promql
http_requests_total
```

## Kubernetes Prometheus

The Kubernetes Deployment and Service include Prometheus scrape annotations. A Prometheus instance with Kubernetes pod discovery can use `prometheus.yml` to discover the app pods and scrape `/metrics` on port `3000`.
