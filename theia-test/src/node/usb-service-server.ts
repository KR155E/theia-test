import { injectable, postConstruct } from "inversify";
import { on } from "usb";
import { UsbServiceServer, UsbServiceClient } from "../common/usb-service-protocol";

@injectable()
export class UsbServiceServerImpl implements UsbServiceServer {
    protected client: UsbServiceClient | undefined;

    dispose(): void {
        throw new Error("Method not implemented.");
    }

    setClient(client: UsbServiceClient): Promise<void> {
        this.client = client;
        return Promise.resolve();
    }

    @postConstruct()
    protected init(): void {
        const self = this;
        on("attach", async (device) => self.client?.onAttach(device));
    }
}