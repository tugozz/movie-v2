import { Mail, Phone } from "lucide-react";

export const FooterContact = () => {
  return (
    <div className="flex flex-col items-start gap-3">
      <h1 className=" text-white ">Contact Information</h1>
      <div>
        <Mail className="text-white w-4 h-4" />
        <h1 className=" text-white ">Email:</h1>
        <h1 className=" text-white ">support@movieZ.com</h1>
      </div>
      <div>
        <Phone className="text-white w-4 h-4" />
        <h1 className=" text-white ">Phone:</h1>
        <h1 className=" text-white ">+976 (11) 123-4567</h1>
      </div>
    </div>
  );
};
