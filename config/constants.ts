export const UserRoles = {
  artist: "artist",
  client: "client",
};

// status_choices = [
//     ('pending','Pending'),
//     ('cancelled','Cancelled'),
//     ('awaiting_downpayment','Wating for Downpayment'),
//     ('rejected', 'Rejected'),
//     ('approved', 'Approved'),
//     ('completed','Completed'),
//     ('expired','Expired'),
//     ]

export const statusChoices = [
  { value: "pending", label: "Pending" },
  { value: "cancelled", label: "Cancelled" },
  { value: "awaiting_downpayment", label: "Waiting for Downpayment" },
  { value: "rejected", label: "Rejected" },
  { value: "approved", label: "Approved" },
  { value: "completed", label: "Completed" },
  { value: "expired", label: "Expired" },
];
