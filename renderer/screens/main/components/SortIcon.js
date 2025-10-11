import { html } from "../../../utils/index.js";

/**
 * A component that displays a sort icon based on the current sort order
 * @param {Object} props
 * @param {"asc" | "desc" | null} props.order the sort order
 * @returns {import('preact').JSX.Element}
 */
export function SortIcon({ order }) {
  if (order === "asc") {
    return html`<span>▲</span>`;
  } else if (order === "desc") {
    return html`<span>▼</span>`;
  } else {
    return null;
  }
}
