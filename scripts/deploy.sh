#!/bin/bash

# Deployment script for Exam Platform

ENV=${1:-staging}

echo "🚀 Deploying to $ENV..."

if [ "$ENV" != "staging" ] && [ "$ENV" != "production" ]; then
    echo "❌ Invalid environment. Use 'staging' or 'production'"
    exit 1
fi

# Run tests
echo "🧪 Running tests..."
npm test

if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Aborting deployment."
    exit 1
fi

# Run lint
echo "🔍 Running lint..."
npm run lint

if [ $? -ne 0 ]; then
    echo "❌ Lint failed. Aborting deployment."
    exit 1
fi

# Build
echo "🔨 Building..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Aborting deployment."
    exit 1
fi

# Deploy with Docker
echo "🐳 Building Docker images..."
docker-compose build

echo "📦 Deploying containers..."
docker-compose up -d

echo "✅ Deployment to $ENV completed successfully!"

