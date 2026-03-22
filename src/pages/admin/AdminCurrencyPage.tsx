import { DndProvider } from "react-dnd";
import { CurrencyTable } from "../../entities/currency";
import { HTML5Backend } from "react-dnd-html5-backend";

export function AdminCurrencyPage() {
    return (
        <DndProvider backend={HTML5Backend}>
            <CurrencyTable/>
        </DndProvider>
    );
}