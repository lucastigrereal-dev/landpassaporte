import React, { useState, useEffect } from 'react';

export default function DestinationsGalleryBlock({ content, onSave }) {
  const [title, setTitle] = useState(content.title || 'Conheça os dois paraísos que você vai visitar');
  const [destinations, setDestinations] = useState(content.destinations || [
    {
      name: "Piscinas Naturais de Camurupim",
      description: "As piscinas naturais mais premiadas do litoral sul",
      activities: ["Pedalinho", "Caiaque", "Stand-up Paddle", "Mergulho livre"],
      image: "",
      highlights: ["Águas cristalinas", "Peixes coloridos", "Estrutura completa"]
    },
    {
      name: "Lagoa de Arituba",
      description: "Lagoa com a melhor estrutura do RN",
      activities: ["Aerobunda", "Lounges VIP", "Massagem", "Bar aquático"],
      image: "",
      highlights: ["Tirolesa aquática", "Área VIP exclusiva", "Drinks inclusos"]
    }
  ]);

  useEffect(() => {
    setTitle(content.title || 'Conheça os dois paraísos que você vai visitar');
    setDestinations(content.destinations || []);
  }, [content]);

  const handleSave = () => {
    onSave({ title, destinations });
  };

  const handleDestinationChange = (index, field, value) => {
    const newDests = [...destinations];
    newDests[index] = { ...newDests[index], [field]: value };
    setDestinations(newDests);
  };

  const handleActivityChange = (destIndex, activityIndex, value) => {
    const newDests = [...destinations];
    const newActivities = [...newDests[destIndex].activities];
    newActivities[activityIndex] = value;
    newDests[destIndex] = { ...newDests[destIndex], activities: newActivities };
    setDestinations(newDests);
  };

  const handleHighlightChange = (destIndex, highlightIndex, value) => {
    const newDests = [...destinations];
    const newHighlights = [...newDests[destIndex].highlights];
    newHighlights[highlightIndex] = value;
    newDests[destIndex] = { ...newDests[destIndex], highlights: newHighlights };
    setDestinations(newDests);
  };

  const addActivity = (destIndex) => {
    const newDests = [...destinations];
    newDests[destIndex].activities.push('Nova atividade');
    setDestinations(newDests);
  };

  const removeActivity = (destIndex, activityIndex) => {
    const newDests = [...destinations];
    newDests[destIndex].activities = newDests[destIndex].activities.filter((_, i) => i !== activityIndex);
    setDestinations(newDests);
  };

  const addHighlight = (destIndex) => {
    const newDests = [...destinations];
    newDests[destIndex].highlights.push('Novo destaque');
    setDestinations(newDests);
  };

  const removeHighlight = (destIndex, highlightIndex) => {
    const newDests = [...destinations];
    newDests[destIndex].highlights = newDests[destIndex].highlights.filter((_, i) => i !== highlightIndex);
    setDestinations(newDests);
  };

  const addDestination = () => {
    setDestinations([...destinations, {
      name: 'Novo Destino',
      description: 'Descrição do destino',
      activities: ['Atividade 1'],
      image: '',
      highlights: ['Destaque 1']
    }]);
  };

  const removeDestination = (index) => {
    if (destinations.length <= 1) return;
    setDestinations(destinations.filter((_, i) => i !== index));
  };

  return (
    <div className="destinations-gallery-block bg-white p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Galeria de Destinos</h3>
        <button 
          onClick={addDestination}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          + Destino
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
          placeholder="Conheça os dois paraísos que você vai visitar"
        />
      </div>
      
      <div className="space-y-6">
        {destinations.map((destination, destIndex) => (
          <div key={destIndex} className="border p-4 rounded-lg bg-blue-50">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-blue-800">Destino {destIndex + 1}</h4>
              <button 
                onClick={() => removeDestination(destIndex)}
                className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                disabled={destinations.length <= 1}
              >
                Remover
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome do Destino</label>
                  <input
                    type="text"
                    value={destination.name}
                    onChange={(e) => handleDestinationChange(destIndex, 'name', e.target.value)}
                    onBlur={handleSave}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Descrição</label>
                  <textarea
                    value={destination.description}
                    onChange={(e) => handleDestinationChange(destIndex, 'description', e.target.value)}
                    onBlur={handleSave}
                    className="w-full p-2 border rounded"
                    rows="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">URL da Imagem</label>
                  <input
                    type="url"
                    value={destination.image}
                    onChange={(e) => handleDestinationChange(destIndex, 'image', e.target.value)}
                    onBlur={handleSave}
                    className="w-full p-2 border rounded"
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium">Atividades</label>
                    <button 
                      onClick={() => addActivity(destIndex)}
                      className="text-sm bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      + Atividade
                    </button>
                  </div>
                  
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {destination.activities.map((activity, activityIndex) => (
                      <div key={activityIndex} className="flex items-center">
                        <input
                          type="text"
                          value={activity}
                          onChange={(e) => handleActivityChange(destIndex, activityIndex, e.target.value)}
                          onBlur={handleSave}
                          className="flex-1 p-1 border rounded text-sm"
                        />
                        <button 
                          onClick={() => removeActivity(destIndex, activityIndex)}
                          className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium">Destaques</label>
                    <button 
                      onClick={() => addHighlight(destIndex)}
                      className="text-sm bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      + Destaque
                    </button>
                  </div>
                  
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {destination.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex items-center">
                        <input
                          type="text"
                          value={highlight}
                          onChange={(e) => handleHighlightChange(destIndex, highlightIndex, e.target.value)}
                          onBlur={handleSave}
                          className="flex-1 p-1 border rounded text-sm"
                        />
                        <button 
                          onClick={() => removeHighlight(destIndex, highlightIndex)}
                          className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium mb-3">Preview:</h4>
        <div className="bg-white p-4 rounded">
          <h2 className="text-xl font-bold text-center mb-6">{title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destinations.map((destination, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                {destination.image && (
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-3">
                  <h3 className="font-bold text-blue-600 mb-1">{destination.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{destination.description}</p>
                  
                  <div className="mb-2">
                    <div className="text-xs font-medium text-gray-700 mb-1">Atividades:</div>
                    <div className="flex flex-wrap gap-1">
                      {destination.activities.slice(0, 3).map((activity, i) => (
                        <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {activity}
                        </span>
                      ))}
                      {destination.activities.length > 3 && (
                        <span className="text-xs text-gray-500">+{destination.activities.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-gray-700 mb-1">Destaques:</div>
                    <div className="space-y-1">
                      {destination.highlights.slice(0, 2).map((highlight, i) => (
                        <div key={i} className="text-xs text-green-600">✓ {highlight}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded w-full hover:bg-green-600"
      >
        Salvar Galeria
      </button>
    </div>
  );
}

