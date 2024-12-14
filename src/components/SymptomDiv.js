'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { deleteSymptom } from '../api/Symptom';

export default function SymptomDiv({ symptomObj, onUpdate }) {
  const deleteThisSymptom = () => {
    if (window.confirm(`Delete ${symptomObj.name}?`)) {
      deleteSymptom(symptomObj.id).then(() => onUpdate());
    }
  };

  return (
    <div style={{ display: 'flex', margin: '20px auto' }}>
      <h4 style={{ marginRight: '15px' }}>{symptomObj.name}</h4>
      <button className="button" type="submit" onClick={deleteThisSymptom}>
        Delete
      </button>
    </div>
  );
}

SymptomDiv.propTypes = {
  symptomObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
