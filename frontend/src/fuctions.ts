import { NotePocketBase, NoteContent, Note } from "./types";

//puxa as notas criadas no pocketbase
export function fetchData (setStateDataFuc : Function){
    const  fetchNotes = async () => {
        const res = await fetch(
          'http://127.0.0.1:8090/api/collections/note/records?expand=data',
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
              const newObj = {title : expand.data.title, content: expand.data.content}
              noteContentArray.push(newObj);
          });
    
          //Cria novo array com os objetos das notas em si (sem a parte do conteudo e somente as que importam) 
          const notesWithRightFields = value.map(({id, rowSpan, columnSpan}) =>({
              id,
              rowSpan,
              columnSpan,
          }));
    
          //Junta os dois adicionando o conteudo dentro do novo campo "data"
          const newArrayTeste: Note[] = [];
          for (let i = 0; i < notesWithRightFields.length; i++) {
              const record = {...notesWithRightFields[i], data: noteContentArray[i]};
              newArrayTeste.push(record);            
          }
    
          //seta o novo estado das notas
          setStateDataFuc(newArrayTeste);
      })
}