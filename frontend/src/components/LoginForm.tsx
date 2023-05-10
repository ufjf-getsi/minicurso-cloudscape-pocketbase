import Input from "@cloudscape-design/components/input";
import { useState } from "react";

export default function LoginForm() {
  
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

  return (
    <form>
      <Input
        placeholder="Usuário"
        type="text"
        value={username}
        onChange={({ detail }) => setUsername(detail.value)}
      />
      <Input
        placeholder="Senha"
        type="password"
        value={password}
        onChange={({ detail }) => setPassword(detail.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
