#!/bin/bash

# Smoke test runner for LINAK Client Portal
# This script starts the dev server and runs smoke tests

set -e

echo "🚀 Starting LINAK Client Portal smoke tests..."

# Check if server is already running
if curl -sf http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ Server is already running at http://localhost:3000"
    echo "🧪 Running smoke tests..."
    npm run test:smoke:ci
else
    echo "🔧 Starting development server..."
    
    # Start the server in background
    npm run dev > /dev/null 2>&1 &
    SERVER_PID=$!
    
    echo "⏳ Waiting for server to start..."
    
    # Wait for server to be ready (max 60 seconds)
    TIMEOUT=60
    COUNTER=0
    
    while [ $COUNTER -lt $TIMEOUT ]; do
        if curl -sf http://localhost:3000/api/health > /dev/null 2>&1; then
            echo "✅ Server is ready at http://localhost:3000"
            break
        fi
        
        sleep 1
        COUNTER=$((COUNTER + 1))
        
        if [ $COUNTER -eq $TIMEOUT ]; then
            echo "❌ Server failed to start within $TIMEOUT seconds"
            kill $SERVER_PID 2>/dev/null || true
            exit 1
        fi
    done
    
    echo "🧪 Running smoke tests..."
    
    # Run the tests
    if npm run test:smoke:ci; then
        echo "✅ All smoke tests passed!"
        EXIT_CODE=0
    else
        echo "❌ Some smoke tests failed!"
        EXIT_CODE=1
    fi
    
    # Clean up
    echo "🧹 Cleaning up..."
    kill $SERVER_PID 2>/dev/null || true
    
    exit $EXIT_CODE
fi
