import json
import os
from fastapi import APIRouter, status
from typing import List

from app.schemas.news import NewsCreate, NewsResponse

router = APIRouter()

# Ruta del archivo JSON con las noticias
DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "news.json")


def leer_noticias():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def guardar_noticias(noticias):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(noticias, f, indent=2, ensure_ascii=False)


@router.get("/", response_model=List[NewsResponse])
def listar_noticias():
    """Devuelve la lista de noticias institucionales."""
    return leer_noticias()


@router.post("/", response_model=NewsResponse, status_code=status.HTTP_201_CREATED)
def crear_noticia(noticia: NewsCreate):
    """Crea una nueva noticia institucional."""
    noticias = leer_noticias()

    nuevo_id = (noticias[-1]["id"] + 1) if noticias else 1
    nueva_noticia = {
        "id": nuevo_id,
        "title": noticia.title,
        "content": noticia.content
    }

    noticias.append(nueva_noticia)
    guardar_noticias(noticias)

    return nueva_noticia
