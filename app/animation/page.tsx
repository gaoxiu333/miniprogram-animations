"use client";
import { useMemo, useState } from "react";
import { IphoneMokup } from "../components/IphoneMokup";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Button, Chip, Input, Spacer } from "@nextui-org/react";
import type { SVGProps } from "react";

const ANIMATION_STYLE_1 = `
.letter-splitting-slide-in {
    animation: slide-in 2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    animation-delay: calc(60ms * var(--index));
}

@keyframes slide-in {
    0% {
        transform: translateY(-1em) rotate(-0.5turn) scale(0.5);
    }
    20%,
    100% {
        transform: translateY(0) rotate(0deg) scale(1);
    }
}`;

const ANIMATION_STYLE_2 = `
.letter-splitting-weight {
	text-decoration: none;
	font-weight: 100;
	animation: weight 2s infinite;
	animation-delay: calc(var(--index) * 150ms);
}

@keyframes weight {
	from {
		font-weight: 100;
	}

	50% {
		font-weight: 900;
	}

	to {
		font-weight: 100;
	}
}
`;
const ANIMATION_STYLE_3 = `
.letter-splitting-slide-in-2 {
	animation: slide-in-2 .75s cubic-bezier(.5, 0, .5, 1) both;
	animation-delay: calc(.25s + (120ms * var(--index)));
	text-align: center;
}

@keyframes slide-in-2 {
	from {
	transform: translateX(-3em) translateY(-1.5em) rotate(-135deg) scale(0.5);
	opacity: 0;
	}
}
`;
const ANIMATION_STYLES = `${ANIMATION_STYLE_1} ${ANIMATION_STYLE_2} ${ANIMATION_STYLE_3}`;
const ANIMATIONS = [
  {
    name: "动画1",
    key: "animation1",
    style: ANIMATION_STYLE_1,
    className: "letter-splitting-slide-in",
  },
  {
    name: "动画2",
    key: "animation2",
    style: ANIMATION_STYLE_2,
    className: "letter-splitting-weight",
  },
  {
    name: "动画3",
    key: "animation3",
    style: ANIMATION_STYLE_3,
    className: "letter-splitting-slide-in-2",
  },
];

export default function Setup() {
  const [text, setText] = useState("Hello Wrold");
  const [active, setActive] = useState(ANIMATIONS[0].key);
  const copyCss = () => {
    navigator.clipboard.writeText(animationStyle!);
  };
  const copyHtml = () => {
    navigator.clipboard.writeText(genMiniCode(text, animationClass!));
  };
  const animationClass = useMemo(() => {
    return ANIMATIONS.find((item) => item.key === active)?.className;
  }, [active]);
  const animationStyle = useMemo(() => {
    return ANIMATIONS.find((item) => item.key === active)?.style;
  }, [active]);
  const handlTabChange = (key: any) => {
    console.log(key);
    setActive(key);
  };
  return (
    <div className=" container mx-auto py-10">
      <h1 className="text-2xl pt-6 pb-20">Text Split Animations</h1>
      <main className="flex flex-row gap-8 py-5">
        <div className="w-1/2 flex items-start justify-center">
          <IphoneMokup>
            <div className="w-full h-full py-8 px-4 text-default-200">
              <div className="flex flex-row">
                {[...text].map((item, index) => {
                  return (
                    <div
                      className={animationClass}
                      style={{ "--index": index } as any}
                      key={index}
                    >
                      {item === " " ? "\u00A0" : item}
                    </div>
                  );
                })}
              </div>

              <style jsx global>
                {ANIMATION_STYLES}
              </style>
            </div>
          </IphoneMokup>
        </div>
        <div className="w-1/2 h-full flex items-start justify-center">
          <div className="flex flex-col w-full flex-wrap gap-4">
            <Tabs
              color="secondary"
              radius="full"
              onSelectionChange={(key) => handlTabChange(key)}
            >
              {ANIMATIONS.map((animation) => (
                <Tab key={animation.key} title={animation.name}></Tab>
              ))}
            </Tabs>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              label="文本"
            />
            <div className="flex flex-row gap-4">
              <Button
                size="sm"
                radius="full"
                startContent={<RiMiniProgramFill fontSize={18} />}
                variant="faded"
                color="success"
                onClick={copyCss}
              >
                wxss
              </Button>
              <Button
                size="sm"
                radius="full"
                onClick={copyHtml}
                startContent={<RiMiniProgramFill fontSize={18} />}
                variant="faded"
                color="success"
              >
                wxml
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function RiMiniProgramFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#09B83E"
        d="m15.84 12.691l-.066.02a1.5 1.5 0 0 1-.414.062c-.61 0-.954-.412-.77-.921c.136-.372.491-.686.925-.831c.672-.245 1.142-.804 1.142-1.455c0-.877-.853-1.587-1.905-1.587s-1.905.71-1.905 1.587v4.868c0 1.17-.678 2.197-1.693 2.778a3.83 3.83 0 0 1-1.904.502c-1.984 0-3.598-1.471-3.598-3.28c0-.576.164-1.117.451-1.587c.444-.73 1.184-1.287 2.07-1.541q.23-.073.46-.073c.612 0 .958.414.773.924c-.126.347-.466.645-.861.803a2 2 0 0 0-.139.052c-.628.26-1.061.798-1.061 1.422c0 .877.853 1.587 1.905 1.587s1.904-.71 1.904-1.587V9.566c0-1.17.679-2.197 1.694-2.778a3.83 3.83 0 0 1 1.904-.502c1.984 0 3.598 1.471 3.598 3.28a3.04 3.04 0 0 1-.451 1.587c-.442.726-1.178 1.282-2.058 1.538M2.002 12c0 5.523 4.477 10 10 10s10-4.477 10-10s-4.477-10-10-10s-10 4.477-10 10"
      ></path>
    </svg>
  );
}

// 生成小程序代码
const genMiniCode = (text: string, className: string) => {
  return [...text]
    .map((item: string, index: number) => minniMiniCode(item, index, className))
    .join("");
};
const minniMiniCode = (text: string, index: number, className: string) => {
  return `<view class="${className}" style="--index: ${index}">${text}</view>`;
};
