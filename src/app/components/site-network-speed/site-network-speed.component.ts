import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/shared/services/google-analytics.service';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { IPage } from 'src/app/models/IPage';
import { map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-site-network-speed',
  templateUrl: './site-network-speed.component.html',
  styleUrls: ['./site-network-speed.component.css']
})
export class SiteNetworkSpeedComponent implements OnInit {

  constructor(private _logAnalytics: GoogleAnalyticsService, 
        private analytics: AnalyticsService, private router: Router,
        private route: ActivatedRoute){ }
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['continent', 'country', 'city', 'region', 'loadTime', 'redirectTime', 'serverResponseTime'];
  dataSource;
  pages: IPage[] = [];
  errMessage;
  loading:boolean = true;
  ngOnInit(): void {
    this.analytics.getTimeMetrics30days()
      .pipe(map(response => {
        if (response.status === "OK"){
          response['data'].forEach(element => {
            this.pages.push({
              continent: element[0],
              country: element[1],
              city: element[2],
              region: element[3],
              lat: element[4], 
              long: element[5],
              loadTime: element[6],
              redirectTime: element[7],
              serverResponseTime: element[8]
            });
          });
          this.dataSource = new MatTableDataSource<IPage>(this.pages);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else {
          this.errMessage = "Something went wrong";
        }
      })).subscribe({
        error: (error) => this.errMessage = error,
        complete: () => this.loading = false
      });

  }
  logAnalytics = (name) => this._logAnalytics.eventEmitter(name, "select_content", "go_to", "click", 10);
  navToSiteAnalytics(){
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  navToCharts(){
    this.router.navigate(['../analyticscharts'], {relativeTo: this.route});
  }
  // open the map passing the longitude and latitude as URL params
  openMap(lat:number, long:number, city:string){
    this.router.navigate(['../speedandnetwork/map/', city, lat, long], {relativeTo: this.route});
  }

}
