import {Component, OnInit} from '@angular/core';
import {FeatureService} from '../../../shared/services/feature.service';

@Component({
    templateUrl: 'features.component.html',
})
export class FeaturesComponent implements OnInit {
    public features: Array<any>;

    constructor(private _featureService: FeatureService) {
    }

    public ngOnInit(): void {
        this.features = this._featureService.detectFeatures();
    }
}
