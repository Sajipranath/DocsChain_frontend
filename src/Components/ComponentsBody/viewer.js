import React, { useEffect, useRef,useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import PropTypes from 'prop-types';
import '../Styles/pdfviewer.css';

const Viewer = ({ downloadLink ,fileName}) => {
  const viewerRef = useRef(null);
  const [vw, setVW] = useState();

  useEffect(() => {  
       

    const createWebViewerInstance = async () => {
      const viewerElement = viewerRef.current;
      const instance = await WebViewer({
        path: '/webviewer',
        initialDoc: downloadLink,
        fileName:fileName,
        licenseKey: 'demo:1687175891385:7d9c106e03000000006fe29497daf9d85e8c3ea7cd714e1733a355aee0'
      }, viewerElement)

      const { documentViewer, annotationManager, Annotations } = instance.Core;

    
    };

    createWebViewerInstance();

    return () => {
      // Cleanup WebViewer instance here if needed
    };
  }, [downloadLink,fileName]);

  return (

    <div className="PdfViewer">
      {/* <div className="header">Document Viewer</div> */}
      <div className="webviewer" ref={viewerRef}></div>
    </div>
  );
};

Viewer.propTypes = {
  downloadLink: PropTypes.string.isRequired
  
};

export default Viewer;
