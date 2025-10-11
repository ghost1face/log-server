import { html } from "../../utils/index.js";

import textBoxStyles from "./textBox.css" with { type: "css" };
document.adoptedStyleSheets.push(textBoxStyles);

/**
 * A simple text box component
 * @param {Object} props
 * @param {string} props.value the current value of the text box
 * @param {(e: Event) => void} props.onChange change event handler
 * @param {string} [props.id] optional id for the text box
 * @param {string} [props.classNames] optional additional class names for the text box
 * @param {Object} [restProps] any other props to pass to the input element
 * @returns {import('preact').JSX.Element}
 */
export const TextBox = ({ id, classNames, value, onChange, ...restProps }) => {
  return html`<input
    id=${id}
    class="txt ${classNames}"
    type="text"
    value=${value}
    onChange=${onChange}
    ...${restProps}
  />`;
};
