import React from 'react';

const Footer = () => (
  <footer>
    <div className="container bg-light py-2 text-center rounded">
      <p className="text-muted my-1">
        Developed and designed by
        <a className="badge badge-light" href="https://github.com/sogoagain/">sogoagain</a>
        .
      </p>
      <p className="text-muted">
        Powered by
        <a className="badge badge-light" href="https://www.daum.net/">kakao</a>
        ,
        <a className="badge badge-light" href="https://getbootstrap.com/">bootstrap</a>
        ,
        <a className="badge badge-light" href="https://reactjs.org/">React</a>
        ,
        <a className="badge badge-light" href="https://react-icons.github.io/react-icons/">React Icons</a>
        .
      </p>
    </div>
  </footer>
);

export default Footer;
