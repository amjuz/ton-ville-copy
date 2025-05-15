#!/bin/zsh

# Change to project root directory
cd "$(dirname "${0}")/../.." || exit 1

# Check if already logged in
echo "Checking Supabase login status..."
if ! npx supabase secrets list >/dev/null 2>&1; then
   echo "Not logged in. Logging in to remote Supabase account..."
   npx supabase login
else
   echo "Already logged in to Supabase"
fi

echo "Removing any local Supabase parts..."
yarn supabase:remove:local

echo "Starting local Supabase..."
yarn supabase:start:local

# Try to run supabase init
if output=$(npx supabase init --with-vscode-settings 2>&1); then
 echo "$output"
else
 if [[ $output == *"file exists"* ]]; then
     echo -n "Supabase config already exists. Do you want to overwrite? (y/N) "
     read REPLY
     if [[ $REPLY =~ ^[Yy]$ ]]; then
         echo "Reinitializing supabase with force..."
         npx supabase init --force --with-vscode-settings
     else
         echo "Setup cancelled"
         exit 1
     fi
 else
     # If it's a different error, show it and exit
     echo "$output"
     exit 1
 fi
fi

echo "Linking local db remote Supabase project..."
npx supabase link

echo "Pulling latest schema from remote db..."
npx supabase db pull --schema auth,storage

echo "Resetting local db with latest schema from remote db..."
npx supabase db reset
