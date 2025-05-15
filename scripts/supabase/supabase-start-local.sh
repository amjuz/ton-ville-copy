#!/bin/zsh
if ! command -v docker >/dev/null 2>&1; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "Docker is not running. Starting Docker..."
    open -a Docker

    # Wait for Docker to start
    echo "Waiting for Docker to initialize..."
    while ! docker info >/dev/null 2>&1; do
        sleep 2
    done
    echo "Docker is ready"
fi

# Now run supabase start using npx
npx supabase start
