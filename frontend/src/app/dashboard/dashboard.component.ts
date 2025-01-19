import { Component, OnInit } from '@angular/core';
import { ApexOptions } from 'apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Données des cartes et graphiques
  months = [
    { value: 'jan', viewValue: 'January' },
    { value: 'feb', viewValue: 'February' },
    { value: 'mar', viewValue: 'March' },
    // Ajoute d'autres mois ici...
  ];

  stats = [
    { time: '10:00 AM', color: 'success', title: 'Transaction Successful', subtext: 'Payment received' },
    { time: '11:30 AM', color: 'danger', title: 'Failed Transaction', subtext: 'Insufficient funds' },
    // Ajoute d'autres transactions ici...
  ];

  salesOverviewChart: ApexOptions = {
    series: [
      { name: 'Sales', data: [30, 40, 35, 50, 49, 60, 70] },
    ],
    chart: {
      type: 'line',
      height: 350
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    grid: {
      borderColor: '#f1f1f1',
    }
  };

  yearlyChart: ApexOptions = {
    series: [
      { name: 'Yearly', data: [40, 50, 60, 70, 80, 90, 100] },
    ],
    chart: {
      type: 'line',
      height: 250
    },
    xaxis: {
      categories: ['2020', '2021', '2022', '2023', '2024'],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    grid: {
      borderColor: '#f1f1f1',
    }
  };

  monthlyChart: ApexOptions = {
    series: [
      { name: 'Earnings', data: [100, 200, 300, 400, 500, 600, 700] },
    ],
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    grid: {
      borderColor: '#f1f1f1',
    }
  };

  productcards = [
    { imgSrc: 'assets/images/product1.jpg', title: 'Product 1', price: 30, rprice: 40 },
    { imgSrc: 'assets/images/product2.jpg', title: 'Product 2', price: 50, rprice: 60 },
    // Ajoute d'autres produits ici...
  ];

  dataSource = [
    { uname: 'John Doe', position: 'Manager', productName: 'Product 1', priority: 'high', budget: 500, imagePath: 'assets/images/avatar1.jpg' },
    { uname: 'Jane Doe', position: 'Developer', productName: 'Product 2', priority: 'medium', budget: 300, imagePath: 'assets/images/avatar2.jpg' },
    // Ajoute d'autres projets ici...
  ];

  displayedColumns: string[] = ['assigned', 'name', 'priority', 'budget'];

  constructor() {}

  ngOnInit(): void {}

}
