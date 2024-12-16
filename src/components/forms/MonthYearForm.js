'use client';

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const nullInput = {
  month: '',
  year: '',
};
export default function MonthYearForm({ year = null, onFilter }) {
  const [formInput, setFormInput] = useState(nullInput);
  const thisYear = year;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(formInput);
    onFilter(formInput.year, formInput.month);
  };

  const years = [];
  for (let yearOption = thisYear; yearOption > thisYear - 5; yearOption--) {
    years.push(yearOption);
  }

  return (
    <Form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
      <Form.Group className="mb-3" controlId="dateSelect">
        <Form.Label>Select Month</Form.Label>
        <Form.Select aria-label="Month" name="month" className="mb-3" placeholder="select month" value={formInput.month} onChange={handleChange} style={{ color: 'gray' }} required>
          <option value="Month">-- Select Month --</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Select Month</Form.Label>
        <Form.Select aria-label="Year" name="year" className="mb-3" placeholder="select year" value={formInput.year} onChange={handleChange} style={{ color: 'gray' }} required>
          <option value="Year">-- Select Year --</option>
          {years.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <button className="button" type="submit">
        Submit
      </button>
    </Form>
  );
}

MonthYearForm.propTypes = {
  year: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};
