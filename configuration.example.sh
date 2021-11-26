#!/usr/bin/env bash

# These are environment variables that you'll need to set to run
# the project locally. When deployed using the `serverless` cli
# commands, all variables are configured auto-magically.

# AWS credentials
export AWS_ACCOUNT_ID="123456789012"
export AWS_REGION="us-east-1"
export AWS_ACCESS_KEY_ID="AKIAEXAMPLEKEY"
export AWS_SECRET_ACCESS_KEY="abc123abc123abc123abc123"

# DynamoDB Table
export DYNAMODB_TABLE="YourTable"
