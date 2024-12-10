import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllDailyJournals = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/journals/user/${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getAllDailyJournalsByMonthYear = (uid, year, month) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/journals/user/${uid}/${year}/${month}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getSingleDailyJournal = (journalId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/journals/${journalId}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const createDailyJournal = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/journals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const updateDailyJournal = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/journals/${payload.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const deleteDailyJournal = (journalId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/journals/${journalId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

export { getAllDailyJournals, getAllDailyJournalsByMonthYear, getSingleDailyJournal, createDailyJournal, updateDailyJournal, deleteDailyJournal };
