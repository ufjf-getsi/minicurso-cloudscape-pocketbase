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
import { useEffect, useState } from "react";
import { NoteContent } from "../types";

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

  async function handleSubmit() {
    if (fields.title !== "" && fields.content !== "") {
      await props.handleNoteUpdate(fields);
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
            <Button variant="primary" onClick={() => handleSubmit()}>
              {props.isEditing ? "Editar" : "Adicionar"}
            </Button>
          </SpaceBetween>
        </Box>
      }
      header={`${props.isEditing ? "Editar" : "Adicionar"} anotação`}
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
