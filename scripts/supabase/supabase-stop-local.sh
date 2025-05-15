#!/bin/zsh

# Stop Supabase services
echo "Stopping Supabase services..."
npx supabase stop

# Wait briefly to ensure Supabase services are stopped
sleep 2

# Loop through each volume with the specified label
for volume in $(docker volume ls --filter label=com.supabase.cli.project=packages -q); do
  # Find containers using this volume
  containers=$(docker ps -q --filter volume="$volume")

  # If there are containers using this volume, stop them
  if [ -n "$containers" ]; then
    echo "Stopping containers using volume $volume..."

    for container in $containers; do
      # Check if the container is still running before stopping
      if docker ps -q --no-trunc | grep -q "$container"; then
        docker stop "$container"
      else
        echo "Container $container no longer exists or is not running."
      fi
    done
  fi
done

echo "All containers using the specified volumes have been stopped."
