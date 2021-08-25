import { RepoInterface } from "./interfaces/repoInterface";
/**
 * Async function
 * @param {string} userName Github username
 */
export declare function getPinned(userName: string): Promise<RepoInterface[] | Error>;
