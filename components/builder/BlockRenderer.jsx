import { FiMove, FiTrash2, FiEdit3 } from 'react-icons/fi'
import HeroBlock from './blocks/HeroBlock'
import TrustBarBlock from './blocks/TrustBarBlock'
import ProblemSolutionBlock from './blocks/ProblemSolutionBlock'
import CalculatorBlock from './blocks/CalculatorBlock'
import DestinationsGalleryBlock from './blocks/DestinationsGalleryBlock'
import BenefitsSectionBlock from './blocks/BenefitsSectionBlock'
import TestimonialsBlock from './blocks/TestimonialsBlock'
import FAQBlock from './blocks/FAQBlock'
import CheckoutSectionBlock from './blocks/CheckoutSectionBlock'
import TextBlock from './blocks/TextBlock'
import ImageBlock from './blocks/ImageBlock'

export default function BlockRenderer({ 
  block, 
  updateBlock, 
  deleteBlock, 
  isSelected, 
  onSelect 
}) {
  const handleSave = (newContent) => {
    updateBlock(block.id, newContent)
  }

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir este bloco?')) {
      deleteBlock(block.id)
    }
  }

  const renderBlock = () => {
    switch (block.type) {
      case 'hero':
        return <HeroBlock content={block.content} onSave={handleSave} />
      case 'trustBar':
        return <TrustBarBlock content={block.content} onSave={handleSave} />
      case 'problemSolution':
        return <ProblemSolutionBlock content={block.content} onSave={handleSave} />
      case 'calculator':
        return <CalculatorBlock content={block.content} onSave={handleSave} />
      case 'destinationsGallery':
        return <DestinationsGalleryBlock content={block.content} onSave={handleSave} />
      case 'benefitsSection':
        return <BenefitsSectionBlock content={block.content} onSave={handleSave} />
      case 'testimonials':
        return <TestimonialsBlock content={block.content} onSave={handleSave} />
      case 'faq':
        return <FAQBlock content={block.content} onSave={handleSave} />
      case 'checkoutSection':
        return <CheckoutSectionBlock content={block.content} onSave={handleSave} />
      case 'text':
        return <TextBlock content={block.content} onSave={handleSave} />
      case 'image':
        return <ImageBlock content={block.content} onSave={handleSave} />
      default:
        return (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">Bloco não suportado: {block.type}</p>
          </div>
        )
    }
  }

  return (
    <div 
      className={`block-editor ${isSelected ? 'active' : ''}`}
      onClick={onSelect}
    >
      {/* Toolbar do bloco */}
      <div className="flex justify-between items-center mb-4 opacity-0 hover:opacity-100 transition-opacity">
        <div className="flex items-center space-x-2">
          <FiMove className="text-gray-400 cursor-move" size={16} />
          <span className="text-sm text-gray-500 font-medium">
            {getBlockName(block.type)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onSelect()
            }}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            title="Editar"
          >
            <FiEdit3 size={16} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete()
            }}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Excluir"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      {/* Conteúdo do bloco */}
      <div className="block-content">
        {renderBlock()}
      </div>
    </div>
  )
}

function getBlockName(type) {
  const names = {
    hero: 'Hero Section',
    trustBar: 'Barra de Confiança',
    problemSolution: 'Problema vs Solução',
    calculator: 'Calculadora',
    destinationsGallery: 'Galeria de Destinos',
    benefitsSection: 'Seção de Benefícios',
    testimonials: 'Depoimentos',
    faq: 'FAQ',
    checkoutSection: 'Seção de Checkout',
    text: 'Texto',
    image: 'Imagem'
  }
  return names[type] || type
}

