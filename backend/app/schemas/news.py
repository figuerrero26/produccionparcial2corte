from pydantic import BaseModel, Field


# Esquema para crear una noticia institucional
class NewsCreate(BaseModel):
    title: str = Field(..., min_length=1, description="Titulo de la noticia")
    content: str = Field(..., min_length=1, description="Contenido de la noticia")


# Esquema de respuesta para las noticias
class NewsResponse(BaseModel):
    id: int
    title: str
    content: str
