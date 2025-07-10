import React, { useState, useEffect } from 'react';

export default function HeroBlock({ content, onSave }) {
  const [titleMain, setTitleMain] = useState(content.titleMain || '');
  const [titleSub, setTitleSub] = useState(content.titleSub || '');
  const [titleAccent, setTitleAccent] = useState(content.titleAccent || '');
  const [subtitle, setSubtitle] = useState(content.subtitle || '');
  const [availableToday, setAvailableToday] = useState(content.availableToday || 37);
  const [recentSales, setRecentSales] = useState(content.recentSales || 12);
  const [ctaText, setCtaText] = useState(content.ctaText || '');
  const [countdownHours, setCountdownHours] = useState(content.countdownHours || 23);
  const [countdownMinutes, setCountdownMinutes] = useState(content.countdownMinutes || 47);
  const [countdownSeconds, setCountdownSeconds] = useState(content.countdownSeconds || 32);

  useEffect(() => {
    setTitleMain(content.titleMain || '');
    setTitleSub(content.titleSub || '');
    setTitleAccent(content.titleAccent || '');
    setSubtitle(content.subtitle || '');
    setAvailableToday(content.availableToday || 37);
    setRecentSales(content.recentSales || 12);
    setCtaText(content.ctaText || '');
    setCountdownHours(content.countdownHours || 23);
    setCountdownMinutes(content.countdownMinutes || 47);
    setCountdownSeconds(content.countdownSeconds || 32);
  }, [content]);

  const handleSave = () => {
    onSave({
      titleMain,
      titleSub,
      titleAccent,
      subtitle,
      availableToday,
      recentSales,
      ctaText,
      countdownHours,
      countdownMinutes,
      countdownSeconds
    });
  };

  return (
    <div className="hero-section relative p-6 bg-gradient-to-br from-blue-900 to-cyan-700 text-white rounded-xl">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex flex-col">
              <label className="text-sm font-medium">Título Principal</label>
              <input
                type="text"
                value={titleMain}
                onChange={(e) => setTitleMain(e.target.value)}
                onBlur={handleSave}
                className="p-2 bg-white/10 rounded border border-white/20 text-white placeholder-white/70"
                placeholder="Dois Paraísos."
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium">Subtítulo</label>
              <input
                type="text"
                value={titleSub}
                onChange={(e) => setTitleSub(e.target.value)}
                onBlur={handleSave}
                className="p-2 bg-white/10 rounded border border-white/20 text-white placeholder-white/70"
                placeholder="Um Dia."
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium">Título Destaque</label>
              <input
                type="text"
                value={titleAccent}
                onChange={(e) => setTitleAccent(e.target.value)}
                onBlur={handleSave}
                className="p-2 bg-white/10 rounded border border-white/20 text-white placeholder-white/70"
                placeholder="Infinitas Memórias."
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex flex-col">
              <label className="text-sm font-medium">Descrição</label>
              <textarea
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                onBlur={handleSave}
                className="p-2 bg-white/10 rounded border border-white/20 min-h-[100px] text-white placeholder-white/70"
                placeholder="O único passaporte que transforma R$120 em mais de R$250 de experiências VIP"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label className="text-sm font-medium">Disponíveis Hoje</label>
                <input
                  type="number"
                  value={availableToday}
                  onChange={(e) => setAvailableToday(parseInt(e.target.value) || 0)}
                  onBlur={handleSave}
                  className="p-2 bg-white/10 rounded border border-white/20 text-white"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium">Vendas Recentes</label>
                <input
                  type="number"
                  value={recentSales}
                  onChange={(e) => setRecentSales(parseInt(e.target.value) || 0)}
                  onBlur={handleSave}
                  className="p-2 bg-white/10 rounded border border-white/20 text-white"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium">Texto do Botão CTA</label>
          <input
            type="text"
            value={ctaText}
            onChange={(e) => setCtaText(e.target.value)}
            onBlur={handleSave}
            className="p-2 bg-white/10 rounded border border-white/20 text-white placeholder-white/70"
            placeholder="🏖️ RESERVE SEU PARAÍSO VIP"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Horas (Countdown)</label>
            <input
              type="number"
              value={countdownHours}
              onChange={(e) => setCountdownHours(parseInt(e.target.value) || 0)}
              onBlur={handleSave}
              className="p-2 bg-white/10 rounded border border-white/20 text-white"
              min="0"
              max="23"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium">Minutos (Countdown)</label>
            <input
              type="number"
              value={countdownMinutes}
              onChange={(e) => setCountdownMinutes(parseInt(e.target.value) || 0)}
              onBlur={handleSave}
              className="p-2 bg-white/10 rounded border border-white/20 text-white"
              min="0"
              max="59"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium">Segundos (Countdown)</label>
            <input
              type="number"
              value={countdownSeconds}
              onChange={(e) => setCountdownSeconds(parseInt(e.target.value) || 0)}
              onBlur={handleSave}
              className="p-2 bg-white/10 rounded border border-white/20 text-white"
              min="0"
              max="59"
            />
          </div>
        </div>

        {/* Preview da seção */}
        <div className="mt-6 p-4 bg-white/10 rounded-lg">
          <h3 className="text-sm font-medium mb-3">Preview:</h3>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">
              {titleMain} {titleSub} <span className="text-yellow-300">{titleAccent}</span>
            </h1>
            <p className="text-white/90">{subtitle}</p>
            <div className="flex space-x-4 text-sm">
              <span>📦 {availableToday} disponíveis hoje</span>
              <span>🔥 {recentSales} vendas nas últimas 2h</span>
            </div>
            <div className="flex space-x-2 text-sm">
              <span className="bg-white/20 px-2 py-1 rounded">{countdownHours}h</span>
              <span className="bg-white/20 px-2 py-1 rounded">{countdownMinutes}m</span>
              <span className="bg-white/20 px-2 py-1 rounded">{countdownSeconds}s</span>
            </div>
            {ctaText && (
              <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold">
                {ctaText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

