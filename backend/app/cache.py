import os
import json
import redis
from typing import Any, Optional

REDIS_URL = os.environ.get("REDIS_URL")

# Initialize Redis client if REDIS_URL is provided
redis_client = None
if REDIS_URL:
    try:
        redis_client = redis.from_url(REDIS_URL, decode_responses=True)
        print("Connected to Redis successfully.")
    except Exception as e:
        print(f"Failed to connect to Redis: {e}")

def get_cache(key: str) -> Optional[Any]:
    if not redis_client:
        return None
    try:
        data = redis_client.get(key)
        if data:
            return json.loads(data)
    except Exception:
        pass
    return None

def set_cache(key: str, data: Any, expire_seconds: int = 3600) -> bool:
    if not redis_client:
        return False
    try:
        redis_client.setex(key, expire_seconds, json.dumps(data))
        return True
    except Exception:
        return False

def invalidate_cache(key: str) -> bool:
    if not redis_client:
        return False
    try:
        redis_client.delete(key)
        return True
    except Exception:
        return False

def invalidate_cache_pattern(pattern: str) -> bool:
    if not redis_client:
        return False
    try:
        keys = redis_client.keys(pattern)
        if keys:
            redis_client.delete(*keys)
        return True
    except Exception:
        return False
