import React, { useState, useEffect } from 'react';

export default function TrustBarBlock({ content, onSave }) {
  const [items, setItems] = useState(content.items || [
    { type: 'number', number: 5000, text: 'famílias satisfeitas' },
    { type: 'stars', stars: 5, text: '4.9★ no Google' },
    { type: 'icon', icon: 'award', text: 'Melhor experiência turística RN 2024' },
    { type: 'icon', icon: 'shield', text: 'Pagamento 100% seguro' },
    { type: 'number', number: 98, text: 'recomendação dos clientes' }
  ]);

  useEffect(() => {
    setItems(content.items || []);
  }, [content]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { type: 'number', text: 'Novo item', number: 0 }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length <= 1) return;
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSave = () => {
    onSave({ items });
  };

  const getIconDisplay = (iconType) => {
    const icons = {
      award: '🏆',
      shield: '🛡️',
      star: '⭐',
      check: '✅',
      heart: '❤️',
      thumbs: '👍'
    };
    return icons[iconType] || '🏆';
  };

  return (
    <div className="trust-bar-block bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold">Barra de Confiança</h3>
        <button 
          onClick={handleAddItem}
          className="px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          + Item
        </button>
      </div>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 p-3 bg-white rounded border">
            <div className="flex flex-col space-y-2 flex-1">
              <div className="flex items-center space-x-2">
                <select
                  value={item.type || 'number'}
                  onChange={(e) => handleItemChange(index, 'type', e.target.value)}
                  onBlur={handleSave}
                  className="p-1 border rounded text-sm"
                >
                  <option value="number">Número</option>
                  <option value="stars">Estrelas</option>
                  <option value="icon">Ícone</option>
                </select>
                
                {item.type === 'number' && (
                  <input
                    type="number"
                    value={item.number || 0}
                    onChange={(e) => handleItemChange(index, 'number', parseInt(e.target.value) || 0)}
                    onBlur={handleSave}
                    className="p-1 border rounded w-20 text-sm"
                    placeholder="0"
                  />
                )}
                
                {item.type === 'stars' && (
                  <input
                    type="number"
                    value={item.stars || 5}
                    onChange={(e) => handleItemChange(index, 'stars', parseInt(e.target.value) || 5)}
                    onBlur={handleSave}
                    min="1"
                    max="5"
                    className="p-1 border rounded w-20 text-sm"
                    placeholder="5"
                  />
                )}
                
                {item.type === 'icon' && (
                  <select
                    value={item.icon || 'award'}
                    onChange={(e) => handleItemChange(index, 'icon', e.target.value)}
                    onBlur={handleSave}
                    className="p-1 border rounded text-sm"
                  >
                    <option value="award">🏆 Prêmio</option>
                    <option value="shield">🛡️ Escudo</option>
                    <option value="star">⭐ Estrela</option>
                    <option value="check">✅ Check</option>
                    <option value="heart">❤️ Coração</option>
                    <option value="thumbs">👍 Curtir</option>
                  </select>
                )}
                
                <button 
                  onClick={() => handleRemoveItem(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  disabled={items.length <= 1}
                >
                  ×
                </button>
              </div>
              
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleItemChange(index, 'text', e.target.value)}
                onBlur={handleSave}
                className="flex-1 p-2 border rounded text-sm"
                placeholder="Texto do item"
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Preview */}
      <div className="mt-4 p-4 bg-white rounded-lg border">
        <h4 className="text-sm font-medium mb-3">Preview:</h4>
        <div className="flex flex-wrap gap-4 justify-center">
          {items.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {item.type === 'number' && `${item.number}+`}
                {item.type === 'stars' && '★'.repeat(item.stars || 5)}
                {item.type === 'icon' && getIconDisplay(item.icon)}
              </div>
              <div className="text-xs text-gray-600 max-w-[100px]">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={handleSave}
        className="mt-3 px-3 py-2 bg-green-500 text-white rounded w-full hover:bg-green-600"
      >
        Salvar Alterações
      </button>
    </div>
  );
}

