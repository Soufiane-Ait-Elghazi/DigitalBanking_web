import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public chart1: any;
  public chart2: any;
  constructor(public authenticationService :AuthenticationService ,private router :Router) {
  }
  ngOnInit(): void {
    this.authenticationService.saveToken(this.authenticationService.getToken())
    this.router.navigateByUrl('/home')
    this.chart1 = new Chart("MyChart1", {
      type: 'radar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
        datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Tests",
            data: ['467','576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'red'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
    this.chart2 = new Chart("MyChart2", {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
        datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'info'
          },
          {
            label: "Tests",
            data: ['467','576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'red'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });

  }

}
