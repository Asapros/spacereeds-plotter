from pydantic import BaseModel

class Vector3(BaseModel):
    x: float
    y: float
    z: float

class SensorReadings(BaseModel):
    orientation: Vector3
    position: Vector3
    acceleration: Vector3
    # internal_temperature: float
    temperature: float
    pressure: float
    signal: int