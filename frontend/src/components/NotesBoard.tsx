import {
  Board,
  BoardItem,
  BoardProps,
} from "@cloudscape-design/board-components";
import {
  Header,
  Box,
  SpaceBetween,
  ButtonDropdown,
  Button,
  Container,
} from "@cloudscape-design/components";
import { useState } from "react";
import NoteModal from "./NoteModal";
import { Note, NoteContent } from "../types";

export default function NotesBoard() {
  const [notes, setNotes] = useState<Note[]>([
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

  const NOTE_UNSET = "";
  const emptyNoteContent = { title: "", content: "" };
  const [newNotesCounter, setNewNotesCounter] = useState(0);

  const [currentNoteId, setCurrentNoteId] = useState<string>(NOTE_UNSET);
  const [updatingNoteContent, setUpdatingNoteContent] = useState<NoteContent>({
    title: "",
    content: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  function getNoteById(noteId: string) {
    return notes.find((note) => note.id === noteId);
  }

  function addNote(noteContent: NoteContent) {
    const newNote = {
      id: "NEW_" + newNotesCounter,
      rowSpan: 1,
      columnSpan: 1,
      data: noteContent,
    };
    setNewNotesCounter(newNotesCounter + 1);
    setNotes([...notes, newNote]);
  }

  function editNote(noteContent: NoteContent) {
    const noteToEdit = getNoteById(currentNoteId);
    if (noteToEdit) {
      noteToEdit.data = noteContent;
      setNotes(notes);
    }
    setCurrentNoteId(NOTE_UNSET);
  }

  function handleNoteUpdate(newData: NoteContent) {
    setHasChanged(true);
    console.log(hasChanged);
    if (isEditing) {
      editNote(newData);
    } else {
      addNote(newData);
    }
    setModalVisible(false);
  }

  function handleAddNoteButtonClick() {
    setUpdatingNoteContent(emptyNoteContent);
    setIsEditing(false);
    setModalVisible(true);
  }

  function handleButtonDropdownClick(
    noteId: string,
    buttonId: any,
    actions: any
  ) {
    switch (buttonId) {
      case "edit":
        setCurrentNoteId(noteId);
        setUpdatingNoteContent(getNoteById(noteId)?.data ?? emptyNoteContent);
        setIsEditing(true);
        setModalVisible(true);
        break;
      case "remove":
        actions.removeItem();
        break;
      default:
        break;
    }
  }

  function handleSaveButtonClick() {
    console.log(notes);
    // TODO: Save notes to database
    setHasChanged(false);
  }

  function handleItemsChange(event: any) {
    setNotes(event.detail.items);
    setHasChanged(true);
  }

  return (
    <div>
      <NoteModal
        visible={modalVisible}
        setVisible={setModalVisible}
        noteContent={updatingNoteContent}
        handleNoteUpdate={handleNoteUpdate}
      />
      <Container
        header={
          <Header
            variant="h2"
            description="Você pode adicionar, editar e remover anotações."
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button
                  iconName="upload-download"
                  disabled={!hasChanged}
                  onClick={handleSaveButtonClick}
                >
                  Salvar
                </Button>
                <Button
                  variant="primary"
                  iconName="add-plus"
                  onClick={handleAddNoteButtonClick}
                >
                  Nova
                </Button>
              </SpaceBetween>
            }
          >
            Notas ({notes.length})
          </Header>
        }
      >
        <Board
          renderItem={(item, actions) => (
            <BoardItem
              header={<Header>{item.data.title}</Header>}
              settings={
                <ButtonDropdown
                  items={[
                    { id: "edit", text: "Editar" },
                    { id: "remove", text: "Remover" },
                  ]}
                  ariaLabel="Configurações do quadro de anotações"
                  variant="icon"
                  onItemClick={(event: any) =>
                    handleButtonDropdownClick(item.id, event.detail.id, actions)
                  }
                />
              }
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
          onItemsChange={(event: any) => handleItemsChange(event)}
          items={notes}
          empty={
            <Box textAlign="center" color="inherit">
              <SpaceBetween size="xxs">
                <div>
                  <Box variant="strong" color="inherit">
                    Nenhuma nota
                  </Box>
                  <Box variant="p" color="inherit">
                    Não há notas neste quadro.
                  </Box>
                </div>
              </SpaceBetween>
            </Box>
          }
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
                disturbed.length > 0
                  ? `Disturbed ${disturbed.length} items.`
                  : "";
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
        />
      </Container>
    </div>
  );
}
