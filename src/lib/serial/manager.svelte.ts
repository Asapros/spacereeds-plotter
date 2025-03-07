const BAUD_RATE = 9600;


export enum SerialState {
    FREE,
    OPEN,
    CLOSING
}

export class SerialConnectionManager {
    private innerState: SerialState = $state(SerialState.FREE);
    public readonly state: SerialState = $derived(this.innerState);

    private port: SerialPort | null = null;
    private handler: Promise<void> | null = null;
    private abortController: AbortController | null = null;

    async openSerial(transformers: Array<TransformStream>, consumer: WritableStream) {
        if (this.innerState === SerialState.OPEN) { await this.closeSerial(); }

        this.port = await navigator.serial.requestPort();

        await this.port!.open({ baudRate: BAUD_RATE });
        this.innerState = SerialState.OPEN;

        this.abortController = new AbortController();
        let stream = this.port!.readable;

        for (const transformer of transformers) {
            stream = stream.pipeThrough(transformer);
        }
        this.handler = stream.pipeTo(consumer, {signal: this.abortController.signal});
    }

    async closeSerial() {
        if (this.innerState !== SerialState.OPEN) {
            console.error("The port is not open");
            return;
        }
        this.innerState = SerialState.CLOSING;

        this.abortController!.abort("Closing serial port");

        try {
            await this.handler;
        } catch (error) {}

        // One millisecond for your browser to finish releasing that fucking lock that should have been released upon awaiting the handler
        await new Promise<void>((resolve) => setTimeout(resolve, 1));

        await this.port!.close();

        this.port = null;
        this.handler = null;
        this.abortController = null;
        this.innerState = SerialState.FREE;
    }
}