'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function SymptomLogCard({ logObj }) {
  return (
    <div>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <div className="flex">
            <Card.Title className="card-link">{logObj.symptom.name}</Card.Title>
          </div>
          <Card.Text style={{ fontWeight: '600', color: '#c82ae8' }}>Symptom Severity: {logObj.severity}</Card.Text>

          {
            // eslint-disable-next-line
            logObj?.symptomTrigger.map((st) => (
              <Card.Text key={st?.id}>{st.trigger.name}</Card.Text>
            ))
          }
          {console.warn(logObj)}
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
