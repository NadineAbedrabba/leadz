import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  salesData = {
    netSales: '$38,456.00',
    allSales: '$8',
  };

  // Données pour la section Visitors
  visitorsData = {
    newSales: '38,456',
    allSales: '$8',
  };

  // Données pour la section Traffic Source
  trafficSources = ['Google', 'Social', 'Direct'];

  // Données pour la section Customers
  customersData = {
    today: '1,256',
    allSales: '$8',
  };

  // Données pour la section Buyers Profile
  buyersProfile = [
    { name: 'Male', value: 55 },
    { name: 'Female', value: 35 },
    { name: 'Others', value: 10 },
  ];

  // Données pour la section Most Sales Locations
  mostSalesLocations = '76,345 Commercial real estate';

  // Données pour la section New Customers
  newCustomers = ['Reesea Emma', 'Brasilia'];

  // Données pour la section Sales Locations
  salesLocations = ['Basilia', 'California', 'Paris', 'Bengaluru'];

  // Données pour la section Latvites Handler
  latvitesHandler = 'Ireland';

  // Message pour la section Description Plan
  descriptionPlan = 'Your subscription plan will expire soon please upgrade!';

  // Configuration pour le graphique en barres (Sales)
  public barChartOptions: any = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Basilia', 'California', 'Paris', 'Bengaluru'],
    },
    yaxis: {
      title: {
        text: 'Sales (USD)',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `$${val}`,
      },
    },
  };

  public barChartSeries: any[] = [
    {
      name: 'Sales',
      data: [5000, 3000, 2000, 4000],
    },
  ];

  // Configuration pour le graphique circulaire (Buyers Profile)
  public pieChartOptions: any = {
    chart: {
      type: 'pie',
      width: 380,
    },
    labels: ['Male', 'Female', 'Others'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  public pieChartSeries: number[] = [55, 35, 10];
}
