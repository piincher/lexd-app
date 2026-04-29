/**
 * WhatsApp Request Hooks - Barrel re-export for backward compatibility.
 * All hooks have been extracted into focused sub-hooks under ./requests/
 */

export {
  whatsappRequestQueryKeys,
  useGetWhatsAppRequests,
  useGetWhatsAppRequestById,
  useGetPendingRequests,
  useGetWhatsAppStats,
  useCreateWhatsAppRequest,
  useMarkRequestProcessing,
  useMarkRequestCompleted,
  useGeneratePdf,
  useSearchCustomer,
  useAddNotes,
  useCancelRequest,
  useWhatsAppRequestStats,
  useRefreshWhatsAppRequests,
} from './index';
