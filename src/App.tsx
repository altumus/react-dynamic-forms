import React, { useState } from 'react';
import './App.css';

function App() {
	const [formFields, setFormFields] = useState<FormField[]>([]);

	function addTextField() {
		alert('click add text');
	}

	function addCheckboxField() {
		alert('click add check');
	}

	function addDropdownField() {
		alert('click add drop');
	}

	return (
		<div>
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
		</div>
	);
}

export default App;
