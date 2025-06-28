import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

interface UsageItem {
  label: string
  used: number
  total: number
}

@Component({
  selector: "app-plan-usage",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium">Your plan</h3>
        <button class="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="space-y-4">
        <div *ngFor="let item of usageItems">
          <div class="flex justify-between text-sm mb-1">
            <span>{{ item.label }}</span>
            <span>{{ item.used }} of {{ item.total }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-blue-600 h-2 rounded-full" [style.width.%]="(item.used / item.total) * 100"></div>
          </div>
        </div>
      </div>
      
      <div class="mt-6 text-center">
        <a href="#" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Make an upgrade</a>
      </div>
    </div>
  `,
})
export class PlanUsageComponent {
  usageItems: UsageItem[] = [
    { label: "Emails sent", used: 50, total: 100 },
    { label: "SMS sent", used: 10, total: 50 },
    { label: "Daily requests", used: 60, total: 100 },
  ]
}
