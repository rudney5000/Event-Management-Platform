import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CategoryTable } from "../../entities/category/ui";

export function AdminCategoryPage() {

  return (
    <DndProvider backend={HTML5Backend}>
        <CategoryTable/>
    </DndProvider>
  );
}