import React, { useState, useEffect } from 'react';

export default function CheckoutSectionBlock({ content, onSave }) {
  const [title, setTitle] = useState(content.title || '🎯 Reserve seu Passaporte VIP agora');
  const [urgencyText, setUrgencyText] = useState(content.urgencyText || '⚡ Restam apenas 37 passaportes para hoje');
  const [ctaButton, setCtaButton] = useState(content.ctaButton || {
    text: '🏖️ GARANTIR MEU PASSAPORTE VIP',
    price: 120,
    originalPrice: 257,
    discount: '53% OFF'
  });
  const [summary, setSummary] = useState(content.summary || {
    title: 'Passaporte Camurutaba Paradise',
    subtitle: 'Acesso VIP completo aos dois paraísos',
    benefits: [
      'R$100 em consumo livre',
      '50% OFF em todas as atividades',
      'Day Use GRÁTIS (R$17 economizados)',
      'Drink de boas-vindas GRÁTIS',
      'Foto profissional GRÁTIS',
      'Acesso aos lounges VIP exclusivos',
      'Atendimento prioritário sem filas'
    ],
    totalValue: 257,
    savings: 137
  });
  const [guarantees, setGuarantees] = useState(content.guarantees || [
    '✅ Cancelamento gratuito até 24h antes',
    '✅ Pagamento 100% seguro',
    '✅ Suporte via WhatsApp',
    '✅ Satisfação garantida ou seu dinheiro de volta'
  ]);
  const [paymentMethods, setPaymentMethods] = useState(content.paymentMethods || [
    'Cartão de crédito (até 12x)',
    'Cartão de débito',
    'PIX (5% desconto extra)',
    'PayPal'
  ]);

  useEffect(() => {
    setTitle(content.title || '🎯 Reserve seu Passaporte VIP agora');
    setUrgencyText(content.urgencyText || '⚡ Restam apenas 37 passaportes para hoje');
    setCtaButton(content.ctaButton || {});
    setSummary(content.summary || {});
    setGuarantees(content.guarantees || []);
    setPaymentMethods(content.paymentMethods || []);
  }, [content]);

  const handleSave = () => {
    onSave({
      title,
      urgencyText,
      ctaButton,
      summary,
      guarantees,
      paymentMethods
    });
  };

  const handleCtaButtonChange = (field, value) => {
    setCtaButton({ ...ctaButton, [field]: value });
  };

  const handleSummaryChange = (field, value) => {
    setSummary({ ...summary, [field]: value });
  };

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...summary.benefits];
    newBenefits[index] = value;
    setSummary({ ...summary, benefits: newBenefits });
  };

  const addBenefit = () => {
    setSummary({
      ...summary,
      benefits: [...summary.benefits, 'Novo benefício']
    });
  };

  const removeBenefit = (index) => {
    const newBenefits = summary.benefits.filter((_, i) => i !== index);
    setSummary({ ...summary, benefits: newBenefits });
  };

  const handleGuaranteeChange = (index, value) => {
    const newGuarantees = [...guarantees];
    newGuarantees[index] = value;
    setGuarantees(newGuarantees);
  };

  const addGuarantee = () => {
    setGuarantees([...guarantees, '✅ Nova garantia']);
  };

  const removeGuarantee = (index) => {
    setGuarantees(guarantees.filter((_, i) => i !== index));
  };

  const handlePaymentMethodChange = (index, value) => {
    const newMethods = [...paymentMethods];
    newMethods[index] = value;
    setPaymentMethods(newMethods);
  };

  const addPaymentMethod = () => {
    setPaymentMethods([...paymentMethods, 'Novo método']);
  };

  const removePaymentMethod = (index) => {
    setPaymentMethods(paymentMethods.filter((_, i) => i !== index));
  };

  return (
    <div className="checkout-block bg-white p-4 rounded-lg border">
      <h3 className="font-bold mb-4">Seção de Checkout</h3>

      {/* Configurações principais */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Título Principal</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            className="w-full p-2 border rounded"
            placeholder="🎯 Reserve seu Passaporte VIP agora"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Texto de Urgência</label>
          <input
            type="text"
            value={urgencyText}
            onChange={(e) => setUrgencyText(e.target.value)}
            onBlur={handleSave}
            className="w-full p-2 border rounded"
            placeholder="⚡ Restam apenas 37 passaportes para hoje"
          />
        </div>
      </div>

      {/* Configurações do botão CTA */}
      <div className="border p-4 rounded-lg bg-green-50 mb-6">
        <h4 className="font-bold mb-3 text-green-800">Botão de Compra</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Texto do Botão</label>
            <input
              type="text"
              value={ctaButton.text}
              onChange={(e) => handleCtaButtonChange('text', e.target.value)}
              onBlur={handleSave}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Desconto</label>
            <input
              type="text"
              value={ctaButton.discount}
              onChange={(e) => handleCtaButtonChange('discount', e.target.value)}
              onBlur={handleSave}
              className="w-full p-2 border rounded"
              placeholder="53% OFF"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Preço Atual (R$)</label>
            <input
              type="number"
              value={ctaButton.price}
              onChange={(e) => handleCtaButtonChange('price', parseInt(e.target.value) || 0)}
              onBlur={handleSave}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Preço Original (R$)</label>
            <input
              type="number"
              value={ctaButton.originalPrice}
              onChange={(e) => handleCtaButtonChange('originalPrice', parseInt(e.target.value) || 0)}
              onBlur={handleSave}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Resumo do produto */}
      <div className="border p-4 rounded-lg bg-blue-50 mb-6">
        <h4 className="font-bold mb-3 text-blue-800">Resumo do Produto</h4>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Título do Produto</label>
            <input
              type="text"
              value={summary.title}
              onChange={(e) => handleSummaryChange('title', e.target.value)}
              onBlur={handleSave}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subtítulo</label>
            <input
              type="text"
              value={summary.subtitle}
              onChange={(e) => handleSummaryChange('subtitle', e.target.value)}
              onBlur={handleSave}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Valor Total (R$)</label>
              <input
                type="number"
                value={summary.totalValue}
                onChange={(e) => handleSummaryChange('totalValue', parseInt(e.target.value) || 0)}
                onBlur={handleSave}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Economia (R$)</label>
              <input
                type="number"
                value={summary.savings}
                onChange={(e) => handleSummaryChange('savings', parseInt(e.target.value) || 0)}
                onBlur={handleSave}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium">Benefícios Inclusos</label>
              <button 
                onClick={addBenefit}
                className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                + Benefício
              </button>
            </div>
            
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {summary.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                    onBlur={handleSave}
                    className="flex-1 p-2 border rounded text-sm"
                  />
                  <button 
                    onClick={() => removeBenefit(index)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Garantias */}
      <div className="border p-4 rounded-lg bg-yellow-50 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-bold text-yellow-800">Garantias</h4>
          <button 
            onClick={addGuarantee}
            className="text-sm bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
          >
            + Garantia
          </button>
        </div>
        
        <div className="space-y-2">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={guarantee}
                onChange={(e) => handleGuaranteeChange(index, e.target.value)}
                onBlur={handleSave}
                className="flex-1 p-2 border rounded text-sm"
              />
              <button 
                onClick={() => removeGuarantee(index)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Métodos de pagamento */}
      <div className="border p-4 rounded-lg bg-purple-50 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-bold text-purple-800">Métodos de Pagamento</h4>
          <button 
            onClick={addPaymentMethod}
            className="text-sm bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
          >
            + Método
          </button>
        </div>
        
        <div className="space-y-2">
          {paymentMethods.map((method, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={method}
                onChange={(e) => handlePaymentMethodChange(index, e.target.value)}
                onBlur={handleSave}
                className="flex-1 p-2 border rounded text-sm"
              />
              <button 
                onClick={() => removePaymentMethod(index)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium mb-3">Preview da Seção:</h4>
        <div className="bg-white p-6 rounded-lg border">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-red-600 font-medium">{urgencyText}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resumo do produto */}
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">{summary.title}</h3>
              <p className="text-gray-600 mb-4">{summary.subtitle}</p>
              
              <div className="space-y-2 mb-4">
                {summary.benefits.slice(0, 4).map((benefit, index) => (
                  <div key={index} className="text-sm text-green-600">{benefit}</div>
                ))}
                {summary.benefits.length > 4 && (
                  <div className="text-sm text-gray-500">... e mais {summary.benefits.length - 4} benefícios</div>
                )}
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Valor total dos benefícios:</span>
                  <span className="font-bold">R$ {summary.totalValue}</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span className="text-sm">Sua economia:</span>
                  <span className="font-bold">R$ {summary.savings}</span>
                </div>
              </div>
            </div>

            {/* Área de compra */}
            <div className="border rounded-lg p-4 bg-green-50">
              <div className="text-center mb-4">
                <div className="text-sm text-gray-500 line-through">
                  De R$ {ctaButton.originalPrice}
                </div>
                <div className="text-3xl font-bold text-green-600">
                  R$ {ctaButton.price}
                </div>
                <div className="text-sm text-red-600 font-bold">
                  {ctaButton.discount}
                </div>
              </div>

              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold mb-4">
                {ctaButton.text}
              </button>

              <div className="space-y-1 mb-4">
                {guarantees.slice(0, 3).map((guarantee, index) => (
                  <div key={index} className="text-xs text-gray-600">{guarantee}</div>
                ))}
              </div>

              <div className="text-xs text-gray-500">
                <div className="font-medium mb-1">Formas de pagamento:</div>
                {paymentMethods.slice(0, 2).map((method, index) => (
                  <div key={index}>• {method}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded w-full hover:bg-green-600"
      >
        Salvar Checkout
      </button>
    </div>
  );
}

