// Popup script for MOCO time tracking

let api = null;
let projects = [];
let tasks = [];
let currentUserId = null;

document.addEventListener('DOMContentLoaded', async () => {
  await init();
});

async function init() {
  // Set up settings button (only once)
  const openSettingsBtn = document.getElementById('openSettingsBtn');
  if (openSettingsBtn && !openSettingsBtn.hasAttribute('data-listener')) {
    openSettingsBtn.setAttribute('data-listener', 'true');
    openSettingsBtn.addEventListener('click', () => {
      chrome.runtime.openOptionsPage();
    });
  }

  // Check if configured
  const isConfigured = await StorageHelper.isConfigured();
  
  if (!isConfigured) {
    showNotConfigured();
    return;
  }

  // Initialize API
  const config = await StorageHelper.getConfig();
  api = new MocoAPI(config.domain, config.apiKey);

  try {
    // Get current user
    const user = await api.getCurrentUser();
    currentUserId = user.id;

    // Initialize UI
    await initializeForm();
    await loadTodaysEntries();
    
    // Only show main content after successful initialization
    showMainContent();
    setupEventListeners();
  } catch (error) {
    showError('Fehler beim Laden: ' + error.message);
    showNotConfigured(); // Revert to config screen
  }
}

function showNotConfigured() {
  document.getElementById('notConfigured').classList.remove('hidden');
  document.getElementById('mainContent').classList.add('hidden');
}

function showMainContent() {
  document.getElementById('notConfigured').classList.add('hidden');
  document.getElementById('mainContent').classList.remove('hidden');
}

async function initializeForm() {
  // Set today's date as default
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('date').value = today;

  // Load projects
  try {
    const assignedProjects = await api.getProjects();
    projects = assignedProjects.filter(p => p.active);
    
    const projectSelect = document.getElementById('project');
    projectSelect.innerHTML = '<option value="">Projekt auswählen...</option>';
    
    projects.forEach(project => {
      const option = document.createElement('option');
      option.value = project.id;
      option.textContent = project.name;
      projectSelect.appendChild(option);
    });
  } catch (error) {
    showError('Fehler beim Laden der Projekte: ' + error.message);
  }
}

function setupEventListeners() {
  // Settings button
  document.getElementById('settingsBtn').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  // Project selection - load tasks
  document.getElementById('project').addEventListener('change', async (e) => {
    const projectId = e.target.value;
    const taskSelect = document.getElementById('task');
    
    taskSelect.innerHTML = '<option value="">Aufgabe auswählen...</option>';
    taskSelect.disabled = !projectId;

    if (projectId) {
      try {
        const project = projects.find(p => p.id === parseInt(projectId));
        if (project && project.tasks) {
          tasks = project.tasks.filter(t => t.active);
          
          tasks.forEach(task => {
            const option = document.createElement('option');
            option.value = task.id;
            option.textContent = task.name;
            taskSelect.appendChild(option);
          });
        }
      } catch (error) {
        showError('Fehler beim Laden der Aufgaben: ' + error.message);
      }
    }
  });

  // Form submission
  document.getElementById('timeEntryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await submitTimeEntry();
  });

  // Refresh button
  document.getElementById('refreshBtn').addEventListener('click', async () => {
    await loadTodaysEntries();
  });
}

async function submitTimeEntry() {
  const submitBtn = document.getElementById('submitBtn');
  const projectId = parseInt(document.getElementById('project').value);
  const taskId = parseInt(document.getElementById('task').value);
  const date = document.getElementById('date').value;
  const hours = parseFloat(document.getElementById('hours').value);
  const note = document.getElementById('note').value;

  if (isNaN(projectId) || isNaN(taskId) || !date || isNaN(hours) || hours <= 0) {
    showError('Bitte füllen Sie alle Pflichtfelder aus.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Erstelle...';

  try {
    const activityData = {
      date: date,
      hours: hours,
      project_id: projectId,
      task_id: taskId,
      description: note || ''
    };

    await api.createActivity(activityData);
    
    showSuccess('Zeiterfassung erfolgreich erstellt!');
    
    // Reset form
    document.getElementById('note').value = '';
    document.getElementById('hours').value = '1';
    
    // Reload entries
    await loadTodaysEntries();
  } catch (error) {
    showError('Fehler beim Erstellen: ' + error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Zeiterfassung erstellen';
  }
}

async function loadTodaysEntries() {
  const entriesList = document.getElementById('entriesList');
  entriesList.innerHTML = '<p class="loading">Lade Einträge...</p>';

  try {
    const today = new Date().toISOString().split('T')[0];
    const activities = await api.getActivities({ 
      from: today, 
      to: today,
      user_id: currentUserId
    });

    if (activities.length === 0) {
      entriesList.innerHTML = '<p class="empty-state">Keine Einträge für heute</p>';
      return;
    }

    entriesList.innerHTML = '';
    activities.forEach(activity => {
      const entryDiv = document.createElement('div');
      entryDiv.className = 'entry-item';
      
      const hours = (activity.hours || 0).toFixed(2);
      const projectName = activity.project?.name || 'Unbekanntes Projekt';
      const taskName = activity.task?.name || 'Unbekannte Aufgabe';
      
      // Build DOM safely to avoid XSS
      const projectDiv = document.createElement('div');
      projectDiv.className = 'project';
      projectDiv.textContent = projectName;
      entryDiv.appendChild(projectDiv);

      const taskDiv = document.createElement('div');
      taskDiv.className = 'task';
      taskDiv.textContent = taskName;
      entryDiv.appendChild(taskDiv);

      const detailsDiv = document.createElement('div');
      detailsDiv.className = 'details';

      const hoursSpan = document.createElement('span');
      hoursSpan.textContent = `${hours} Stunden`;
      detailsDiv.appendChild(hoursSpan);

      const timeSpan = document.createElement('span');
      timeSpan.textContent = formatTime(activity.created_at);
      detailsDiv.appendChild(timeSpan);

      entryDiv.appendChild(detailsDiv);

      if (activity.description) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.textContent = activity.description;
        entryDiv.appendChild(noteDiv);
      }
      
      entriesList.appendChild(entryDiv);
    });
  } catch (error) {
    entriesList.innerHTML = '<p class="empty-state">Fehler beim Laden der Einträge</p>';
    console.error('Error loading entries:', error);
  }
}

function formatTime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

const MESSAGE_TIMEOUT = 4000;

function showError(message, timeout = MESSAGE_TIMEOUT) {
  const errorDiv = document.getElementById('errorMessage');
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
  
  setTimeout(() => {
    errorDiv.classList.add('hidden');
  }, timeout);
}

function showSuccess(message, timeout = MESSAGE_TIMEOUT) {
  const successDiv = document.getElementById('successMessage');
  successDiv.textContent = message;
  successDiv.classList.remove('hidden');
  
  setTimeout(() => {
    successDiv.classList.add('hidden');
  }, timeout);
}
