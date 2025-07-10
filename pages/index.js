import { useState, useEffect } from 'react'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import Builder from '../components/builder/Builder'
import toast from 'react-hot-toast'

export default function Home() {
  const [blocks, setBlocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Carregar blocos do Firebase
  useEffect(() => {
    loadBlocks()
  }, [])

  const loadBlocks = async () => {
    try {
      const docRef = doc(db, 'pages', 'landing-page')
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        const data = docSnap.data()
        setBlocks(data.blocks || [])
      } else {
        // Criar documento inicial se não existir
        const initialBlocks = []
        await setDoc(docRef, { blocks: initialBlocks })
        setBlocks(initialBlocks)
      }
    } catch (error) {
      console.error('Erro ao carregar blocos:', error)
      toast.error('Erro ao carregar a página')
    } finally {
      setLoading(false)
    }
  }

  const saveBlocks = async (newBlocks) => {
    setSaving(true)
    try {
      const docRef = doc(db, 'pages', 'landing-page')
      await setDoc(docRef, { 
        blocks: newBlocks,
        updatedAt: new Date()
      })
      setBlocks(newBlocks)
      toast.success('Página salva com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar blocos:', error)
      toast.error('Erro ao salvar a página')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="builder-container">
      <Builder 
        blocks={blocks}
        onSave={saveBlocks}
        saving={saving}
      />
    </div>
  )
}

