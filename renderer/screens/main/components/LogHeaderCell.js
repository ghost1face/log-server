import { SortIcon } from "./SortIcon.js";
import { html } from "../../../utils/index.js";

/**
 * A component that displays a header cell in the log table
 * @param {Object} props
 * @param {string} props.title the title of the header cell
 * @param {string} props.classNames additional class names for styling
 * @param {() => void} props.onClick callback for when the header cell is clicked
 * @param {"asc" | "desc" | null} props.order the current sort order for this column
 * @returns {import('preact').JSX.Element}
 */
export function LogHeaderCell({ title, order, classNames, onClick }) {
  return html`<div
    class="log-list-cell log-list-header ${classNames}"
    onClick=${onClick}
  >
    ${title}
    <${SortIcon} order=${order} />
  </div>`;
}
