import { DndProvider } from "react-dnd";
import { CategoryTable } from "../../entities/category/ui/CategoryTable";
import { HTML5Backend } from "react-dnd-html5-backend";

export function AdminCategoryPage() {

  return (
    <DndProvider backend={HTML5Backend}>
        <CategoryTable/>
    </DndProvider>
  );
}