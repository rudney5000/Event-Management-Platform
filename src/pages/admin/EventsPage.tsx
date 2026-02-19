import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { EventsTable } from "../../widgets/events/ui/EventsTable";

export function EventsPage() {
  return (
        <DndProvider backend={HTML5Backend}>
            <EventsTable />
        </DndProvider>
    )
}