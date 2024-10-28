import { DisputeSchema } from "@/schemas/dispute-schemas"
import { Chip } from "@nextui-org/chip"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table"
import { z } from "zod"

type DisputesProps = {
    disputes: z.infer<typeof DisputeSchema>[]
}

// ('open','Open'),
// ('closed','Closed'),
// ('under_review','Under Review'),
// ('resolved','Resolved'),
// ('escalated','Escalated'),

export const Disputes:React.FC<DisputesProps> = ({disputes}) => {

    const StatusChip = (status:string) => {
        let color:"default" | "warning" | "success" | "danger" | "primary" | "secondary" | undefined;

        switch (status) {
            case 'open':
                color = "default"
                break;
            case 'under_review':
                color = "warning"
                break;
            case 'closed':
                color = "success"
                break;
            case 'escalated':
                color = "danger"
                break;
            case'resolved':
                color = "success"
            default:
                color = "default"
                break;
        }
        return <Chip className="capitalize" variant="flat" color={color}>{status.split('_').join(" ")}</Chip>
    }
    return <div className="mt-4 p-2 bg-white/5 rounded-lg">
        <h1 className="mb-4 text-xl text-white/50 font-bold">Raised Disputes</h1>
        <Table classNames={{wrapper:'bg-transparent',}} aria-label="disputes table">
            <TableHeader>
                <TableColumn>Reason</TableColumn>
                <TableColumn>Description</TableColumn>
                <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody items={disputes}>
                {(dispute)=>(
                    <TableRow key={dispute.id}>
                        <TableCell><span className="capitalize">{dispute.reason}</span></TableCell>
                        <TableCell>{dispute.description}</TableCell>
                        <TableCell>
                           {StatusChip(dispute.status)}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>

        </Table>
    </div>
}
