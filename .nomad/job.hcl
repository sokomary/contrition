job "contrition-web" {
  datacenters = ["dc1"]
  type = "service"

  group "web" {
    network {
      port "http" {
        static = 3002
        to     = 3002
      }
    }

    count = 1

    task "frontend" {
      driver = "docker"

      resources {
        memory = 150
      }

      config {
        image = "msokol1999/contrition-web:latest"
        ports = ["http"]
      }
    }
  }
}