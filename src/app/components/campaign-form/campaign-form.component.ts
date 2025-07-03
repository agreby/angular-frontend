import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Router, RouterModule } from "@angular/router"
import { CampaignService } from "../../services/campaign.service"

@Component({
  selector: "app-campaign-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Create New Campaign</h1>
          <p class="text-gray-500 mt-1">Create and send a new email campaign to your subscribers</p>
        </div>
        <div class="flex gap-3">
          <button 
            type="button" 
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            (click)="navigateToDashboard()"
          >
            Cancel
          </button>
          <button 
            type="button" 
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            (click)="saveAsDraft()"
          >
            Save as Draft
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-lg font-medium">Campaign Details</h2>
        </div>

        <form [formGroup]="campaignForm" (ngSubmit)="onSubmit()" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Campaign Name -->
            <div class="col-span-2">
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
              <input 
                type="text" 
                id="name" 
                formControlName="name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Monthly Newsletter, Product Launch"
              >
              <div *ngIf="submitted && f['name'].errors" class="mt-1 text-sm text-red-500">
                <div *ngIf="f['name'].errors['required']">Campaign name is required</div>
              </div>
            </div>

            <!-- Subject Line -->
            <div class="col-span-2">
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
              <input 
                type="text" 
                id="subject" 
                formControlName="subject"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Don't miss our summer sale!"
              >
              <div *ngIf="submitted && f['subject'].errors" class="mt-1 text-sm text-red-500">
                <div *ngIf="f['subject'].errors['required']">Subject line is required</div>
              </div>
              <div class="mt-1 text-xs text-gray-500">
                A compelling subject line can improve open rates by up to 35%
              </div>
            </div>

            <!-- Sender Name -->
            <div>
              <label for="senderName" class="block text-sm font-medium text-gray-700 mb-1">Sender Name</label>
              <input 
                type="text" 
                id="senderName" 
                formControlName="senderName"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Good Mail Team"
              >
              <div *ngIf="submitted && f['senderName'].errors" class="mt-1 text-sm text-red-500">
                <div *ngIf="f['senderName'].errors['required']">Sender name is required</div>
              </div>
            </div>

            <!-- Sender Email -->
            <div>
              <label for="senderEmail" class="block text-sm font-medium text-gray-700 mb-1">Sender Email</label>
              <input 
                type="email" 
                id="senderEmail" 
                formControlName="senderEmail"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. team@goodmail.io"
              >
              <div *ngIf="submitted && f['senderEmail'].errors" class="mt-1 text-sm text-red-500">
                <div *ngIf="f['senderEmail'].errors['required']">Sender email is required</div>
                <div *ngIf="f['senderEmail'].errors['email']">Please enter a valid email address</div>
              </div>
            </div>

            <!-- Reply-To Email -->
            <div>
              <label for="replyToEmail" class="block text-sm font-medium text-gray-700 mb-1">Reply-To Email</label>
              <input 
                type="email" 
                id="replyToEmail" 
                formControlName="replyToEmail"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. support@goodmail.io"
              >
              <div *ngIf="submitted && f['replyToEmail'].errors" class="mt-1 text-sm text-red-500">
                <div *ngIf="f['replyToEmail'].errors['email']">Please enter a valid email address</div>
              </div>
            </div>

            <!-- Campaign Type -->
            <div>
              <label for="campaignType" class="block text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
              <select 
                id="campaignType" 
                formControlName="campaignType"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="regular">Regular Campaign</option>
                <option value="ab_test">A/B Test</option>
                <option value="automated">Automated</option>
                <option value="rss">RSS Campaign</option>
              </select>
            </div>

            <!-- Recipient Email -->
            <div class="col-span-2">
              <label for="recipientEmail" class="block text-sm font-medium text-gray-700 mb-1">Recipient Email</label>
              <input 
                type="email" 
                id="recipientEmail" 
                formControlName="recipientEmail"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. user@example.com"
              >
              <div *ngIf="submitted && f['recipientEmail'].errors" class="mt-1 text-sm text-red-500">
                <div *ngIf="f['recipientEmail'].errors['required']">Recipient email is required</div>
                <div *ngIf="f['recipientEmail'].errors['email']">Please enter a valid email address</div>
              </div>
            </div>
          </div>

          <div class="mt-8 border-t border-gray-200 pt-6">
            <h3 class="text-lg font-medium mb-4">Content</h3>
            
            <!-- Email Template -->
            <div class="mb-6">
              <label for="template" class="block text-sm font-medium text-gray-700 mb-1">Email Template</label>
              <select 
                id="template" 
                formControlName="template"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a template</option>
                <option value="blank">Blank Template</option>
                <option value="newsletter">Newsletter</option>
                <option value="product_announcement">Product Announcement</option>
                <option value="event_invitation">Event Invitation</option>
                <option value="welcome">Welcome Email</option>
              </select>
            </div>

            <!-- Email Content -->
            <div class="mb-6">
              <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Email Content</label>
              <div class="border border-gray-300 rounded-md overflow-hidden">
                <div class="bg-gray-50 border-b border-gray-300 px-3 py-2 flex items-center space-x-2">
                  <button type="button" class="p-1 text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                      <path d="M4 7V4h16v3"></path>
                      <path d="M9 20h6"></path>
                      <path d="M12 4v16"></path>
                    </svg>
                  </button>
                  <button type="button" class="p-1 text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                    </svg>
                  </button>
                  <button type="button" class="p-1 text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                  </button>
                  <button type="button" class="p-1 text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                  </button>
                  <button type="button" class="p-1 text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <textarea 
                  id="content" 
                  formControlName="content"
                  rows="10"
                  class="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your email content here or use the template editor..."
                ></textarea>
              </div>
              <div *ngIf="submitted && f['content'].errors" class="mt-1 text-sm text-red-500">
                <div *ngIf="f['content'].errors['required']">Email content is required</div>
              </div>
            </div>
          </div>

          <div class="mt-8 border-t border-gray-200 pt-6">
            <h3 class="text-lg font-medium mb-4">Schedule</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Send Time -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">When to send</label>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <input 
                      type="radio" 
                      id="sendNow" 
                      value="now" 
                      formControlName="sendTime"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    >
                    <label for="sendNow" class="ml-2 block text-sm text-gray-700">
                      Send immediately
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input 
                      type="radio" 
                      id="sendLater" 
                      value="scheduled" 
                      formControlName="sendTime"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    >
                    <label for="sendLater" class="ml-2 block text-sm text-gray-700">
                      Schedule for later
                    </label>
                  </div>
                </div>
              </div>

              <!-- Schedule Date/Time -->
              <div *ngIf="f['sendTime'].value === 'scheduled'">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="scheduleDate" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input 
                      type="date" 
                      id="scheduleDate" 
                      formControlName="scheduleDate"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                    <div *ngIf="submitted && f['sendTime'].value === 'scheduled' && f['scheduleDate'].errors" class="mt-1 text-sm text-red-500">
                      <div *ngIf="f['scheduleDate'].errors['required']">Date is required</div>
                    </div>
                  </div>
                  <div>
                    <label for="scheduleTime" class="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input 
                      type="time" 
                      id="scheduleTime" 
                      formControlName="scheduleTime"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                    <div *ngIf="submitted && f['sendTime'].value === 'scheduled' && f['scheduleTime'].errors" class="mt-1 text-sm text-red-500">
                      <div *ngIf="f['scheduleTime'].errors['required']">Time is required</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Time Zone -->
            <div class="mt-4" *ngIf="f['sendTime'].value === 'scheduled'">
              <label for="timezone" class="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
              <select 
                id="timezone" 
                formControlName="timezone"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
              </select>
            </div>
          </div>

          <div class="mt-8 border-t border-gray-200 pt-6 flex justify-between">
            <div>
              <button 
                type="button" 
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 mr-3"
                (click)="previewCampaign()"
              >
                Preview
              </button>
              <button 
                type="button" 
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                (click)="sendTestEmail()"
              >
                Send Test
              </button>
            </div>
            <div>
              <button 
                type="button" 
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 mr-3"
                (click)="navigateToDashboard()"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {{ f['sendTime'].value === 'now' ? 'Send Campaign' : 'Schedule Campaign' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class CampaignFormComponent implements OnInit {
  campaignForm!: FormGroup
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private campaignService: CampaignService,
  ) {}

  ngOnInit(): void {
    this.campaignForm = this.formBuilder.group({
      name: ["", Validators.required],
      subject: ["", Validators.required],
      senderName: ["Good Mail Team", Validators.required],
      senderEmail: ["team@goodmail.io", [Validators.required, Validators.email]],
      replyToEmail: ["support@goodmail.io", Validators.email],
      campaignType: ["regular"],
      template: [""],
      content: ["", Validators.required],
      recipientEmail: ["", [Validators.required, Validators.email]],
      sendTime: ["now"],
      scheduleDate: [""],
      scheduleTime: [""],
      timezone: ["UTC"],
    })

    // Add conditional validation for scheduled sending
    this.campaignForm.get("sendTime")?.valueChanges.subscribe((value) => {
      const scheduleDateControl = this.campaignForm.get("scheduleDate")
      const scheduleTimeControl = this.campaignForm.get("scheduleTime")

      if (value === "scheduled") {
        scheduleDateControl?.setValidators(Validators.required)
        scheduleTimeControl?.setValidators(Validators.required)
      } else {
        scheduleDateControl?.clearValidators()
        scheduleTimeControl?.clearValidators()
      }

      scheduleDateControl?.updateValueAndValidity()
      scheduleTimeControl?.updateValueAndValidity()
    })
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.campaignForm.controls
  }

  onSubmit(): void {
    this.submitted = true

    // Stop here if form is invalid
    if (this.campaignForm.invalid) {
      return
    }

    const campaignData = this.campaignForm.value

    if (campaignData.sendTime === "now") {
      this.campaignService.sendCampaign({ ...campaignData, status: 'SENT' }).subscribe({
        next: (response) => {
          const campaignId = response?.data?.id;
          if (campaignId) {
            this.campaignService.sendCampaignById(campaignId).subscribe({
              next: () => {
                alert("Campaign sent successfully!");
                this.router.navigate(["/dashboard"]);
              },
              error: (error) => {
                console.error("Error sending campaign:", error);
                alert("Failed to send campaign. Please try again.");
                this.router.navigate(["/dashboard"]);
              },
            });
          } else {
            alert("Campaign created, but could not send. No campaign ID returned.");
            this.router.navigate(["/dashboard"]);
          }
        },
        error: (error) => {
          console.error("Error creating campaign:", error);
          alert("Failed to create campaign. Please try again.");
          this.router.navigate(["/dashboard"]);
        },
      });
    } else {
      this.campaignService.scheduleCampaign({ ...campaignData, status: 'SCHEDULED' }).subscribe({
        next: () => {
          alert("Campaign scheduled successfully!")
          this.router.navigate(["/dashboard"])
        },
        error: (error) => {
          console.error("Error scheduling campaign:", error)
          alert("Failed to schedule campaign. Please try again.")
          this.router.navigate(["/dashboard"])
        },
      })
    }
  }

  saveAsDraft(): void {
    const campaignData = this.campaignForm.value

    this.campaignService.saveDraft(campaignData).subscribe({
      next: () => {
        alert("Campaign saved as draft!")
        this.router.navigate(["/dashboard"])
      },
      error: (error) => {
        console.error("Error saving draft:", error)
        alert("Failed to save draft. Please try again.")
      },
    })
  }

  previewCampaign(): void {
    alert("Preview functionality would open a modal with the email preview")
  }

  sendTestEmail(): void {
    alert("Test email would be sent to your address")
  }

  navigateToDashboard(): void {
    this.router.navigate(["/dashboard"])
  }
}
