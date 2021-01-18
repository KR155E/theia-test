import { interfaces } from "inversify";
import { UsbService, workspacePath } from "../common/usb-service-protocol";
import { WebSocketConnectionProvider } from "@theia/core/lib/browser";
import { FrontendUsbAttachContribution } from "./usb-attach-contribution";

export function bindUsbService(bind: interfaces.Bind): void {
    bind(UsbService).toDynamicValue(ctx => {
        const provider = ctx.container.get(WebSocketConnectionProvider);
        return provider.createProxy<UsbService>(workspacePath);
    }).inSingletonScope();

    bind(FrontendUsbAttachContribution).toSelf();
};
