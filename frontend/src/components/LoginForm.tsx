import {
  Button,
  Container,
  Form,
  FormField,
  Header,
  Input,
  SpaceBetween,
} from "@cloudscape-design/components";
import { FormEvent, useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(username, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button formAction="none" variant="link">
              Problemas para logar?
            </Button>
            <Button variant="primary" href="/BoardPage">
              Login
            </Button>
          </SpaceBetween>
        }
      >
        <Container header={<Header variant="h2">Fazer login</Header>}>
          <SpaceBetween direction="vertical" size="l">
            <FormField label="Usuário">
              <Input
                placeholder="Usuário"
                type="text"
                value={username}
                onChange={({ detail }) => setUsername(detail.value)}
              />
            </FormField>
            <FormField label="Senha">
              <Input
                placeholder="Senha"
                type="password"
                value={password}
                onChange={({ detail }) => setPassword(detail.value)}
              />
            </FormField>
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
}
