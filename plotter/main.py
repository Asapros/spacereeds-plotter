from serial.tools.list_ports import comports

from plotter.receiver import SpaceReedsReceiver


def main():
    port = comports()[0].device
    receiver = SpaceReedsReceiver(port, 9600)
    receiver.connect()
    print(receiver.read_sensors())
    receiver.disconnect()


if __name__ == "__main__":
    main()