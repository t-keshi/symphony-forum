import { useEffect, useState } from 'react';
import { API_KEY } from '../../containers/entities/env';

const loadGoogleMapScript = (): void => {
  const googleMapBaseUrl = 'https://maps.googleapis.com/maps/api/js';
  const apiKeyParam = `?key=${API_KEY}`;
  const languageQueryParam = '&language=ja';
  const googleMapScriptUrl = `${googleMapBaseUrl}${apiKeyParam}&libraries=places${languageQueryParam}`;
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', 'google-map');
  script.src = googleMapScriptUrl;
  document.body.appendChild(script);
};

export const useGoogleMapScript = (): boolean => {
  const [isGoogleMapLoaded, setIsGoogleMapLoaded] = useState<boolean>(false);
  useEffect(() => {
    loadGoogleMapScript();
    if (window.google && window.google.maps && isGoogleMapLoaded === false) {
      setIsGoogleMapLoaded(true);
    }
  }, [isGoogleMapLoaded]);

  return isGoogleMapLoaded;
};
