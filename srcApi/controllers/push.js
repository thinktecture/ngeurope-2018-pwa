'use strict';

const webpush = require('web-push');

// Key generation: https://web-push-codelab.glitch.me/
const vapidKeys = {
  public: 'BBh_zx5aEnlMyrM8W8anuyxx2ibkb9cUxZclHHDHuBd3uX7PNp-minttLaWe0jpOiHvNfUHXD1rUXTfYf87URlE',
  private: '43EHInkVq7KRGQ9IJLNLnQ_jGtpsYVPqf7lUcVPd6uE'
};

let subscriptions = [];

const register = (req, res) => {
  if (!subscriptions.find(subscription => subscription.endpoint === req.body.endpoint)) {
    subscriptions.push(req.body);
    console.log('New client registered for push', req.body.endpoint);
  }

  res.send(200, "ok");
};

const notifyAll = (req, res) => {
  const payload = {
    notification: {
      title: 'Sample Title',
      body: 'Sample Description',
      icon: '/assets/launcher-icon-3x.png'
    }
  };

  subscriptions.forEach(subscription => sendNotification(subscription, payload));

  res.send(200);
};

const sendNotification = (subscription, payload) => {
  webpush.sendNotification(subscription, JSON.stringify(payload))
    .then(
      () => console.log('Successfully notified', subscription.endpoint),
      () => {
        console.log('Removing', subscription.endpoint, 'due to error');

        const index = subscriptions.indexOf(subscription);
        subscriptions.splice(index, 1);
      }
    );
};

const clearSubscriptions = (req, res) => {
  subscriptions = [];
  console.log('Subscriptions cleared.');
  res.send(200, 'Subscriptions cleared');
};

const setup = restify => {
  webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.public,
    vapidKeys.private
  );
  restify.post('/push/register', register);
  restify.post('/push/notifyAll', notifyAll);
  restify.get('/push/clear', clearSubscriptions);
};

module.exports = {setup};
