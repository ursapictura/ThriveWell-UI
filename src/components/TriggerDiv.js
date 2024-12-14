'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { deleteSymptom } from '../api/Symptom';

export default function TriggerDiv({ triggerObj, onUpdate }) {
  const deleteThisSymptom = () => {
    if (window.confirm(`Delete ${triggerObj.name}?`)) {
      deleteSymptom(triggerObj.id).then(() => onUpdate());
    }
  };

  return (
    <div style={{ display: 'flex', margin: '20px auto' }}>
      <h4 style={{ marginRight: '15px' }}>{triggerObj.name}</h4>
      <button className="button" type="submit" onClick={deleteThisSymptom}>
        Delete
      </button>
    </div>
  );
}

TriggerDiv.propTypes = {
  triggerObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
