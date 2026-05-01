import datetime
from pydantic import BaseModel, Field


# Esquema para crear un evento academico
class EventCreate(BaseModel):
    title: str = Field(..., min_length=1, description="Titulo del evento")
    date: datetime.date = Field(..., description="Fecha del evento (YYYY-MM-DD)")
    location: str = Field(..., min_length=1, description="Lugar del evento")


# Esquema de respuesta para los eventos
class EventResponse(BaseModel):
    id: int
    title: str
    date: datetime.date
    location: str
