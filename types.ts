
export type CodeRating = "Better" | "Good" | "Normal" | "Bad";
export type IssueType = "bug" | "style" | "performance" | "security" | "readability" | "other";

export interface CodeIssue {
  title: string;
  type: IssueType;
  description: string;
  fixExample: string;
}

export interface CodeReviewResult {
  rating: CodeRating;
  summary: string;
  explanation: string;
  issues: CodeIssue[];
  suggestions: string[];
  improvedCode: string;
  aiUsagePercentage: number;
  originAnalysis: string;
}

export interface ReviewRequest {
  code: string;
  language: string;
}
