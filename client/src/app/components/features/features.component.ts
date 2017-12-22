import {Component, OnInit} from '@angular/core';
import {FeatureSupport} from '../../models/featureSupport';
import {FeatureService} from '../../services/feature.service';

@Component({
    templateUrl: 'features.component.html',
    styleUrls: ['features.component.scss'],
})
export class FeaturesComponent implements OnInit {
    public features: Array<FeatureSupport>;

    constructor(private _featureService: FeatureService) {
    }

    public ngOnInit(): void {
        this.features = this._featureService.detectFeatures();
    }
}
