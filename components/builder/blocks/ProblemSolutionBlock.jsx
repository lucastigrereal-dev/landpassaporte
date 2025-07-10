import React, { useState, useEffect } from 'react';

export default function ProblemSolutionBlock({ content, onSave }) {
  const [title, setTitle] = useState(content.title || '');
  const [highlight, setHighlight] = useState(content.highlight || '');
  const [commonTourist, setCommonTourist] = useState(content.commonTourist || {
    title: '😓 Turista Comum',
    price: 257,
    items: [
      'Paga Day Use separado: R$17',
      'Brinquedos pelo preço cheio: R$70',
      'Drink por R$30',
      'Foto por R$25',
      'Consumo normal: R$100',
      'Sem benefícios extras',
      'Filas e espera'
    ]
  });
  
  const [vipHolder, setVipHolder] = useState(content.vipHolder || {
    title: '👑 Portador VIP',
    price: 120,
    items: [
      'Day Use GRÁTIS: R$17 economizados',
      '50% OFF brinquedos: R$35 economizados',
      'Drink GRÁTIS: R$30 economizados',
      'Foto GRÁTIS: R$25 economizados',
      'R$100 em consumo INCLUSO',
      'Lounges exclusivos',
      'Atendimento prioritário'
    ],
    savings: 'Economia total: R$137'
  });

  useEffect(() => {
    setTitle(content.title || '');
    setHighlight(content.highlight || '');
    setCommonTourist(content.commonTourist || {
      title: '😓 Turista Comum',
      price: 257,
      items: []
    });
    setVipHolder(content.vipHolder || {
      title: '👑 Portador VIP',
      price: 120,
      items: [],
      savings: ''
    });
  }, [content]);

  const handleSave = () => {
    onSave({
      title,
      highlight,
      commonTourist,
      vipHolder
    });
  };

  const handleCommonTouristChange = (field, value) => {
    setCommonTourist({ ...commonTourist, [field]: value });
  };

  const handleVipHolderChange = (field, value) => {
    setVipHolder({ ...vipHolder, [field]: value });
  };

  const handleCommonItemChange = (index, value) => {
    const newItems = [...commonTourist.items];
    newItems[index] = value;
    setCommonTourist({ ...commonTourist, items: newItems });
  };

  const handleVipItemChange = (index, value) => {
    const newItems = [...vipHolder.items];
    newItems[index] = value;
    setVipHolder({ ...vipHolder, items: newItems });
  };

  const addCommonItem = () => {
    setCommonTourist({
      ...commonTourist,
      items: [...commonTourist.items, 'Novo item']
    });
  };

  const addVipItem = () => {
    setVipHolder({
      ...vipHolder,
      items: [...vipHolder.items, 'Novo item']
    });
  };

  const removeCommonItem = (index) => {
    const newItems = commonTourist.items.filter((_, i) => i !== index);
    setCommonTourist({ ...commonTourist, items: newItems });
  };

  const removeVipItem = (index) => {
    const newItems = vipHolder.items.filter((_, i) => i !== index);
    setVipHolder({ ...vipHolder, items: newItems });
  };

  return (
    <div className="problem-solution-block bg-white p-4 rounded-lg border">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          className="w-full p-2 border rounded"
          placeholder="Por que pagar mais quando você pode economizar?"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Texto Destacado</label>
        <input
          type="text"
          value={highlight}
          onChange={(e) => setHighlight(e.target.value)}
          onBlur={handleSave}
          className="w-full p-2 border rounded"
          placeholder="R$137"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Turista Comum */}
        <div className="border p-4 rounded-lg bg-red-50">
          <h3 className="font-bold mb-2 text-red-700">Turista Comum</h3>
          
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              type="text"
              value={commonTourist.title}
              onChange={(e) => handleCommonTouristChange('title', e.target.value)}
              onBlur={handleSave}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Preço (R$)</label>
            <input
              type="number"
              value={commonTourist.price}
              onChange={(e) => handleCommonTouristChange('price', parseInt(e.target.value) || 0)}
              onBlur={handleSave}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium">Itens</label>
              <button 
                onClick={addCommonItem}
                className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                + Adicionar
              </button>
            </div>
            
            <div className="space-y-2">
              {commonTourist.items.map((item, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleCommonItemChange(index, e.target.value)}
                    onBlur={handleSave}
                    className="flex-1 p-2 border rounded text-sm"
                  />
                  <button 
                    onClick={() => removeCommonItem(index)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Portador VIP */}
        <div className="border p-4 rounded-lg bg-green-50">
          <h3 className="font-bold mb-2 text-green-700">Portador VIP</h3>
          
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              type="text"
              value={vipHolder.title}
              onChange={(e) => handleVipHolderChange('title', e.target.value)}
              onBlur={handleSave}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Preço (R$)</label>
            <input
              type="number"
              value={vipHolder.price}
              onChange={(e) => handleVipHolderChange('price', parseInt(e.target.value) || 0)}
              onBlur={handleSave}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Texto de Economia</label>
            <input
              type="text"
              value={vipHolder.savings}
              onChange={(e) => handleVipHolderChange('savings', e.target.value)}
              onBlur={handleSave}
              className="w-full p-2 border rounded"
              placeholder="Economia total: R$137"
            />
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium">Itens</label>
              <button 
                onClick={addVipItem}
                className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                + Adicionar
              </button>
            </div>
            
            <div className="space-y-2">
              {vipHolder.items.map((item, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleVipItemChange(index, e.target.value)}
                    onBlur={handleSave}
                    className="flex-1 p-2 border rounded text-sm"
                  />
                  <button 
                    onClick={() => removeVipItem(index)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium mb-3">Preview:</h4>
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          {highlight && <span className="text-2xl font-bold text-green-600">{highlight}</span>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-100 p-3 rounded border-l-4 border-red-500">
            <h3 className="font-bold text-red-700 mb-2">{commonTourist.title}</h3>
            <p className="text-lg font-bold text-red-600 mb-2">R$ {commonTourist.price}</p>
            <ul className="text-sm space-y-1">
              {commonTourist.items.slice(0, 3).map((item, index) => (
                <li key={index} className="text-red-700">• {item}</li>
              ))}
              {commonTourist.items.length > 3 && (
                <li className="text-red-500">... e mais {commonTourist.items.length - 3} itens</li>
              )}
            </ul>
          </div>
          
          <div className="bg-green-100 p-3 rounded border-l-4 border-green-500">
            <h3 className="font-bold text-green-700 mb-2">{vipHolder.title}</h3>
            <p className="text-lg font-bold text-green-600 mb-2">R$ {vipHolder.price}</p>
            <ul className="text-sm space-y-1">
              {vipHolder.items.slice(0, 3).map((item, index) => (
                <li key={index} className="text-green-700">• {item}</li>
              ))}
              {vipHolder.items.length > 3 && (
                <li className="text-green-500">... e mais {vipHolder.items.length - 3} itens</li>
              )}
            </ul>
            {vipHolder.savings && (
              <p className="text-sm font-bold text-green-600 mt-2">{vipHolder.savings}</p>
            )}
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded w-full hover:bg-green-600"
      >
        Salvar
      </button>
    </div>
  );
}

