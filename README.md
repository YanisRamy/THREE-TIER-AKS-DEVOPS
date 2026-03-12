# Three-Tier Web App on Azure Kubernetes Service (AKS)

![CI/CD](https://github.com/YanisRamy/THREE-TIER-AKS-DEVOPS/actions/workflows/ci-cd.yml/badge.svg)
![Terraform](https://img.shields.io/badge/IaC-Terraform-7B42BC)
![Kubernetes](https://img.shields.io/badge/Orchestration-Kubernetes-326CE5)
![Azure](https://img.shields.io/badge/Cloud-Azure-0078D4)
![Docker](https://img.shields.io/badge/Container-Docker-2496ED)

## Overview

A production-ready three-tier web application deployed on Azure Kubernetes Service (AKS), built with a full DevOps pipeline including Infrastructure as Code, containerization, and CI/CD automation.

## Architecture
```
                    Internet
                       |
               [Load Balancer]
                       |
              +-----------------+
              |    FRONTEND     |  React.js (Nginx)
              |   2 replicas    |  Port 80
              +--------+--------+
                       |
              +-----------------+
              |    BACKEND      |  Node.js + Express
              |   2 replicas    |  Port 5000
              +--------+--------+
                       |
              +-----------------+
              |    DATABASE     |  MongoDB
              |   1 replica     |  Port 27017
              +-----------------+

All running on Azure Kubernetes Service (AKS) - francecentral
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Nginx |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Containerization | Docker |
| Orchestration | Kubernetes (AKS) |
| Infrastructure | Terraform |
| Registry | Azure Container Registry (ACR) |
| CI/CD | GitHub Actions |
| Cloud | Microsoft Azure |

## Project Structure
```
THREE-TIER-AKS-DEVOPS/
├── frontend/                 # React.js application
│   ├── src/
│   │   ├── App.js
│   │   └── App.css
│   └── Dockerfile
├── backend/                  # Node.js API
│   ├── server.js
│   └── Dockerfile
├── kubernetes/               # K8s manifests
│   ├── frontend.yml
│   ├── backend.yml
│   └── mongodb.yml
├── terraform/                # Infrastructure as Code
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
└── .github/workflows/        # CI/CD Pipeline
    └── ci-cd.yml
```

## Getting Started

### Prerequisites
- Azure CLI
- Terraform
- Docker
- kubectl
- Node.js 20+

### Clone the repo
```bash
git clone https://github.com/YanisRamy/THREE-TIER-AKS-DEVOPS.git
cd THREE-TIER-AKS-DEVOPS
```

### Run locally with Docker Compose
```bash
docker compose up --build
```
Visit http://localhost:3000

### Deploy infrastructure on Azure
```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### Push Docker images to ACR
```bash
az acr login --name acrthreetieraks
docker build -t acrthreetieraks.azurecr.io/frontend:v1 ./frontend
docker build -t acrthreetieraks.azurecr.io/backend:v1 ./backend
docker push acrthreetieraks.azurecr.io/frontend:v1
docker push acrthreetieraks.azurecr.io/backend:v1
```

### Deploy on AKS
```bash
az aks get-credentials --resource-group rg-three-tier-aks --name aks-three-tier
kubectl apply -f kubernetes/
kubectl get pods
kubectl get services
```

## CI/CD Pipeline

Every push to main automatically:
1. Builds Docker images
2. Pushes to Azure Container Registry
3. Deploys to AKS cluster

## Azure Infrastructure (Terraform)

| Resource | Name | Details |
|----------|------|---------|
| Resource Group | rg-three-tier-aks | francecentral |
| AKS Cluster | aks-three-tier | 2 nodes, Standard_B2s_v2 |
| Container Registry | acrthreetieraks | Basic SKU |

## Author

Yanis Ramy
- GitHub: https://github.com/YanisRamy
- Email: yanisramy4@gmail.com
