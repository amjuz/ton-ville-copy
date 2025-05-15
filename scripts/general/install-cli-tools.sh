#!/bin/zsh

# Check if we're in a development environment
if [ "$CI" = "true" ] || [ "$NODE_ENV" = "production" ] || [ "$VERCEL" = "1" ]; then
   echo "Detected CI/Production environment. Skipping development tools installation."
   exit 0
fi

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
   echo "This script is only for macOS: $OSTYPE detected"
   exit 1
fi

echo "Running on macOS in development environment..."

# Check and install/update Homebrew
if ! command -v brew >/dev/null 2>&1; then
   echo "Installing Homebrew..."
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
   echo "Updating Homebrew..."
   brew update
fi

# Check and install/upgrade tree
if ! command -v tree >/dev/null 2>&1; then
   echo "Installing tree..."
   brew install tree
else
   echo "Upgrading tree..."
   brew upgrade tree
fi

# Check and install/upgrade openssl
if ! command -v openssl >/dev/null 2>&1; then
   echo "Installing openssl..."
   brew install openssl
else
   echo "Upgrading openssl..."
   brew upgrade openssl
fi

# Check and handle Docker
if ! command -v docker >/dev/null 2>&1; then
   echo "Docker not found. Installing via brew..."
   brew install --cask docker
else
   # Check if Docker was installed via brew
   if brew list --cask docker >/dev/null 2>&1; then
       echo "Upgrading brew-managed Docker..."
       # Check if Docker was running
       DOCKER_WAS_RUNNING=false
       if pgrep -x "Docker" > /dev/null; then
           DOCKER_WAS_RUNNING=true
           echo "Stopping Docker..."
           osascript -e 'quit app "Docker"'
           sleep 5  # Wait for Docker to fully stop
       fi

       brew upgrade --cask docker

       # Only start Docker if it was running before
       if [ "$DOCKER_WAS_RUNNING" = true ]; then
           echo "Starting Docker..."
           open -a Docker
           echo "Waiting for Docker to start..."
           sleep 10  # Give Docker time to initialize
       fi
   else
       echo "Docker found but not managed by brew. Skipping Docker operations..."
   fi
fi
