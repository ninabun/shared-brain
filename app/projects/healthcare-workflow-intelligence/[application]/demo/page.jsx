import {notFound} from "next/navigation";
import MedicationStaffDemo from "../../../../components/healthcare/MedicationStaffDemo";
export const metadata={title:"Staff Demo | Medication Consistency Verification | Wing Yee AI Lab",description:"Interactive synthetic medication consistency verification workflow demo."};
export function generateStaticParams(){return [{application:"medication-verification"}]}
export default function Page({params}){if(params.application!=="medication-verification")notFound();return <MedicationStaffDemo/>}
