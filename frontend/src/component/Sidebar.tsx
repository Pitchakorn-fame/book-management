const Sidebar = () => {
  return (
    <div
      id="side-bar-id"
      className="flex flex-col gap-6 h-full w-62 bg-[#FFAC1C] p-6"
    >
      <div className="grid grid-cols-[auto_1fr] gap-2 bg-[#FFD580] items-center justify-center p-4 rounded-2xl font-bold">
        <div>Total Books</div>
        <div className="p-1 bg-[#FFF] text-center text-xl rounded-xl">
          1,350
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
