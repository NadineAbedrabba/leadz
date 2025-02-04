import { Component } from '@angular/core';
import { ApexChart, ApexXAxis, ApexDataLabels, ApexStroke, ApexTooltip, ApexLegend, ApexPlotOptions, ApexResponsive, ApexNonAxisChartSeries, ApexTitleSubtitle, ChartType } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Configuration du graphique des ventes (Sales)
  salesData: {
    chart: ApexChart;
    series: { name: string; data: number[] }[];
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
  } = {
    chart: {
      type: 'bar' as ChartType,
      height: 200
    },
    series: [
      {
        name: 'Ventes',
        data: [15000, 32000, 45000, 30000, 50000, 42000, 60000]
      }
    ],
    xaxis: {
      categories: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    },
    stroke: {
      width: 2
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: "Ventes de la semaine",
      align: "center"
    }
  };

  // Configuration du graphique des visiteurs (Visitors)
  visitorsData: {
    chart: ApexChart;
    series: { name: string; data: number[] }[];
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    tooltip: ApexTooltip;
    title: ApexTitleSubtitle;
  } = {
    chart: {
      type: 'line' as ChartType,
      height: 200
    },
    series: [
      {
        name: 'Nouveaux visiteurs',
        data: [4000, 8000, 12000, 15000, 10000, 13000, 16000]
      },
      {
        name: 'Visiteurs récurrents',
        data: [3000, 5000, 8000, 10000, 7000, 9000, 12000]
      }
    ],
    xaxis: {
      categories: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    },
    stroke: {
      curve: 'smooth'
    },
    tooltip: {
      enabled: true
    },
    title: {
      text: "Visiteurs cette semaine",
      align: "center"
    }
  };

  // Configuration du graphique du profil des acheteurs (Buyers Profile)
  profileData: {
    chart: ApexChart;
    series: ApexNonAxisChartSeries;
    labels: string[];
    legend: ApexLegend;
    responsive: ApexResponsive[];
    title: ApexTitleSubtitle;
  } = {
    chart: {
      type: 'pie' as ChartType,
      height: 200
    },
    series: [50.8, 35.7, 13.5],  // Pourcentage Male, Female, Others
    labels: ['Homme', 'Femme', 'Autres'],
    legend: {
      position: 'bottom'
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    title: {
      text: "Profil des acheteurs",
      align: "center"
    }
  };
}
