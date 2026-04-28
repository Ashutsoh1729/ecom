# Remove Redis Dependency

## Description
Remove Redis (upstash) as a caching layer and query data directly from the database instead.

## Goals
- Remove Redis caching from getUserRole function
- Remove Redis caching from getAllProduct function  
- Remove unused Redis client code
- Remove Redis dependencies from package.json
- Clean up related environment variables

## Implementation Steps

### Step 1: Update getUserRole in logic.ts
- [x] Remove redis_client import
- [x] Remove Redis get/set logic
- [x] Keep only database query path with React cache

### Step 2: Update getAllProduct in products.ts
- [x] Remove redis_client import
- [x] Remove Redis get/set logic  
- [x] Keep only database query path

### Step 3: Remove Redis client files
- [x] Delete src/util/upstash/redis-client.ts
- [x] Delete src/util/upstash/index.ts (or update to not export redis_client)
- [x] Check if src/util/upstash folder should be deleted entirely

### Step 4: Remove test/worker file
- [x] Delete or review src/worker/redis_test.ts

### Step 5: Update package.json
- [x] Remove @upstash/redis dependency
- [x] Remove @upstash/qstash dependency (not used in codebase)

### Step 6: Clean up environment
- [x] Remove UPSTASH_REDIS_REST_URL from .env.local
- [x] Remove UPSTASH_REDIS_REST_TOKEN from .env.local

## Modified Files
- `src/lib/logic.ts` - Removed Redis caching from getUserRole
- `src/lib/data/products.ts` - Removed Redis caching from getAllProduct
- `package.json` - Removed @upstash/redis and @upstash/qstash
- `.env.local` - Removed Redis and Qstash environment variables

## Deleted Files
- `src/util/upstash/redis-client.ts`
- `src/util/upstash/index.ts`
- `src/worker/redis_test.ts`

Status: Completed

## Files to Modify
- `src/lib/logic.ts`
- `src/lib/data/products.ts`
- `src/util/upstash/redis-client.ts` (delete)
- `src/util/upstash/index.ts` (delete or update)
- `src/worker/redis_test.ts` (delete)
- `package.json`
- `.env.local`

## Current Redis Usage
1. **getUserRole** (logic.ts:22-39): Caches user role for 1 hour
2. **getAllProduct** (products.ts:94-121): Caches all active products
3. **redis_test.ts**: Test file that caches products

## Considerations
- CART_SYNC_QUEUE in redis-client.ts is defined but not used anywhere - can be safely removed
- React's cache() function in getUserRole provides request-level caching, reducing DB load
- The getAllProduct function will now always query the DB - consider adding pagination if dataset grows large