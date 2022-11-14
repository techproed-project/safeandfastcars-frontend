import React from "react";
import {Container} from "react-bootstrap"
import {settings} from "../../../../utils/settings"
const Map = () => {
  return (
    <Container fluid className="p-0 overflow-hidden">
      <iframe
        title={settings.siteName}
        src={settings.mapEmbedUrl}
        width="100%"
        height="500px"
        style={{border:"0"}}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Container>
  );
};

export default Map;
