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
    fetch(`${endpoint}/logs/${logId}.json`, {
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
    fetch(`${endpoint}/logs/${payload.id}.json`, {
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

export { getAllSymptomLogs, getSingleSymptomLog, createSymptomLog, updateSymptomLog, deleteSymptomLog };
