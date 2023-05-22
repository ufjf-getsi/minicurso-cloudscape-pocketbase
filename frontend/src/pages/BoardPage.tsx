import {
  Board,
  BoardItem,
  BoardProps,
} from "@cloudscape-design/board-components";
import {
  AppLayout,
  Box,
  Button,
  Container,
  ContentLayout,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useState } from "react";
import NotesBoard from "../components/NotesBoard";

export default function BoardPage() {
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
            <Container>
              <NotesBoard />
            </Container>
          </ContentLayout>
        }
      />
    </div>
  );
}
