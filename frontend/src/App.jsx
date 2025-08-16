import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useAppStore } from './store/useAppStore'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import SearchPage from './pages/SearchPage.jsx'
import BookDetailPage from './pages/BookDetailPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

const AppContent = () => {
  const { headerMode, resetToNormalHeader } = useAppStore()
  const navigate = useNavigate()

  const handleHeaderClick = () => {
    resetToNormalHeader()
    navigate('/')
  }

  return (
    <div className='min-h-screen bg-slate-50 flex flex-col'>
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40'
      >
        메인 콘텐츠로 바로가기
      </a>

      <Header mode={headerMode} onClick={handleHeaderClick} />

      <main
        id='main-content'
        className='flex-1 max-w-4xl mx-auto w-full px-4 py-4'
        role='main'
      >
        <Routes>
          <Route path='/' element={<SearchPage />} />
          <Route path='/book/:bookId' element={<BookDetailPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
