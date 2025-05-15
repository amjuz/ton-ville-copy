#!/bin/zsh

# Stop Supabase services
echo "Stopping Supabase services..."
npx supabase stop
sleep 2

# Define containers and volumes patterns
SUPABASE_PATTERN="supabase"
VOLUME_LABEL="com.supabase.cli.project=packages"

# Remove containers
echo "Removing Supabase containers..."
docker ps -a --filter "name=$SUPABASE_PATTERN" --format '{{.ID}}' | xargs -r docker rm -f

# Remove volumes using both name and label filters
echo "Removing Supabase volumes..."
docker volume ls --filter "name=$SUPABASE_PATTERN" --format '{{.Name}}' | xargs -r docker volume rm -f
docker volume ls --filter "label=$VOLUME_LABEL" --format '{{.Name}}' | xargs -r docker volume rm -f

# Clean up Supabase Docker assets
echo "Cleaning up Supabase Docker assets..."
docker system prune -f --filter "name=$SUPABASE_PATTERN"
docker system prune -f --filter "label=$VOLUME_LABEL"

# Optional: Remove images (commented out by default)
# echo "Removing Supabase images..."
# docker images "$SUPABASE_PATTERN*" --format '{{.ID}}' | xargs -r docker rmi -f

echo "Cleanup complete. Supabase containers and volumes have been removed."

# Stop docker daemon
osascript -e 'quit app "Docker"'
