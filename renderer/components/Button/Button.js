import { html } from "../../utils/index.js";

import buttonStyles from "./button.css" with { type: "css" };
document.adoptedStyleSheets.push(buttonStyles);

/**
 * A button component
 * @param {Object} props
 * @param {string} [props.id] optional id for the button
 * @param {string} [props.classNames] optional additional class names for the button
 * @param {() => void} props.onClick click event handler
 * @param {import('preact').JSX.Element | string} props.children the button label or content
 * @param {Object} [restProps] any other props to pass to the button element 
 * @returns {import('preact').JSX.Element}
 */
export const Button = ({ id, classNames, onClick, children, ...restProps }) => {
  return html`<button id=${id} class="btn ${classNames}" onClick=${onClick} ...${restProps}>${children}</button>`;
};
