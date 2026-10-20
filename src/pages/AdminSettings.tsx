
import { useEffect, useState } from "react";

function AdminSettings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedSettings = localStorage.getItem("employpro-settings");

    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setNotifications(settings.notifications ?? true);
        setDarkMode(settings.darkMode ?? false);
      } catch {
        localStorage.removeItem("employpro-settings");
      }
    }
  }, []);

  function saveSettings() {
    localStorage.setItem(
      "employpro-settings",
      JSON.stringify({ notifications, darkMode })
    );

    setMessage("Settings saved successfully!");
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">EMPLOYPRO / SETTINGS</p>
          <h1>Admin Settings</h1>
          <p>Manage your workspace preferences.</p>
        </div>
      </header>

      <section className="admin-info-card settings-card">
        <h2>Preferences</h2>

        <label className="settings-row">
          <span>
            <strong>Email Notifications</strong>
            <small>Save your notification preference.</small>
          </span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => {
              setNotifications(e.target.checked);
              setMessage("");
            }}
          />
        </label>

        <label className="settings-row">
          <span>
            <strong>Dark Mode Preference</strong>
            <small>Save your preferred display setting.</small>
          </span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => {
              setDarkMode(e.target.checked);
              setMessage("");
            }}
          />
        </label>

        <button
          className="settings-save-button"
          type="button"
          onClick={saveSettings}
        >
          Save Settings
        </button>

        {message && <p role="status">{message}</p>}
      </section>
    </main>
  );
}

export default AdminSettings;
