import React, { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';

export default function TestimonialsBlock({ content, onSave }) {
  const [title, setTitle] = useState(content.title || 'O que falam as famílias que já viveram esta experiência');
  const [testimonials, setTestimonials] = useState(content.testimonials || [
    { 
      id: 1,
      name: "Marina Ferreira", 
      location: "São Paulo, SP", 
      rating: 5, 
      text: "A melhor decisão da nossa viagem! Economizamos mais de R$150 e ainda tivemos acesso VIP a tudo. As crianças adoraram o pedalinho gratuito!",
      avatar: "",
      date: "Dezembro 2023"
    },
    { 
      id: 2,
      name: "Carlos e Ana Santos", 
      location: "Brasília, DF", 
      rating: 5, 
      text: "Incrível! O atendimento VIP fez toda a diferença. Não pegamos fila em nada e o drink de boas-vindas foi um mimo especial.",
      avatar: "",
      date: "Janeiro 2024"
    },
    { 
      id: 3,
      name: "Família Oliveira", 
      location: "Rio de Janeiro, RJ", 
      rating: 5, 
      text: "Valeu cada centavo! R$100 de consumo livre + todas as atividades com desconto. Nossos filhos querem voltar no próximo feriado!",
      avatar: "",
      date: "Novembro 2023"
    }
  ]);

  useEffect(() => {
    setTitle(content.title || 'O que falam as famílias que já viveram esta experiência');
    setTestimonials(content.testimonials || []);
  }, [content]);

  const handleSave = () => {
    onSave({ title, testimonials });
  };

  const handleTestimonialChange = (index, field, value) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setTestimonials(newTestimonials);
  };

  const addTestimonial = () => {
    const newId = Math.max(...testimonials.map(t => t.id || 0)) + 1;
    setTestimonials([...testimonials, {
      id: newId,
      name: 'Novo cliente',
      location: 'Cidade, Estado',
      rating: 5,
      text: 'Texto do depoimento...',
      avatar: '',
      date: 'Mês Ano'
    }]);
  };

  const removeTestimonial = (index) => {
    const newTestimonials = testimonials.filter((_, i) => i !== index);
    setTestimonials(newTestimonials);
  };

  const reorderTestimonials = (newTestimonials) => {
    setTestimonials(newTestimonials);
    handleSave();
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="testimonials-block bg-white p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Depoimentos</h3>
        <button 
          onClick={addTestimonial}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          + Depoimento
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
          placeholder="O que falam as famílias que já viveram esta experiência"
        />
      </div>
      
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">Depoimentos (arraste para reordenar)</label>
          <span className="text-xs text-gray-500">🔄 Drag & Drop</span>
        </div>
        
        <ReactSortable
          list={testimonials}
          setList={reorderTestimonials}
          animation={200}
          delayOnTouchStart={true}
          delay={2}
          className="space-y-4"
        >
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="border p-4 rounded-lg bg-purple-50 cursor-move">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <span className="text-lg mr-2">👤</span>
                  <h4 className="font-medium text-purple-800">Depoimento {index + 1}</h4>
                </div>
                <button 
                  onClick={() => removeTestimonial(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Remover
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <input
                      type="text"
                      value={testimonial.name}
                      onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                      onBlur={handleSave}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Localização</label>
                    <input
                      type="text"
                      value={testimonial.location}
                      onChange={(e) => handleTestimonialChange(index, 'location', e.target.value)}
                      onBlur={handleSave}
                      className="w-full p-2 border rounded"
                      placeholder="Cidade, Estado"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Avaliação (1-5)</label>
                      <select
                        value={testimonial.rating}
                        onChange={(e) => handleTestimonialChange(index, 'rating', parseInt(e.target.value))}
                        onBlur={handleSave}
                        className="w-full p-2 border rounded"
                      >
                        <option value={1}>1 ⭐</option>
                        <option value={2}>2 ⭐⭐</option>
                        <option value={3}>3 ⭐⭐⭐</option>
                        <option value={4}>4 ⭐⭐⭐⭐</option>
                        <option value={5}>5 ⭐⭐⭐⭐⭐</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Data</label>
                      <input
                        type="text"
                        value={testimonial.date}
                        onChange={(e) => handleTestimonialChange(index, 'date', e.target.value)}
                        onBlur={handleSave}
                        className="w-full p-2 border rounded"
                        placeholder="Mês Ano"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Depoimento</label>
                    <textarea
                      value={testimonial.text}
                      onChange={(e) => handleTestimonialChange(index, 'text', e.target.value)}
                      onBlur={handleSave}
                      className="w-full p-2 border rounded"
                      rows="4"
                      placeholder="Texto do depoimento..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">URL do Avatar (opcional)</label>
                    <input
                      type="url"
                      value={testimonial.avatar}
                      onChange={(e) => handleTestimonialChange(index, 'avatar', e.target.value)}
                      onBlur={handleSave}
                      className="w-full p-2 border rounded"
                      placeholder="https://exemplo.com/foto.jpg"
                    />
                  </div>
                </div>
              </div>

              {/* Preview do depoimento */}
              <div className="mt-3 p-3 bg-white rounded border">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {testimonial.avatar ? (
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        👤
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{testimonial.name}</span>
                      <span className="text-yellow-500 text-sm">{renderStars(testimonial.rating)}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      {testimonial.location} • {testimonial.date}
                    </div>
                    <p className="text-sm text-gray-700">{testimonial.text}</p>
                  </div>
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
          <h2 className="text-xl font-bold text-center mb-6">{title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                    👤
                  </div>
                  <div>
                    <div className="font-medium text-sm">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
                
                <div className="text-yellow-500 mb-2">{renderStars(testimonial.rating)}</div>
                <p className="text-sm text-gray-700 line-clamp-3">{testimonial.text}</p>
                <div className="text-xs text-gray-400 mt-2">{testimonial.date}</div>
              </div>
            ))}
          </div>

          {testimonials.length > 3 && (
            <div className="text-center mt-4 text-sm text-gray-500">
              ... e mais {testimonials.length - 3} depoimentos
            </div>
          )}
        </div>
      </div>
      
      <button 
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded w-full hover:bg-green-600"
      >
        Salvar Depoimentos
      </button>
    </div>
  );
}

