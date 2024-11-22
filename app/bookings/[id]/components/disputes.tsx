import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { z } from "zod";

import { DisputeSchema } from "@/schemas/dispute-schemas";
import { useCancelDisputeMutation } from "@/redux/features/disputeApiSlice";

type DisputesProps = {
  disputes: z.infer<typeof DisputeSchema>[];
  onRefetch: any;
};

// ('open','Open'),
// ('closed','Closed'),
// ('under_review','Under Review'),
// ('resolved','Resolved'),
// ('escalated','Escalated'),

export const Disputes: React.FC<DisputesProps> = ({ disputes, onRefetch }) => {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const [clickedDisputeId, setClickedDisputeId] = useState<number | null>(null);
  const [cancelDispute, { isLoading }] = useCancelDisputeMutation();
  const handleCancel = async (disputeId: number) => {
    await cancelDispute(disputeId);
    onRefetch();
    onClose();
  };

  const StatusChip = (status: string) => {
    let color:
      | "default"
      | "warning"
      | "success"
      | "danger"
      | "primary"
      | "secondary"
      | undefined;

    switch (status) {
      case "open":
        color = "default";
        break;
      case "under_review":
        color = "warning";
        break;
      case "closed":
        color = "success";
        break;
      case "escalated":
        color = "danger";
        break;
      case "resolved":
        color = "success";
        break;
      default:
        color = "default";
        break;
    }

    return (
      <Chip className="capitalize" color={color} variant="flat">
        {status.split("_").join(" ")}
      </Chip>
    );
  };

  return (
    <div className="mt-4 p-2 bg-white/5 rounded-lg">
      <h1 className="mb-4 text-xl text-white/50 font-bold">Raised Disputes</h1>
      <Table
        aria-label="disputes table"
        classNames={{ wrapper: "bg-transparent" }}
      >
        <TableHeader>
          <TableColumn>Reason</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody items={disputes}>
          {(dispute) => (
            <TableRow key={dispute.id}>
              <TableCell>
                <span className="capitalize">{dispute.reason}</span>
              </TableCell>
              <TableCell>{dispute.description}</TableCell>
              <TableCell>{StatusChip(dispute.status)}</TableCell>
              <TableCell>
                {dispute.status === "under_review" && (
                  <Tooltip content="Cancel">
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => {
                        setClickedDisputeId(dispute.id);
                        onOpen();
                      }}
                    >
                      <MdCancel />
                    </Button>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Cancel Dispute</ModalHeader>
          <ModalBody>
            <p>Do you want to cancel this dispute?</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              No
            </Button>
            <Button
              color="primary"
              isLoading={isLoading}
              onPress={() => clickedDisputeId && handleCancel(clickedDisputeId)}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
