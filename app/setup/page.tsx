"use client";
import { useState } from "react";
import "./bubbles.scss";
import { IphoneMokup } from "../components/IphoneMokup";
import { Card, CardBody } from "@nextui-org/react";

export default function Setup() {
  const [primaryStart, setPrimaryStart] = useState("#6c00a2");
  const [primaryEnd, setPrimaryEnd] = useState("#001152");
  const [g1color, setG1color] = useState("#1271ff");
  const [g2color, setG2color] = useState("#dd4aff");
  const [g3color, setG3color] = useState("#64dcff");
  const [g4color, setG4color] = useState("#c83232");
  const [g5color, setG5color] = useState("#b4b432");

  return (
    <div className="container mx-auto py-[20px]">
      <h1 className="text-2xl py-6 pb-10">Robo 主题配置</h1>
      <Card>
        <CardBody>
          <div className="flex row flex-nowrap">
            <div className="w-1/2 flex items-center justify-center">
              <IphoneMokup>
                <div
                  className="relative h-full w-full rounded-2xl overflow-hidden"
                  style={
                    {
                      "--color-bg1": primaryStart,
                      "--color-bg2": primaryEnd,
                      "--color1": hexToRgb(g1color),
                      "--color2": hexToRgb(g2color),
                      "--color3": hexToRgb(g3color),
                      "--color4": hexToRgb(g4color),
                      "--color5": hexToRgb(g5color),
                    } as any
                  }
                >
                  <div className="text-container">Bubbles</div>
                  <div className="gradient-bg">
                    <svg xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <filter id="goo">
                          <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="10"
                            result="blur"
                          />
                          <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                            result="goo"
                          />
                          <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                      </defs>
                    </svg>
                    <div className="gradients-container">
                      <div className="g1"></div>
                      <div className="g2"></div>
                      <div className="g3"></div>
                      <div className="g4"></div>
                      <div className="g5"></div>
                      {/* <div className="interactive"></div> */}
                    </div>
                  </div>
                </div>
              </IphoneMokup>
            </div>
            <div className="w-1/2 flex flex-col items-start justify-start">
              <div className="flex flex-col gap-6">
                <section className="flex flex-col gap-4">
                  <h3 className="text-xl text-default-200 leading-10">
                    渐变背景
                  </h3>
                  <div className="flex flex-row gap-6">
                    <div className="flex flex-row">
                      <label
                        htmlFor="primary-start"
                        className="text-default-400"
                      >
                        渐变开始：
                      </label>
                      <input
                        className=" cursor-pointer"
                        id="primary-start"
                        type="color"
                        value={primaryStart}
                        onChange={(e) => setPrimaryStart(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-row">
                      <label htmlFor="primary-end" className="text-default-400">
                        渐变结束：
                      </label>
                      <input
                        id="primary-end"
                        className="cursor-pointer"
                        type="color"
                        value={primaryEnd}
                        onChange={(e) => setPrimaryEnd(e.target.value)}
                      />
                    </div>
                  </div>
                </section>
                <section className="flex flex-col gap-4">
                  <h3 className="text-xl text-default-200 leading-10">
                    运动小球颜色
                  </h3>
                  <div className="flex flex-row">
                    <label className="text-default-400">G1：</label>
                    <input
                      className="cursor-pointer"
                      type="color"
                      value={g1color}
                      onChange={(e) => setG1color(e.target.value as any)}
                    />
                  </div>
                  <div className="flex flex-row">
                    <label className="text-default-400">G2：</label>
                    <input
                      className="cursor-pointer"
                      type="color"
                      value={g2color}
                      onChange={(e) => setG2color(e.target.value as any)}
                    />
                  </div>
                  <div className="flex flex-row">
                    <label className="text-default-400">G3：</label>
                    <input
                      className="cursor-pointer"
                      type="color"
                      value={g3color}
                      onChange={(e) => setG3color(e.target.value as any)}
                    />
                  </div>
                  <div className="flex flex-row">
                    <label className="text-default-400">G4：</label>
                    <input
                      className="cursor-pointer"
                      type="color"
                      value={g4color}
                      onChange={(e) => setG4color(e.target.value as any)}
                    />
                  </div>
                  <div className="flex flex-row">
                    <label className="text-default-400">G5：</label>
                    <input
                      className="cursor-pointer"
                      type="color"
                      value={g5color}
                      onChange={(e) => setG5color(e.target.value as any)}
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
        result[3],
        16
      )}`
    : null;
}
