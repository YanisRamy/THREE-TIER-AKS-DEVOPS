variable "resource_group_name" {
  description = "Nom du Resource Group"
  default     = "rg-three-tier-aks"
}

variable "location" {
  description = "Region Azure"
  default     = "francecentral"
}

variable "acr_name" {
  description = "Nom du Container Registry (unique, sans tirets)"
  default     = "acrthreetieraks"
}

variable "aks_cluster_name" {
  description = "Nom du cluster AKS"
  default     = "aks-three-tier"
}
