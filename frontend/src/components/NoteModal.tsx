import {
  Modal,
  Box,
  SpaceBetween,
  Button,
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
      Conteúdo do modal
    </Modal>
  );
}
