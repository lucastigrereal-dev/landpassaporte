import { FiPlus, FiLayers } from 'react-icons/fi'

export default function EditorSidebar({ 
  availableBlocks, 
  onAddBlock, 
  selectedBlock, 
  onUpdateBlock 
}) {
  return (
    <div className="sidebar w-80 fixed right-0 top-0 h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <FiLayers className="mr-2" />
          Editor
        </h2>
      </div>

      <div className="p-4">
        {/* Seção de blocos disponíveis */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <FiPlus className="mr-2" size={14} />
            Adicionar Blocos
          </h3>
          
          <div className="grid grid-cols-2 gap-2">
            {availableBlocks.map((block) => (
              <button
                key={block.type}
                onClick={() => onAddBlock(block.type)}
                className="block-item text-left"
                title={block.name}
              >
                <div className="text-lg mb-1">{block.icon}</div>
                <div className="text-xs font-medium text-gray-700">
                  {block.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Propriedades do bloco selecionado */}
        {selectedBlock && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Propriedades do Bloco
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600 mb-2">
                Tipo: <span className="font-medium">{selectedBlock.type}</span>
              </div>
              
              <div className="text-sm text-gray-600">
                ID: <span className="font-mono text-xs">{selectedBlock.id}</span>
              </div>
            </div>

            {/* Aqui você pode adicionar controles específicos para cada tipo de bloco */}
            <div className="mt-4">
              <BlockProperties 
                block={selectedBlock}
                onUpdate={onUpdateBlock}
              />
            </div>
          </div>
        )}

        {!selectedBlock && (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-2">👆</div>
            <p className="text-sm text-gray-500">
              Selecione um bloco para editar suas propriedades
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function BlockProperties({ block, onUpdate }) {
  // Controles básicos que se aplicam a todos os blocos
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Margem Superior
        </label>
        <select 
          className="w-full text-xs border border-gray-300 rounded px-2 py-1"
          defaultValue="normal"
        >
          <option value="none">Nenhuma</option>
          <option value="small">Pequena</option>
          <option value="normal">Normal</option>
          <option value="large">Grande</option>
        </select>
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Margem Inferior
        </label>
        <select 
          className="w-full text-xs border border-gray-300 rounded px-2 py-1"
          defaultValue="normal"
        >
          <option value="none">Nenhuma</option>
          <option value="small">Pequena</option>
          <option value="normal">Normal</option>
          <option value="large">Grande</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Cor de Fundo
        </label>
        <select 
          className="w-full text-xs border border-gray-300 rounded px-2 py-1"
          defaultValue="white"
        >
          <option value="white">Branco</option>
          <option value="gray">Cinza</option>
          <option value="blue">Azul</option>
          <option value="green">Verde</option>
        </select>
      </div>
    </div>
  )
}

