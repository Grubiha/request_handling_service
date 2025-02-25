import {
  CreateIssueDto,
  FindIssuesDto,
  UpdateIssueDto,
} from "./issue_repo_dto";
import { Issue } from "./issue";

export interface IIssueRepo {
  Create(dto: CreateIssueDto): Promise<Issue>;
  Update(dto: UpdateIssueDto): Promise<void>;
  FindMany(dto: FindIssuesDto): Promise<Issue[]>;
  CancelAllInProcess(): Promise<void>;
}
