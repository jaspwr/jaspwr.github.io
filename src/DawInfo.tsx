import "./DawInfo.css";

const DawInfo = () => {
  return (
    <div className="daw-container">
      <p>
        This project is a work in progress digital audio workstation with Vim inspired keyboard shortcuts. Features a custom UI library written in OpenGL and SDL2 and a custom audio engine built on Rust Tokio and the VST2 and VST3 SDKs. Unique features include very extensive modal shortcuts system, Git-like undo/redo system with branching, automatic track freezing, vscode-like command palette, and a multiplayer mode for collaborating on projects.
      </p>
      <img src="previews/daw.png" alt="DAW Preview" />
      <p>
        There is also a custom markup language created inside of rust macros inpsired by Svelte with syntax like the following:
      </p>
      <pre>
        <code>
          {`use super::OtherComponent;
use crate::reactive::Reactive;
use ui_macro::markup;

pub struct Props {}

markup! {
    <div>
        <h1> Hello, world! </h1>
    </div>

    <script>
        let count = Reactive::new(0);
        let count_cpy = count.clone();
    </script>

    <button
        onclick={move |_| {
            count_cpy.set(count_cpy.get() + 1);
        }}
    >
        hello {$count}
    </button>

    {#if ($count % 2 == 0)}
        Count is even
    {/if}

    <OtherComponent
        some_prop={\"foo\"}
    />

    {#for i in 0..20}
        <span>{i}</span>
    {/for}
}`}
        </code> 
      </pre>
    </div>
  );
};

export default DawInfo;
