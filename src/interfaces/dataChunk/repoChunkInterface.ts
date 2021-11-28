import { InnerChunkInterface } from "./innerChunkInterface";

export interface RepoChunkInterface {
  type: string;
  name: string;
  inner: InnerChunkInterface;
  _folderLinks: string[];
  _actualLink: string[];
}
