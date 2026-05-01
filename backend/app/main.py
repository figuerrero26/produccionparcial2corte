from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, events, news

# Aplicacion principal de la API de la plataforma universitaria
app = FastAPI(
    title="API Plataforma Universitaria",
    description="API REST para registro, eventos y noticias institucionales",
    version="1.0.0"
)

# Permitimos CORS para que el frontend pueda consumir la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registramos los routers de cada modulo
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(events.router, prefix="/api/events", tags=["Events"])
app.include_router(news.router, prefix="/api/news", tags=["News"])


@app.get("/")
def home():
    # Endpoint raiz para comprobar que la API esta activa
    return {
        "mensaje": "API Plataforma Universitaria funcionando",
        "docs": "/docs"
    }
