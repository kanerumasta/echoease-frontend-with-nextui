'use client'

import { useFetchTransactionsQuery } from "@/redux/features/transactionApiSlice";
import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { useState } from "react";

export default function TransactionPage(){
    const [page, setPage] = useState(1)
    const {data:transactions, isLoading:loadingTransactions} = useFetchTransactionsQuery(page)
    const loadingState = loadingTransactions ? 'loading':'idle'
    return <div>
        <h1 className="text-2xl mb-4 font-bold tracking-wide">Transactions</h1>
        <Table bottomContent={
          transactions?.total_pages && transactions.total_pages  > 1 ? <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={transactions?.current_page ?? 1}
              total={transactions?.total_pages ?? 1}
              onChange={(page) => setPage(page)}
            />
          </div> : null
    }>
            <TableHeader>
                <TableColumn>
                    Transaction Reference
                </TableColumn>
                <TableColumn>Booking Reference</TableColumn>
                <TableColumn>Transaction</TableColumn>
                <TableColumn>Date</TableColumn>
                <TableColumn>Amount</TableColumn>
            </TableHeader>
            <TableBody isLoading={loadingTransactions} loadingState={loadingState} items={transactions?.results ?? []} loadingContent={<Spinner />} emptyContent={<span>No Transactions Yet.</span>}>
                {(item)=>(
                    <TableRow key={item.id}>
                        <TableCell>{item.transaction_reference}</TableCell>
                        <TableCell>{item.booking}</TableCell>
                        <TableCell>{item.transaction}</TableCell>
                        <TableCell className="text-xs">{item.formatted_created_at}</TableCell>
                        <TableCell>&#8369;{item.amount}</TableCell>
                    </TableRow>
                )}

            </TableBody>
        </Table>
    </div>
}
