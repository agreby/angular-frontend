import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

interface Email {
  id: string
  subject: string
  campaign: string
  status: string
  time: string
  emailsSent: string
  openRate: string
}

@Component({
  selector: "app-email-table",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm">
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 class="text-lg font-medium">Last emails</h3>
        <button class="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th class="px-6 py-3">Email</th>
              <th class="px-6 py-3">Campaign</th>
              <th class="px-6 py-3">Status</th>
              <th class="px-6 py-3">Time</th>
              <th class="px-6 py-3">Emails sent</th>
              <th class="px-6 py-3">Open rate</th>
              <th class="px-6 py-3">Analytics</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr *ngFor="let email of emails" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ email.subject }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ email.campaign }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {{ email.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ email.time }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ email.emailsSent }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ email.openRate }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <a [routerLink]="['/campaigns', email.id, 'analytics']" 
                   class="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-1">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  Analytics
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class EmailTableComponent {
  emails: Email[] = [
    {
      id: "camp_1234567890",
      subject: "Discover our new app features",
      campaign: "New app launch",
      status: "Sent",
      time: "02/03/2024 at 1:35pm",
      emailsSent: "2,183",
      openRate: "35%",
    },
    {
      id: "camp_0987654321",
      subject: "Abandoned cart",
      campaign: "Automated Email",
      status: "Sent",
      time: "02/03/2024 at 1:35pm",
      emailsSent: "2,183",
      openRate: "35%",
    },
    {
      id: "camp_2468101214",
      subject: "Discover our new app features",
      campaign: "New app launch",
      status: "Sent",
      time: "02/03/2024 at 1:35pm",
      emailsSent: "2,183",
      openRate: "35%",
    },
  ]
}
