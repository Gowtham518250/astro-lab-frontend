import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Load .env from current directory (backend) if it exists
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

class Settings(BaseSettings):
    database_url: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:///./astrolab.db"
    )
    # Stripe or UPI payment configs could go here
    jwt_secret_key: str = os.getenv("JWT_SECRET_KEY", "supersecretkeyforastrolabjwttoken2026")
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440  # 1 day
    session_cookie_name: str = "astro_session"

settings = Settings()
