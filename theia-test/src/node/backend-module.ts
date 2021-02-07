import { ContainerModule } from "inversify";
import { ConnectionHandler, JsonRpcConnectionHandler } from "@theia/core";
import { UsbServiceServerImpl } from "./usb-service-server";
import { UsbServiceServer, USB_SERVICE_PATH, UsbServiceClient } from "../common/usb-service-protocol";

export default new ContainerModule(bind => {
    bind(UsbServiceServerImpl).toSelf().inSingletonScope();
    bind(UsbServiceServer).toService(UsbServiceServerImpl);

    bind(ConnectionHandler).toDynamicValue(ctx =>
        new JsonRpcConnectionHandler<UsbServiceClient>(USB_SERVICE_PATH, client => {
            const server = ctx.container.get<UsbServiceServer>(UsbServiceServer);
            server.setClient(client);
            return server;
        })
    ).inSingletonScope();
});