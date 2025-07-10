import React, { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';

export default function FAQBlock({ content, onSave }) {
  const [title, setTitle] = useState(content.title || 'Perguntas frequentes');
  const [subtitle, setSubtitle] = useState(content.subtitle || 'Tire suas dúvidas sobre o Passaporte Camurutaba Paradise');
  const [faqs, setFaqs] = useState(content.faqs || [
    { 
      id: 1,
      question: "O que exatamente está incluído no Passaporte?", 
      answer: "O Passaporte inclui: R$100 em consumo livre, 50% OFF em atividades, Day Use gratuito, drink de boas-vindas, foto profissional grátis e acesso aos lounges VIP exclusivos.",
      category: "beneficios",
      isOpen: false
    },
    { 
      id: 2,
      question: "Posso usar o Passaporte em qualquer dia?", 
      answer: "Sim! O Passaporte é válido todos os dias da semana, incluindo feriados. Recomendamos fazer a reserva com antecedência para garantir sua vaga.",
      category: "uso",
      isOpen: false
    },
    { 
      id: 3,
      question: "O Passaporte vale para quantas pessoas?", 
      answer: "Cada Passaporte é individual. Para famílias, recomendamos adquirir um passaporte por pessoa para aproveitar todos os benefícios.",
      category: "uso",
      isOpen: false
    },
    { 
      id: 4,
      question: "Como funciona o consumo de R$100?", 
      answer: "Você recebe um crédito de R$100 que pode ser usado livremente em qualquer item do cardápio: comidas, bebidas, sobremesas ou experiências gastronômicas.",
      category: "beneficios",
      isOpen: false
    },
    { 
      id: 5,
      question: "Posso cancelar ou remarcar minha visita?", 
      answer: "Sim! Oferecemos cancelamento gratuito até 24h antes da data agendada. Para remarcar, entre em contato conosco pelo WhatsApp.",
      category: "politicas",
      isOpen: false
    }
  ]);

  useEffect(() => {
    setTitle(content.title || 'Perguntas frequentes');
    setSubtitle(content.subtitle || 'Tire suas dúvidas sobre o Passaporte Camurutaba Paradise');
    setFaqs(content.faqs || []);
  }, [content]);

  const handleSave = () => {
    onSave({ title, subtitle, faqs });
  };

  const handleFaqChange = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setFaqs(newFaqs);
  };

  const addFaq = () => {
    const newId = Math.max(...faqs.map(f => f.id || 0)) + 1;
    setFaqs([...faqs, {
      id: newId,
      question: 'Nova pergunta?',
      answer: 'Resposta para a pergunta...',
      category: 'geral',
      isOpen: false
    }]);
  };

  const removeFaq = (index) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs);
  };

  const reorderFaqs = (newFaqs) => {
    setFaqs(newFaqs);
    handleSave();
  };

  const toggleFaqPreview = (index) => {
    const newFaqs = [...faqs];
    newFaqs[index].isOpen = !newFaqs[index].isOpen;
    setFaqs(newFaqs);
  };

  const getCategoryColor = (category) => {
    const colors = {
      beneficios: 'bg-green-50 border-green-200',
      uso: 'bg-blue-50 border-blue-200',
      politicas: 'bg-yellow-50 border-yellow-200',
      pagamento: 'bg-purple-50 border-purple-200',
      geral: 'bg-gray-50 border-gray-200'
    };
    return colors[category] || colors.geral;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      beneficios: '✨',
      uso: '📅',
      politicas: '📋',
      pagamento: '💳',
      geral: '❓'
    };
    return icons[category] || icons.geral;
  };

  return (
    <div className="faq-block bg-white p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">FAQ - Perguntas Frequentes</h3>
        <button 
          onClick={addFaq}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          + Pergunta
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Título da Seção</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          className="w-full p-2 border rounded"
          placeholder="Perguntas frequentes"
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
          placeholder="Tire suas dúvidas sobre o Passaporte"
        />
      </div>
      
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">Perguntas (arraste para reordenar)</label>
          <span className="text-xs text-gray-500">🔄 Drag & Drop</span>
        </div>
        
        <ReactSortable
          list={faqs}
          setList={reorderFaqs}
          animation={200}
          delayOnTouchStart={true}
          delay={2}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <div key={faq.id} className={`border p-4 rounded-lg cursor-move ${getCategoryColor(faq.category)}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <span className="text-lg mr-2">{getCategoryIcon(faq.category)}</span>
                  <h4 className="font-medium text-gray-800">FAQ {index + 1}</h4>
                </div>
                <button 
                  onClick={() => removeFaq(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Remover
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Categoria</label>
                  <select
                    value={faq.category}
                    onChange={(e) => handleFaqChange(index, 'category', e.target.value)}
                    onBlur={handleSave}
                    className="w-full p-2 border rounded"
                  >
                    <option value="beneficios">✨ Benefícios</option>
                    <option value="uso">📅 Como Usar</option>
                    <option value="politicas">📋 Políticas</option>
                    <option value="pagamento">💳 Pagamento</option>
                    <option value="geral">❓ Geral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Pergunta</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                    onBlur={handleSave}
                    className="w-full p-2 border rounded"
                    placeholder="Digite a pergunta..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Resposta</label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                    onBlur={handleSave}
                    className="w-full p-2 border rounded"
                    rows="3"
                    placeholder="Digite a resposta..."
                  />
                </div>

                {/* Preview da FAQ */}
                <div className="mt-3 p-3 bg-white rounded border">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFaqPreview(index)}
                  >
                    <h4 className="font-medium text-sm">{faq.question}</h4>
                    <span className="text-gray-400">
                      {faq.isOpen ? '−' : '+'}
                    </span>
                  </div>
                  {faq.isOpen && (
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ReactSortable>
      </div>

      {/* Preview geral */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium mb-3">Preview da Seção:</h4>
        <div className="bg-white p-4 rounded">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          
          <div className="space-y-3">
            {faqs.slice(0, 5).map((faq, index) => (
              <div key={index} className="border rounded-lg">
                <div className="p-3 flex justify-between items-center bg-gray-50">
                  <div className="flex items-center">
                    <span className="mr-2">{getCategoryIcon(faq.category)}</span>
                    <span className="font-medium text-sm">{faq.question}</span>
                  </div>
                  <span className="text-gray-400">+</span>
                </div>
              </div>
            ))}
          </div>

          {faqs.length > 5 && (
            <div className="text-center mt-4 text-sm text-gray-500">
              ... e mais {faqs.length - 5} perguntas
            </div>
          )}

          {/* Estatísticas por categoria */}
          <div className="mt-4 p-3 bg-blue-50 rounded">
            <div className="text-sm font-medium mb-2">Distribuição por categoria:</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(
                faqs.reduce((acc, faq) => {
                  acc[faq.category] = (acc[faq.category] || 0) + 1;
                  return acc;
                }, {})
              ).map(([category, count]) => (
                <span key={category} className="text-xs bg-white px-2 py-1 rounded">
                  {getCategoryIcon(category)} {count}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded w-full hover:bg-green-600"
      >
        Salvar FAQ
      </button>
    </div>
  );
}

