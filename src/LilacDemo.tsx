import React, { useEffect } from "react";
import Editor from "@monaco-editor/react";

import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";

// import init, { wasm_compile } from "./lilacdemo/lilac";

import "./lilacDemo.css";

const DEFAULT: string = `
<script>
    let text = state("");

    const list = lstate([[123, "hi"], [123123, "h"]]);

    let key = 0;

    const add = () => {
        if (text.value.length == 0) return;

        list.push([key++, text.value]);
        text.set(() => "");
    }

    const remove = (key) => {
        list.findAndRemove(([k, _]) => k === key);
    }

</script>

<marquee id="bl" class="blue-text">
    TODOOOOOOOO LIIIIISSSTTTTTT	
</marquee>

<div>
    {$list.length} item{$list.length !== 1 ? "s" : ""} in list.
</div>

<input id="input" type="text" bind={text}/>
<button onclick={add}>Click Me!</button>

<ul>
{#for i in $lstate list}
    <ListItem name={i[1]} delete={() => remove(i[0]) } />
{/for}
</ul>

<style>
    #bl {
	font-size: 30px;
    }

    div {
	color: red;
    }

    .blue-text {
	color: blue;
    }
</style>
`;

const LilacDemo = () => {
  let [lilac, setlilac] = React.useState(DEFAULT);
  let [ready, setReady] = React.useState(false);

  useEffect(() => {
    // init().then(() => {
    setReady(true);
    // });
  }, []);

  // const tex = ready ? wasm_compile(lilac) : "Loading compiler...";
  const html = "<i>Loading compiler...</li>";

  return (
    <>
      <div className="lilac-demo-container">
        <div className="lilac-output">
          <iframe
            srcDoc={html}
            title="Lilac output" />
        </div>
        <div className="lilac-input">
          <Editor
            language="html"
            theme="vs-dark"
            value={lilac}
            onChange={(e) => {
              if (e === undefined) return;
              setlilac(e);
            }}
          />
          {/* <textarea
            className="lilac-input-field lilac-demo-block"
            value={lilac}
            onChange={(e) => setlilac(e.target.value)}
          /> */}
        </div>
      </div>
    </>
  );
};

export default LilacDemo;

