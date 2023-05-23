export interface NoteContent {
  title: string;
  content: string;
}

export interface Note {
  id: string;
  rowSpan?: number;
  columnSpan?: number;
  columnOffset?: { [columns: number]: number };
  data: NoteContent;
}
