import React from 'react';
import type { Theme } from '../types/game';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  onSoundToggle?: () => void;
  isSoundEnabled?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  theme, 
  onToggle,
  onSoundToggle,
  isSoundEnabled = true
}) => {
  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return '☀️';
      case 'dark': return '🌙';
      case 'matrix': return '🟢';
      default: return '🎨';
    }
  };

  return (
    <div className="top-controls">
      <button 
        className="theme-toggle" 
        onClick={onToggle} 
        title={`Theme: ${theme}`}
      >
        <span className="theme-icon">{getThemeIcon()}</span>
      </button>
      
      {onSoundToggle && (
        <button 
          className="sound-toggle" 
          onClick={onSoundToggle}
          title={isSoundEnabled ? "Disable sound" : "Enable sound"}
        >
          <span className="sound-icon">
            {isSoundEnabled ? '🔊' : '🔇'}
          </span>
        </button>
      )}
    </div>
  );
};