"use client";

import { Chip } from "@nextui-org/chip";
import { Pagination } from "@nextui-org/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { statusChoices } from "@/config/constants";
import { useFetchMyBookingsQuery } from "@/redux/features/bookingApiSlice";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Spinner } from "@nextui-org/spinner";
import { SharedSelection } from "@nextui-org/system";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { Input } from "@nextui-org/input";
import { SearchIcon } from "@/components/icons";

type BookingParamsFilter = {
    page:number;
    status:string|null,
    sort_by:string|null,
    sort_order:string|null,
    paginate:boolean,
    q:string|null

}

export const BookingHistory = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("")
  const [selected, setSelected] = useState<SharedSelection>(new Set(statusChoices.map(status=>status.value)))
  const [filter, setFilter] = useState<BookingParamsFilter>({
    paginate:true,
    page:page,
    status:'',
    sort_by:"event_date",
    sort_order:"asc",
    q:null
  })
  const { data: bookingHistory, isLoading } = useFetchMyBookingsQuery(filter);
  const router = useRouter();

  useEffect(()=>{
    const status = Array.from(selected).join(',')
    setFilter(prevState=>({...prevState,status:status}))
  },[selected])

  const handleSearch = () => {
    if(searchText.length > 0){
        setFilter((prevState)=>({...prevState, q:searchText}))
    }
  }

  const handleSort = (column:string) => {
    setFilter((prevState)=>(
        {...prevState,
            sort_by:column,
            sort_order:prevState.sort_by === column && prevState.sort_order === 'asc' ? 'desc' : 'asc' }))
  }

  return (
    <div className="">
        <div className="mt-3 space-y-3 mb-2">
            <div className="flex justify-between flex-row-reverse items-end">
        <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button  endContent={<IoChevronDown />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={selected}
                selectionMode="multiple"
                onSelectionChange={(e)=>setSelected(e)}
              >
                {statusChoices.map((status) => (
                  <DropdownItem key={status.value} className="capitalize">
                    {status.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Input value={searchText} onValueChange={setSearchText} className="max-w-[250px]" endContent={<Button isIconOnly variant="light" onPress={handleSearch}><SearchIcon className="cursor-pointer" /></Button>} placeholder="Search"/>
            </div>
        <p className="text-xs text-white/50">Bookings Count: {bookingHistory?.results.length}</p>

        </div>
      <Table
        fullWidth
        selectionMode="single"
        aria-label="bookings table"
        bottomContent={
          bookingHistory?.total_pages && bookingHistory.total_pages > 1 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={bookingHistory?.current_page ?? 1}
                total={bookingHistory?.total_pages ?? 1}
                onChange={(page) => setFilter(prevState=>({...prevState, page:page}))}
              />
            </div>
          ) : null
        }
        classNames={{
          wrapper: "rounded-md",
          base: "border-none",tr:'cursor-pointer'
        }}
        onRowAction={(e) => router.push(`/bookings/${e}`)}
      >
        <TableHeader>
          <TableColumn>Reference ID</TableColumn>
          <TableColumn>Event</TableColumn>
          <TableColumn onClick={()=>handleSort('event_date')}><div className="flex items-center gap-2"><p>Event Date</p>{filter.sort_by === "event_date" && filter.sort_order === "asc" ? <IoChevronDown size={15}/> : <IoChevronUp size={15} />}</div></TableColumn>
          <TableColumn>Event Time</TableColumn>

          <TableColumn>Echoee</TableColumn>
          <TableColumn onClick={()=>handleSort('status')}><div className="flex items-center gap-2"><p>Status</p>{filter.sort_by === "status" && filter.sort_order === "asc" ? <IoChevronDown size={15}/> : <IoChevronUp size={15} />}</div></TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No Bookings Yet."}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading Bookings.." />}
          loadingState={isLoading?'loading':'idle'}
          items={bookingHistory?.results ? bookingHistory.results : []}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.booking_reference}</TableCell>
              <TableCell>{item.event_name}</TableCell>
              <TableCell>{item.formatted_event_date}</TableCell>
              <TableCell>{item.formatted_start_time} - {item.formatted_end_time}</TableCell>

              <TableCell className="capitalize">
                {item.artist.user.fullname}
              </TableCell>
              <TableCell>
                <Chip
                size="sm"
                variant="flat"
                    className="capitalize"
                  classNames={{
                    base: "border-none outline-none",
                    content: "border-none outline-none",

                  }}
                  color={getColorByStatus(item.status)}

                >
                  {item.status.replace('_'," ")}
                </Chip>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

type ColorStatus =
  | "default"
  | "warning"
  | "danger"
  | "success"
  | "secondary"
  | "primary";
const getColorByStatus = (status: string): ColorStatus => {
  let color: ColorStatus = "default";

  switch (status) {
    case "approved":
      color = "secondary";
      break;
    case "rejected":
      color = "danger";
      break;
    case "completed":
      color = "success";
      break;
    case "awaiting_downpayment":
      color = "secondary";
      break;
    case "pending":
      color = "warning";
      break;
    default:
      color = "default";
      break;
  }

  return color;
};
