import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FloatingLabel } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { createDailyJournal, updateDailyJournal } from '../../api/DailyJournal';

const nullEntry = {
  entry: '',
  date: null,
  uid: '',
};

export default function DailyJournalForm({ journalObj }) {
  const [formInput, setFormInput] = useState(nullEntry);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (journalObj.id) setFormInput(journalObj);
  }, [journalObj, user.uid]);

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
      updateDailyJournal(formInput).then(() => router.push('/journals'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createDailyJournal(payload).then(() => router.push('/journals'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{journalObj.id ? 'Update' : 'Add'} Daily Journal Entry</h2>

      {/* VISIT REASON INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Add Journal Entry" className="mb-3">
        <Form.Control type="text" placeholder="Enter your journal entry here." name="entry" value={formInput.entry} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Date" className="mb-3">
        <Form.Control type="date" placeholder="Enter the date of the entry" name="date" value={formInput.date} onChange={handleChange} required />
      </FloatingLabel>
      {/* SUBMIT BUTTON  */}
      <button className="button" type="submit">
        {journalObj.id ? 'Update' : 'Add'} Visit
      </button>
    </Form>
  );
}

DailyJournalForm.propTypes = {
  journalObj: PropTypes.shape({
    entry: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    id: PropTypes.number,
  }),
};
