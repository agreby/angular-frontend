import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { type ActivatedRoute, RouterModule } from "@angular/router"

@Component({
  selector: "app-campaign-analytics",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <!-- Header with campaign info and navigation -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <a 
                routerLink="/dashboard" 
                class="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </a>
              <h1 class="text-2xl font-bold text-gray-900">Campaign Analytics</h1>
            </div>
            <p class="text-gray-500 mt-1">Campaign ID: {{ campaignId }}</p>
          </div>
        </div>
      </div>

      <!-- Performance Overview -->
      <div class="bg-white rounded-lg shadow-sm mb-6">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-lg font-medium">Performance Overview</h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-5 gap-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-gray-900">2,183</div>
              <div class="text-sm text-gray-500 mt-1">Sent</div>
              <div class="mt-2 h-1 bg-gray-200 rounded-full">
                <div class="h-1 bg-blue-600 rounded-full" style="width: 100%"></div>
              </div>
              <div class="text-xs text-gray-500 mt-1">100%</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-gray-900">2,150</div>
              <div class="text-sm text-gray-500 mt-1">Delivered</div>
              <div class="mt-2 h-1 bg-gray-200 rounded-full">
                <div class="h-1 bg-blue-600 rounded-full" style="width: 98%"></div>
              </div>
              <div class="text-xs text-gray-500 mt-1">98%</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-gray-900">764</div>
              <div class="text-sm text-gray-500 mt-1">Opened</div>
              <div class="mt-2 h-1 bg-gray-200 rounded-full">
                <div class="h-1 bg-green-500 rounded-full" style="width: 35%"></div>
              </div>
              <div class="text-xs text-gray-500 mt-1">35%</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-gray-900">327</div>
              <div class="text-sm text-gray-500 mt-1">Clicked</div>
              <div class="mt-2 h-1 bg-gray-200 rounded-full">
                <div class="h-1 bg-orange-500 rounded-full" style="width: 15%"></div>
              </div>
              <div class="text-xs text-gray-500 mt-1">15%</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-gray-900">8</div>
              <div class="text-sm text-gray-500 mt-1">Unsubscribed</div>
              <div class="mt-2 h-1 bg-gray-200 rounded-full">
                <div class="h-1 bg-red-500 rounded-full" style="width: 0.4%"></div>
              </div>
              <div class="text-xs text-gray-500 mt-1">0.4%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Placeholder for more analytics content -->
      <div class="bg-white rounded-lg shadow-sm p-6 text-center">
        <p class="text-gray-500">Detailed analytics charts and data will be displayed here.</p>
        <p class="text-gray-500 mt-2">This is a placeholder for the full analytics implementation.</p>
      </div>
    </div>
  `,
})
export class CampaignAnalyticsComponent implements OnInit {
  campaignId = ""

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.campaignId = this.route.snapshot.paramMap.get("id") || ""
  }
}
