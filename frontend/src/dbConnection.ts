import { NotePocketBase, NoteContent, Note } from "./types";

//LISTA TODAS AS NOTAS DO BD
export async function fetchData(): Promise<Note[]> {
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
  const noteArray: Note[] = [];
  await promise.then(async (value) => {
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
    for (let i = 0; i < notesWithRightFields.length; i++) {
      const record = { ...notesWithRightFields[i], data: noteContentArray[i] };
      noteArray.push(record);
    }

    // //seta o novo estado das notas
    // await setData(noteArray);
  });
  return noteArray;
}

//ADICIONA NOTA NO BD
export async function addNotePocketBase(newNote: Note) {
  const title = newNote.data.title;
  const content = newNote.data.content;
  const rowSpan = newNote.rowSpan;
  const columnSpan = newNote.columnSpan;

  //cria primeiro o noteContent
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

  //pega o json gerado pelo metodo POST
  const noteContent = await response.json();

  //pega o id do noteContent gerado
  const data: string = noteContent.id;

  //cria o Note com o id do noteContent no atributo data
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

//APAGA NOTA NO BD
export async function deleteNotePocketBase(id: string) {
  //busca a note em questão pelo id para pegar o id do noteContent
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
    //pega o id do noteContent
    const noteContentId = value.data;

    //deleta o noteContent (que por cascata deleta o Note)
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

//EDITA NOTA NO BD
export async function editNotePocketBase(id: string, noteContent: NoteContent) {
  //busca a note em questão pelo id para pegar o id do noteContent
  const response = await fetch(
    `http://127.0.0.1:8090/api/collections/note/records/${id}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao editar puxar id de registro");
  }

  const data = await response.json();

  //resolve o problema das promessas
  const promise = Promise.resolve(data);

  await promise.then(async (value) => {
    //pega o id do noteContent
    const noteContentId = value.data;

    //salva os valores da mudança em constantes
    const title = noteContent.title;
    const content = noteContent.content;

    //faz a edição
    const response = await fetch(
      `http://127.0.0.1:8090/api/collections/noteContent/records/${noteContentId}`,
      {
        method: "PATCH", // ou 'PATCH' para atualização parcial
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
      throw new Error("Erro ao editar registro");
    }
  });
}

//EDITA NOTA NO BD
export async function editNoteStyle(id: string) {
  console.log("funcao chamada");
  //busca a note em questão pelo id para pegar o id do noteContent
  const response = await fetch(
    `http://127.0.0.1:8090/api/collections/note/records/${id}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao editar puxar id de registro");
  }

  const data = await response.json();

  //resolve o problema das promessas
  const promise = Promise.resolve(data);

  promise.then(async (value) => {
    const rowSpan = value.rowSpan;
    const columnSpan = value.columnSpan;
    const columnOffset = value.columnOffset;

    //faz a edição
    const response = await fetch(
      `http://127.0.0.1:8090/api/collections/note/records/${id}`,
      {
        method: "PATCH", // ou 'PATCH' para atualização parcial
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rowSpan,
          columnSpan,
          columnOffset,
        }),
      }
    );

    console.log(`Nota editada. Nova posição ${value.columnOffset}`);

    if (!response.ok) {
      throw new Error("Erro ao editar estilo");
    }
  });
}
