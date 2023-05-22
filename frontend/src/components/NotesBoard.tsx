import {
  Board,
  BoardItem,
  BoardProps,
} from "@cloudscape-design/board-components";
import { Header, Box, SpaceBetween } from "@cloudscape-design/components";
import { useState } from "react";

export default function NotesBoard() {
const [items, setItems] = useState([
{
    id: "1",
    rowSpan: 1,
    columnSpan: 1,
    data: { title: "Nota 1", content: "Primeiro item" },
},
{
    id: "2",
    rowSpan: 1,
    columnSpan: 1,
    data: { title: "Nota 2", content: "Segundo item" },
},
{
    id: "3",
    rowSpan: 1,
    columnSpan: 1,
    data: { title: "Nota 3", content: "Terceiro item" },
},
]);
  return (
    <Board
      renderItem={(item) => (
        <BoardItem
          header={<Header>{item.data.title}</Header>}
          i18nStrings={{
            dragHandleAriaLabel: "Drag handle",
            dragHandleAriaDescription:
              "Use Space or Enter to activate drag, arrow keys to move, Space or Enter to submit, or Escape to discard.",
            resizeHandleAriaLabel: "Resize handle",
            resizeHandleAriaDescription:
              "Use Space or Enter to activate resize, arrow keys to move, Space or Enter to submit, or Escape to discard.",
          }}
        >
          {item.data.content}
        </BoardItem>
      )}
      onItemsChange={(event: any) => setItems(event.detail.items)}
      items={items}
      i18nStrings={((): any => {
        function createAnnouncement(
          operationAnnouncement: string,
          conflicts: any[] | readonly BoardProps.Item<any>[],
          disturbed: string | any[] | readonly BoardProps.Item<any>[]
        ) {
          const conflictsAnnouncement =
            conflicts.length > 0
              ? `Conflicts with ${conflicts
                  .map((c) => c.data.title)
                  .join(", ")}.`
              : "";
          const disturbedAnnouncement =
            disturbed.length > 0 ? `Disturbed ${disturbed.length} items.` : "";
          return [
            operationAnnouncement,
            conflictsAnnouncement,
            disturbedAnnouncement,
          ]
            .filter(Boolean)
            .join(" ");
        }
        return {
          liveAnnouncementDndStarted: (operationType: string) =>
            operationType === "resize" ? "Resizing" : "Dragging",
          liveAnnouncementDndItemReordered: (operation: {
            placement: { x: number; y: number };
            direction: string;
            conflicts: any[] | readonly BoardProps.Item<any>[];
            disturbed: string | any[] | readonly BoardProps.Item<any>[];
          }) => {
            const columns = `column ${operation.placement.x + 1}`;
            const rows = `row ${operation.placement.y + 1}`;
            return createAnnouncement(
              `Item moved to ${
                operation.direction === "horizontal" ? columns : rows
              }.`,
              operation.conflicts,
              operation.disturbed
            );
          },
          liveAnnouncementDndItemResized: (operation: {
            isMinimalColumnsReached: any;
            isMinimalRowsReached: any;
            direction: string;
            placement: { width: any; height: any };
            conflicts: any[] | readonly BoardProps.Item<any>[];
            disturbed: string | any[] | readonly BoardProps.Item<any>[];
          }) => {
            const columnsConstraint = operation.isMinimalColumnsReached
              ? " (minimal)"
              : "";
            const rowsConstraint = operation.isMinimalRowsReached
              ? " (minimal)"
              : "";
            const sizeAnnouncement =
              operation.direction === "horizontal"
                ? `columns ${operation.placement.width}${columnsConstraint}`
                : `rows ${operation.placement.height}${rowsConstraint}`;
            return createAnnouncement(
              `Item resized to ${sizeAnnouncement}.`,
              operation.conflicts,
              operation.disturbed
            );
          },
          liveAnnouncementDndItemInserted: (operation: {
            placement: { x: number; y: number };
            conflicts: any[] | readonly BoardProps.Item<any>[];
            disturbed: string | any[] | readonly BoardProps.Item<any>[];
          }) => {
            const columns = `column ${operation.placement.x + 1}`;
            const rows = `row ${operation.placement.y + 1}`;
            return createAnnouncement(
              `Item inserted to ${columns}, ${rows}.`,
              operation.conflicts,
              operation.disturbed
            );
          },
          liveAnnouncementDndCommitted: (operationType: any) =>
            `${operationType} committed`,
          liveAnnouncementDndDiscarded: (operationType: any) =>
            `${operationType} discarded`,
          liveAnnouncementItemRemoved: (op: any) =>
            createAnnouncement(
              `Removed item ${op.item.data.title}.`,
              [],
              op.disturbed
            ),
          navigationAriaLabel: "Board navigation",
          navigationAriaDescription:
            "Click on non-empty item to move focus over",
          navigationItemAriaLabel: (item: BoardProps.Item<any>) =>
            item ? item.data.title : "Empty",
        };
      })()}
      empty={
        <Box textAlign="center" color="inherit">
          <SpaceBetween size="xxs">
            <div>
              <Box variant="strong" color="inherit">
                Nenhum item.
              </Box>
              <Box variant="p" color="inherit">
                Não há nenhum item neste painel.
              </Box>
            </div>
          </SpaceBetween>
        </Box>
      }
    />
  );
}
