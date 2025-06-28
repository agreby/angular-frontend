import { Component, type OnInit, type AfterViewInit, type ElementRef, ViewChild } from "@angular/core"
import { CommonModule } from "@angular/common"
import Chart from "chart.js/auto"

@Component({
  selector: "app-campaign-chart",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-medium">Your campaigns</h3>
        <div class="relative">
          <select class="appearance-none bg-white border border-gray-300 rounded-md py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>This year</option>
            <option>Last year</option>
            <option>Last 6 months</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="flex items-center space-x-6 mb-4">
        <div class="flex items-center">
          <div class="w-3 h-3 bg-gray-300 rounded-sm mr-2"></div>
          <span class="text-sm text-gray-600">Open rate</span>
        </div>
        <div class="flex items-center">
          <div class="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
          <span class="text-sm text-gray-600">CTR</span>
        </div>
        <div class="flex items-center">
          <div class="w-3 h-3 bg-blue-800 rounded-sm mr-2"></div>
          <span class="text-sm text-gray-600">Bounce rate</span>
        </div>
      </div>
      
      <div class="h-64">
        <canvas #chartCanvas></canvas>
      </div>
    </div>
  `,
})
export class CampaignChartComponent implements OnInit, AfterViewInit {
  @ViewChild("chartCanvas") chartCanvas!: ElementRef<HTMLCanvasElement>
  chart: any

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createChart()
  }

  createChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext("2d")
    if (!ctx) return

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const data = {
      labels: months,
      datasets: [
        {
          label: "Open Rate",
          data: [650, 700, 600, 680, 590, 630, 670, 650, 660, 650, 680, 650],
          backgroundColor: "#E5E7EB",
          barPercentage: 0.6,
          categoryPercentage: 0.7,
        },
        {
          label: "CTR",
          data: [450, 500, 400, 480, 390, 430, 470, 450, 460, 450, 480, 450],
          backgroundColor: "#3B82F6",
          barPercentage: 0.6,
          categoryPercentage: 0.7,
        },
        {
          label: "Bounce Rate",
          data: [250, 300, 200, 280, 190, 230, 270, 250, 260, 250, 280, 250],
          backgroundColor: "#1E40AF",
          barPercentage: 0.6,
          categoryPercentage: 0.7,
        },
      ],
    }

    this.chart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            max: 1000,
            ticks: {
              stepSize: 200,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
      },
    })
  }
}
