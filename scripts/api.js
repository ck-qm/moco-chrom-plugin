// MOCO API integration module

class MocoAPI {
  constructor(domain, apiKey) {
    this.domain = domain;
    this.apiKey = apiKey;
    this.baseUrl = `https://${domain}.mocoapp.com/api/v1`;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Token token=${this.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`MOCO API Error: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Test API connection
  async testConnection() {
    try {
      await this.request('/users/me');
      return { success: true, message: 'Verbindung erfolgreich!' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Get current user
  async getCurrentUser() {
    return await this.request('/users/me');
  }

  // Get activities (time entries)
  async getActivities(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/activities?${queryString}` : '/activities';
    return await this.request(endpoint);
  }

  // Create a new activity
  async createActivity(activityData) {
    return await this.request('/activities', {
      method: 'POST',
      body: JSON.stringify({ activity: activityData })
    });
  }

  // Get projects
  async getProjects() {
    return await this.request('/projects');
  }

  // Get tasks for a project
  async getTasks(projectId) {
    return await this.request(`/projects/${projectId}/tasks`);
  }

  // Get all tasks
  async getAllTasks() {
    return await this.request('/projects/assigned');
  }
}

// Storage helper functions
const StorageHelper = {
  async getConfig() {
    return new Promise((resolve) => {
      chrome.storage.local.get(['domain', 'apiKey'], (result) => {
        resolve({
          domain: result.domain || null,
          apiKey: result.apiKey || null
        });
      });
    });
  },

  async saveConfig(domain, apiKey) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ domain, apiKey }, () => {
        resolve();
      });
    });
  },

  async clearConfig() {
    return new Promise((resolve) => {
      chrome.storage.local.remove(['domain', 'apiKey'], () => {
        resolve();
      });
    });
  },

  async isConfigured() {
    const config = await this.getConfig();
    return config.domain && config.apiKey;
  }
};

// Make available for other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MocoAPI, StorageHelper };
}
