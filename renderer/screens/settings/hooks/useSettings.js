import { useEffect, useCallback, useState } from "../../../core/index.js";

/**
 * Hook to manage settings state
 * @returns {[import('../../../../main/settings/settingsapi.js').LogServerSettings, (newSettings: import('../../../../main/settings/settingsapi.js').LogServerSettings) => void]}
 */
export const useSettings = () => {
  /**
   * @type {[import('../../../../main/settings/settingsapi.js').LogServerSettings, import('react').SetStateAction<import('../../../../main/settings/settingsapi.js').LogServerSettings>]}
   */
  const [settings, setSettings] = useState({});

  const updateSettings = useCallback((newSettings) => {
    window.SettingsAPI.updateSettings(newSettings);
  }, []);

  useEffect(() => {
    window.SettingsAPI.getSettings().then((settings) => {
      setSettings(settings);
    });

    window.SettingsAPI.onSettingsUpdated((newSettings) => {
      setSettings(newSettings);
    });
  }, []);

  return [settings, updateSettings];
};
