export const IphoneMokup = (prop: { children: React.ReactNode }) => {
  return (
    <>
      <main className="flex items-center justify-center">
        <div className="relative">
          <div className="h-6 w-0.5 rounded-l-sm bg-slate-500 absolute -left-0.2 top-16"></div>
          <div className="h-8 w-0.5 rounded-l-sm bg-slate-500 absolute -left-0.2 top-28"></div>
          <div className="h-8 w-0.5 rounded-l-sm bg-slate-500 absolute -left-0.2 top-40"></div>
          <div className="h-128 w-64 bg-slate-500 rounded-[2rem] p-1 overflow-hidden">
            <div className="h-full w-full bg-black rounded-[2rem] overflow-hidden p-2 relative">
              <div className="w-28 h-6 bg-black absolute left-1/2 rounded-b-2xl transform -translate-x-1/2"></div>
              <div className="h-full w-full rounded-3xl bg-white bg-center bg-cover wallpaper">
                <div className="flex items-center justify-between text-xs text-white py-2 px-4"></div>
                <div className="h-[460px] flex flex-col">{prop.children}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
