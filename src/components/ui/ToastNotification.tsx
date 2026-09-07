import React from 'react';

interface ToastNotificationProps {
  message: string | null;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ message }) => {
  if (!message) return null;

  // Classify toast message type
  const isError =
    message.toLowerCase().includes('not enough') ||
    message.toLowerCase().includes('not in dictionary') ||
    message.toLowerCase().includes('invalid');

  const isReaction =
    message.includes('REACTION:') ||
    message.includes('CELESTIAL') ||
    message.includes('WORLD SENSES') ||
    message.includes('SECRET RELIC') ||
    message.includes('WORLD STABILIZED');

  // Parse structured title and subtitle if banner contains '—' or ':'
  let badgeTitle = '';
  let subtitle = '';

  if (isReaction) {
    if (message.includes('—')) {
      const parts = message.split('—');
      badgeTitle = parts[0].replace(/ELEMENTAL REACTION:\s*/i, '').trim();
      subtitle = parts.slice(1).join('—').trim();
    } else if (message.includes(':')) {
      const parts = message.split(':');
      badgeTitle = parts[0].trim();
      subtitle = parts.slice(1).join(':').trim();
    }
  }

  if (isError) {
    return (
      <div className="toast-container" role="alert">
        <div className="toast-pill-error">
          <span>{message}</span>
        </div>
      </div>
    );
  }

  if (badgeTitle && subtitle) {
    return (
      <div className="toast-container" role="status">
        <div className="toast-reaction-card">
          <div className="toast-badge-row">
            <span className="toast-reaction-badge">{badgeTitle}</span>
          </div>
          <p className="toast-reaction-desc">{subtitle}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="toast-container" role="status">
      <div className="toast-pill-cosmic">
        <span>{message}</span>
      </div>
    </div>
  );
};
