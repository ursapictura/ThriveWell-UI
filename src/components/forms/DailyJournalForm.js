import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { createDailyJournal, updateDailyJournal } from '../../api/DailyJournal';

const nullEntry = {
  entry: '',
  date: null,
  uid: '',
};

export default function DailyJournalForm({ journalObj = nullEntry }) {
  const [formInput, setFormInput] = useState(nullEntry);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (journalObj.id) setFormInput(journalObj);
  }, [journalObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (journalObj.id) {
      updateDailyJournal(formInput).then(() => router.push('/dailyJournals'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createDailyJournal(payload).then(() => router.push('/dailyJournals'));
    }
  };

  return (
    <div className="formContainer">
      <Form onSubmit={handleSubmit}>
        <h2 className="mt-5">{journalObj.id ? 'Update' : 'Add'} Daily Journal Entry</h2>

        {/* Entry for Daily Journal  */}
        {/* <FloatingLabel controlId="floatingInput1" label="Add Journal Entry" className="mb-3">
          <Form.Control as="textarea" rows={5} placeholder="Enter your journal entry here." name="entry" value={formInput.entry || ''} onChange={handleChange} required />
        </FloatingLabel> */}
        <Form.Group className="mb-3" controlId="journalForm.ControlTextarea1">
          <Form.Label>Daily Journal Entry</Form.Label>
          <Form.Control as="textarea" rows={5} placeholder="Enter your journal entry here." name="entry" value={formInput.entry || ''} onChange={handleChange} required />
        </Form.Group>

        {/* Date of Journal Entry  */}
        <Form.Group className="mb-3" controlId="journalForm.ControlTextinput1">
          <Form.Label>Date of Entry</Form.Label>
          <Form.Control type="date" placeholder="Enter the date of the entry" name="date" value={formInput.date || ''} onChange={handleChange} required />
        </Form.Group>

        {/* SUBMIT BUTTON  */}
        <button className="button" type="submit">
          {journalObj.id ? 'Update' : 'Add'} Entry
        </button>
      </Form>
    </div>
  );
}

DailyJournalForm.propTypes = {
  journalObj: PropTypes.shape({
    entry: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    id: PropTypes.number,
  }),
};
