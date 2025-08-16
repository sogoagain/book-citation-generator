const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='mt-12 py-6 border-t border-slate-200'>
      <div className='container mx-auto px-4'>
        <div className='text-center space-y-3'>
          <div className='text-sm text-slate-600'>
            © {currentYear} 도서 학술 출처 생성기
          </div>
          <div className='text-xs text-slate-500'>APA 7판 · MLA 9판 지원</div>
          <div className='text-xs text-slate-400 mt-2'>
            생성된 인용문은 검토 후 사용하세요
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
