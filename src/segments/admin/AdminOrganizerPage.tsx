import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { OrganizersTable } from "../../entities/organizer/ui/OrganizersTable";

export function AdminOrganizerPage(){
    return (
        <DndProvider backend={HTML5Backend}>
            <OrganizersTable />
        </DndProvider>
    )
}