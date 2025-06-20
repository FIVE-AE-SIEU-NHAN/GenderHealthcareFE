import api from '@/apis/axiosConfig';
import type { AskQuestionPayload, AskQuestionResponse } from '@/types/customer/questionTypes';

import { QUESTION_STATUS, QUESTION_SEARCH_FIELDS } from '@/Application/constants/manager/manager.questionConstants';
import { BackendQuestionResponse, PaginatedQuestionsResponse, UseQuestionsOptions } from '@/types/manager/questionTypes';
import { format } from 'date-fns';

// =============== QUESTION FETCHING ===============
export const fetchQuestions = async ({ page, limit, filters, search, sort, dateRange }: UseQuestionsOptions): Promise<PaginatedQuestionsResponse> => {
  const params: Record<string, string | number | number[] | string[]> = {
    _page: page,
    _limit: limit,
    _sort: sort.field,
    _order: sort.direction,
  };

  // Search 
  if (search.value && QUESTION_SEARCH_FIELDS[search.field as keyof typeof QUESTION_SEARCH_FIELDS]) {
    const backendKey = QUESTION_SEARCH_FIELDS[search.field as keyof typeof QUESTION_SEARCH_FIELDS];
    params[backendKey] = search.value;
  }

  // Filters
  for (const key in filters) {
    const value = filters[key];
    const valuesAsArray = Array.isArray(value) ? value : [value];
    if (key === 'status') {
      params._status = valuesAsArray.map(v => QUESTION_STATUS.API_MAP[String(v)]);
    } 
    else if (key === 'topic') {
      params._topic = valuesAsArray as string[]; 
    }
  }


  // Date Filter 
   if (dateRange && (dateRange.from || dateRange.to)) {
    const dates: string[] = [];
    
    if (dateRange.from) {
      dates.push(format(dateRange.from, 'yyyy-MM-dd'));
    }
    if (dateRange.to) {
      dates.push(format(dateRange.to, 'yyyy-MM-dd'));
    }

    if (dates.length > 0) {
      const dateKey = `_${dateRange.field}`; 
      params[dateKey] = dates;
    }
  }
  
  const response = await api.get<BackendQuestionResponse>('/question/customer', { params }); 
  const result = response.data?.result; 
  return {
    data: result?.questions ?? [],  
    total: result?.total ?? 0,  
  };
};

























// =============== CREATE (ASK) A NEW QUESTION ===============
/**
 * API call to submit a new question from a customer.
 * Corresponds to: POST /question/ask
 * @param payload - Contains the topic and the question string.
 * @returns A promise that resolves to the server's success message.
 */
export const askQuestionAPI = async (payload: AskQuestionPayload): Promise<AskQuestionResponse> => {
  // The 'accessTokenValidator' middleware on the backend means this call
  // will automatically be authenticated by your axios interceptor.
  const response = await api.post<AskQuestionResponse>('/question/ask', payload);
  return response.data;
};