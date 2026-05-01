import json
import os
from fastapi import APIRouter, HTTPException, status

from app.schemas.user import UserRegister, UserResponse

router = APIRouter()

# Ruta del archivo JSON donde guardamos los usuarios
DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "users.json")


def leer_usuarios():
    # Lee la lista de usuarios del archivo JSON
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def guardar_usuarios(usuarios):
    # Guarda la lista de usuarios en el archivo JSON
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(usuarios, f, indent=2, ensure_ascii=False)


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: UserRegister):
    """
    Registra un usuario nuevo en la plataforma.
    Recibe los mismos campos que el formulario del frontend: nombre y correo.
    """
    usuarios = leer_usuarios()

    # Verificamos que el correo no este registrado ya
    for u in usuarios:
        if u["correo"] == user.correo:
            raise HTTPException(
                status_code=400,
                detail="El correo ya esta registrado"
            )

    # Creamos el nuevo usuario con un id incremental
    nuevo_id = (usuarios[-1]["id"] + 1) if usuarios else 1
    nuevo_usuario = {
        "id": nuevo_id,
        "nombre": user.nombre,
        "correo": user.correo
    }

    usuarios.append(nuevo_usuario)
    guardar_usuarios(usuarios)

    return UserResponse(
        id=nuevo_id,
        nombre=user.nombre,
        correo=user.correo,
        mensaje="Usuario registrado correctamente"
    )
