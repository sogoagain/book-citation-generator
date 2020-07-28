import React from 'react';

const Header = ({ onClick }) => (
  <header
    className="container"
  >
    <div
      className="row bg-light py-2 mb-3 rounded"
      onClick={onClick}
      onKeyDown={onClick}
      role="link"
      tabIndex="0"
    >
      <div className="col-md-12">
        <h3 className="text-center">도서 출처 표기 생성기</h3>
      </div>
    </div>
  </header>
);

export default Header;
