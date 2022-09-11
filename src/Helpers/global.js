import { startCase, toLower } from "lodash";

export const toHumanize = (data) => startCase(toLower(data));

export const checkIsPhone = () => window.innerWidth <= 768;
