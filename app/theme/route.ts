export const dynamic = "force-dynamic"; // defaults to auto

/** 配置数据结构 */
const THEME_DATA = {
  g1color: "#1271ff",
  g2color: "#dd4aff",
  g3color: "#64dcff",
  g4color: "#c83232",
  g5color: "#b4b432",
  // 渐变开始
  gradientBg1: "#6c00a2",
  gradientBg2: "#001152",
  gradientBg3: "#754322",
};

export async function GET(request: Request) {
  return new Response(
    JSON.stringify({
      code: 100000,
      data: {
        ...THEME_DATA,
      },
      message: "操作成功",
    })
  );
}
export async function POST(request: Request) {
  const {
    g1color,
    g2color,
    g3color,
    g4color,
    g5color,
    gradientBg1,
    gradientBg2,
    gradientBg3,
  } = await request.json();
  THEME_DATA.g1color = g1color;
  THEME_DATA.g2color = g2color;
  THEME_DATA.g3color = g3color;
  THEME_DATA.g4color = g4color;
  THEME_DATA.g5color = g5color;
  THEME_DATA.gradientBg1 = gradientBg1;
  THEME_DATA.gradientBg2 = gradientBg2;
  THEME_DATA.gradientBg3 = gradientBg3;
  return new Response(JSON.stringify(THEME_DATA));
}
