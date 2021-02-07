import { ContainerModule } from "inversify";
import { CommandContribution } from "@theia/core";
import { WebSocketConnectionProvider } from "@theia/core/lib/browser";
import { UsbServiceClient } from "./usb-service-client";
import { UsbServiceContribution } from "./usb-service-contribution";
import { UsbServiceServer, USB_SERVICE_PATH } from "../common/usb-service-protocol";

export default new ContainerModule(bind => {
  bind(UsbServiceServer).toDynamicValue(ctx => {
    const provider = ctx.container.get(WebSocketConnectionProvider);
    return provider.createProxy<UsbServiceServer>(USB_SERVICE_PATH);
  }).inSingletonScope();

  bind(CommandContribution).to(UsbServiceContribution);

  bind(UsbServiceClient).toSelf();
});