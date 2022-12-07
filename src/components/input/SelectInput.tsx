import "./SelectInput.css";

interface SelectInputType {
	name?: string;
	label?: string;
	defaultValue?: string;
	disabled?: boolean;
	values?: { id: string; name: string }[];
}

export function SelectInput({
	values = [],
	defaultValue = "",
	disabled = false,
	label = "",
	name = "",
}: SelectInputType) {
	return (
		<div className="Select__Input">
			<label htmlFor={name}>{label}</label>
			<select id={name} name={name} defaultValue={defaultValue} disabled={disabled}>
				{values.map(({ id, name }) => (
					<option key={id} value={id}>
						{name}
					</option>
				))}
			</select>
		</div>
	);
}
