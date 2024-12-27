'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { deleteSymptom } from '../api/Symptom';

export default function TriggerCard({ triggerObj, onUpdate }) {
  const deleteThisSymptom = () => {
    if (window.confirm(`Delete ${triggerObj.name}?`)) {
      deleteSymptom(triggerObj.id).then(() => onUpdate());
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Card>
        <Card.Body>
          <div className="flex">
            <Card.Title className="card-link">{triggerObj.name}</Card.Title>
          </div>
          <button className="button" type="submit" onClick={deleteThisSymptom}>
            Delete
          </button>
        </Card.Body>
      </Card>
    </div>
  );
}

TriggerCard.propTypes = {
  triggerObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
