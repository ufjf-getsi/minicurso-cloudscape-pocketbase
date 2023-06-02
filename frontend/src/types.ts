export interface NoteContent {
  title: string;
  content: string;
}

export interface Note {
  id: string;
  rowSpan: number;
  columnSpan: number;
  columnOffset?: { [columns: number]: number };
  data: NoteContent;
}

export interface NoteContentPocketBase {
  collectionId: string,
  collectionName: string,
  content: string,
  created: Date,
  id: string, 
  title: string
}

export interface Data{
  data : NoteContentPocketBase,
}

export interface NotePocketBase {
  collectionId: string;
  collectionName: string;
  columnOffset: object;
  columnSpan: number;
  created: Date;
  data: string;
  expand: Data;
  id: string;
  rowSpan: number;
}
