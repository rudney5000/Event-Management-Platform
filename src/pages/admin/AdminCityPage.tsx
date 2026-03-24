import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CityTable } from "../../entities/city";

export function AdminCityPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <CityTable />
    </DndProvider>
  );
}
