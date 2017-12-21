import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'root.html',
  styleUrls: ['root.scss']
})
export class RootComponent implements OnInit {
  constructor(private _notifcationService: NotificationService) {
  }

  public ngOnInit(): void {
    this._notifcationService.register();
  }
}
