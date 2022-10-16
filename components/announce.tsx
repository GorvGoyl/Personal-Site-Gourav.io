export const Announce = (props: { children: any }) => {
  return (
    <>
      <div className="flex gap-2 rounded-md bg-slate-200 p-4  text-slate-600">
        {props.children}
      </div>
    </>
  );
};
