'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function SymptomLogCard({ logObj }) {
  const date = new Date(logObj.date);
  const logYear = date.getUTCFullYear();
  const logMonth = date.getUTCMonth();
  const logDay = date.getUTCDate();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <Card style={{ width: '20rem' }}>
      <Card.Body>
        <div className="flex">
          <Card.Title className="post-card-link" style={{ fontWeight: '700', color: '#1b7e60', marginBottom: '2vh' }}>
            {logObj.symptom.name}
          </Card.Title>
        </div>
        <Card.Text style={{ fontWeight: '600', fontSize: '18px', color: '#1b7e60' }}>Symptom Severity: {logObj.severity}</Card.Text>
        <Card.Text style={{ fontWeight: '600', color: '#1b7e60' }}>
          Date: {monthNames[logMonth]} {logDay}, {logYear}
        </Card.Text>

        <div>
          <Card.Text>
            <strong>Recorded Triggers:</strong>
          </Card.Text>
          <ul>
            {
              // eslint-disable-next-line
              logObj?.symptomTrigger.map((st) => (
                <li>
                  <Card.Text key={st?.id}>{st.trigger.name}</Card.Text>
                </li>
              ))
            }
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
}

SymptomLogCard.propTypes = {
  logObj: PropTypes.shape({
    symptom: PropTypes.string,
    severity: PropTypes.number,
    date: PropTypes.instanceOf(Date),
    symptomTrigger: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};
