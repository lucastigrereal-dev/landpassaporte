import React, { useState, useEffect } from 'react';

export default function BenefitsSectionBlock({ content, onSave }) {
  const [title, setTitle] = useState(content.title || 'Seus benefícios VIP desbloqueados');
  const [subtitle, setSubtitle] = useState(content.subtitle || 'Tudo isso está incluído no seu Passaporte Camurutaba Paradise');
  const [benefits, setBenefits] = useState(content.benefits || [
    { 
      title: "R$100 em Consumo Livre", 
      description: "Use como quiser em comidas, bebidas e experiências", 
      value: 100,
      icon: "💰",
      category: "consumo"
    },
    { 
      title: "50% OFF em Atividades", 
      description: "Desconto em pedalinho, caiaque, stand-up paddle", 
      value: 35,
      icon: "🚣",
      category: "atividades"
    },
    { 
      title: "Day Use GRÁTIS", 
      description: "Acesso completo às estruturas sem taxa adicional", 
      value: 17,
      icon: "🏖️",
      category: "acesso"
    },
    { 
      title: "Drink de Boas-vindas", 
      description: "Bebida especial cortesia da casa", 
      value: 30,
      icon: "🍹",
      category: "cortesia"
    },
    { 
      title: "Foto Profissional GRÁTIS", 
      description: "Registro profissional dos seus melhores momentos", 
      value: 25,
      icon: "📸",
      category: "cortesia"
    },
    { 
      title: "Lounges VIP Exclusivos", 
      description: "Áreas reservadas com conforto premium", 
      value: 0,
      icon: "👑",
      category: "vip"
    }
  ]);

  useEffect(() => {
    setTitle(content.title || 'Seus benefícios VIP desbloqueados');
    setSubtitle(content.subtitle || 'Tudo isso está incluído no seu Passaporte Camurutaba Paradise');
    setBenefits(content.benefits || []);
  }, [content]);

  const handleSave = () => {
    onSave({ title, subtitle, benefits });
  };

  const handleBenefitChange = (index, field, value) => {
    const newBenefits = [...benefits];
    newBenefits[index] = { ...newBenefits[index], [field]: value };
    setBenefits(newBenefits);
  };

  const addBenefit = () => {
    setBenefits([...benefits, {
      title: 'Novo benefício',
      description: 'Descrição do benefício',
      value: 0,
      icon: '✨',
      category: 'geral'
    }]);
  };

  const removeBenefit = (index) => {
    const newBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(newBenefits);
  };

  const getTotalValue = () => {
    return benefits.reduce((total, benefit) => total + (benefit.value || 0), 0);
  };

  const getCategoryColor = (category) => {
    const colors = {
      consumo: 'bg-green-50 border-green-200',
      atividades: 'bg-blue-50 border-blue-200',
      acesso: 'bg-purple-50 border-purple-200',
      cortesia: 'bg-yellow-50 border-yellow-200',
      vip: 'bg-pink-50 border-pink-200',
      geral: 'bg-gray-50 border-gray-200'
    };
    return colors[category] || colors.geral;
  };

  return (
    <div className="benefits-block bg-white p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Seção de Benefícios</h3>
        <button 
          onClick={addBenefit}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          + Benefício
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Título Principal</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          className="w-full p-2 border rounded"
          placeholder="Seus benefícios VIP desbloqueados"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Subtítulo</label>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          onBlur={handleSave}
          className="w-full p-2 border rounded"
          placeholder="Tudo isso está incluído no seu Passaporte"
        />
      </div>
      
      <div className="space-y-4">
        {benefits.map((benefit, index) => (
          <div key={index} className={`border p-4 rounded-lg ${getCategoryColor(benefit.category)}`}>
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-gray-800">Benefício {index + 1}</h4>
              <button 
                onClick={() => removeBenefit(index)}
                className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Remover
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Título</label>
                  <input
                    type="text"
                    value={benefit.title}
                    onChange={(e) => handleBenefitChange(index, 'title', e.target.value)}
                    onBlur={handleSave}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Descrição</label>
                  <textarea
                    value={benefit.description}
                    onChange={(e) => handleBenefitChange(index, 'description', e.target.value)}
                    onBlur={handleSave}
                    className="w-full p-2 border rounded"
                    rows="2"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Valor (R$)</label>
                    <input
                      type="number"
                      value={benefit.value}
                      onChange={(e) => handleBenefitChange(index, 'value', parseInt(e.target.value) || 0)}
                      onBlur={handleSave}
                      className="w-full p-2 border rounded"
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Ícone</label>
                    <input
                      type="text"
                      value={benefit.icon}
                      onChange={(e) => handleBenefitChange(index, 'icon', e.target.value)}
                      onBlur={handleSave}
                      className="w-full p-2 border rounded"
                      placeholder="💰"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Categoria</label>
                  <select
                    value={benefit.category}
                    onChange={(e) => handleBenefitChange(index, 'category', e.target.value)}
                    onBlur={handleSave}
                    className="w-full p-2 border rounded"
                  >
                    <option value="consumo">Consumo</option>
                    <option value="atividades">Atividades</option>
                    <option value="acesso">Acesso</option>
                    <option value="cortesia">Cortesia</option>
                    <option value="vip">VIP</option>
                    <option value="geral">Geral</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo de Valor */}
      <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-200">
        <div className="text-center">
          <div className="text-sm text-green-700 font-medium">Valor Total dos Benefícios</div>
          <div className="text-2xl font-bold text-green-800">R$ {getTotalValue().toLocaleString()}</div>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium mb-3">Preview:</h4>
        <div className="bg-white p-4 rounded">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.slice(0, 6).map((benefit, index) => (
              <div key={index} className="border rounded-lg p-3 text-center">
                <div className="text-2xl mb-2">{benefit.icon}</div>
                <h3 className="font-bold text-sm mb-1">{benefit.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{benefit.description}</p>
                {benefit.value > 0 && (
                  <div className="text-sm font-bold text-green-600">
                    R$ {benefit.value}
                  </div>
                )}
              </div>
            ))}
          </div>

          {benefits.length > 6 && (
            <div className="text-center mt-4 text-sm text-gray-500">
              ... e mais {benefits.length - 6} benefícios
            </div>
          )}

          <div className="text-center mt-6 p-3 bg-green-50 rounded border">
            <div className="text-lg font-bold text-green-700">
              Valor Total: R$ {getTotalValue().toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded w-full hover:bg-green-600"
      >
        Salvar Benefícios
      </button>
    </div>
  );
}

