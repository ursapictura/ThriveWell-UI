import React from 'react';
import SymptomLogForm from '../../../components/forms/SymptomLogForm';

export default function AddSymptomLog() {
  return (
    <div className="logFormContainer">
      <h2 style={{ textAlign: 'center' }}>Experience a symptom? Log it here!</h2>
      <SymptomLogForm />
    </div>
  );
}
