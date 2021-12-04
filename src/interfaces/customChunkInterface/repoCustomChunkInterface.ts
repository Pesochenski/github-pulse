import { InnerCustomChunkInterface } from "./innerCustomChunkInterface";

export interface RepoCustomChunkInterface {
  id: number;
  parentId: number | null;
  type: string;
  name: string;
  inner: InnerCustomChunkInterface;
  _actualLink: string[];
  _folderLinks: string[];
}
