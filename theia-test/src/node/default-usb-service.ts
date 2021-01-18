import { injectable, postConstruct } from "inversify";
import { Device, on } from "usb";
import { Emitter, Event } from "@theia/core";
import { UsbService } from "../common/usb-service-protocol";

@injectable()
export class DefaultUsbService implements UsbService {
    protected readonly onDeviceConnectedEmitter = new Emitter<Device>();
    readonly onDeviceConnected: Event<Device> = this.onDeviceConnectedEmitter.event;

    @postConstruct()
    protected init(): void {
        const self = this;
        on("attach", async function (device) {
            console.log("Backend: device attached");
            self.onDeviceConnectedEmitter.fire(device);
        });
    }
}