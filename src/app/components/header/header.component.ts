import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <h1 class="text-lg font-medium">Welcome, Marc</h1>
      
      <div class="flex items-center space-x-4">
        <div class="relative">
          <input 
            type="text" 
            placeholder="Search here" 
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
          >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-gray-400 absolute left-3 top-2.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        
        <button class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
        
        <button class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </button>
        
        <div class="flex items-center">
          <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium">
            MJ
          </div>
          <div class="ml-2">
            <div class="text-sm font-medium">Marc Jacob</div>
            <div class="text-xs text-gray-500">marc&#64;goodmail.io</div>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {}
