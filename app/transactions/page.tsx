'use client'

import { useFetchTransactionsQuery } from "@/redux/features/transactionApiSlice";
import { TransactionSchema } from "@/schemas/transaction-schemas";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { useState } from "react";
import { z } from "zod";
import { Transaction } from "./components/transaction";

export default function TransactionPage(){
    const [page, setPage] = useState(1)
    const [clickedTransaction, setClickedTransaction] = useState<z.infer<typeof TransactionSchema>|null>(null)
    const {data:transactions, isLoading:loadingTransactions} = useFetchTransactionsQuery(page)
    const loadingState = loadingTransactions ? 'loading':'idle'
    return <div>
        <h1 className="text-2xl mb-4 font-bold tracking-wide">Transactions</h1>
        <Table classNames={{tr:'h-[100px]'}} selectionMode="single" bottomContent={
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

                <TableColumn>Transaction</TableColumn>
                <TableColumn>Transaction DateTime</TableColumn>
                <TableColumn>Amount</TableColumn>
            </TableHeader>
            <TableBody isLoading={loadingTransactions} loadingState={loadingState} items={transactions?.results ?? []} loadingContent={<Spinner />} emptyContent={<span>No Transactions Yet.</span>}>
                {(item)=>(
                    <TableRow onClick={()=>setClickedTransaction(item)} key={item.id}>
                        <TableCell>{item.transaction_reference}</TableCell>

                        <TableCell>{item.transaction}</TableCell>
                        <TableCell className="text-xs">{item.formatted_created_at}</TableCell>
                        <TableCell><span className="text-[#f31260]">-&#8369;{item.amount}</span></TableCell>
                    </TableRow>
                )}

            </TableBody>
        </Table>
        <Modal isOpen={!!clickedTransaction} onOpenChange={()=>setClickedTransaction(null)}>
            <ModalContent>
                <ModalHeader>Transaction Details</ModalHeader>
                <ModalBody>
                    {clickedTransaction && <Transaction transaction={clickedTransaction}/>}
                </ModalBody>
            </ModalContent>
        </Modal>
    </div>
}
