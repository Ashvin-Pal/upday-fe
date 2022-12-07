import "./NewsStatus.css";

/**
 * The reason for the two properties "archived" and "archive" is due to a bug in the backend
 */
export function NewsStatus({ status }: { status: "archived" | "archive" | "draft" | "published" }) {
	return (
		<div className={`NewsStatus ${status}`} role="contentinfo">
			<span>{status}</span>
		</div>
	);
}
