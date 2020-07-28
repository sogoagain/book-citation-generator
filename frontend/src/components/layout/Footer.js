import React from 'react';

import developerProfile from '../../assets/documents/developer-profile';
import poweredBy from '../../assets/documents/powered-by';

const Footer = () => (
  <footer
    className="mt-3 bg-light fixed-bottom"
  >
    <div className="container py-0 text-center rounded">
      <p className="text-muted my-0 text-truncate">
        Developed and designed by
        <a className="badge badge-light" href={developerProfile.link}>{developerProfile.title}</a>
        .
      </p>
      <p className="text-muted my-0 text-truncate">
        Powered by
        {poweredBy.map((powered, index) => (
          <span key={powered.id}>
            <a className="badge badge-light" href={powered.link}>{powered.title}</a>
            {index === poweredBy.length - 1 ? '.' : ','}
          </span>
        ))}
      </p>
    </div>
  </footer>
);

export default Footer;
