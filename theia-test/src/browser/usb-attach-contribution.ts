import { inject, injectable, postConstruct } from "inversify";
import { UsbService } from "../common/usb-service-protocol";

@injectable()
export class FrontendUsbAttachContribution {
    @inject(UsbService) protected readonly usbService: UsbService;

    @postConstruct()
    protected async init(): Promise<void> {
        this.usbService.onDeviceConnected((device) => {
            console.log("Frontend: device attached", device);
        });
    }
}
