'use strict';

const webpush = require('web-push');

// Key generation: https://web-push-codelab.glitch.me/
const vapidKeys = {
  public: 'BPBc2Ei5rc3cDBa6899wa_Oem87Vm0pB2N9Al2j8dqioxpoLKwMnb3Rk7F6u9A8WnchLcnqNFgzkIjXpN1ylrJg',
  private: 'pL0FCH8vUtOr5aI9j0Jzy0NqRoVdalYtw4xjS-00oPs'
};

const subscriptions = [];

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

const setup = restify => {
  webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.public,
    vapidKeys.private
  );
  restify.post('/push/register', register);
  restify.post('/push/notifyAll', notifyAll);
};

module.exports = { setup };
