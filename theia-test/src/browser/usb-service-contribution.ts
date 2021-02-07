import { inject, injectable } from "inversify";
import { CommandContribution, CommandRegistry } from "@theia/core";
import { Device } from "usb";
import { UsbServiceClient } from "./usb-service-client";

@injectable()
export class UsbServiceContribution implements CommandContribution {
    @inject(UsbServiceClient) protected readonly usbServiceClient: UsbServiceClient | any;

    registerCommands(registry: CommandRegistry): void {
        this.usbServiceClient.onAttach((device: Device) => alert(
            `Device connected: ${device.deviceDescriptor.idVendor}:${device.deviceDescriptor.idProduct}`
        ));
    }
}