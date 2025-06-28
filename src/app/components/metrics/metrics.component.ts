import { Component, type OnInit, type AfterViewInit, type ElementRef, ViewChild } from "@angular/core"
import { CommonModule } from "@angular/common"
import Chart from "chart.js/auto"

@Component({
  selector: "app-metrics",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h3 class="text-lg font-medium mb-6">Main Metrics</h3>
      
      <div class="mb-6">
        <div class="text-sm text-gray-500 mb-1">Email revenue</div>
        <div class="flex items-center justify-between">
          <div class="text-3xl font-bold">$15.3k</div>
          <div class="text-xs font-medium text-green-500">+37% vs last month</div>
        </div>
        <div class="mt-2 h-12">
          <canvas #revenueChart></canvas>
        </div>
      </div>
      
      <div>
        <div class="text-sm text-gray-500 mb-1">Growth rate</div>
        <div class="flex items-center justify-between">
          <div class="text-3xl font-bold">3.7%</div>
          <div class="text-xs font-medium text-green-500">+34% vs last month</div>
        </div>
        <div class="mt-2 h-12">
          <canvas #growthChart></canvas>
        </div>
      </div>
    </div>
  `,
})
export class MetricsComponent implements OnInit, AfterViewInit {
  @ViewChild("revenueChart") revenueChartCanvas!: ElementRef<HTMLCanvasElement>
  @ViewChild("growthChart") growthChartCanvas!: ElementRef<HTMLCanvasElement>
  revenueChart: any
  growthChart: any

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createRevenueChart()
    this.createGrowthChart()
  }

  createRevenueChart(): void {
    const ctx = this.revenueChartCanvas.nativeElement.getContext("2d")
    if (!ctx) return

    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          data: [10, 12, 11, 14, 13, 15, 18, 20, 22, 24, 25, 28],
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    }

    this.revenueChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    })
  }

  createGrowthChart(): void {
    const ctx = this.growthChartCanvas.nativeElement.getContext("2d")
    if (!ctx) return

    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          data: [2, 2.5, 2.2, 2.8, 2.5, 3, 3.5, 3.2, 3.8, 3.5, 4, 4.2],
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    }

    this.growthChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    })
  }
}
