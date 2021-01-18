import { CommandContribution } from "@theia/core";
import { WebSocketConnectionProvider } from "@theia/core/lib/browser";
import { ContainerModule } from "inversify";
import { UsbService, workspacePath } from "../common/usb-service-protocol";
import { HelloWorldCommandContribution } from "./hello-world-command-contribution";

export default new ContainerModule((bind) => {
  bind(UsbService).toDynamicValue(ctx => {
    const provider = ctx.container.get(WebSocketConnectionProvider);
    return provider.createProxy<UsbService>(workspacePath);
  }).inSingletonScope();

  bind(CommandContribution).to(HelloWorldCommandContribution);
});
