#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Start Supabase
echo -e "${GREEN}Starting Supabase...${NC}"
yarn supabase:start:local

# Run linting
echo -e "${GREEN}Running database linting...${NC}"
yarn lint:sql:ci

# Run tests
echo -e "${GREEN}Running database tests...${NC}"
yarn supabase:test:local

# Perform dry run
echo -e "${GREEN}Performing migration dry-run...${NC}"
supabase db diff --schema public > migration_preview.sql

if [ -s migration_preview.sql ]; then
    echo -e "${GREEN}Changes detected in migration preview:${NC}"
    cat migration_preview.sql
else
    echo -e "${GREEN}No changes detected in migration preview${NC}"
fi

# Clean up
rm -f migration_preview.sql

# Capture the exit code
FINAL_EXIT_CODE=$?

# Stop Supabase
echo -e "${GREEN}Stopping Supabase...${NC}"
yarn supabase:stop:local

# Exit with the final exit code
exit $FINAL_EXIT_CODE 