import { CommandContribution, CommandRegistry } from "@theia/core";
import { inject, injectable } from "inversify";
import { UsbService } from "../common/usb-service-protocol";

@injectable()
export class UsbEventContribution implements CommandContribution {
    @inject(UsbService) protected readonly usbService: UsbService;

    registerCommands(registry: CommandRegistry): void {
        this.usbService.onDeviceConnected((device) => {
            console.log("Frontend: device attached", device);
        });
    }
}