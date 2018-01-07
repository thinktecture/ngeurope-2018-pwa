import {Component, OnInit} from '@angular/core';
import {FeatureService} from '../../../shared/services/feature.service';

@Component({
    templateUrl: 'features.component.html',
})
export class FeaturesComponent implements OnInit {
    public features: Array<any>;
    public title: string;

    constructor(private _featureService: FeatureService) {
    }

    public ngOnInit(): void {
        this.features = this._featureService.detectFeatures();
        this.title = `${this._featureService.getBrowserName().toUpperCase()} - ${this._featureService.getBrowserVersion()}`;
    }
}
