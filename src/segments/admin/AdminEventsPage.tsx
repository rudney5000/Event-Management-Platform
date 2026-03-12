import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { EventsTable } from "../../features/event-list/ui";

export function EventsPage() {
  return (
        <DndProvider backend={HTML5Backend}>
            <EventsTable />
        </DndProvider>
    )
}