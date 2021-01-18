import { ContainerModule } from "inversify";
import { bindUsbService } from "./usb-service-contribution";

export default new ContainerModule((bind) => {
  bindUsbService(bind);
});
