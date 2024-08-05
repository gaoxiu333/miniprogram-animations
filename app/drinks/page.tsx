"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Button,
  Chip,
  Input,
  Textarea,
} from "@nextui-org/react";
import clsx from "clsx";
import _, { differenceWith, isEmpty } from "lodash";
import { useEffect, useState } from "react";
import ReactJson from "react-json-view";

interface Drink {
  name: string;
  uid: string;
  abv: number;
  description: string;
  isSpecial: boolean;
  taste?: string; // 口感
  special_recipe?: boolean; // 是否为特调
  features?: string[]; // 特性
  price?: number;
  occasion?: string; // 场合
  type?: string; // 类型
  href?: string;
}

const LOCAL_DRINKS_PROMPTS = [
  {
    uid: 1,
    name: "Americano",
    tag: "红味美思，金巴利，苏打水，红色，甜度适中，低酒精度，清爽，口感易饮，清爽解渴，苦甜参半，带气泡感，柑橘水果和微弱草本味道，意大利开胃鸡尾酒，白天晚上都推荐饮用，餐前开胃，餐后助消化。",
  },
  {
    uid: 2,
    name: "Aperol Spritz",
    tag: "阿佩洛，普罗塞克，苏打水，橘色，低酒精度，甜度中低，清爽口感易饮，甜美，柑橘味，回味微苦，带气泡感，简单易饮开胃酒。",
  },
  {
    uid: 3,
    name: "Boulevardier",
    tag: "波本威士忌，金巴利，红味美思，甜度中上，高酒精度，厚重口感，柑橘草本，回味微苦，尼格罗尼的一种变体，用波本威士忌代替金酒，喜欢喝尼格罗尼的顾客想喝不一样的可以推荐喝这个。",
  },
  {
    uid: 4,
    name: "Black Russian",
    tag: "伏特加，咖啡利口酒，甜度中上，高酒精度，烈酒，甜味，苦味，咖啡。",
  },
  {
    uid: 5,
    name: "Cuba Libre",
    tag: "白朗姆酒，青柠汁，可乐。甜度适中，低酒精度，中等厚度口感，让味蕾愉悦的原料组合，快乐水。",
  },
  {
    uid: 6,
    name: "Dark'n Stormy",
    tag: "黑朗姆，姜汁啤酒，青柠汁，甜度中下，酒精度低，偏重口感，和莫斯科骡子类似（基酒伏特加），焦糖，塑料，姜味，青柠味，味辣口感，带气泡感。口味偏厚重。",
  },
  {
    uid: 7,
    name: "Garibaldi",
    tag: "金巴利，橙汁，甜度适中，酒精度低，中等厚度口感，满口橙子味，柑橘味，回味微苦，开胃。",
  },
  {
    uid: 8,
    name: "Hanky Panky",
    tag: "金酒，红味美思，菲奈特布兰卡，甜度低，高酒精度，重草本，柑橘，回味苦。",
  },
  {
    uid: 9,
    name: "Moscow Mule",
    tag: "伏特加，青柠汁，姜汁啤酒，甜度中下，酒精度低，有气泡感，清爽，青柠，姜味，一点点辣口。",
  },
  {
    uid: 10,
    name: "Negroni",
    tag: "金酒，金巴利，红味美思，甜度中上，酒精度高，口感厚重，柑橘，草本，水果，回味微苦。",
  },
  {
    uid: 11,
    name: "Whiskey sour",
    tag: "波本威士忌，黄柠汁，单一糖浆，偏酸，酒精度中等，酸味的经典鸡尾酒，波本柠檬等香味，回味悠长。",
  },
  {
    uid: 12,
    name: "Coffee Spumoni",
    tag: "咖啡，西柚汁，汤力水，甜度偏低，口感薄，无酒精，清爽味苦，微气泡感。",
  },
  {
    uid: 13,
    name: "Ginger Fusion",
    tag: "茅台，姜汁糖浆，黄柠汁，苏格兰威士忌，偏酸，酒精度中等，酱香，姜味，微微辣口。",
  },
  {
    uid: 14,
    name: "Pineapple & Jasmine",
    tag: "凤梨，茉莉，橙子，红葡萄酒醋，黄柠檬，青柠檬，偏酸，无酒精，清爽易饮。",
  },
];

const host = `https://api.gitlabx.com`; // 测试: uat.api.gitlabx.com
const robo_drink_url = `${host}/api/product/robo_list`;
const drink_url = `${host}/api/product/manually_list`;

