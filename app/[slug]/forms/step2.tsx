import { Fragment } from "react";

import { AddressPicker } from "../components/address-picker";

export const Step2 = () => {
  const provinceCode = "072200000"; //CEBU

  return (
    <Fragment>
      <AddressPicker provinceCode={provinceCode} />
    </Fragment>
  );
};
