import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllSymptoms = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/symptoms/user/${uid}`, {
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

const getSingleSymptom = (symptomId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/symptoms/${symptomId}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const createSymptom = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/symptoms`, {
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

const deleteSymptom = (symptomId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/symptoms/${symptomId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

export { getAllSymptoms, getSingleSymptom, createSymptom, deleteSymptom };
