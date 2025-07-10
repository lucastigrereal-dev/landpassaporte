import React, { useState, useEffect } from 'react';

export default function TextBlock({ content, onSave }) {
  const [text, setText] = useState(content.content || '');
  const [fontSize, setFontSize] = useState(content.fontSize || 'text-base');
  const [textAlign, setTextAlign] = useState(content.textAlign || 'text-left');
  const [textColor, setTextColor] = useState(content.textColor || 'text-gray-900');

  useEffect(() => {
    setText(content.content || '');
    setFontSize(content.fontSize || 'text-base');
    setTextAlign(content.textAlign || 'text-left');
    setTextColor(content.textColor || 'text-gray-900');
  }, [content]);

  const handleSave = () => {
    onSave({
      content: text,
      fontSize,
      textAlign,
      textColor
    });
  };

  return (
    <div className="text-block bg-white p-4 rounded-lg border">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Conteúdo</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleSave}
          className="w-full p-3 border rounded-lg min-h-[100px]"
          placeholder="Digite seu texto aqui..."
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Tamanho</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            onBlur={handleSave}
            className="w-full p-2 border rounded"
          >
            <option value="text-xs">Muito Pequeno</option>
            <option value="text-sm">Pequeno</option>
            <option value="text-base">Normal</option>
            <option value="text-lg">Grande</option>
            <option value="text-xl">Muito Grande</option>
            <option value="text-2xl">Extra Grande</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Alinhamento</label>
          <select
            value={textAlign}
            onChange={(e) => setTextAlign(e.target.value)}
            onBlur={handleSave}
            className="w-full p-2 border rounded"
          >
            <option value="text-left">Esquerda</option>
            <option value="text-center">Centro</option>
            <option value="text-right">Direita</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cor</label>
          <select
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            onBlur={handleSave}
            className="w-full p-2 border rounded"
          >
            <option value="text-gray-900">Preto</option>
            <option value="text-gray-600">Cinza</option>
            <option value="text-blue-600">Azul</option>
            <option value="text-green-600">Verde</option>
            <option value="text-red-600">Vermelho</option>
          </select>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-4 p-3 bg-gray-50 rounded">
        <p className={`${fontSize} ${textAlign} ${textColor}`}>
          {text || 'Preview do texto...'}
        </p>
      </div>
    </div>
  );
}

