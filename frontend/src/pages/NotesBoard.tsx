import {
  AppLayout,
  Button,
  Container,
  ContentLayout,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";

export default function NotesBoard() {
  return (
    <div className="full-wh">
      <AppLayout
        contentType="dashboard"
        navigationHide
        toolsHide
        content={
          <ContentLayout
            header={
              <SpaceBetween size="m">
                <Header
                  variant="h1"
                  description="Esse é seu quadro pessoal de anotações!."
                  actions={
                    <Button variant="primary" iconName="external">
                      Logout
                    </Button>
                  }
                >
                  Quadro de anotações
                </Header>
              </SpaceBetween>
            }
          >
            <Container>Aqui vai ficar o quadro!</Container>
          </ContentLayout>
        }
      />
    </div>
  );
}
