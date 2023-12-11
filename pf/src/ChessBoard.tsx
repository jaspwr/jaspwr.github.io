import { ChangeEvent, useEffect, useRef } from "react";
import PopoutToggle from "./PopoutToggle";
import "./ChessBoard.css";

const ChessBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let whiteSquaresColour = "#ffffff";
  let blackSquaresColour = "#ffaaaa";
  let rerenderBoard = () => {};

  const blackSquaresColourChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    blackSquaresColour = newColor;
    rerenderBoard();
  };

  const whiteSquaresColourChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    whiteSquaresColour = newColor;
    rerenderBoard();
  };

  useEffect(() => {
    // Prevents multiple loads. useEffect does this sometimes in dev mode
    // for some bizarre reason.
    const engineWorker = new Worker("engineWorker.js");

    // type Move = {
    //   from: number;
    //   to: number;
    //   promo?: number;
    // };

    const squareIdToCoords = (id: number) => {
      const x = id % 8;
      const y = Math.floor(id / 8);
      return { x, y };
    };

    const coordsToSquareId = (x: number, y: number) => {
      if (x < 0 || x > 7 || y < 0 || y > 7) return -1;
      return y * 8 + x;
    };

    const positionToNotation = (pos: number) => {
      const { x, y } = squareIdToCoords(pos);
      return String.fromCharCode(97 + x) + (8 - y);
    };

    const notationToPosition = (notation: string) => {
      const x = notation.charCodeAt(0) - 97;
      const y = 8 - parseInt(notation[1]);
      return coordsToSquareId(x, y);
    };

    const moveToNotation = (from: number, to: number) => {
      return positionToNotation(from) + positionToNotation(to);
    };

    const NotationToMove = (notation: string) => {
      const from = notationToPosition(notation.slice(0, 2));
      const to = notationToPosition(notation.slice(2, 4));
      return { from, to };
    };

    const size = { width: 500, height: 500 };

    const squareSideLength = size.width / 8;

    const board = canvasRef.current;

    if (!board) return;

    const ctx = board.getContext("2d");

    if (!ctx) return;

    const P_BKING = 0;
    const P_WKING = 1;
    const P_BQUEEN = 2;
    const P_WQUEEN = 3;
    const P_BROOK = 4;
    const P_WROOK = 5;
    const P_BBISHOP = 6;
    const P_WBISHOP = 7;
    const P_BKNIGHT = 8;
    const P_WKNIGHT = 9;
    const P_BPAWN = 10;
    const P_WPAWN = 11;

    const imagesLinks = [
      "pieces/Chess_kdt45.svg",
      "pieces/Chess_klt45.svg",
      "pieces/Chess_qdt45.svg",
      "pieces/Chess_qlt45.svg",
      "pieces/Chess_rdt45.svg",
      "pieces/Chess_rlt45.svg",
      "pieces/Chess_bdt45.svg",
      "pieces/Chess_blt45.svg",
      "pieces/Chess_ndt45.svg",
      "pieces/Chess_nlt45.svg",
      "pieces/Chess_pdt45.svg",
      "pieces/Chess_plt45.svg",
    ];

    let loadedImages = 0;

    type GameState = {
      squares: (number | null)[];
      turn: number;
      enpassant: number | null;
      castleRights: {
        white: {
          king: boolean;
          queen: boolean;
        };
        black: {
          king: boolean;
          queen: boolean;
        };
      };
    };

    const gs: GameState = {
      squares: new Array(64).fill(null),
      turn: 0,
      enpassant: null,
      castleRights: {
        white: {
          king: true,
          queen: true,
        },
        black: {
          king: true,
          queen: true,
        },
      },
    };

    const drawTiles = (
      ctx: CanvasRenderingContext2D,
      highlights: number[] | undefined
    ) => {
      for (let i: number = 0; i < 64; i++) {
        const { x, y } = squareIdToCoords(i);
        const col = x % 2 == 0 ? y % 2 == 0 : (y + 1) % 2 == 0;

        if (highlights && highlights.includes(i)) {
          ctx.fillStyle = col ? "#aaaaaa" : "#aaaaaa";
        } else {
          ctx.fillStyle = col ? blackSquaresColour : whiteSquaresColour;
        }

        const edgeBulk = 1; // Prevents white lines between tiles
        ctx.fillRect(
          x * squareSideLength - edgeBulk,
          y * squareSideLength - edgeBulk,
          squareSideLength + edgeBulk,
          squareSideLength + edgeBulk
        );
      }
    };

    const drawPieces = (
      ctx: CanvasRenderingContext2D,
      gs: GameState,
      hiddenPieces: number[] | undefined
    ) => {
      if (loadedImages < imagesLinks.length) return;

      for (let i: number = 0; i < 64; i++) {
        if (hiddenPieces && hiddenPieces.includes(i)) continue;

        const piece = gs.squares[i];

        if (piece === null) continue;

        const { x, y } = squareIdToCoords(i);

        ctx.drawImage(
          pieceImages[piece],
          x * squareSideLength,
          y * squareSideLength,
          squareSideLength,
          squareSideLength
        );
      }
    };

    const render = (
      ctx: CanvasRenderingContext2D,
      gs: GameState,
      highlights: number[] | undefined,
      hiddenPieces: number[] | undefined
    ) => {
      ctx.clearRect(0, 0, size.width, size.height);
      drawTiles(ctx, highlights);
      drawPieces(ctx, gs, hiddenPieces);
    };

    const pieceImages = imagesLinks.map((link) => {
      const img = new Image();
      img.src = link;
      img.onload = () => {
        loadedImages++;
        if (loadedImages == imagesLinks.length) {
          render(ctx, gs, undefined, undefined);
        }
      };
      return img;
    });

    const setUpBoard = (gs: GameState) => {
      gs.turn = 0;

      gs.squares[0] = P_BROOK;
      gs.squares[1] = P_BKNIGHT;
      gs.squares[2] = P_BBISHOP;
      gs.squares[3] = P_BQUEEN;
      gs.squares[4] = P_BKING;
      gs.squares[5] = P_BBISHOP;
      gs.squares[6] = P_BKNIGHT;
      gs.squares[7] = P_BROOK;

      for (let i = 8; i < 16; i++) {
        gs.squares[i] = P_BPAWN;
      }

      gs.squares[56] = P_WROOK;
      gs.squares[57] = P_WKNIGHT;
      gs.squares[58] = P_WBISHOP;
      gs.squares[59] = P_WQUEEN;
      gs.squares[60] = P_WKING;
      gs.squares[61] = P_WBISHOP;
      gs.squares[62] = P_WKNIGHT;
      gs.squares[63] = P_WROOK;

      for (let i = 48; i < 56; i++) {
        gs.squares[i] = P_WPAWN;
      }

      render(ctx, gs, undefined, undefined);
    };

    setUpBoard(gs);

    let dragging: number | null = null;
    let draggingOffset: { x: number; y: number } | null = null;

    const squareExists = (id: number) => id >= 0 && id < 64;
    const pieceColor = (piece: number) => (piece % 2 == 0 ? 1 : 0);
    const sameColor = (a: number, b: number) => pieceColor(a) == pieceColor(b);

    const slidingMoves = (
      gs: GameState,
      pos: number,
      directions: { x: number; y: number }[]
    ) => {
      const piece = gs.squares[pos];

      if (piece === null) return [];

      const { x, y } = squareIdToCoords(pos);

      const moves: number[] = [];

      directions.forEach((dir) => {
        for (let dist: number = 1; true; dist++) {
          const to = coordsToSquareId(x + dir.x * dist, y + dir.y * dist);

          if (!squareExists(to)) break;

          if (gs.squares[to] !== null) {
            if (!sameColor(gs.squares[to] || 0, piece)) moves.push(to);
            break;
          }

          moves.push(to);
        }
      });

      return moves;
    };

    const legalMoves = (gs: GameState, pos: number) => {
      const piece = gs.squares[pos];

      if (piece === null) return [];

      const { x, y } = squareIdToCoords(pos);

      const moves = [];

      switch (piece) {
        case P_BKING:
        case P_WKING:
          [-1, 0, 1].forEach((i) => {
            [-1, 0, 1].forEach((j) => {
              if (i == 0 && j == 0) return;

              const to = coordsToSquareId(x + i, y + j);

              moves.push(to);
            });
          });

          if (piece == P_BKING && gs.castleRights.black.king) {
            moves.push(coordsToSquareId(6, 0));
          }
          if (piece == P_BKING && gs.castleRights.black.queen) {
            moves.push(coordsToSquareId(2, 0));
          }
          if (piece == P_WKING && gs.castleRights.white.king) {
            moves.push(coordsToSquareId(6, 7));
          }
          if (piece == P_WKING && gs.castleRights.white.queen) {
            moves.push(coordsToSquareId(2, 7));
          }

          break;
        case P_BPAWN:
        case P_WPAWN:
          const dir = pieceColor(piece) == 0 ? -1 : 1;

          const to = coordsToSquareId(x, y + dir);

          if (gs.squares[to] === null) moves.push(to);

          if ((y == 1 || y == 6) && gs.squares[to] === null) {
            const to = coordsToSquareId(x, y + dir * 2);

            if (gs.squares[to] === null) moves.push(to);
          }

          [coordsToSquareId(x - 1, y + dir), coordsToSquareId(x + 1, y + dir)]
            .filter((to) => gs.squares[to] !== null)
            .forEach((to) => moves.push(to));

          if (gs.enpassant !== null) {
            const { x: x_e, y: y_e } = squareIdToCoords(gs.enpassant);

            if (y == y_e && (x == x_e - 1 || x == x_e + 1)) {
              moves.push(coordsToSquareId(x_e, y + dir));
            }
          }

          break;
        case P_BKNIGHT:
        case P_WKNIGHT:
          [-2, -1, 1, 2].forEach((i) => {
            [-2, -1, 1, 2].forEach((j) => {
              if (Math.abs(i) == Math.abs(j)) return;

              const to = coordsToSquareId(x + i, y + j);

              moves.push(to);
            });
          });
          break;
        case P_BROOK:
        case P_WROOK:
          moves.push(
            ...slidingMoves(gs, pos, [
              { x: 1, y: 0 },
              { x: -1, y: 0 },
              { x: 0, y: 1 },
              { x: 0, y: -1 },
            ])
          );
          break;
        case P_BBISHOP:
        case P_WBISHOP:
          moves.push(
            ...slidingMoves(gs, pos, [
              { x: 1, y: 1 },
              { x: -1, y: 1 },
              { x: 1, y: -1 },
              { x: -1, y: -1 },
            ])
          );
          break;
        case P_BQUEEN:
        case P_WQUEEN:
          const dirs: { x: number; y: number }[] = [-1, 0, 1]
            .map((i) => [-1, 0, 1].map((j) => ({ x: i, y: j })))
            .reduce((a, b) => a.concat(b))
            .filter((dir) => dir.x != 0 || dir.y != 0);

          moves.push(...slidingMoves(gs, pos, dirs));
          break;
      }

      return moves
        .filter(squareExists)
        .filter(
          (to) =>
            !sameColor(gs.squares[to] || 0, piece) || gs.squares[to] === null
        );
    };

    const moveIsLegal = (gs: GameState, from: number, to: number) =>
      legalMoves(gs, from).includes(to);

    const movePiece = (gs: GameState, from: number, to: number) => {
      if (!moveIsLegal(gs, from, to)) return;

      const { x: x_i, y: y_i } = squareIdToCoords(from);
      const { x: x_f, y: y_f } = squareIdToCoords(to);

      // todo: en passant taking

      if (gs.squares[from] === P_BPAWN && y_i == 1 && y_f == 3) {
        gs.enpassant = to;
      } else if (gs.squares[from] === P_WPAWN && y_i == 6 && y_f == 4) {
        gs.enpassant = to;
      } else {
        gs.enpassant = null;
      }

      if (gs.squares[from] == P_BKING) {
        if (gs.castleRights.black.king && x_i == 4 && y_i == 0 && x_f == 6) {
          gs.squares[coordsToSquareId(7, 0)] = null;
          gs.squares[coordsToSquareId(5, 0)] = P_BROOK;
        } else if (
          gs.castleRights.black.queen &&
          x_i == 4 &&
          y_i == 0 &&
          x_f == 2
        ) {
          gs.squares[coordsToSquareId(0, 0)] = null;
          gs.squares[coordsToSquareId(3, 0)] = P_BROOK;
        }

        gs.castleRights.black.king = false;
        gs.castleRights.black.queen = false;
      } else if (gs.squares[from] == P_WKING) {
        if (gs.castleRights.white.king && x_i == 4 && y_i == 7 && x_f == 6) {
          gs.squares[coordsToSquareId(7, 7)] = null;
          gs.squares[coordsToSquareId(5, 7)] = P_WROOK;
        } else if (
          gs.castleRights.white.queen &&
          x_i == 4 &&
          y_i == 7 &&
          x_f == 2
        ) {
          gs.squares[coordsToSquareId(0, 7)] = null;
          gs.squares[coordsToSquareId(3, 7)] = P_WROOK;
        }

        gs.castleRights.white.king = false;
        gs.castleRights.white.queen = false;
      } else if (gs.squares[from] == P_BROOK && x_i == 0 && y_i == 7) {
        gs.castleRights.black.queen = false;
      } else if (gs.squares[from] == P_BROOK && x_i == 7 && y_i == 7) {
        gs.castleRights.black.king = false;
      } else if (gs.squares[from] == P_WROOK && x_i == 0 && y_i == 0) {
        gs.castleRights.white.queen = false;
      } else if (gs.squares[from] == P_WROOK && x_i == 7 && y_i == 0) {
        gs.castleRights.white.king = false;
      }

      gs.squares[to] = gs.squares[from];
      gs.squares[from] = null;
    };

    engineWorker.onmessage = (e) => {
      const moveNotation = e.data;
      console.log(moveNotation);

      const move = NotationToMove(moveNotation);

      movePiece(gs, move.from, move.to);

      render(ctx, gs, undefined, undefined);
    };

    board.addEventListener("mouseup", (event) => {
      if (dragging === null) return;

      const from = dragging;
      dragging = null;

      const x = Math.floor(event.offsetX / squareSideLength);
      const y = Math.floor(event.offsetY / squareSideLength);
      const to = coordsToSquareId(x, y);

      if (!moveIsLegal(gs, from, to)) {
        render(ctx, gs, undefined, undefined);
        return;
      }

      movePiece(gs, from, to);
      render(ctx, gs, undefined, undefined);

      console.log(moveToNotation(from, to));
      engineWorker.postMessage({
        type: "genMove",
        move: moveToNotation(from, to),
      });
    });

    const draggingDraw = (ctx: CanvasRenderingContext2D, event: MouseEvent) => {
      if (
        draggingOffset === null ||
        dragging === null ||
        gs.squares[dragging] === null
      )
        return;

      const x = event.offsetX - draggingOffset.x;
      const y = event.offsetY - draggingOffset.y;

      ctx.drawImage(
        pieceImages[gs.squares[dragging] || 0],
        x,
        y,
        squareSideLength,
        squareSideLength
      );
    };

    board.addEventListener("mousedown", (event) => {
      const x = Math.floor(event.offsetX / squareSideLength);
      const y = Math.floor(event.offsetY / squareSideLength);
      const id = coordsToSquareId(x, y);

      if (gs.squares[id] === null) return;

      dragging = id;
      draggingOffset = {
        x: event.offsetX - x * squareSideLength,
        y: event.offsetY - y * squareSideLength,
      };

      render(ctx, gs, legalMoves(gs, dragging), [dragging]);

      draggingDraw(ctx, event);
    });

    board.addEventListener("mousemove", (event) => {
      if (dragging === null) return;

      render(ctx, gs, legalMoves(gs, dragging), [dragging]);
      draggingDraw(ctx, event);
    });

    board.addEventListener("mouseout", (_) => {
      dragging = null;
      render(ctx, gs, undefined, undefined);
    });

    rerenderBoard = () => {
      render(ctx, gs, undefined, undefined);
    };
  }, []);

  return (
    <>
      <div id="settings-icon">
        <PopoutToggle
          button={
            <img className="settings-cog" src="icons/cog.svg" alt="cog" />
          }
        >
          <ul>
            <li>
              White squares colour:
              <input
                type="color"
                value={whiteSquaresColour}
                onChange={whiteSquaresColourChange}
              ></input>
            </li>
            <li>
              Black squares colour:
              <input
                type="color"
                value={blackSquaresColour}
                onChange={blackSquaresColourChange}
              ></input>
            </li>
          </ul>
        </PopoutToggle>
      </div>
      <canvas ref={canvasRef} width="500" height="500"></canvas>
      <div id="piece-attributions">
        Pieces by Cburnett, available under a Creative Commons
        Attribution-ShareAlike (CC BY-SA 3.0) license. Original images source:
        https://commons.wikimedia.org/wiki/Template:SVG_chess_pieces#Table_of_chess_piece_SVG-images.
      </div>
    </>
  );
};

export default ChessBoard;
