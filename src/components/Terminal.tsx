import { Colors } from "@hhenrichsen/canvas-commons";
import {
  Layout,
  Rect,
  Txt,
  TxtProps,
  computed,
  initial,
  signal,
  Node,
  LayoutProps,
} from "@motion-canvas/2d";
import {
  SignalValue,
  SimpleSignal,
  TimingFunction,
  createDeferredEffect,
  createEffect,
  createSignal,
  deepLerp,
  linear,
  unwrap,
  useLogger,
} from "@motion-canvas/core";

export interface TerminalProps extends LayoutProps {
  prefix?: SignalValue<string | TxtProps>;
  defaultTxtProps?: TxtProps;
  wpm?: SignalValue<number>;
}

export class Terminal extends Layout {
  private internalCanvas: CanvasRenderingContext2D = document
    .createElement("canvas")
    .getContext("2d");

  @initial("❯ ")
  @signal()
  public declare readonly prefix: SimpleSignal<string | TxtProps>;

  @initial({
    fill: Colors.Catppuccin.Mocha.Text,
    fontFamily: "monospace",
    fontSize: 40,
  })
  @signal()
  public declare readonly defaultTxtProps: SimpleSignal<TxtProps>;

  @initial(100)
  @signal()
  public declare readonly wpm: SimpleSignal<number>;

  private lines: SimpleSignal<TxtProps[][]>;
  private cachedLines: SimpleSignal<Node[]>;

  @computed()
  private getLines(): Node[] {
    return this.lines()
      .slice(this.cachedLines().length)
      .map((fragments) => {
        return (
          <Layout direction={"row"} paddingLeft={20} shrink={0}>
            {fragments.length ? (
              fragments.map((fragment) => {
                const parentedDefaults = {
                  ...this.defaultTxtProps(),
                  ...fragment,
                };
                this.internalCanvas.font = `${
                  unwrap(parentedDefaults.fontWeight) || 400
                } ${unwrap(parentedDefaults.fontSize)}px ${unwrap(
                  parentedDefaults.fontFamily
                )}`;
                const spc = this.internalCanvas.measureText(" ");
                return unwrap(fragment.text)
                  .split(/( )/g)
                  .filter(Boolean)
                  .map((spaceOrText) => {
                    if (spaceOrText == " ") {
                      return (
                        <Rect
                          minWidth={spc.width}
                          height={
                            spc.fontBoundingBoxAscent +
                            spc.fontBoundingBoxDescent
                          }
                        />
                      );
                    }
                    return (
                      <Txt
                        fill={Colors.Catppuccin.Mocha.Text}
                        {...parentedDefaults}
                        text={spaceOrText}
                      />
                    );
                  });
              })
            ) : (
              <Rect width={1} height={36} />
            )}
          </Layout>
        );
      });
  }

  public constructor(props: TerminalProps) {
    super({
      ...props,
    });
    this.cachedLines = createSignal([]);
    this.lines = createSignal([]);
    this.layout(true);
    this.direction("column");
    this.children(() => [...this.cachedLines(), ...this.getLines()]);
  }

  public lineAppear(line: string | TxtProps | TxtProps[]) {
    this.lines([...this.lines(), !line ? [] : this.makeProps(line)]);
    this.cachedLines([...this.cachedLines(), ...this.getLines()]);
  }

  public *typeLine(
    line: string | TxtProps,
    duration: number,
    timingFunction?: TimingFunction
  ) {
    const l = createSignal("");
    const t = typeof line == "string" ? line : line.text;
    const p = this.prefix();
    const props: TxtProps[] = [
      typeof p == "string" ? { text: p } : p,
      typeof line == "string"
        ? {
            text: l,
          }
        : {
            text: l,
            ...line,
          },
    ];
    const fixedProps = [
      typeof p == "string" ? { text: p } : p,
      {
        ...props[0],
        text: t,
      },
    ];
    this.lines([...this.lines(), props]);
    yield* l(l() + t, duration, timingFunction);
    this.lines([...this.lines().slice(0, -1), fixedProps]);
    this.cachedLines([...this.cachedLines(), ...this.getLines()]);
  }

  public *typeAfterLine(
    line: string | TxtProps,
    duration?: number,
    timingFunction: TimingFunction = linear
  ) {
    this.cachedLines(this.cachedLines().slice(0, -1));
    const content = typeof line == "string" ? line : line.text;
    const calcDuration = duration ?? (content.length / (this.wpm() * 5)) * 60;
    const l = createSignal("");
    const lastLine = this.lines()[this.lines().length - 1];

    const props: TxtProps =
      typeof line == "string"
        ? {
            text: l,
          }
        : {
            ...line,
            text: l,
          };
    const fixedProps = {
      ...props,
      text: content,
    };
    lastLine.push(props);
    this.lines([...this.lines().slice(0, -1), lastLine]);
    yield* l(content, calcDuration, timingFunction);
    lastLine.pop();
    lastLine.push(fixedProps);
    this.lines([...this.lines().slice(0, -1), lastLine]);
    this.cachedLines([...this.cachedLines(), ...this.getLines()]);
  }

  public appearAfterLine(line: string | TxtProps) {
    this.cachedLines(this.cachedLines().slice(0, -1));
    const lastLine = this.lines()[this.lines().length - 1];

    lastLine.push(...this.makeProps(line));
    this.lines([...this.lines().slice(0, -1), lastLine]);
    this.cachedLines([...this.cachedLines(), ...this.getLines()]);
  }

  public replaceLine(newLine: string | TxtProps | TxtProps[]) {
    this.cachedLines(this.cachedLines().slice(0, -1));
    this.lines([...this.lines().slice(0, -1), this.makeProps(newLine)]);
    this.cachedLines([...this.cachedLines(), ...this.getLines()]);
  }

  public deleteLine() {
    this.cachedLines(this.cachedLines().slice(0, -1));
    this.lines([...this.lines().slice(0, -1)]);
  }

  private makeProps(line: string | TxtProps | TxtProps[]) {
    return Array.isArray(line)
      ? line
      : [typeof line == "string" ? { text: line } : line];
  }
}
