import React, { useEffect } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';

import init, { wasm_compile } from "./liademo/lia";

import "./LiADemo.css";

const DEFAULT: string = `\\documentclass{article}

use amsmath, blindtext, [utf8]inputenc, [margin=0.6in]geometry

# Hello, World!
This is a document.
* This is a list.
* {
    eq* {
        a / b = +- c
    }
}

use framed
env framed {
    \\blindtext
}

`

const LiADemo = () => {
  let [lia, setLia] = React.useState(DEFAULT);
  let [ready, setReady] = React.useState(false);

  useEffect(() => {
    init().then(() => {
      setReady(true);
    });
  }, []);

  const tex = ready ? wasm_compile(lia) : "Loading compiler...";

  return (
    <>
      <div className="lia-demo-container">
        <div className="lia-input-title heading-text">Input LiA</div>
        <div className="lia-output-title heading-text">Transpiled TeX</div>
        <div className="latex-render-title heading-text">Rendered LaTeX</div>
        <div className="latex-render">
          <div className="lia-demo-block"></div>
        </div>
        <div className="lia-output">
          <div className="lia-demo-block">
          <SyntaxHighlighter language="tex" style={nord} wrapLines={true}>
            {tex}
          </SyntaxHighlighter>
          </div>
        </div>
        <div className="lia-input">
          <textarea
            className="lia-input-field lia-demo-block"
            value={lia}
            onChange={(e) => setLia(e.target.value)}
          />
        </div>
        <div className="lia-arrow-1">&gt;</div>
        <div className="lia-arror-2">&gt;</div>
      </div>
    </>
  );
};

export default LiADemo;
