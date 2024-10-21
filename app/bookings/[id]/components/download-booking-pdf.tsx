'use client'

import { Button } from "@nextui-org/button";
import { useState } from "react";
import { IoDownload } from "react-icons/io5";

export const DownloadBookingPDF = ({bookingId}:{bookingId:number}) => {
    const [downloading, setDownloading] = useState(false)
    const handleDownload = async () => {
        setDownloading(true)
        const response = await fetch(`http://localhost:8000/api/bookings/${bookingId}/pdf`,{credentials:'include'});
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `contract_${bookingId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        setDownloading(false)
      };

      return <Button isLoading={downloading} onPress={handleDownload} startContent={<IoDownload />}>Download PDF</Button>

}
