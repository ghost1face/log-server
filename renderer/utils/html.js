import { h } from "../core/index.js";
import htm from "https://esm.sh/htm";

/**
 * Html template tag function for Preact components
 * @example const element = html`<div>Hello, world!</div>`;
 */
export const html = htm.bind(h);
