'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function TopTriggersCard({ triggerObj }) {
  return (
    <Card style={{ width: '30rem' }}>
      <Card.Body>
        <div className="flex">
          <Card.Title className="card-link" style={{ color: '#1b7e60', fontWeight: '650', fontSize: '24px' }}>
            {triggerObj.name}
          </Card.Title>
        </div>
        <Card.Text>In the last 30 days, this trigger...</Card.Text>
        <Card.Text>
          Was logged <strong style={{ fontWeight: '600', color: '#c82ae8' }}>{triggerObj.total} times</strong>.
        </Card.Text>
        <Card.Text>
          Appeared in <strong style={{ fontWeight: '600', color: '#c82ae8' }}>{triggerObj.percentage.toFixed(1)}% of symptom logs</strong>.
        </Card.Text>
        <Card.Text>
          had an <strong style={{ fontWeight: '600', color: '#c82ae8' }}>average symptom severity of {triggerObj.severityAverage.toFixed(1)}</strong>.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

TopTriggersCard.propTypes = {
  triggerObj: PropTypes.shape({
    name: PropTypes.string,
    total: PropTypes.number,
    percentage: PropTypes.number,
    severityAverage: PropTypes.number,
  }).isRequired,
};
