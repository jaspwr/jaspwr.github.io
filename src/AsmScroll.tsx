import React, { useState, useEffect, memo } from "react";
import "./AsmScroll.css";

const TEXT = `main:
  call load_file
  call solve

  mov rax, 60
  mov rdi, 0
  syscall

parseNum:
  push rbp
  mov rbp, rsp
  sub rsp, 24

  ; string pointer
  mov qword [rbp - 8], rax

  ; num buffer
  mov qword [rbp - 16], 0

  ; length
  mov qword [rbp - 24], 0

__parseLoop:

  mov rax, qword [rbp - 8]
  cmp byte [rax], '0'
  jl __parseBreak
  cmp byte [rax], '9'
  jg __parseBreak

  mov rax, qword [rbp - 16]
  imul rax, 10

  mov rcx, qword [rbp - 8]
  movzx rbx, byte [rcx]
  sub rbx, '0'
  add rax, rbx

  mov qword [rbp - 16], rax

  add qword [rbp - 24], 1

  mov rax, qword [rbp - 8]
  add rax, 1
  mov qword [rbp - 8], rax

  jmp __parseLoop
__parseBreak:

  mov rax, qword [rbp - 16]
  mov rbx, qword [rbp - 24]

  add rsp, 24
  pop rbp
  ret`;

const AsmScroll = memo(() => {
  const [scrollPos, setScrollPos] = useState(0);

  const textStyle: React.CSSProperties = {
    fontFamily: "Tamzen",
    fontSize: "0.95rem",
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setScrollPos((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const spl = TEXT.split("\n");
  const displayText = spl.slice(scrollPos % spl.length);
  displayText.push(...spl);

  return (
    <div className="asm-scroll bg-element">
      <div className="asm-overlay"></div>
      <pre style={textStyle}>{displayText.join("\n")}</pre>
    </div>
  );
});

export default AsmScroll;
