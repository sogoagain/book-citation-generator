import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import SearchComponent from './components/search/SearchComponent.jsx'

const App = () => {
  return (
    <div className='min-h-screen bg-slate-50 flex flex-col'>
      <Header />

      <main className='flex-1 max-w-2xl mx-auto w-full px-4 pb-4'>
        <SearchComponent />
      </main>

      <Footer />
    </div>
  )
}

export default App
