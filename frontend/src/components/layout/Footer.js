import React from 'react';

const Footer = () => (
  <footer
    className="mt-3 bg-light fixed-bottom"
  >
    <div className="container py-0 text-center rounded">
      <p className="text-muted my-0 text-truncate">
        Developed and designed by
        <a className="badge badge-light" href="https://github.com/sogoagain/">sogoagain</a>
        .
      </p>
      <p className="text-muted my-0 text-truncate">
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
