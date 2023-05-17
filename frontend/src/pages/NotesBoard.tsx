import { useHref, useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";

//import { BoardItemDefinition } from "@cloudscape-design/board-components/internal/interfaces";

import {
  AppLayout,
  ContentLayout,
  Container,
  Header,
  Form,
  SpaceBetween,
  Button,
  AlertProps,
  Box,
} from "@cloudscape-design/components";
import {
  Board,
  BoardItem,
  BoardProps,
} from "@cloudscape-design/board-components";

export default function NotesBoard() {
  const [items, setItems] = useState([
    {
      id: "1",
      rowSpan: 1,
      columnSpan: 2,
      data: { title: "Demo 1", content: "First item" },
    },
    {
      id: "2",
      rowSpan: 1,
      columnSpan: 2,
      data: { title: "Demo 2", content: "Second item" },
    },
    {
      id: "3",
      rowSpan: 1,
      columnSpan: 3,
      data: { title: "Demo 3", content: "Third item" },
    },
  ]);

  return (
    <Board
      renderItem={(item: any) => (
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
      empty={<div>No items to display</div>} // Adicionada a propriedade `empty`
      i18nStrings={(() => {
        function createAnnouncement(
          operationAnnouncement: any,
          conflicts: any,
          disturbed: any
        ) {
          const conflictsAnnouncement =
            conflicts.length > 0
              ? `Conflicts with ${conflicts
                  .map((c: any) => c.data.title)
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
          liveAnnouncementDndStarted: (operationType) =>
            operationType === "resize" ? "Resizing" : "Dragging",
          liveAnnouncementDndItemReordered: (operation) => {
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
          liveAnnouncementDndItemResized: (operation) => {
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
          liveAnnouncementDndItemInserted: (operation) => {
            const columns = `column ${operation.placement.x + 1}`;
            const rows = `row ${operation.placement.y + 1}`;
            return createAnnouncement(
              `Item inserted to ${columns}, ${rows}.`,
              operation.conflicts,
              operation.disturbed
            );
          },
          liveAnnouncementDndCommitted: (operationType) =>
            `${operationType} committed`,
          liveAnnouncementDndDiscarded: (operationType) =>
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
          navigationItemAriaLabel: (item: any) =>
            item ? item.data.title : "Empty",
        };
      })()}
    />
  );
}
