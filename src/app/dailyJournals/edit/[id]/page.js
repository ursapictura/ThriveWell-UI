'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getSingleDailyJournal } from '../../../../api/DailyJournal';
import DailyJournalForm from '../../../../components/forms/DailyJournalForm';

export default function EditDailyJournal({ params }) {
  const [editEntry, setEditEntry] = useState({});
  const { id } = params;

  useEffect(() => {
    getSingleDailyJournal(id).then(setEditEntry);
  }, [id]);

  return <DailyJournalForm journalObj={editEntry} />;
}

EditDailyJournal.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
