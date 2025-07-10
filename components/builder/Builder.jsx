import { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { v4 as uuidv4 } from 'uuid'
import BlockRenderer from './BlockRenderer'
import EditorSidebar from './EditorSidebar'
import { FiSave, FiPlus, FiEye } from 'react-icons/fi'

const AVAILABLE_BLOCKS = [
  { type: 'hero', name: 'Hero Section', icon: '🎯' },
  { type: 'trustBar', name: 'Barra de Confiança', icon: '⭐' },
  { type: 'problemSolution', name: 'Problema vs Solução', icon: '⚖️' },
  { type: 'calculator', name: 'Calculadora', icon: '🧮' },
  { type: 'destinationsGallery', name: 'Galeria de Destinos', icon: '🏖️' },
  { type: 'benefitsSection', name: 'Seção de Benefícios', icon: '✨' },
  { type: 'testimonials', name: 'Depoimentos', icon: '💬' },
  { type: 'faq', name: 'FAQ', icon: '❓' },
  { type: 'checkoutSection', name: 'Seção de Checkout', icon: '💳' },
  { type: 'text', name: 'Texto Simples', icon: '📝' },
  { type: 'image', name: 'Imagem', icon: '🖼️' }
]

export default function Builder({ blocks, onSave, saving }) {
  const [selectedBlock, setSelectedBlock] = useState(null)
  const [showSidebar, setShowSidebar] = useState(true)

  const addBlock = (blockType) => {
    const newBlock = {
      id: uuidv4(),
      type: blockType,
      content: getDefaultContent(blockType),
      order: blocks.length
    }
    
    const newBlocks = [...blocks, newBlock]
    onSave(newBlocks)
    setSelectedBlock(newBlock.id)
  }

  const updateBlock = (blockId, newContent) => {
    const newBlocks = blocks.map(block => 
      block.id === blockId 
        ? { ...block, content: newContent }
        : block
    )
    onSave(newBlocks)
  }

  const deleteBlock = (blockId) => {
    const newBlocks = blocks.filter(block => block.id !== blockId)
    onSave(newBlocks)
    if (selectedBlock === blockId) {
      setSelectedBlock(null)
    }
  }

  const reorderBlocks = (newBlocks) => {
    const blocksWithOrder = newBlocks.map((block, index) => ({
      ...block,
      order: index
    }))
    onSave(blocksWithOrder)
  }

  const getDefaultContent = (blockType) => {
    switch (blockType) {
      case 'hero':
        return {
          titleMain: 'Dois Paraísos.',
          titleSub: 'Um Dia.',
          titleAccent: 'Infinitas Memórias.',
          subtitle: 'O único passaporte que transforma R$120 em mais de R$250 de experiências VIP',
          availableToday: 37,
          recentSales: 12,
          ctaText: '🏖️ RESERVE SEU PARAÍSO VIP',
          countdownHours: 23,
          countdownMinutes: 47,
          countdownSeconds: 32
        }
      case 'trustBar':
        return {
          items: [
            { type: 'number', number: 5000, text: 'famílias satisfeitas' },
            { type: 'stars', stars: 5, text: '4.9★ no Google' },
            { type: 'icon', icon: 'award', text: 'Melhor experiência turística RN 2024' },
            { type: 'icon', icon: 'shield', text: 'Pagamento 100% seguro' },
            { type: 'number', number: 98, text: 'recomendação dos clientes' }
          ]
        }
      case 'text':
        return {
          content: 'Digite seu texto aqui...',
          fontSize: 'text-base',
          textAlign: 'text-left',
          textColor: 'text-gray-900'
        }
      case 'image':
        return {
          src: '',
          alt: 'Imagem',
          width: 'w-full',
          height: 'h-auto'
        }
      default:
        return {}
    }
  }

  return (
    <div className="flex h-screen">
      {/* Área principal do builder */}
      <div className={`flex-1 ${showSidebar ? 'mr-80' : ''} transition-all duration-300`}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Landing Page Builder</h1>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FiEye size={20} />
            </button>
            
            <button
              onClick={() => onSave(blocks)}
              disabled={saving}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                saving 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <FiSave className="inline mr-2" />
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>

        {/* Área de blocos */}
        <div className="p-6 overflow-y-auto" style={{ height: 'calc(100vh - 80px)' }}>
          {blocks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📄</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Sua página está vazia
              </h3>
              <p className="text-gray-500 mb-6">
                Adicione blocos para começar a construir sua landing page
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {AVAILABLE_BLOCKS.slice(0, 4).map(block => (
                  <button
                    key={block.type}
                    onClick={() => addBlock(block.type)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {block.icon} {block.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ReactSortable
              list={blocks}
              setList={reorderBlocks}
              animation={200}
              delayOnTouchStart={true}
              delay={2}
              className="space-y-4"
            >
              {blocks.map((block) => (
                <BlockRenderer
                  key={block.id}
                  block={block}
                  updateBlock={updateBlock}
                  deleteBlock={deleteBlock}
                  isSelected={selectedBlock === block.id}
                  onSelect={() => setSelectedBlock(block.id)}
                />
              ))}
            </ReactSortable>
          )}
        </div>
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <EditorSidebar
          availableBlocks={AVAILABLE_BLOCKS}
          onAddBlock={addBlock}
          selectedBlock={blocks.find(b => b.id === selectedBlock)}
          onUpdateBlock={updateBlock}
        />
      )}
    </div>
  )
}

