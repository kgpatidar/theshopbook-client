import { startCase, toLower } from "lodash";

export const toHumanize = (data) => startCase(toLower(data));
