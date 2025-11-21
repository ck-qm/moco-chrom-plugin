// Background service worker for MOCO Time Tracker

// Timer state
let timerState = {
  isRunning: false,
  startTime: null,
  projectId: null,
  taskId: null,
  projectName: '',
  taskName: '',
  note: ''
};

// Initialize on install/update
chrome.runtime.onInstalled.addListener(() => {
  console.log('MOCO Time Tracker installed/updated');
  loadTimerState();
});

// Initialize on startup
chrome.runtime.onStartup.addListener(() => {
  console.log('Browser started, loading timer state');
  loadTimerState();
});

// Load timer state from storage
async function loadTimerState() {
  try {
    const result = await chrome.storage.local.get(['timerState']);
    if (result.timerState) {
      timerState = result.timerState;
      updateBadge();
    }
  } catch (error) {
    console.error('Error loading timer state:', error);
  }
}

// Save timer state to storage
async function saveTimerState() {
  try {
    await chrome.storage.local.set({ timerState });
  } catch (error) {
    console.error('Error saving timer state:', error);
  }
}

// Start timer
async function startTimer(projectId, taskId, projectName, taskName, note = '') {
  timerState = {
    isRunning: true,
    startTime: Date.now(),
    projectId,
    taskId,
    projectName,
    taskName,
    note
  };
  
  await saveTimerState();
  updateBadge();
  
  return timerState;
}

// Stop timer and return elapsed time
async function stopTimer() {
  if (!timerState.isRunning) {
    return null;
  }
  
  const elapsedMs = Date.now() - timerState.startTime;
  const elapsedHours = Math.round((elapsedMs / (1000 * 60 * 60)) * 4) / 4; // Round to nearest 0.25
  
  const result = {
    projectId: timerState.projectId,
    taskId: timerState.taskId,
    projectName: timerState.projectName,
    taskName: timerState.taskName,
    note: timerState.note,
    hours: elapsedHours,
    startTime: timerState.startTime
  };
  
  // Reset timer
  timerState = {
    isRunning: false,
    startTime: null,
    projectId: null,
    taskId: null,
    projectName: '',
    taskName: '',
    note: ''
  };
  
  await saveTimerState();
  updateBadge();
  
  return result;
}

// Get current timer state
function getTimerState() {
  if (!timerState.isRunning) {
    return timerState;
  }
  
  const elapsedMs = Date.now() - timerState.startTime;
  const elapsedHours = elapsedMs / (1000 * 60 * 60);
  
  return {
    ...timerState,
    elapsedHours: Math.round(elapsedHours * 100) / 100,
    elapsedMs
  };
}

// Update badge to show timer status
function updateBadge() {
  if (timerState.isRunning) {
    chrome.action.setBadgeText({ text: '▶' });
    chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' }); // Green
    chrome.action.setTitle({ title: `Timer läuft: ${timerState.projectName}` });
  } else {
    chrome.action.setBadgeText({ text: '' });
    chrome.action.setTitle({ title: 'MOCO Time Tracker' });
  }
}

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    try {
      switch (request.action) {
        case 'startTimer':
          const started = await startTimer(
            request.projectId,
            request.taskId,
            request.projectName,
            request.taskName,
            request.note
          );
          sendResponse({ success: true, state: started });
          break;
          
        case 'stopTimer':
          const result = await stopTimer();
          sendResponse({ success: true, result });
          break;
          
        case 'getTimerState':
          const state = getTimerState();
          sendResponse({ success: true, state });
          break;
          
        default:
          sendResponse({ success: false, error: 'Unknown action' });
      }
    } catch (error) {
      console.error('Error handling message:', error);
      sendResponse({ success: false, error: error.message });
    }
  })();
  
  return true; // Keep message channel open for async response
});

// Update badge every minute if timer is running
chrome.alarms.create('updateBadge', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'updateBadge' && timerState.isRunning) {
    updateBadge();
  }
});
