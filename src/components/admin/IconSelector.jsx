'use client';
import React, { useState } from 'react';

const ICONS = [
  'bx-home', 'bx-user', 'bx-cog', 'bx-bell', 'bx-envelope',
  'bx-heart', 'bx-star', 'bx-cart', 'bx-search', 'bx-menu',
  'bx-x', 'bx-plus', 'bx-minus', 'bx-check', 'bx-edit',
  'bx-trash', 'bx-refresh', 'bx-download', 'bx-upload', 'bx-link',
  'bx-image', 'bx-calendar', 'bx-time', 'bx-map', 'bx-location',
  'bx-phone', 'bx-message', 'bx-chat', 'bx-comment', 'bx-like',
  'bx-share', 'bx-bookmark', 'bx-book', 'bx-flag', 'bx-globe',
  'bx-lock', 'bx-unlock', 'bx-key', 'bx-camera', 'bx-microphone',
  'bx-music', 'bx-video', 'bx-file', 'bx-folder', 'bx-cloud',
  'bx-sun', 'bx-moon', 'bx-coffee', 'bx-rocket', 'bx-bulb',
  'bx-leaf', 'bx-gift', 'bx-trophy', 'bx-award', 'bx-briefcase',
  'bx-bar-chart', 'bx-pie-chart', 'bx-trending-up', 'bx-trending-down',
  'bx-wallet', 'bx-credit-card', 'bx-dollar', 'bx-shopping-bag',
  'bx-rocket', 'bx-glasses', 'bx-wifi', 'bx-wrench', 'bx-shield',
  'bx-support', 'bx-undo', 'bx-redo', 'bx-zoom-in', 'bx-zoom-out',
  'bx-basket', 'bx-bug', 'bx-atom', 'bx-bolt', 'bx-planet',
  'bx-thermometer', 'bx-droplet', 'bx-wind', 'bx-fire', 'bx-happy',
  'bx-sad', 'bx-meh', 'bx-smile', 'bx-angry', 'bx-confused',
  'bx-cool', 'bx-cry', 'bx-wink', 'bx-tired', 'bx-sleepy',
];

const IconSelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = ICONS.filter(icon => icon.includes(search.toLowerCase()));

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        className="icon-selector-trigger"
        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, border: '1px solid #ccc', borderRadius: 6, background: '#fff', cursor: 'pointer', width: '100%' }}
        onClick={() => setIsOpen(v => !v)}
      >
        {value ? <i className={`bx ${value}`} style={{ fontSize: 22 }}></i> : <i className="bx bx-image" style={{ fontSize: 22, opacity: 0.5 }}></i>}
        <span style={{ color: value ? '#222' : '#888' }}>{value || 'Seleccionar icono'}</span>
      </button>
      {isOpen && (
        <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, background: '#fff', border: '1px solid #ccc', borderRadius: 8, zIndex: 10, maxHeight: 320, overflowY: 'auto', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <div style={{ padding: 8, borderBottom: '1px solid #eee' }}>
            <input
              type="text"
              placeholder="Buscar icono..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))', gap: 8, padding: 8 }}>
            {filtered.length === 0 && <span style={{ gridColumn: '1/-1', color: '#888' }}>Sin resultados</span>}
            {filtered.map((icon, idx) => (
              <button
                key={icon + '-' + idx}
                type="button"
                style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
                onClick={() => { onChange(icon); setIsOpen(false); }}
                title={icon}
              >
                <i className={`bx ${icon}`} style={{ fontSize: 22 }}></i>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconSelector;