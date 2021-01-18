import { CommandContribution, CommandRegistry } from "@theia/core";
import { inject, injectable } from "inversify";
import { UsbService } from "../common/usb-service-protocol";

export const HelloWorldCommand = {
    id: 'HelloWorld.command',
    label: "Hello World"
};

@injectable()
export class HelloWorldCommandContribution implements CommandContribution {
    @inject(UsbService) protected readonly usbService: UsbService;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(HelloWorldCommand, {
            execute: () => {
                alert('Hello World!')
            }
        });

        this.usbService.onDeviceConnected((device) => {
            console.log("Frontend: device attached", device);
        });
    }
}