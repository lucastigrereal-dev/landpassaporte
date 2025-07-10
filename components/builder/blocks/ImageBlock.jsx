import React, { useState, useEffect } from 'react';
import { FiUpload, FiImage } from 'react-icons/fi';

export default function ImageBlock({ content, onSave }) {
  const [src, setSrc] = useState(content.src || '');
  const [alt, setAlt] = useState(content.alt || '');
  const [width, setWidth] = useState(content.width || 'w-full');
  const [height, setHeight] = useState(content.height || 'h-auto');

  useEffect(() => {
    setSrc(content.src || '');
    setAlt(content.alt || '');
    setWidth(content.width || 'w-full');
    setHeight(content.height || 'h-auto');
  }, [content]);

  const handleSave = () => {
    onSave({
      src,
      alt,
      width,
      height
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Aqui você implementaria o upload para Firebase Storage
      // Por enquanto, vamos usar um placeholder
      const reader = new FileReader();
      reader.onload = (e) => {
        setSrc(e.target.result);
        handleSave();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-block bg-white p-4 rounded-lg border">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Imagem</label>
        
        {!src ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FiImage className="mx-auto text-gray-400 mb-2" size={48} />
            <p className="text-gray-500 mb-4">Nenhuma imagem selecionada</p>
            
            <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
              <FiUpload className="mr-2" />
              Fazer Upload
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div className="space-y-3">
            <img
              src={src}
              alt={alt}
              className={`${width} ${height} object-cover rounded-lg border`}
            />
            
            <div className="flex space-x-2">
              <label className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-gray-600 text-white rounded cursor-pointer hover:bg-gray-700">
                <FiUpload className="mr-2" size={16} />
                Trocar Imagem
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              
              <button
                onClick={() => {
                  setSrc('');
                  handleSave();
                }}
                className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remover
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">URL da Imagem (alternativo)</label>
        <input
          type="url"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          onBlur={handleSave}
          className="w-full p-2 border rounded"
          placeholder="https://exemplo.com/imagem.jpg"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Texto Alternativo</label>
        <input
          type="text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          onBlur={handleSave}
          className="w-full p-2 border rounded"
          placeholder="Descrição da imagem"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Largura</label>
          <select
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            onBlur={handleSave}
            className="w-full p-2 border rounded"
          >
            <option value="w-full">100%</option>
            <option value="w-3/4">75%</option>
            <option value="w-1/2">50%</option>
            <option value="w-1/3">33%</option>
            <option value="w-1/4">25%</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Altura</label>
          <select
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            onBlur={handleSave}
            className="w-full p-2 border rounded"
          >
            <option value="h-auto">Automática</option>
            <option value="h-32">Pequena</option>
            <option value="h-48">Média</option>
            <option value="h-64">Grande</option>
            <option value="h-96">Muito Grande</option>
          </select>
        </div>
      </div>
    </div>
  );
}

