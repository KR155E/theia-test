import { ConnectionHandler, JsonRpcConnectionHandler } from '@theia/core';
import { ContainerModule } from 'inversify';
import { UsbService, workspacePath } from '../common/usb-service-protocol';
import { DefaultUsbService } from './default-usb-service';

export default new ContainerModule(bind => {
    bind(DefaultUsbService).toSelf().inSingletonScope();
    bind(UsbService).toService(DefaultUsbService);

    bind(ConnectionHandler).toDynamicValue(ctx =>
        new JsonRpcConnectionHandler(workspacePath, () => {
            return ctx.container.get(UsbService);
        })
    ).inSingletonScope()
});