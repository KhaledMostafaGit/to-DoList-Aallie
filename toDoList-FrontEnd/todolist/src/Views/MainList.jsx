import Tasks from "../components/Tasks";

function MainList() {
  return (
    <>
      <div className="container w-50 my-5">
        <div className="Title text-black text-center">
          <h1 className="">To-Do List</h1>
        </div>
        <div className="listBody shadow p-3 rounded">
            <Tasks />
        </div>
      </div>
    </>
  );
}

export default MainList;
