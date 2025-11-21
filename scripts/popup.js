// Popup script for MOCO time tracking

let api = null;
let projects = [];
let tasks = [];
let currentUserId = null;
let timerInterval = null;
let todaysActivities = [];

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
    await updateTimerDisplay();
    
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

  // Timer buttons
  const startTimerBtn = document.getElementById('startTimerBtn');
  if (startTimerBtn) {
    startTimerBtn.addEventListener('click', async () => {
      await startTimer();
    });
  }

  const stopTimerBtn = document.getElementById('stopTimerBtn');
  if (stopTimerBtn) {
    stopTimerBtn.addEventListener('click', async () => {
      await stopTimer();
    });
  }

  // Project/task selection changes - show/hide start timer button
  const projectSelect = document.getElementById('project');
  const taskSelect = document.getElementById('task');
  
  const updateStartTimerButton = () => {
    const projectId = parseInt(projectSelect.value);
    const taskId = parseInt(taskSelect.value);
    const startBtn = document.getElementById('startTimerBtn');
    
    if (!isNaN(projectId) && !isNaN(taskId) && startBtn) {
      startBtn.classList.remove('hidden');
    } else if (startBtn) {
      startBtn.classList.add('hidden');
    }
  };
  
  taskSelect.addEventListener('change', updateStartTimerButton);
}

// Timer Functions
async function startTimer() {
  const projectId = parseInt(document.getElementById('project').value);
  const taskId = parseInt(document.getElementById('task').value);
  const note = document.getElementById('note').value;

  if (isNaN(projectId) || isNaN(taskId)) {
    showError('Bitte wählen Sie Projekt und Aufgabe aus.');
    return;
  }

  const project = projects.find(p => p.id === projectId);
  const task = tasks.find(t => t.id === taskId);

  try {
    const response = await chrome.runtime.sendMessage({
      action: 'startTimer',
      projectId,
      taskId,
      projectName: project?.name || 'Unbekannt',
      taskName: task?.name || 'Unbekannt',
      note
    });

    if (response.success) {
      showSuccess('Timer gestartet!', 2000);
      updateTimerDisplay();
    } else {
      showError('Fehler beim Starten: ' + response.error);
    }
  } catch (error) {
    showError('Fehler beim Starten: ' + error.message);
  }
}

async function stopTimer() {
  try {
    const response = await chrome.runtime.sendMessage({
      action: 'stopTimer'
    });

    if (response.success && response.result) {
      const result = response.result;
      
      // Check daily hours and warn if > 10
      await checkDailyHours(result.hours);
      
      // Create the activity
      const activityData = {
        date: new Date().toISOString().split('T')[0],
        hours: result.hours,
        project_id: result.projectId,
        task_id: result.taskId,
        description: result.note || ''
      };

      await api.createActivity(activityData);
      
      showSuccess(`Timer gestoppt! ${result.hours.toFixed(2)} Stunden erfasst.`);
      await loadTodaysEntries();
      updateTimerDisplay();
    } else {
      showError('Fehler beim Stoppen: ' + response.error);
    }
  } catch (error) {
    showError('Fehler beim Stoppen: ' + error.message);
  }
}

async function updateTimerDisplay() {
  try {
    const response = await chrome.runtime.sendMessage({
      action: 'getTimerState'
    });

    if (response.success) {
      const state = response.state;
      
      if (state.isRunning) {
        document.getElementById('timerRunning').classList.remove('hidden');
        document.getElementById('timerStopped').classList.add('hidden');
        
        document.getElementById('timerProject').textContent = state.projectName;
        document.getElementById('timerTask').textContent = state.taskName;
        
        // Start interval to update elapsed time
        if (!timerInterval) {
          timerInterval = setInterval(updateElapsedTime, 1000);
        }
        updateElapsedTime();
      } else {
        document.getElementById('timerRunning').classList.add('hidden');
        document.getElementById('timerStopped').classList.remove('hidden');
        
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
      }
    }
  } catch (error) {
    console.error('Error updating timer display:', error);
  }
}

async function updateElapsedTime() {
  try {
    const response = await chrome.runtime.sendMessage({
      action: 'getTimerState'
    });

    if (response.success && response.state.isRunning) {
      const hours = Math.floor(response.state.elapsedHours);
      const minutes = Math.floor((response.state.elapsedHours % 1) * 60);
      
      document.getElementById('timerElapsed').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
  } catch (error) {
    console.error('Error updating elapsed time:', error);
  }
}

async function checkDailyHours(additionalHours) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const activities = await api.getActivities({ 
      from: today, 
      to: today,
      user_id: currentUserId
    });

    const totalHours = activities.reduce((sum, activity) => sum + (activity.hours || 0), 0) + additionalHours;

    if (totalHours > 10) {
      showWarningModal(totalHours);
    }
  } catch (error) {
    console.error('Error checking daily hours:', error);
  }
}

function showWarningModal(totalHours) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal">
      <h3>⚠️ Hohe Arbeitszeit</h3>
      <p>Sie haben heute bereits <strong>${totalHours.toFixed(2)} Stunden</strong> erfasst.</p>
      <p>Das ist mehr als üblich. Bitte achten Sie auf ausreichend Pausen und Erholung! 🌟</p>
      <button id="closeWarningBtn">Verstanden</button>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('closeWarningBtn').addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
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

    // Save for later reference
    todaysActivities = activities;

    if (activities.length === 0) {
      entriesList.innerHTML = '<p class="empty-state">Keine Einträge für heute</p>';
      return;
    }

    entriesList.innerHTML = '';
    activities.forEach(activity => {
      const entryDiv = document.createElement('div');
      entryDiv.className = 'entry-item';
      entryDiv.setAttribute('data-activity-id', activity.id);
      
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

      // Add adjustment buttons
      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'entry-actions';

      const minusBtn = document.createElement('button');
      minusBtn.className = 'adjust-btn minus';
      minusBtn.textContent = '− 15 Min';
      minusBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        await adjustActivity(activity.id, -0.25);
      });

      const plusBtn = document.createElement('button');
      plusBtn.className = 'adjust-btn plus';
      plusBtn.textContent = '+ 15 Min';
      plusBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        await adjustActivity(activity.id, 0.25);
      });

      actionsDiv.appendChild(minusBtn);
      actionsDiv.appendChild(plusBtn);
      entryDiv.appendChild(actionsDiv);
      
      entriesList.appendChild(entryDiv);
    });
  } catch (error) {
    entriesList.innerHTML = '<p class="empty-state">Fehler beim Laden der Einträge</p>';
    console.error('Error loading entries:', error);
  }
}

async function adjustActivity(activityId, adjustment) {
  try {
    const activity = todaysActivities.find(a => a.id === activityId);
    if (!activity) {
      showError('Eintrag nicht gefunden');
      return;
    }

    const newHours = Math.max(0.25, (activity.hours || 0) + adjustment);

    // Update via API
    await api.updateActivity(activityId, { hours: newHours });
    
    showSuccess(`Zeit angepasst: ${newHours.toFixed(2)} Stunden`, 2000);
    await loadTodaysEntries();
  } catch (error) {
    showError('Fehler beim Anpassen: ' + error.message);
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
