import { JsonRpcServer } from "@theia/core";
import { Device } from "usb";

export const USB_SERVICE_PATH = "/ves/services/usb";
export const UsbServiceServer = Symbol("UsbServiceServer");

export interface UsbServiceClient {
    onAttach(device: Device): void;
}

export interface UsbServiceServer extends JsonRpcServer<UsbServiceClient> {
}