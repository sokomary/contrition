job "contrition-web" {
  datacenters = ["dc1"]
  type = "service"

  group "web" {
    network {
      port "https" {
        static = 2443
        to     = 2443
      }
    }

    count = 1

    task "frontend" {
      driver = "docker"

      config {
        image = "msokol1999/contrition-web:latest"
        ports = ["https"]
      }
    }
  }
}