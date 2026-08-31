import { mapQuestionToRaw, mapTest } from "@/lib/utils";
import { Question, RawTest, Test } from "@/models/test/types";
import { RawUser } from "@/models/user/user";

type RequestConfig = {
  params?: Record<string, string>;
  options?: RequestInit;
};

export const request = async <T>(
  path: string,
  config: RequestConfig = {},
): Promise<T> => {
  const { params, options } = config;
  const url = params ? `${path}?${new URLSearchParams(params)}` : path;

  let res;
  try {
    res = await fetch(url, {
      ...options,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    throw new Error("Network Error");
  }

  if (res.status === 401) {
    throw new Error("Authentication failed");
  }

  if (!res.ok) {
    throw new Error("An error occurred while fetching the data");
  }

  if (res.status === 204) return null as T;

  return res.json();
};

export const fetchCurrentUser = async () => {
  const data = await request<RawUser>("/api/current_user/");
  return {
    id: data.id,
    username: data.username,
    userType: data.user_type,
  };
};

export const loginRequest = async (payload: {
  username: string;
  password: string;
}) => {
  const data = await request<RawUser>("/api/signin/", {
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });

  return {
    id: data.id,
    username: data.username,
    userType: data.user_type,
  };
};

export const logoutRequest = async () => {
  return request("/api/logout/", { options: { method: "DELETE" } });
};

type PaginationType = {
  current_page: number;
  per_page: number;
  next_page: number;
  prev_page: number;
  total_pages: number;
  total_count: number;
};

type PaginatedTests = { pagination: PaginationType; results: TestBase[] };

export const fetchTests = async (
  page: string,
  search: string,
  sort: "asc" | "desc",
) => {
  const data = await request<PaginatedTests>("/api/tests/", {
    params: {
      page,
      per_page: "10",
      search,
      sort_field: "created_at",
      sort_direction: sort,
    },
  });

  return data;
};

type TestBase = {
  id: number;
  title: string;
  owner: number;
  isPublished: boolean;
};

export const createTestRequest = async (payload: { title: string }) => {
  return request<TestBase>("/api/tests/", {
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });
};

export const fetchTestById = async (testId: string): Promise<Test> => {
  const data = await request<RawTest>(`/api/tests/${testId}/`);
  return mapTest(data);
};

export const updateTestRequest = async (
  testId: string,
  payload: Partial<{ title: string; isPublished: boolean }>,
) => {
  return request<TestBase>(`/api/tests/${testId}`, {
    options: { method: "PATCH", body: JSON.stringify(payload) },
  });
};

export const deleteTestRequest = async (testId: string) => {
  return request(`/api/tests/${testId}`, {
    options: { method: "DELETE" },
  });
};

export const createQuestions = (testId: number, questions: Question[]) => {
  return request(`/api/tests/${testId}/questions`, {
    options: {
      method: "POST",
      body: JSON.stringify(questions.map(mapQuestionToRaw)),
    },
  });
};

export const updateQuestions = (testId: string, questions: Question[]) => {
  return request(`/api/tests/${testId}/questions`, {
    options: {
      method: "PATCH",
      body: JSON.stringify(questions.map(mapQuestionToRaw)),
    },
  });
};
