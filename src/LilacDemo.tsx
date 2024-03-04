import React, { useEffect } from "react";
import Editor from "@monaco-editor/react";

// import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";

//@ts-ignore
import init, { wasm_compile, new_file } from "./lilacdemo/lilac";

import "./lilacDemo.css";

const ROOT_DEFAULT: string = `<script>
    let text = state("");

    const list = lstate([]);

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
  Todo List.
</marquee>

<div>
    {$list.length} item{$list.length !== 1 ? "s" : ""} in list.
</div>

<input id="input" type="text" bind={text}/>
<button onclick={add}>Add to list.</button>

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

const LIST_ITEM_DEFAULT: string = `<script>
    const done = state(false);
</script>

<li>
    <input type="checkbox" bind={done}/> 
    <span style={$done ? "text-decoration: line-through;" : ""}>
	{props.name}
	<button onclick={props.delete}>delete</button>
    </span>
</li>
`;

type File = {
  name: string;
  content: string;
};

const LilacDemo = () => {
  let [files, setFiles] = React.useState([{ name: "Root", content: ROOT_DEFAULT }, { name: "ListItem", content: LIST_ITEM_DEFAULT }] as File[]);
  let [selectedFile, setSelectedFile] = React.useState("Root");
  let [ready, setReady] = React.useState(false);

  useEffect(() => {
    init().then(() => {
      setReady(true);
    });
  }, []);

  // const tex = ready ? wasm_compile(lilac) : "Loading compiler...";
  const html = ready ? wasm_compile(files.map(f => new_file(f.name, f.content))) : "<i>Loading compiler...</li>";

  const tabs = files.map((file) => {
    return (
      <span
        key={file.name}
        className={`lilac-tab ${selectedFile === file.name ? "lilac-tab-selected" : ""}`}
        onClick={() => setSelectedFile(file.name)}
      >
        {file.name}
      </span>
    );
  });


  return (
    <>
      <div className="lilac-demo-container">
        <div className="lilac-output">
          <iframe
            srcDoc={html}
          />
        </div>
        <div className="lilac-input">
          <div className="lilac-tabs">{tabs}</div>
          <Editor
            language="html"
            theme="vs-dark"
            value={files.find((file) => file.name === selectedFile)?.content || ""}
            onChange={(e) => {
              if (e === undefined) return;

              const newFiles = files.map((file) => {
                if (file.name === selectedFile) {
                  return { name: file.name, content: e };
                }
                return file;
              });

              setFiles(newFiles);
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

