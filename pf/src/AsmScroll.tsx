import React, { useState, useEffect } from "react";
import "./AsmScroll.css";

const TEXT = `main:
  call load_file
  call solve

  mov rax, 60
  mov rdi, 0
  syscall

solve:
  push rbp
  mov rbp, rsp
  sub rsp, 8000

  mov qword [rbp - 8], rax

  mov qword [rbp - 16], 0


__seedLoop:
  mov rax, qword [rbp - 8]
  cmp byte [rax], 10
  je __seedBreak

  mov rax, qword [rbp - 8]
  call skipNonDigit
  mov qword [rbp - 8], rax

  mov rax, qword [rbp - 8]
  call parseNum

  mov rdx, qword [rbp - 16]
  add rdx, 1
  mov qword [rbp - 16], rdx

  sub rdx, 1
  imul rdx, 8
  lea rcx, qword [rbp - 24]
  sub rcx, rdx

  mov qword [rcx], rax

  mov rcx, qword [rbp - 8]
  add rcx, rbx
  mov qword [rbp - 8], rcx

  jmp __seedLoop
__seedBreak:

  ; seed counter
  mov qword [rbp - 272], 0

  mov rax, qword [rbp - 8]
  mov qword [rbp - 280], rax

__startTransformations:

  call print_divider

  lea rax, qword [rbp - 24]
  mov rbx, qword [rbp - 272]
  imul rbx, 8
  sub rax, rbx
  mov qword [rbp - 264], rax

__transformationLoop:

  mov qword [rbp - 240], 0
  mov qword [rbp - 248], 0
  mov qword [rbp - 256], 0

  mov rax, qword [rbp - 8]
  call skipNonDigit

  cmp byte [rax], 0
  je __breakTransformationLoop

  mov qword [rbp - 8], rax

  call parseNum
  mov rcx, qword [rbp - 8]
  add rcx, rbx
  mov qword [rbp - 8], rcx
  mov qword [rbp - 240], rax

  mov rax, qword [rbp - 8]
  call skipNonDigit
  mov qword [rbp - 8], rax

  call parseNum
  mov rcx, qword [rbp - 8]
  add rcx, rbx
  mov qword [rbp - 8], rcx
  mov qword [rbp - 248], rax

  mov rax, qword [rbp - 8]
  call skipNonDigit
  mov qword [rbp - 8], rax

  call parseNum
  mov rcx, qword [rbp - 8]
  add rcx, rbx
  mov qword [rbp - 8], rcx
  mov qword [rbp - 256], rax

  mov rdx, qword [rbp - 264]
  mov rax, qword [rdx]
  mov rdi, rax
  call print

  mov rdx, qword [rbp - 264]
  mov rax, qword [rdx]

  cmp rax, qword [rbp - 248]
  jl __d

  mov rbx, qword [rbp - 256]
  add rbx, qword [rbp - 248]
  sub rbx, 1
  cmp rax, rbx;
  jg __d

  mov rbx, qword [rbp - 240]
  sub rbx, qword [rbp - 248]

  add rax, rbx

  mov qword [rdx], rax

  mov rax, qword [rbp - 8]
  call findColonOrEOF
  mov qword [rbp - 8], rax


__d:

  jmp __transformationLoop
__breakTransformationLoop:

  mov rax, qword [rbp - 280]
  mov qword [rbp - 8], rax

  mov rax, qword [rbp - 272]
  add rax, 1
  mov qword [rbp - 272], rax
  cmp rax, qword [rbp - 16]
  jne __startTransformations


  call print_divider
  mov qword [rbp - 288], 0xffffffffffffffff

__minLoop:
  mov rax, qword [rbp - 16]
  sub rax, 1
  mov qword [rbp - 16], rax

  cmp rax, -1
  je __minBreak

  imul rax, 8
  lea rbx, qword [rbp - 24]
  sub rbx, rax

  ; see if smaller and replace
  mov rax, qword [rbx]
  cmp rax, qword [rbp - 288]
  jg __g
  mov qword [rbp - 288], rax
__g:

  mov rdi, qword [rbx]
  call print

  jmp __minLoop
__minBreak:


  call print_divider

  mov rdi, qword [rbp - 288]
  call print

  add rsp, 8000
  pop rbp
  ret


skipNonDigit:
  ; takes string pointer rax and increments it until not pointing to whitespace
__nonDigSkipLoop:
  cmp byte [rax], 0
  je __nonDigSkipBreak
  cmp byte [rax], 48
  jl __a
  cmp byte [rax], 57
  jg __a
  jmp __nonDigSkipBreak
__a:

  add rax, 1

  jmp __nonDigSkipLoop
__nonDigSkipBreak:
  ret

findColonOrEOF:
  __emptyLineLoop:
  cmp byte [rax], 0
  je __empytLineBreak
  cmp byte [rax], ':'
  je __empytLineBreak

  add rax, 1

  jmp __emptyLineLoop
  __empytLineBreak:
  ret

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

const AsmScroll = () => {
  const [scrollPos, setScrollPos] = useState(0);

  const textStyle: React.CSSProperties = {
    fontFamily: "Tamzen",
    fontSize: "0.9rem",
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
};

export default AsmScroll;
