#!/usr/bin/env bash
export IMAGE=$1
 docker-compose -f docker-compose.yml down  
docker image rm -f hazem06/silianos:node-app-release-1.0 
docker-compose -f docker-compose.yml up   --detach 
echo "success"