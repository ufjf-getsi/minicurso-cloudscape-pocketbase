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
import { useState } from "react";
import { NoteContent } from "../types";

interface NoteModalProps {
  visible: boolean;
  setVisible: Function;
}

export default function NoteModal(props: NoteModalProps) {
  const [fields, setFields] = useState<NoteContent>({ title: "", content: "" });

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
            <Button variant="primary" onClick={undefined}>
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
