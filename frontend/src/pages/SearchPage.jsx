import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import SearchComponent from '../components/search/SearchComponent.jsx'

const SearchPage = () => {
  const { refreshCount, setMinimumHeader, resetToNormalHeader } = useAppStore()
  const [searchParams] = useSearchParams()

  const handleSubmit = () => {
    setMinimumHeader()
  }

  useEffect(() => {
    const keyword = searchParams.get('keyword')
    if (keyword) {
      setMinimumHeader()
    } else {
      resetToNormalHeader()
    }
  }, [searchParams, setMinimumHeader, resetToNormalHeader])

  return <SearchComponent refreshCount={refreshCount} onSubmit={handleSubmit} />
}

export default SearchPage
