import { Component, OnInit } from '@angular/core';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { MAPS_API } from '../../Constants/Maps';
import { DomSanitizer } from '@angular/platform-browser';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';

@Component({
  selector: 'mapping',
  templateUrl: './map-agm.component.html',
  styleUrls: ['./map-agm.component.css']
})
export class MapAgmComponent implements OnInit {

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router, private analytics: AnalyticsService) { }
  latitude;
  longitude;
  sourceUrl;
  city;
  ngOnInit(): void {
    //get url parameters
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.latitude = +params.get('lat');
      this.longitude = +params.get('long');
      this.city = params.get('city');
    });
    //bypass the XSS security check
    this.sourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${MAPS_API.BASE_URL}key=${MAPS_API.KEY}&zoom=13&q=${this.latitude},${this.longitude}`);
    this.analytics.getMap("pressure_new", 2, this.latitude, this.longitude)
                .subscribe(data => {
                  console.log(data);
                },
                error => console.log(error),
                () => console.log("Dun"));
  }
  back(){
    this.router.navigate(['/analytics/speedandnetwork']);
  }

}
