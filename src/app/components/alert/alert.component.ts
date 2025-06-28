import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-alert",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-blue-50 border border-blue-100 rounded-md p-4 relative" *ngIf="visible">
      <div class="flex">
        <div class="flex-shrink-0">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-blue-800">Your account is approved</h3>
          <div class="mt-1 text-sm text-blue-700">
            Your account has been approved and you can now send up to 100 emails per month. Need more? Order a plan by clicking the upgrade button below. The free plan includes 3,000 emails per month.
          </div>
          <div class="mt-3">
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium inline-flex items-center">
              Get started
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 ml-1">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <button class="absolute top-4 right-4 text-blue-400 hover:text-blue-500" (click)="closeAlert()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `,
})
export class AlertComponent {
  visible = true

  closeAlert() {
    this.visible = false
  }
}
