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
              loadTime: element[4],
              redirectTime: element[5],
              serverResponseTime: element[6]
            });
          });
          console.log("PAGES:", this.pages)
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

      this.analytics.getPageViewsOnTime().subscribe(data => console.log("HERE: ", data));
  }
  logAnalytics = () => this._logAnalytics.eventEmitter(`Analytics Page`, "select_content", "go_to", "click", 10);
  navToSiteAnalytics(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
