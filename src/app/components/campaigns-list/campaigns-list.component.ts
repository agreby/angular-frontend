import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import  { CampaignService } from "../../services/campaign.service"

@Component({
  selector: "app-campaigns-list",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p class="text-gray-500 mt-1">View and manage all your email campaigns</p>
        </div>
        <a 
          routerLink="/campaigns/new" 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create Campaign
        </a>
      </div>

      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 class="text-lg font-medium">All Campaigns</h2>
          <div class="flex items-center gap-2">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Search campaigns..." 
                class="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-gray-400 absolute left-3 top-2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <div class="relative">
              <select class="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Campaigns</option>
                <option>Sent</option>
                <option>Scheduled</option>
                <option>Draft</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <th class="px-6 py-3">Campaign Name</th>
                <th class="px-6 py-3">Subject</th>
                <th class="px-6 py-3">Status</th>
                <th class="px-6 py-3">Date</th>
                <th class="px-6 py-3">Recipients</th>
                <th class="px-6 py-3">Open Rate</th>
                <th class="px-6 py-3">Click Rate</th>
                <th class="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr *ngFor="let campaign of campaigns" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ campaign.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ campaign.subject }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="px-2 py-1 text-xs rounded-full" 
                    [ngClass]="{
                      'bg-green-100 text-green-800': campaign.status === 'sent',
                      'bg-blue-100 text-blue-800': campaign.status === 'scheduled',
                      'bg-gray-100 text-gray-800': campaign.status === 'draft'
                    }"
                  >
                    {{ campaign.status | titlecase }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ campaign.sentAt ? (campaign.sentAt | date:'MMM d, y') : (campaign.scheduledFor | date:'MMM d, y') }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ campaign.stats?.sent?.toLocaleString() || campaign.stats?.recipients?.toLocaleString() || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div *ngIf="campaign.status === 'sent'" class="flex items-center">
                    <div class="w-16 h-2 bg-gray-200 rounded-full mr-2">
                      <div class="h-2 bg-green-500 rounded-full" [style.width.%]="getOpenRate(campaign)"></div>
                    </div>
                    <span>{{ getOpenRate(campaign) }}%</span>
                  </div>
                  <span *ngIf="campaign.status !== 'sent'">-</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div *ngIf="campaign.status === 'sent'" class="flex items-center">
                    <div class="w-16 h-2 bg-gray-200 rounded-full mr-2">
                      <div class="h-2 bg-orange-500 rounded-full" [style.width.%]="getClickRate(campaign)"></div>
                    </div>
                    <span>{{ getClickRate(campaign) }}%</span>
                  </div>
                  <span *ngIf="campaign.status !== 'sent'">-</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <div class="flex items-center justify-center gap-2">
                    <a 
                      *ngIf="campaign.status === 'sent'"
                      [routerLink]="['/campaigns', campaign.id, 'analytics']" 
                      class="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-1">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                      Analytics
                    </a>
                    <button 
                      class="inline-flex items-center px-2 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </button>
                    <button 
                      class="inline-flex items-center px-2 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="p-4 border-t border-gray-200 flex items-center justify-between">
          <div class="text-sm text-gray-500">
            Showing <span class="font-medium">1</span> to <span class="font-medium">{{ campaigns.length }}</span> of <span class="font-medium">{{ campaigns.length }}</span> campaigns
          </div>
          <div class="flex items-center space-x-2">
            <button class="px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CampaignsListComponent implements OnInit {
  campaigns: any[] = []

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.campaignService.getCampaigns().subscribe((response) => {
      console.log('Campaigns response:', response);
      this.campaigns = response?.data?.content || [];
    });
  }

  getOpenRate(campaign: any): number {
    if (!campaign.stats?.opened || !campaign.stats?.delivered) return 0
    return Math.round((campaign.stats.opened / campaign.stats.delivered) * 100)
  }

  getClickRate(campaign: any): number {
    if (!campaign.stats?.clicked || !campaign.stats?.delivered) return 0
    return Math.round((campaign.stats.clicked / campaign.stats.delivered) * 100)
  }
}
