import { injectable, postConstruct, inject } from "inversify";
import { Event, Emitter } from "@theia/core";
import { Device } from "usb";
import { UsbServiceServer } from "../common/usb-service-protocol";

@injectable()
export class UsbServiceClient {
    public readonly onAttachEmitter = new Emitter<Device>();
    public readonly onAttach: Event<Device> = this.onAttachEmitter.event

    @inject(UsbServiceServer) protected readonly server: UsbServiceServer | any;

    @postConstruct()
    protected async init(): Promise<void> {
        this.server.setClient({
            onAttach: (device: Device) => this.onAttachEmitter.fire(device)
        });
    }
}
