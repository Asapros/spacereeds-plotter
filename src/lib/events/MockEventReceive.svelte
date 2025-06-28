<script lang="ts">
    import {emitReceiveEvent} from "$lib/events/event.svelte.js";
    import {BMP_ERROR, GPS_ERROR, IMU_ERROR, LORA_ERROR, type Reading, SD_ERROR} from "$lib/serial/schema";
    import ModuleStatusSymbol from "$lib/sensors/ModuleStatusSymbol.svelte";
    let latitude: number = $state(50.29258384725705);
    let latitude_coefficient: number = $state(1);

    let longitude: number = $state(18.673304296620753);
    let longitude_coefficient: number = $state(1);

    let orientation = $state({x: 21, y: 37, z: 69});
    let acceleration = $state({x: 9.8, y: 0, z: 0});

    let temperature: number = $state(23.0);
    let internal_temperature: number = $state(24.0);

    let pressure: number = $state(1013);
    let height: number = $state(420);

    let gps_error: boolean = $state(false);
    let lora_error: boolean = $state(false);
    let imu_error: boolean = $state(false);
    let sd_error: boolean = $state(false);
    let bmp_error: boolean = $state(false);

    let message: string = $state("Hello, world!");
    let signal: number = $state(0);

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault()
        const reading: Reading = {
                orientation: { x: orientation.x, y: orientation.y, z: orientation.z },
                position: {x: latitude * latitude_coefficient, y: longitude * longitude_coefficient, z: height},
                acceleration: { x: acceleration.x, y: acceleration.y, z: acceleration.z },
                temperature: temperature,
                internal_temperature: internal_temperature,
                pressure: pressure,
                signal: signal,
                error: Number(gps_error) * GPS_ERROR + Number(lora_error) * LORA_ERROR + Number(imu_error) * IMU_ERROR + Number(sd_error) * SD_ERROR + Number(bmp_error) * BMP_ERROR,
                message: message
            };
        emitReceiveEvent(reading);

    }
