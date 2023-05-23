import {
  Modal,
  Box,
  SpaceBetween,
  Button,
  Form,
  FormField,
  Input,
  Textarea,
} from "@cloudscape-design/components";
import { NoteContent } from "../types";
import { useEffect, useState } from "react";

interface NoteModalProps {
  visible: boolean;
  setVisible: Function;
  noteContent: NoteContent;
  handleNoteUpdate: Function;
  isEditing: boolean;
}

export default function NoteModal(props: NoteModalProps) {
  const [fields, setFields] = useState<NoteContent>(props.noteContent);

  // Recarregar campos ao reabrir o modal
  useEffect(() => {
    setFields(props.noteContent);
  }, [props.visible]);

  function handleSubmit() {
    if (fields.title !== "" && fields.content !== "") {
      props.handleNoteUpdate(fields, props.isEditing);
    }
  }

  return (
    <Modal
      onDismiss={() => props.setVisible(false)}
      visible={props.visible}
      closeAriaLabel="Fechar modal de edição de anotação"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={() => props.setVisible(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Editar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Editar anotação"
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Form variant="embedded">
          <SpaceBetween direction="vertical" size="l">
            <FormField label="Título">
              <Input
                value={fields.title}
                onChange={(event) => {
                  setFields({ ...fields, title: event.detail.value });
                }}
              />
            </FormField>
            <FormField label={"Conteúdo"}>
              <Textarea
                value={fields.content}
                onChange={(event) => {
                  setFields({ ...fields, content: event.detail.value });
                }}
              />
            </FormField>
          </SpaceBetween>
        </Form>
      </form>
    </Modal>
  );
}