const DrinkDetail = ({ current }: { current: any }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState("");

  const onEdit = () => {
    if (current.features) {
      setValue(current.features);
    }
    setIsEdit(true);
  };
  const onSubmit = () => {
    if (!value) {
      alert("请输入内容");
      return;
    }
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(current),
    }).finally(() => {
      setIsEdit(false);
    });
  };
  return (
    <div className="flex flex-col min-h-screen gap-10">
      <div className="flex flex-row gap-3">
        <div className="w-1/3 flex-none">
          <Image className="w-[100px] h-[100px]" src={current.href} />
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <div className="text-default-600 font-bold">{current.name}</div>
          {isEdit ? (
            <Textarea
              placeholder="请输入内容"
              type=""
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          ) : (
            <div className="text-default-300">标签：{current.features}</div>
          )}
          {isEdit ? (
            <>
              <Button>返回</Button>
              <Button onClick={onSubmit}>提交</Button>
            </>
          ) : (
            <>
              <Button onClick={onEdit} className="mt-3">
                编辑
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-x-auto text-white">
        <ReactJson src={current} theme="google" />
      </div>
    </div>
  );
};

const DrinksPage = () => {
  const [roboRes, setRoboRes] = useState([]);
  const [list, setList] = useState<Drink[]>([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<any>({});
  const [localList, setLocalList] = useState<Drink[]>([]);
  // 实时数据

  const [drinkInfos, setDrinkInfos] = useState<any>({
    total: 0, // 接口总数
    localTotal: 0, // 本地总数（手动添加特性后匹配上的的总数）
    sourceTotal: 0, // 手动添加特性的总数
    diff: 0, // 有多少手动添加但是没有在接口上匹配到
    prompts: [], // 最后生成后到提示词
    dbTotal: 0,
  });

  const onClick = (item: any) => {
    setCurrent(item);
    setOpen(true);
  };

  // 更新数据

  useEffect(() => {
    const robo_Promise = fetch(robo_drink_url, {
      headers: {
        appkey: "rs_task",
      },
    }).then((res) => res.json());

    const local_promise = fetch("/api").then((res) => res.json());
    Promise.all([robo_Promise, local_promise]).then((res) => {
      const [{ data: robo_data }, local_data] = res;

      setLocalList(local_data);
      setRoboRes(robo_data);
    });
  }, []);

  // 处理关键词
  useEffect(() => {
    if (!_.isEmpty(roboRes)) {
      const drinkList = _.chain(roboRes)
        .map((item) => {
          const {
            id,
            name_en,
            description,
            drink: { strength },
            thumb,
          } = item;
          const isLocalDrink = _.find(LOCAL_DRINKS_PROMPTS, (item) => {
            return item["name"] === name_en;
          });
          console.log("isLocalDrink", isLocalDrink);
          return {
            uid: id + "",
            name: name_en,
            description,
            abv: strength,
            href: host + thumb,
            features: isLocalDrink?.tag || undefined,
            isSpecial: !isEmpty(isLocalDrink),
          } as Drink;
        })
        .value();
      setList(drinkList);
    }
  }, [roboRes]);

  useEffect(() => {
    if (_.isEmpty(list)) return;
    if (_.isEmpty(localList)) return;
    const diffs = differenceWith(LOCAL_DRINKS_PROMPTS, list, (a, b) => {
      console.log("a", a, "b", b);
      // return a.uid === b.name;
      return a["name"] === b.name;
    });
    console.log("diffs", diffs);
    setDrinkInfos({
      total: list.length,
      localTotal: localList.length,
      diff: list.length - localList.length,
      diffJson: diffs,
      prompts: localList,
    });
  }, [localList, list]);
  // 更新数据库
  const updateDataDB = async () => {
    if (_.isEmpty(list)) {
      alert("数据为空");
      return;
    }

    for (const item of list) {
      await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
    }
  };
  return (
    <main className=" container mx-auto overflow-y-auto">
      <Card>
        <CardHeader>Prompts base infos</CardHeader>
        <CardBody className="flex flew-col gap-6">
          <div className=" text-sm text-default-300">
            使用时直接复制
            JSON，另外注意，点击更新是全量更新，会覆盖手动更新！！！
          </div>
          <div className="flex flex-row gap-3 items-center">
            <div>实时生成总数: {drinkInfos.total}</div>
            <div>DB存储总数: {drinkInfos.localTotal}</div>
            <div>未匹配上: {drinkInfos.diffs}</div>
            <Button onClick={updateDataDB}>Update</Button>
          </div>
          <div className="text-lg text-default-500"> 没有匹配上的数据：</div>
          <ReactJson src={drinkInfos.diffJson} theme="google" />
          <div className="text-lg text-default-500"> 有用的数据</div>
          <ReactJson src={drinkInfos.prompts} theme="google" />
        </CardBody>
      </Card>
      <div className="grid grid-cols-3 gap-4">
        {list.map((item) => {
          return (
            <div className="" onClick={() => onClick(item)} key={item.uid}>
              <Card isHoverable>
                <CardHeader
                  className={clsx({ "text-purple-500": item.isSpecial })}
                >
                  {item.name}
                </CardHeader>
                <CardBody>
                  <div className="flex flex-row gap-2">
                    <div className="w-1/3">
                      <Image src={item.href} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm truncate text-ellipsis overflow-hidden w-[200px]">
                        {item.description}
                      </p>
                      <p className="w-[200px] h-[100px] overflow-auto">
                        <code className="text-[10px]">
                          {JSON.stringify(item)}
                        </code>
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={open}
        scrollBehavior="outside"
        backdrop="blur"
        size="5xl"
        onClose={() => setOpen(false)}
      >
        <ModalContent>
          <ModalHeader>{current.name} Prompts </ModalHeader>
          <ModalBody>
            <DrinkDetail current={current} />
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* <DrinkDetail
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        current={current}
      /> */}
    </main>
  );
};
export default DrinksPage;
