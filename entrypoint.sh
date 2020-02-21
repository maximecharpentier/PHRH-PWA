copy_local_docker_compose_config_to_remote_instance() {
  # copy .env
  scp -i ~/.ssh/phrh-key ./.env ubuntu@35.180.37.72:/home/ubuntu/.env | echo ".env               -> ubuntu@35.180.37.72:/home/ubuntu/.env"
  # copy docker-compose.yml
  scp -i ~/.ssh/phrh-key ./docker-compose.yml ubuntu@35.180.37.72:/home/ubuntu/docker-compose.yml | echo "docker-compose.yml -> ubuntu@35.180.37.72:/home/ubuntu/docker-compose.yml"
}

copy_local_docker_compose_config_to_remote_instance