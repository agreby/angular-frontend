import { Injectable } from "@angular/core"
import { type Observable, of } from "rxjs"
import { delay } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class CampaignService {
  private campaigns: any[] = [
    {
      id: "camp_1234567890",
      name: "Monthly Newsletter - May 2023",
      subject: "Your May Newsletter: Latest Updates and Offers",
      senderName: "Good Mail Team",
      senderEmail: "team@goodmail.io",
      replyToEmail: "support@goodmail.io",
      campaignType: "regular",
      template: "newsletter",
      content: "<h1>May Newsletter</h1><p>Here are our latest updates...</p>",
      recipientList: "all_subscribers",
      segment: "",
      status: "sent",
      sentAt: "2023-05-15T10:30:00Z",
      stats: {
        sent: 5189,
        delivered: 5120,
        opened: 2150,
        clicked: 843,
        unsubscribed: 12,
        bounced: 69,
        links: [
          {
            url: "https://example.com/product/new",
            text: "View New Products",
            clicks: 423,
            uniqueClicks: 380,
          },
          {
            url: "https://example.com/sale",
            text: "Shop the Sale",
            clicks: 312,
            uniqueClicks: 285,
          },
          {
            url: "https://example.com/blog/tips",
            text: "Read Our Latest Tips",
            clicks: 156,
            uniqueClicks: 142,
          },
          {
            url: "https://example.com/unsubscribe",
            text: "Unsubscribe",
            clicks: 36,
            uniqueClicks: 36,
          },
        ],
        recipients: this.generateRecipients(50),
      },
    },
    {
      id: "camp_0987654321",
      name: "Product Launch - New Summer Collection",
      subject: "Introducing Our New Summer Collection! 🌞",
      senderName: "Good Mail Team",
      senderEmail: "team@goodmail.io",
      replyToEmail: "support@goodmail.io",
      campaignType: "regular",
      template: "product_announcement",
      content: "<h1>Summer Collection</h1><p>Check out our new summer items...</p>",
      recipientList: "all_subscribers",
      segment: "",
      status: "sent",
      sentAt: "2023-06-01T09:00:00Z",
      stats: {
        sent: 4950,
        delivered: 4900,
        opened: 2352,
        clicked: 1176,
        unsubscribed: 8,
        bounced: 50,
        links: [
          {
            url: "https://example.com/summer-collection",
            text: "Shop Summer Collection",
            clicks: 876,
            uniqueClicks: 780,
          },
          {
            url: "https://example.com/sale/summer",
            text: "Summer Sale Items",
            clicks: 342,
            uniqueClicks: 310,
          },
          {
            url: "https://example.com/blog/summer-trends",
            text: "Summer Fashion Trends",
            clicks: 124,
            uniqueClicks: 110,
          },
          {
            url: "https://example.com/unsubscribe",
            text: "Unsubscribe",
            clicks: 24,
            uniqueClicks: 24,
          },
        ],
        recipients: this.generateRecipients(50),
      },
    },
  ]

  constructor() {}

  getCampaigns(): Observable<any[]> {
    return of(this.campaigns).pipe(delay(500))
  }

  getCampaignById(id: string): Observable<any> {
    const campaign = this.campaigns.find((c) => c.id === id) || this.campaigns[0]
    return of(campaign).pipe(delay(500))
  }

  sendCampaign(campaign: any): Observable<any> {
    // Simulate API call
    const newCampaign = {
      ...campaign,
      id: this.generateId(),
      status: "sent",
      sentAt: new Date().toISOString(),
      stats: {
        sent: Math.floor(Math.random() * 5000) + 1000,
        delivered: Math.floor(Math.random() * 4500) + 900,
        opened: Math.floor(Math.random() * 2000) + 500,
        clicked: Math.floor(Math.random() * 1000) + 100,
        unsubscribed: Math.floor(Math.random() * 20),
        bounced: Math.floor(Math.random() * 50),
        links: this.generateLinks(),
        recipients: this.generateRecipients(50),
      },
    }

    this.campaigns.push(newCampaign)
    return of(newCampaign).pipe(delay(1000))
  }

  scheduleCampaign(campaign: any): Observable<any> {
    // Simulate API call
    const newCampaign = {
      ...campaign,
      id: this.generateId(),
      status: "scheduled",
      scheduledFor: new Date(`${campaign.scheduleDate}T${campaign.scheduleTime}`).toISOString(),
      stats: {
        recipients: this.getRecipientsCount(campaign.recipientList, campaign.segment),
      },
    }

    this.campaigns.push(newCampaign)
    return of(newCampaign).pipe(delay(1000))
  }

  saveDraft(campaign: any): Observable<any> {
    // Simulate API call
    const newCampaign = {
      ...campaign,
      id: this.generateId(),
      status: "draft",
      updatedAt: new Date().toISOString(),
    }

    this.campaigns.push(newCampaign)
    return of(newCampaign).pipe(delay(1000))
  }

  private generateId(): string {
    return "camp_" + Math.random().toString(36).substring(2, 15)
  }

  private getRecipientsCount(list: string, segment: string): number {
    // Mock recipient counts based on list and segment
    const listCounts: { [key: string]: number } = {
      all_subscribers: 5189,
      active_users: 3241,
      new_customers: 842,
      newsletter: 4102,
    }

    const segmentPercentages: { [key: string]: number } = {
      high_engagement: 0.24,
      recent_purchase: 0.11,
      cart_abandoners: 0.06,
    }

    let count = listCounts[list] || 0

    if (segment && segmentPercentages[segment]) {
      count = Math.floor(count * segmentPercentages[segment])
    }

    return count
  }

  private generateLinks(): any[] {
    const links = [
      {
        url: "https://example.com/product/featured",
        text: "View Featured Products",
        clicks: Math.floor(Math.random() * 500) + 100,
      },
      {
        url: "https://example.com/sale/special",
        text: "Special Offers",
        clicks: Math.floor(Math.random() * 400) + 50,
      },
      {
        url: "https://example.com/blog/latest",
        text: "Read Our Latest Blog",
        clicks: Math.floor(Math.random() * 200) + 50,
      },
      {
        url: "https://example.com/unsubscribe",
        text: "Unsubscribe",
        clicks: Math.floor(Math.random() * 30) + 5,
      },
    ]

    return links.map((link) => ({
      ...link,
      uniqueClicks: Math.floor(link.clicks * 0.9), // Assume 90% of clicks are unique
    }))
  }

  private generateRecipients(count: number): any[] {
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com"]
    const firstNames = ["John", "Jane", "Michael", "Emily", "David", "Sarah", "Robert", "Lisa", "William", "Jessica"]
    const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"]
    const statuses = ["opened", "clicked", "delivered", "bounced"]
    const locations = ["United States", "United Kingdom", "Canada", "Germany", "France", "Australia", "India", "Brazil"]
    const devices = ["iPhone", "Android", "Desktop Chrome", "Desktop Safari", "Desktop Firefox", "iPad", "Outlook"]

    const recipients = []

    for (let i = 0; i < count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const domain = domains[Math.floor(Math.random() * domains.length)]
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const location = locations[Math.floor(Math.random() * locations.length)]
      const device = devices[Math.floor(Math.random() * devices.length)]
      const opens = status === "opened" || status === "clicked" ? Math.floor(Math.random() * 5) + 1 : 0
      const clicks = status === "clicked" ? Math.floor(Math.random() * 3) + 1 : 0

      recipients.push({
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
        name: `${firstName} ${lastName}`,
        status,
        opens,
        clicks,
        location,
        device,
        firstOpenedAt: opens > 0 ? new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString() : null,
      })
    }

    return recipients
  }
}
