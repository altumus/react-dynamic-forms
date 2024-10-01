import React, { useEffect, useState } from 'react';
import * as uid from 'uuid';
import './App.css';

function App() {
	const [formFields, setFormFields] = useState<FormField[]>([]);
	const [formToSend, setFormToSend] = useState<FormField[]>([]);
	const [showError, setShowError] = useState<boolean>(false);
	const [shouldShowResults, setShouldShowResults] = useState<boolean>(false);

	function addTextField() {
		const textField: FormField = {
			id: uid.v4(),
			label: '',
			type: 'text',
			value: '',
		};

		setFormFields([...formFields, textField]);
	}

	function addCheckboxField() {
		const checkboxField: FormField = {
			id: uid.v4(),
			label: '',
			type: 'checkbox',
			value: false,
		};

		setFormFields([...formFields, checkboxField]);
	}

	function addDropdownField() {
		const dropdownField: FormField = {
			id: uid.v4(),
			label: '',
			type: 'dropdown',
			value: 'Option 1',
		};

		setFormFields([...formFields, dropdownField]);
	}

	function placeElement(field: FormField) {
		if (field.type === 'text') {
			return (
				<input
					type='text'
					onChange={(event) =>
						changeFieldValue(field, event.target.value.trim())
					}
					placeholder='Enter text'
				/>
			);
		}

		if (field.type === 'checkbox') {
			return (
				<input
					onChange={(event) => changeFieldValue(field, event.target.checked)}
					type='checkbox'
				/>
			);
		}

		if (field.type === 'dropdown') {
			return (
				<select
					onChange={(event) => changeFieldValue(field, event.target.value)}
				>
					<option>Option 1</option>
					<option>Option 2</option>
				</select>
			);
		}
	}

	function changeFieldValue(field: FormField, value: string | boolean) {
		const fieldIndex = formFields.findIndex(
			(arrayField) => arrayField.id === field.id
		);

		const changedValue = {
			...formFields[fieldIndex],
			value: value,
		};

		const arrayCopy = [...formFields];
		arrayCopy[fieldIndex] = changedValue;
		setFormFields([...arrayCopy]);
	}

	function changeFieldLabel(field: FormField, value: string) {
		const fieldIndex = formFields.findIndex(
			(arrayField) => arrayField.id === field.id
		);

		const changedLabel = {
			...formFields[fieldIndex],
			label: value,
		};

		const arrayCopy = [...formFields];
		arrayCopy[fieldIndex] = changedLabel;
		setFormFields([...arrayCopy]);
	}

	function removeField(field: FormField, event: any) {
		(event as Event).preventDefault();
		const arrayWithRemovedField = formFields.filter(
			(formField) => formField.id !== field.id
		);

		setFormFields([...arrayWithRemovedField]);
	}

	function showResults(event: any) {
		(event as Event).preventDefault();

		setShouldShowResults(false);
		setShowError(false);

		const filteredResults = formFields.filter((field) => {
			if (field.label.length === 0) {
				return false;
			}

			if (field.type === 'text' && (field.value as string).length === 0) {
				return false;
			}

			return true;
		});

		setFormToSend([...filteredResults]);
	}

	useEffect(() => {
		if (formToSend.length === 0 && formFields.length === 0) {
			setShowError(false);
			setShouldShowResults(false);
			return;
		}

		if (formToSend.length !== formFields.length) {
			setShowError(true);
			return;
		}

		setShouldShowResults(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formToSend]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px 0px' }}>
			<h1 style={{ textAlign: 'center' }}>Dynamic form fields</h1>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					gap: '0px 20px',
				}}
			>
				<button onClick={addTextField}>Add text field</button>
				<button onClick={addCheckboxField}>Add checkbox</button>
				<button onClick={addDropdownField}>Add dropdown</button>
			</div>
			<form>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '10px 0px',
					}}
				>
					{formFields.map((field) => {
						return (
							<div key={field.id} style={{ display: 'flex', gap: '0px 10px' }}>
								<input
									onChange={(event) =>
										changeFieldLabel(field, event.target.value.trim())
									}
									type='text'
									placeholder='Label'
								/>

								{placeElement(field)}

								<button onClick={(event) => removeField(field, event)}>
									Remove field
								</button>
							</div>
						);
					})}

					{showError ? (
						<span style={{ color: 'red' }}>Some fields doesnt filled</span>
					) : null}

					{formFields.length > 0 ? (
						<button onClick={(event) => showResults(event)}>
							Show results
						</button>
					) : null}

					{shouldShowResults && !showError ? (
						<>
							<h1>Last generated json</h1>
							<pre>{JSON.stringify(formToSend, null, 2)}</pre>
						</>
					) : null}
				</div>
			</form>
		</div>
	);
}

export default App;
