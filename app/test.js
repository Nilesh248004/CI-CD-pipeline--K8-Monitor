console.log("Running basic test...");

const appName = "CI/CD Kubernetes Monitoring App";

if (!appName.includes("Kubernetes")) {
  console.error("Test failed");
  process.exit(1);
}

console.log("All tests passed");