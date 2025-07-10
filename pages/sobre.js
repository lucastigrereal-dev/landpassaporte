export default function Sobre() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Sobre Nós
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-lg text-gray-700 mb-6">
            Somos uma empresa especializada em criar landing pages incríveis 
            que convertem visitantes em clientes.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            Nossa missão é ajudar empresas a crescer através de páginas 
            otimizadas e experiências de usuário excepcionais.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Nossa Visão
              </h3>
              <p className="text-gray-600">
                Ser referência em criação de landing pages que realmente 
                convertem e geram resultados para nossos clientes.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Nossos Valores
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Inovação constante</li>
                <li>• Foco no resultado</li>
                <li>• Qualidade excepcional</li>
                <li>• Atendimento personalizado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 