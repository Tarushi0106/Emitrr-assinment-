import { useRef, useCallback } from 'react';

export const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = (): AudioContext => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const playBeep = useCallback((frequency: number, duration: number, volume: number = 0.3) => {
    const audioContext = getAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.value = volume;
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    oscillator.start();

    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    oscillator.stop(audioContext.currentTime + duration);
  }, []);

  const playClick = useCallback(() => {
    playBeep(800, 0.1, 0.2);
  }, [playBeep]);

  const playFlash = useCallback(() => {
    playBeep(600, 0.3, 0.1);
  }, [playBeep]);

  const playSuccess = useCallback(() => {
    const audioContext = getAudioContext();
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.value = 0.3;
    oscillator1.frequency.value = 523.25; // C5
    oscillator2.frequency.value = 659.25; // E5
    oscillator1.type = 'sine';
    oscillator2.type = 'sine';

    oscillator1.start();
    oscillator2.start();

    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
    oscillator1.stop(audioContext.currentTime + 0.5);
    oscillator2.stop(audioContext.currentTime + 0.5);
  }, []);

  const playError = useCallback(() => {
    const audioContext = getAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Error sound: descending tone
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
    
    gainNode.gain.value = 0.3;
    oscillator.type = 'sawtooth';

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
    oscillator.stop(audioContext.currentTime + 0.3);
  }, []);

  const playLevelUp = useCallback(() => {
    const audioContext = getAudioContext();
    const times = [0, 0.1, 0.2, 0.3];
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    times.forEach((time, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequencies[index];
      gainNode.gain.value = 0.2;
      oscillator.type = 'sine';

      oscillator.start(audioContext.currentTime + time);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + time + 0.2);
      oscillator.stop(audioContext.currentTime + time + 0.2);
    });
  }, []);

  return {
    playClick,
    playFlash,
    playSuccess,
    playError,
    playLevelUp
  };
};