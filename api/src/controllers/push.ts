import * as webpush from 'web-push';

export class PushController {

// Key generation: https://web-push-codelab.glitch.me/
  private vapidKeys = {
    public: 'BBh_zx5aEnlMyrM8W8anuyxx2ibkb9cUxZclHHDHuBd3uX7PNp-minttLaWe0jpOiHvNfUHXD1rUXTfYf87URlE',
    private: '43EHInkVq7KRGQ9IJLNLnQ_jGtpsYVPqf7lUcVPd6uE'
  };

  private subscriptions = [];

  private _register(req, res) {
    if (!this.subscriptions.find(subscription => subscription.endpoint === req.body.endpoint)) {
      this.subscriptions.push(req.body);
      console.log('New client registered for push', req.body.endpoint);
    }

    res.send(200, 'ok');
  };

  private _notifyAll(req, res) {
    const payload = {
      notification: {
        title: 'Sample Title',
        body: 'Sample Description',
        icon: '/assets/launcher-icon-3x.png'
      }
    };

    this.subscriptions.forEach(subscription => this._sendNotification(subscription, payload));

    res.send(200);
  };

  private _sendNotification(subscription, payload) {
    webpush.sendNotification(subscription, JSON.stringify(payload))
      .then(
        () => console.log('Successfully notified', subscription.endpoint),
        () => {
          console.log('Removing', subscription.endpoint, 'due to error');

          const index = this.subscriptions.indexOf(subscription);
          this.subscriptions.splice(index, 1);
        }
      );
  };

  private _clearSubscriptions(req, res) {
    this.subscriptions = [];
    console.log('Subscriptions cleared.');
    res.send(200, 'Subscriptions cleared');
  }

  public setup(restify): void {
    webpush.setVapidDetails(
      'mailto:example@yourdomain.org',
      this.vapidKeys.public,
      this.vapidKeys.private
    );
    restify.post('/push/register', this._register);
    restify.post('/push/notifyAll', this._notifyAll);
    restify.get('/push/clear', this._clearSubscriptions);
  }
}
