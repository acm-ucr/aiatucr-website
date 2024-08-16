import Board from "./Board";
import { boards } from "@/data/Board";

const Boards = () => {
  return (
    <section className="p-7">
      <div className="flex-justify center">
        <div className="grid grid-cols-9 md:grid-cols-3 gap-4 w-auto place-items-center">
          {boards.map((board, index) => (
            <Board
              key={index}
              name={board.name}
              image={board.image}
              email={board.email}
              role={board.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Boards;
