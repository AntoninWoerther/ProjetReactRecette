import { useEffect, useState } from 'react';
import { getSiteSettings } from '../api/siteSettings.js';

export default function useSiteSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSiteSettings();
        setSettings(data);
      } catch {
        setError('Impossible de charger les paramètres du site.');
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  return { settings, loading, error };
}