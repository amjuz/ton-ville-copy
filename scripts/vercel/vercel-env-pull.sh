#!/bin/zsh

# Change to project root directory
cd "$(dirname "${0}")/../.." || exit 1

# Check if already logged in to Vercel
echo "Checking Vercel login status..."
if output=$(npx vercel whoami 2>&1); then
   echo "Already logged in to Vercel"
else
   if [[ $output == *"No existing credentials found"* ]]; then
       echo "Not logged in. Logging in to Vercel..."
       npx vercel login
   else
       # If it's a different error, show it and exit
       echo "$output"
       exit 1
   fi
fi

echo "Pulling environment variables from Vercel..."
npx vercel env pull
