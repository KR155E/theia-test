import { Event } from "@theia/core";
import { Device } from "usb";
export const workspacePath = '/services/usb';

export const UsbService = Symbol('UsbService');
export interface UsbService {
    onDeviceConnected: Event<Device>;
}
