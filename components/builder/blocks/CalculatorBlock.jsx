import React, { useState, useEffect } from 'react';

export default function CalculatorBlock({ content, onSave }) {
  const [title, setTitle] = useState(content.title || 'Calcule sua economia personalizada');
  const [ctaText, setCtaText] = useState(content.ctaText || '💰 Quero Economizar Assim');
  const [priceWithoutPassport, setPriceWithoutPassport] = useState(content.priceWithoutPassport || 257);
  const [priceWithPassport, setPriceWithPassport] = useState(content.priceWithPassport || 120);
  const [sliderMin, setSliderMin] = useState(content.sliderMin || 1);
  const [sliderMax, setSliderMax] = useState(content.sliderMax || 10);
  const [sliderDefault, setSliderDefault] = useState(content.sliderDefault || 2);

  useEffect(() => {
    setTitle(content.title || 'Calcule sua economia personalizada');
    setCtaText(content.ctaText || '💰 Quero Economizar Assim');
    setPriceWithoutPassport(content.priceWithoutPassport || 257);
    setPriceWithPassport(content.priceWithPassport || 120);
    setSliderMin(content.sliderMin || 1);
    setSliderMax(content.sliderMax || 10);
    setSliderDefault(content.sliderDefault || 2);
  }, [content]);

  const handleSave = () => {
    onSave({
      title,
      ctaText,
      priceWithoutPassport,
      priceWithPassport,
      sliderMin,
      sliderMax,
      sliderDefault
    });
  };

  const calculateSavings = (people) => {
    const totalWithoutPassport = priceWithoutPassport * people;
    const totalWithPassport = priceWithPassport * people;
    return totalWithoutPassport - totalWithPassport;
  };

  return (
    <div className="calculator-block bg-white p-4 rounded-lg border">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          className="w-full p-2 border rounded"
          placeholder="Calcule sua economia personalizada"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Preço sem Passaporte (R$)</label>
          <input
            type="number"
            value={priceWithoutPassport}
            onChange={(e) => setPriceWithoutPassport(parseInt(e.target.value) || 0)}
            onBlur={handleSave}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Preço com Passaporte (R$)</label>
          <input
            type="number"
            value={priceWithPassport}
            onChange={(e) => setPriceWithPassport(parseInt(e.target.value) || 0)}
            onBlur={handleSave}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Configurações do Slider</label>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Mínimo</label>
            <input
              type="number"
              value={sliderMin}
              onChange={(e) => setSliderMin(parseInt(e.target.value) || 1)}
              onBlur={handleSave}
              className="w-full p-2 border rounded"
              min="1"
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Máximo</label>
            <input
              type="number"
              value={sliderMax}
              onChange={(e) => setSliderMax(parseInt(e.target.value) || 10)}
              onBlur={handleSave}
              className="w-full p-2 border rounded"
              min="2"
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Padrão</label>
            <input
              type="number"
              value={sliderDefault}
              onChange={(e) => setSliderDefault(parseInt(e.target.value) || 2)}
              onBlur={handleSave}
              className="w-full p-2 border rounded"
              min={sliderMin}
              max={sliderMax}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Texto do Botão CTA</label>
        <input
          type="text"
          value={ctaText}
          onChange={(e) => setCtaText(e.target.value)}
          onBlur={handleSave}
          className="w-full p-2 border rounded"
          placeholder="💰 Quero Economizar Assim"
        />
      </div>

      {/* Preview da Calculadora */}
      <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border">
        <h4 className="text-sm font-medium mb-4">Preview da Calculadora:</h4>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold text-center mb-4">{title}</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Quantas pessoas vão? ({sliderDefault} pessoas)
            </label>
            <input
              type="range"
              min={sliderMin}
              max={sliderMax}
              defaultValue={sliderDefault}
              className="w-full"
              disabled
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{sliderMin}</span>
              <span>{sliderMax}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-red-50 rounded border-l-4 border-red-500">
              <div className="text-sm text-red-600 font-medium">Sem Passaporte</div>
              <div className="text-xl font-bold text-red-700">
                R$ {(priceWithoutPassport * sliderDefault).toLocaleString()}
              </div>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded border-l-4 border-green-500">
              <div className="text-sm text-green-600 font-medium">Com Passaporte</div>
              <div className="text-xl font-bold text-green-700">
                R$ {(priceWithPassport * sliderDefault).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="text-center p-3 bg-yellow-50 rounded border border-yellow-200">
            <div className="text-sm text-yellow-700">Sua economia:</div>
            <div className="text-2xl font-bold text-yellow-800">
              R$ {calculateSavings(sliderDefault).toLocaleString()}
            </div>
          </div>

          {ctaText && (
            <button className="w-full mt-4 px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
              {ctaText}
            </button>
          )}
        </div>
      </div>

      <button 
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded w-full hover:bg-green-600"
      >
        Salvar Calculadora
      </button>
    </div>
  );
}

