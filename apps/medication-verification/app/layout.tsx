import type {Metadata} from "next";
import "./globals.css";

export const metadata:Metadata={
  title:"Medication Consistency Verification",
  description:"Synthetic clinical workflow prototype comparing e-Documentation and IPMOE medication records."
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>{children}</body></html>;
}
