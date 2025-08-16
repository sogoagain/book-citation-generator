const Header = ({ mode, onClick }) => {
  const isMinimized = mode?.marginTop === '16px'

  return (
    <header
      className={`transition-all duration-300 ${isMinimized ? 'py-3' : 'py-6'}`}
      style={mode}
      role='banner'
    >
      <div className='container mx-auto px-4'>
        <div className='text-center'>
          <button
            onClick={onClick}
            className='cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/40 rounded-lg p-2 -m-2'
            aria-label='홈페이지로 이동'
          >
            <h1
              className={`font-bold text-slate-800 ${
                isMinimized ? 'text-xl' : 'text-2xl'
              }`}
            >
              도서 학술 출처 생성기
            </h1>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
