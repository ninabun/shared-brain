import {notFound} from "next/navigation";
import MedicationStaffDemo from "../../../../components/healthcare/MedicationStaffDemo";
export const metadata={title:"Medication Verification App | Wing Yee AI Lab",description:"Event-driven synthetic medication verification clinical dashboard."};
export function generateStaticParams(){return [{application:"medication-verification"}]}
export default function Page({params}){if(params.application!=="medication-verification")notFound();return <MedicationStaffDemo/>}
