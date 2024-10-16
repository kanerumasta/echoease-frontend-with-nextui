import { z } from "zod";
import { apiSlice } from "../services/apiSlice";
import { PaginatedTransactionSchema, TransactionSchema } from "@/schemas/transaction-schemas";

const transactionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchTransactions: builder.query<z.infer<typeof PaginatedTransactionSchema>,number>(
            {
                query: (page) => ({
                    url: `/transactions?page=${page}`,
                    method: "GET",
                }),
                providesTags: ["Transactions"],
            },
        ),
    }),
 });

 export const {
    useFetchTransactionsQuery
} = transactionApiSlice
