// Options page script for managing MOCO API credentials

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('settingsForm');
  const domainInput = document.getElementById('domain');
  const apiKeyInput = document.getElementById('apiKey');
  const toggleApiKeyBtn = document.getElementById('toggleApiKey');
  const saveBtn = document.getElementById('saveBtn');
  const testBtn = document.getElementById('testBtn');
  const testResult = document.getElementById('testResult');
  const message = document.getElementById('message');

  // Load existing configuration
  const config = await StorageHelper.getConfig();
  if (config.domain) {
    domainInput.value = config.domain;
  }
  if (config.apiKey) {
    apiKeyInput.value = config.apiKey;
  }

  // Toggle API key visibility
  toggleApiKeyBtn.addEventListener('click', () => {
    if (apiKeyInput.type === 'password') {
      apiKeyInput.type = 'text';
      toggleApiKeyBtn.textContent = '🙈 Verbergen';
    } else {
      apiKeyInput.type = 'password';
      toggleApiKeyBtn.textContent = '👁️ Anzeigen';
    }
  });

  // Save configuration
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const domain = domainInput.value.trim();
    const apiKey = apiKeyInput.value.trim();

    if (!domain || !apiKey) {
      showMessage('Bitte füllen Sie alle Felder aus.', 'error');
      return;
    }

    saveBtn.disabled = true;
    saveBtn.textContent = 'Speichere...';

    try {
      await StorageHelper.saveConfig(domain, apiKey);
      showMessage('Einstellungen erfolgreich gespeichert!', 'success');
      saveBtn.textContent = 'Gespeichert ✓';
      setTimeout(() => {
        saveBtn.textContent = 'Speichern';
        saveBtn.disabled = false;
      }, 2000);
    } catch (error) {
      showMessage('Fehler beim Speichern: ' + error.message, 'error');
      saveBtn.textContent = 'Speichern';
      saveBtn.disabled = false;
    }
  });

  // Test connection
  testBtn.addEventListener('click', async () => {
    const domain = domainInput.value.trim();
    const apiKey = apiKeyInput.value.trim();

    if (!domain || !apiKey) {
      showTestResult('Bitte füllen Sie alle Felder aus.', false);
      return;
    }

    testBtn.disabled = true;
    testBtn.textContent = 'Teste...';
    testResult.classList.remove('hidden', 'success', 'error');

    try {
      const api = new MocoAPI(domain, apiKey);
      const result = await api.testConnection();
      
      if (result.success) {
        const user = await api.getCurrentUser();
        showTestResult(
          `✓ Verbindung erfolgreich! Angemeldet als: ${user.firstname} ${user.lastname}`,
          true
        );
      } else {
        showTestResult(`✗ Verbindung fehlgeschlagen: ${result.message}`, false);
      }
    } catch (error) {
      showTestResult(`✗ Fehler: ${error.message}`, false);
    } finally {
      testBtn.disabled = false;
      testBtn.textContent = 'Verbindung testen';
    }
  });

  function showTestResult(text, success) {
    testResult.textContent = text;
    testResult.classList.remove('hidden');
    testResult.classList.add(success ? 'success' : 'error');
  }

  function showMessage(text, type) {
    message.textContent = text;
    message.classList.remove('hidden', 'success', 'error');
    message.classList.add(type);
    
    setTimeout(() => {
      message.classList.add('hidden');
    }, 3000);
  }
});
