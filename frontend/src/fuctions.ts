import { useState } from "react";
import { NotePocketBase, NoteContent, Note } from "./types";

//puxa as notas criadas no pocketbase
export function fetchData(setStateDataFuc: Function) {
  const fetchNotes = async () => {
    const res = await fetch(
      "http://127.0.0.1:8090/api/collections/note/records?expand=data"
    );
    const data = await res.json();
    return data?.items as NotePocketBase[];
  };

  //resolve o problema das promessas
  const promise = Promise.resolve(fetchNotes());

  //pega o resultado das promessas
  promise.then((value) => {
    //Cria novo array com os objetos do conteudo da nota (title, content)
    let noteContentArray: NoteContent[] = [];
    value.map(({ expand }) => {
      const newObj = { title: expand.data.title, content: expand.data.content };
      noteContentArray.push(newObj);
    });

    //Cria novo array com os objetos das notas em si (sem a parte do conteudo e somente as que importam)
    const notesWithRightFields = value.map(({ id, rowSpan, columnSpan }) => ({
      id,
      rowSpan,
      columnSpan,
    }));

    //Junta os dois adicionando o conteudo dentro do novo campo "data"
    const newArrayTeste: Note[] = [];
    for (let i = 0; i < notesWithRightFields.length; i++) {
      const record = { ...notesWithRightFields[i], data: noteContentArray[i] };
      newArrayTeste.push(record);
    }

    //seta o novo estado das notas
    setStateDataFuc(newArrayTeste);
  });
}

export async function addNotePocketBase(newNote: Note) {
  const title = newNote.data.title;
  const content = newNote.data.content;
  const rowSpan = newNote.rowSpan;
  const columnSpan = newNote.columnSpan;

  const response = await fetch(
    "http://127.0.0.1:8090/api/collections/noteContent/records",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao adicionar registro");
  }

  const noteContent = await response.json();
  const data: string = noteContent.id;

  const response2 = await fetch(
    "http://127.0.0.1:8090/api/collections/note/records",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rowSpan,
        columnSpan,
        data,
      }),
    }
  );

  if (!response2.ok) {
    throw new Error("Erro ao adicionar registro");
  }
}

export async function deleteNotePocketBase(id: string) {
  const response = await fetch(
    `http://127.0.0.1:8090/api/collections/note/records/${id}`,
    {
      method: "GET",
    }
  );
  const data = response.json();

  //resolve o problema das promessas
  const promise = Promise.resolve(data);

  promise.then(async (value) => {
    const noteContentId = value.data;

    const response = await fetch(
      `http://127.0.0.1:8090/api/collections/noteContent/records/${noteContentId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao excluir registro");
    }
  });
}
