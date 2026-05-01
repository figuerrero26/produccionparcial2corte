# API Plataforma Universitaria

API REST hecha con Python y FastAPI para el parcial 

Tiene endpoints para registrar usuarios, eventos academicos y noticias.

## Como ejecutar

1. Entrar a la carpeta:

```
cd backend
```

2. Crear el entorno virtual e instalar:

```
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

3. Levantar el servidor:

```
uvicorn app.main:app --reload
```

La API queda en http://127.0.0.1:8000 y la documentacion en http://127.0.0.1:8000/docs

## Endpoints

- POST /api/auth/register -> registrar usuario
- GET /api/events/ -> listar eventos
- POST /api/events/ -> crear evento
- GET /api/news/ -> listar noticias
- POST /api/news/ -> crear noticia

## Ejemplos para Postman

Registrar usuario:

```json
{
  "nombre": "Frank",
  "correo": "frank@test.com"
}
```

Crear evento:

```json
{
  "title": "Seminario IA",
  "date": "2026-05-10",
  "location": "Auditorio"
}
```

Crear noticia:

```json
{
  "title": "Nueva plataforma",
  "content": "La universidad lanzo una nueva plataforma."
}
```

## Notas

Los datos se guardan en archivos JSON dentro de app/data/. No se usa base de datos.
