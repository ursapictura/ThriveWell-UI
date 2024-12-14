'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function SymptomLogCard({ logObj }) {
  return (
    <div>
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <div className="flex">
            <Card.Title className="post-card-link">{logObj.symptom.name}</Card.Title>
          </div>
          <Card.Text style={{ fontWeight: '600', color: '#c82ae8' }}>Symptom Severity: {logObj.severity}</Card.Text>

          {
            // eslint-disable-next-line
            logObj?.symptomTrigger.map((trigger) => (
              <Card.Text key={trigger.id}>{trigger.name}</Card.Text>
            ))
          }
        </Card.Body>
      </Card>
    </div>
  );
}

SymptomLogCard.propTypes = {
  logObj: PropTypes.shape({
    symptom: PropTypes.string,
    severity: PropTypes.number,
    symptomTrigger: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};
