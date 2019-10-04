import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "flex-plugin";

const PLUGIN_NAME = "FixCallRaceConditionPlugin";

export default class FixCallRaceConditionPlugin extends FlexPlugin {
    constructor() {
        super(PLUGIN_NAME);
    }
    /**
     * This code is run when your plugin is being started
     * Use this to modify any UI components or attach to the actions framework
     *
     * @param flex { typeof Flex }
     * @param manager { Flex.Manager }
     */
    init(flex: typeof Flex, manager: Flex.Manager) {}
}
