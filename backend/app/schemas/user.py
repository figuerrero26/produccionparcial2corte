from pydantic import BaseModel, EmailStr, Field


# Esquema para registrar un usuario nuevo
# Usa los mismos nombres de campo que el formulario del frontend (nombre, correo)
class UserRegister(BaseModel):
    nombre: str = Field(..., min_length=3, description="Nombre del usuario (minimo 3 caracteres)")
    correo: EmailStr = Field(..., description="Correo electronico valido")


# Esquema de respuesta cuando el registro es exitoso
class UserResponse(BaseModel):
    id: int
    nombre: str
    correo: EmailStr
    mensaje: str
