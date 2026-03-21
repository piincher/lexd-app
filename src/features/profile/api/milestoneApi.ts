import { apiV2 } from "@src/api/client";

const axios = apiV2;

const BASE_URL = "/customer/milestones";

export interface Milestone {
  id: string;
  name: string;
  description: string;
  requiredCBM: number;
  icon: string;
  color: string;
  unlocked: boolean;
  unlockedAt: string | null;
}

export interface MilestoneProgress {
  currentCBM: number;
  currentMilestone: Milestone;
  nextMilestone: Milestone | null;
  progress: number;
  allMilestones: Milestone[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: any;
}

export const milestoneApi = {
  getProgress: (): Promise<ApiResponse<MilestoneProgress>> =>
    axios.get(`${BASE_URL}/progress`),
};
