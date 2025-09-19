import { useState } from 'react';
import type { TicketType, SubmissionType, SubmissionStatus } from '@/lib/types';

type UseEmailSubmissionProps = {
  submissionType: SubmissionType;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

type SubmissionData = {
  ticket_type: TicketType;
  ticket_code: string;
  ticket_amount: number;
  user_email: string;
  user_phone?: string;
  user_name: string;
  [key: string]: any;
};

export const useEmailSubmission = ({ submissionType, onSuccess, onError }: UseEmailSubmissionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitForm = async (formData: SubmissionData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Generate submission data
      const uniqueId = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      const now = new Date().toISOString();
      
      const submission = {
        ...formData,
        id: uniqueId,
        submission_type: submissionType,
        status: 'pending' as SubmissionStatus,
        created_at: now,
        updated_at: now,
      };

      // Send to API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submission,
          type: submissionType,
          language: 'fr', // Default language
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSuccess(true);
      onSuccess?.();
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error.message);
      onError?.(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitForm,
    isLoading,
    error,
    isSuccess,
    reset: () => {
      setIsSuccess(false);
      setError(null);
    },
  };
};
