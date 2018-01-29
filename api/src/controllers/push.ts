import * as webpush from 'web-push';
import {BaseController} from './base';
import {HttpServer} from '../server/httpServer';
import {Request, Response} from 'restify';

export class PushController implements BaseController {
    private _subscriptions = [];
    // Key generation: https://web-push-codelab.glitch.me/
    private vapidKeys = {
        public: 'BBh_zx5aEnlMyrM8W8anuyxx2ibkb9cUxZclHHDHuBd3uX7PNp-minttLaWe0jpOiHvNfUHXD1rUXTfYf87URlE',
        private: '43EHInkVq7KRGQ9IJLNLnQ_jGtpsYVPqf7lUcVPd6uE'
    };

    public setup(httpServer: HttpServer): void {
        webpush.setVapidDetails(
            'mailto:example@yourdomain.org',
            this.vapidKeys.public,
            this.vapidKeys.private
        );
        httpServer.post('/push/register', this._register.bind(this));
        httpServer.post('/push/notifyAll', this._notifyAll.bind(this));
        httpServer.get('/push/clear', this._clearSubscriptions.bind(this));
    }

    private async _register(req: Request, res: Response) {
        if (!this._subscriptions.find(subscription => subscription.endpoint === req.body.endpoint)) {
            this._subscriptions.push(req.body);
            console.log('New client registered for push', req.body.endpoint);
        }

        res.send(200, 'ok');
    };

    private async _notifyAll(req: Request, res: Response) {
        const payload = {
            notification: {
                title: req.body.title,
                body: req.body.body,
                icon: '/assets/icon-144x144.png'
            }
        };

        this._subscriptions.forEach(subscription => this._sendNotification(subscription, payload));

        res.send(200);
    };

    private async _sendNotification(subscription, payload) {
        try {
            await webpush.sendNotification(subscription, JSON.stringify(payload));
            console.log('Successfully notified', subscription.endpoint)
        } catch (error) {
            console.log('Removing', subscription.endpoint, 'due to error');

            const index = this._subscriptions.indexOf(subscription);
            this._subscriptions.splice(index, 1);
        }
        ;
    };

    private async _clearSubscriptions(req, res) {
        this._subscriptions = [];
        console.log('Subscriptions cleared.');
        res.send(200, 'Subscriptions cleared');
    }
}
