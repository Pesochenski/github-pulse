import { InnerChunkInterface } from "./innerChunkInterface";

export interface RepoChunkInterface {
  id: number;
  parentId: number | null;
  type: string;
  name: string;
  inner: InnerChunkInterface;
  _actualLink: string[];
  _folderLinks: string[];
}
