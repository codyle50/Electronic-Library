import React from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { highlightPlugin, Trigger } from '@react-pdf-viewer/highlight';
import { useLocation } from 'react-router-dom';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import css
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function PDFView() {
    let { state } = useLocation();
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        toolbarPlugin: {
            fullScreenPlugin: {
                // Zoom to fit the screen after entering and exiting the full screen mode
                onEnterFullScreen: (zoom) => {
                    zoom(SpecialZoomLevel.PageFit);
                },
                onExitFullScreen: (zoom) => {
                    zoom(SpecialZoomLevel.PageFit);
                },
            },
        },
    });
    const highlightPluginInstance = highlightPlugin({
        trigger: Trigger.TextSelection,
    });

    
  return (
    <div style={{
        border: '1px solid rgba(0, 0, 0, 0.3)',
        height: '750px',
    }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={state.file} 
            plugins={[defaultLayoutPluginInstance, highlightPluginInstance]}
            />
    
        </Worker>
      
    </div>
  )
}

export default React.memo(PDFView);
