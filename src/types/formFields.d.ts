type TypeField = 'text' | 'dropdown' | 'checkbox';
type ValueField = boolean | string;

interface FormField {
	id: string;
	type: TypeField;
	label: string;
	value: ValueField;
}
