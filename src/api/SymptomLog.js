import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllSymptomLogs = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/logs/user/${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const getSingleSymptomLog = (logId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/logs/${logId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const getSymptomLogsByDate = (uid, journalYear, journalMonth, journalDay) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/logs/${uid}/date/${journalYear}/${journalMonth}/${journalDay}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const getSymptomLogsForLastThirtyDays = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/logs/${uid}/thirtydays`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const createSymptomLog = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/logs`, {
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

const updateSymptomLog = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/logs/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const deleteSymptomLog = (logId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/logs/${logId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

export { getAllSymptomLogs, getSingleSymptomLog, getSymptomLogsByDate, getSymptomLogsForLastThirtyDays, createSymptomLog, updateSymptomLog, deleteSymptomLog };
