from dataclasses import dataclass, field

from serial import Serial

from plotter.models import SensorReadings

BAUD_RATE = 9600

@dataclass(slots=True, frozen=True)
class SpaceReedsReceiver:
    com_port: str
    baud_rate: int
    _serial: Serial = field(default_factory=Serial, init=False)

    def __post_init__(self):
        self._serial.port = self.com_port
        self._serial.baud_rate = self.baud_rate

    def connect(self):
        if self._serial.is_open:
            raise RuntimeError("Serial communication is already open")
        self._serial.open()

    def disconnect(self):
        if self._serial.closed:
            raise RuntimeError("Serial communication is already closed")
        self._serial.close()

    def read_sensors(self) -> SensorReadings:
        if self._serial.closed:
            raise RuntimeError("Serial communication is not open")
        line = self._serial.readline().decode("utf-8")
        return SensorReadings.model_validate_json(line)


