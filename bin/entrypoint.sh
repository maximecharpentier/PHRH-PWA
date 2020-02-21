get_environment_variables() {
  # copy the sample file
  cp .env.sample .env 
  # then import all the env vars
  source .env
}

copy_local_config_to_remote_instance() {
  # copy .env to remote instance
  scp -i ~/.ssh/phrh-key ./.env ubuntu@"$INSTANCE_IP":/home/ubuntu/.env | echo "[i] .env               -> ubuntu@$INSTANCE_IP:/home/ubuntu/.env"
  # copy docker-compose.yml .env to remote instance
  scp -i ~/.ssh/phrh-key ./docker-compose.yml ubuntu@"$INSTANCE_IP":/home/ubuntu/docker-compose.yml | echo "[i] docker-compose.yml -> ubuntu@$INSTANCE_IP:/home/ubuntu/docker-compose.yml"
  # log the config to confirm
  echo "[i] your remote docker-compose config:"
  docker-compose config
}

build_phrh_client_docker_image() {
  # ask for building a new image of the client
  echo "[?] build & push blyndusk/phrh-client:"$PHRH_CLIENT_VERSION" ?"
  printf 'Enter [y/n] : '
  read -r opt
  if [[ "$opt" =~ ^([yY])$ ]] ; then
    # if yes, then build the new image and push it
    cd ./client
    docker build -t blyndusk/phrh-client:"$PHRH_CLIENT_VERSION" .
    docker push blyndusk/phrh-client:"$PHRH_CLIENT_VERSION"
    cd ..
    echo "[i] blyndusk/phrh-client:"$PHRH_CLIENT_VERSION" pushed on Docker Hub."
  fi
  
}
build_phrh_server_docker_image() {
  # ask for building a new image of the server
  echo "[?] build blyndusk/phrh-fake-server:"$PHRH_SERVER_VERSION" ?"
  printf 'Enter [y/n] : '
  read -r opt
  if [[ "$opt" =~ ^([yY])$ ]] ; then
    # if yes, then build the new image and push it
    cd ./server
    docker build -t blyndusk/phrh-fake-server:"$PHRH_SERVER_VERSION" .
    docker push blyndusk/phrh-fake-server:"$PHRH_SERVER_VERSION"
    cd ..
    echo "[i] blyndusk/phrh-fake-server:"$PHRH_SERVER_VERSION" pushed on Docker Hub."
  fi
}

build_new_environment() {
  echo "[i] launch production of the new images ..."
  ssh -i ~/.ssh/phrh-key ubuntu@"$INSTANCE_IP" 'sudo docker-compose up --remove-orphan -d' | echo "[i] new version in production !"
}

get_environment_variables
copy_local_config_to_remote_instance

if [[ "$1" == "--build-img" ]] ; then 
  build_phrh_client_docker_image
  build_phrh_server_docker_image
  build_new_environment
fi

