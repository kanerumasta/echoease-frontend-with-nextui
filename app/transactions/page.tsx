"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useState } from "react";
import { z } from "zod";
import Image from "next/image";

import { TransactionSchema } from "@/schemas/transaction-schemas";
import { useFetchTransactionsQuery } from "@/redux/features/transactionApiSlice";

import { Transaction } from "./components/transaction";

export default function TransactionPage() {
  const [page, setPage] = useState(1);
  const [clickedTransaction, setClickedTransaction] = useState<z.infer<
    typeof TransactionSchema
  > | null>(null);
  const { data: transactions, isLoading: loadingTransactions } =
    useFetchTransactionsQuery(page);
  const loadingState = loadingTransactions ? "loading" : "idle";

  return (
    <div>
      <h1 className="text-2xl mb-4 font-bold tracking-wide">Transactions</h1>
      <Table
        bottomContent={
          transactions?.total_pages && transactions.total_pages > 1 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={transactions?.current_page ?? 1}
                total={transactions?.total_pages ?? 1}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
        classNames={{ tr: "h-[100px]" }}
        selectionMode="single"
      >
        <TableHeader>
          <TableColumn>Transaction Reference</TableColumn>

          <TableColumn>Transaction</TableColumn>
          <TableColumn>Transaction DateTime</TableColumn>
          <TableColumn>Amount</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={<span>No Transactions Yet.</span>}
          isLoading={loadingTransactions}
          items={transactions?.results ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item.id} onClick={() => setClickedTransaction(item)}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {item.transaction_type === "refund" ||
                  item.transaction_type === "payout" ? (
                    <Image
                      alt=""
                      height={40}
                      src="/media/down-arrow.png"
                      width={40}
                    />
                  ) : (
                    <Image
                      alt=""
                      height={40}
                      src="/media/up-arrow.png"
                      width={40}
                    />
                  )}
                  {item.transaction_reference}
                </div>
              </TableCell>

              <TableCell>{item.transaction}</TableCell>
              <TableCell className="text-xs">
                {item.formatted_created_at}
              </TableCell>
              <TableCell>
                <span
                  className={`${item.transaction_type === "refund" || item.transaction_type === "payout" ? "text-[#006fee]" : "text-[#f31260]"}`}
                >
                  {item.transaction_type === "refund" ||
                  item.transaction_type === "payout"
                    ? "+"
                    : "-"}
                  &#8369;{item.amount}
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        isOpen={!!clickedTransaction}
        onOpenChange={() => setClickedTransaction(null)}
      >
        <ModalContent>
          <ModalHeader>Transaction Details</ModalHeader>
          <ModalBody>
            {clickedTransaction && (
              <Transaction transaction={clickedTransaction} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
