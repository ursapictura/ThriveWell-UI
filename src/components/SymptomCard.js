'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { deleteSymptom } from '../api/Symptom';

export default function SymptomCard({ symptomObj, onUpdate }) {
  const deleteThisSymptom = () => {
    if (window.confirm(`Delete ${symptomObj.name}?`)) {
      deleteSymptom(symptomObj.id).then(() => onUpdate());
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Card>
        <Card.Body>
          <div className="flex">
            <Card.Title className="card-link">{symptomObj.name}</Card.Title>
          </div>
          <button className="button" type="submit" onClick={deleteThisSymptom}>
            Delete
          </button>
        </Card.Body>
      </Card>
    </div>
  );
}

SymptomCard.propTypes = {
  symptomObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
