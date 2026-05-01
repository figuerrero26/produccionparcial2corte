import json
import os
from fastapi import APIRouter, status
from typing import List

from app.schemas.event import EventCreate, EventResponse

router = APIRouter()

# Ruta del archivo JSON con los eventos
DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "events.json")


def leer_eventos():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def guardar_eventos(eventos):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(eventos, f, indent=2, ensure_ascii=False, default=str)


@router.get("/", response_model=List[EventResponse])
def listar_eventos():
    """Devuelve la lista de eventos academicos."""
    return leer_eventos()


@router.post("/", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
def crear_evento(event: EventCreate):
    """Crea un nuevo evento academico."""
    eventos = leer_eventos()

    nuevo_id = (eventos[-1]["id"] + 1) if eventos else 1
    nuevo_evento = {
        "id": nuevo_id,
        "title": event.title,
        "date": str(event.date),
        "location": event.location
    }

    eventos.append(nuevo_evento)
    guardar_eventos(eventos)

    return nuevo_evento
