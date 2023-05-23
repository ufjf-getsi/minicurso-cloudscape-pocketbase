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

interface NoteModalProps {
  visible: boolean;
  setVisible: Function;
}

export default function NoteModal(props: NoteModalProps) {
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
              <Input value={""} />
            </FormField>
            <FormField label={"Conteúdo"}>
              <Textarea value={""} />
            </FormField>
          </SpaceBetween>
        </Form>
      </form>
    </Modal>
  );
}
