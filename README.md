# CI/CD Kubernetes Monitoring App

A small Node.js service used to demonstrate CI/CD, Docker, Kubernetes deployment, health checks, and Prometheus monitoring.

## App Endpoints

- `GET /` returns app metadata.
- `GET /health` returns health status for Kubernetes probes.
- `GET /metrics` exposes Prometheus metrics.

## Run Locally

```sh
cd app
npm ci
npm start
```

Open `http://localhost:3000`.

## Run With Docker Compose

```sh
docker compose up --build
```

Open the app at `http://localhost:3000` and Prometheus at `http://localhost:9090`.

## CI/CD

GitHub Actions workflow: `.github/workflows/ci-cd.yml`

The workflow:

- installs dependencies with `npm ci`
- runs `npm test`
- builds the Docker image
- pushes to Docker Hub on `main` when these repository secrets exist:
  - `DOCKERHUB_USERNAME`
  - `DOCKERHUB_TOKEN`
- deploys to Kubernetes on `main` when this repository secret exists:
  - `KUBE_CONFIG_B64`

Create `KUBE_CONFIG_B64` with:

```sh
base64 -w 0 ~/.kube/config
```

On macOS, use:

```sh
base64 -i ~/.kube/config
```

## Kubernetes

Apply the manifests:

```sh
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

Access through NodePort:

```sh
http://<node-ip>:30080
```

## Monitoring

Prometheus config is in `monitoring/prometheus.yml`. The app exposes metrics at `/metrics`, and the Kubernetes manifests include Prometheus scrape annotations.