</script>
<form onsubmit={handleSubmit}>
    <fieldset id="bmp-fieldset">
        <legend>BMP</legend>
        <table>
            <tbody>
            <tr>
                <td><label for="temperature">Temp. zewnętrzna</label></td>
                <td><input name="temperature" type="number" bind:value={temperature} step=".1"> &deg;C</td>
            </tr>
            <tr>
                <td><label for="internal-temperature">Temp. wewnętrzna</label></td>
                <td><input name="internal-temperature" type="number" bind:value={internal_temperature} step=".1"> &deg;C</td>
            </tr>
            <tr>
                <td><label for="pressure">Ciśnienie</label></td>
                <td><input name="pressure" type="number" bind:value={pressure} step="1"> hPa</td>
            </tr>
            </tbody>
        </table>
    </fieldset>
    <fieldset id="orientation-fieldset">
        <legend>Orientacja</legend>
        <table>
            <tbody>
                <tr>
                    <td><label for="orientation-x">Roll: </label></td>
                    <td><input name="orientation-x" type="range" min={-180} max={180} bind:value={orientation.x}> {orientation.x} &deg;</td>
                </tr>
                <tr>
                    <td><label for="orientation-y">Pitch: </label></td>
                    <td><input name="orientation-y" type="range" min={-180} max={180} bind:value={orientation.y}> {orientation.y} &deg;</td>
                </tr>
                <tr>
                    <td><label for="orientation-z">Yaw: </label></td>
                    <td><input name="orientation-z" type="range" min={-180} max={180} bind:value={orientation.z}> {orientation.z} &deg;</td>
                </tr>
            </tbody>
        </table>
    </fieldset>
    <fieldset id="acceleration-fieldset">
        <legend>Przyspieszenie</legend>
        <table>
            <tbody>
            <tr>
                <td><label for="acceleration-x">X: </label></td>
                <td><input name="acceleration-x" type="number" bind:value={acceleration.x} step=".1"></td>
            </tr>
            <tr>
                <td><label for="acceleration-y">Y: </label></td>
                <td><input name="acceleration-y" type="number" bind:value={acceleration.y} step=".1"></td>
            </tr>
            <tr>
                <td><label for="acceleration-z">Z: </label></td>
                <td><input name="acceleration-z" type="number" bind:value={acceleration.z} step=".1"></td>
            </tr>
            </tbody>
        </table>
    </fieldset>
    <fieldset id="position-fieldset">
        <legend>Położenie</legend>
        <table>
            <tbody>
            <tr>
                <td><input name="latitude" type="number" bind:value={latitude} step="any" min="0" max="90"> &deg;</td>
                <td><input type="radio" name="latitude-coefficient" id="latitude-n" value={1} bind:group={latitude_coefficient}><label for="latitude-n">N</label></td>
                <td><input type="radio" name="latitude-coefficient" id="latitude-s" value={-1} bind:group={latitude_coefficient}><label for="latitude-s">S</label></td>
            </tr>
            <tr>
                <td><input name="longitude" type="number" bind:value={longitude} step="any" min="0" max="90"> &deg;</td>
                <td><input type="radio" name="longitude-coefficient" id="longitude-e" value={1} bind:group={longitude_coefficient}><label for="longitude-e">E</label></td>
                <td><input type="radio" name="longitude-coefficient" id="longitude-w" value={-1} bind:group={longitude_coefficient}><label for="longitude-w">W</label></td>
            </tr>
            <tr>
                <td><input name="height" type="number" bind:value={height}> m n.p.m.</td>
            </tr>
            </tbody>
        </table>
    </fieldset>
    <fieldset id="state-fieldset">
        <legend>Stan modułów</legend>
        <table>
            <thead>
            <tr>
                <th>Moduł</th>
                <th><ModuleStatusSymbol error={false} /></th>
                <th><ModuleStatusSymbol error={true} /></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>GPS</td>
                <td><input type="radio" name="gps-status" value={false} bind:group={gps_error} /></td>
                <td><input type="radio" name="gps-status" value={true} bind:group={gps_error} /></td>
            </tr>
            <tr>
                <td>LORA</td>
                <td><input type="radio" name="lora-status" value={false} bind:group={lora_error} /></td>
                <td><input type="radio" name="lora-status" value={true} bind:group={lora_error} /></td>
            </tr>
            <tr>
                <td>IMU</td>
                <td><input type="radio" name="imu-status" value={false} bind:group={imu_error} /></td>
                <td><input type="radio" name="imu-status" value={true} bind:group={imu_error} /></td>
            </tr>
            <tr>
                <td>SD</td>
                <td><input type="radio" name="sd-status" value={false} bind:group={sd_error} /></td>
                <td><input type="radio" name="sd-status" value={true} bind:group={sd_error} /></td>
            </tr>
            <tr>
                <td>BMP</td>
                <td><input type="radio" name="bmp-status" value={false} bind:group={bmp_error} /></td>
                <td><input type="radio" name="bmp-status" value={true} bind:group={bmp_error} /></td>
            </tr>
            </tbody>
        </table>
    </fieldset>
    <div id="other-values">
        <label for="message">Wiadomość:</label><input type="text" name="message" bind:value={message}><br>
        <label for="signal-strength">Moc sygnału:</label><input type="range" name="signal-strength" bind:value={signal}> [D]<br>
    <input type="submit" value="ODCZYT PRÓBNY">
    </div>
</form>

<style>
    input[type=submit] {
        font-size: 20px;
        padding: 20px;
        margin: 20px;
        box-shadow: 0 8px 12px 0 rgba(0,0,0,0.5);
        font-family: inherit;
    }
    input[type=submit]:active {
        box-shadow: none;
    }
    input[type=number] {
        width: 4em;
    }
    input[name="latitude"], input[name="longitude"] {
        width: 12em;
    }
    input[type=text] {
        width: 20em;
    }

    form {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem; /* optional spacing */
    }

    form fieldset, #other-values {
        flex: 1 1 45%;
        box-sizing: border-box;
    }
</style>
