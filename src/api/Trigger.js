import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllTriggers = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/triggers/user/${uid}`, {
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

const getTopFiveTriggers = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/triggers/user/${uid}/topfive`, {
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

const getSingleTrigger = (triggerId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/triggers/${triggerId}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

const createTrigger = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/triggers`, {
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

const deleteTrigger = (triggerId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/triggers/${triggerId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

export { getAllTriggers, getTopFiveTriggers, getSingleTrigger, createTrigger, deleteTrigger };
