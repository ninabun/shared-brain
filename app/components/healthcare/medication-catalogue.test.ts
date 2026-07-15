import {describe,expect,it} from "vitest";
import {medicationCatalogue,medicationCatalogueByName} from "./medication-catalogue";

describe("spreadsheet medication catalogue",()=>{
 it("loads every catalogue entry with stable unique IDs",()=>{
  expect(medicationCatalogue).toHaveLength(43);
  expect(new Set(medicationCatalogue.map(item=>item.id)).size).toBe(43);
  expect(new Set(medicationCatalogue.map(item=>item.name)).size).toBe(43);
 });
 it("retains structured order options and clinical metadata",()=>{
  const oxytocin=medicationCatalogueByName.get("Oxytocin");
  expect(oxytocin).toMatchObject({alias:"Syntocinon",risk:true,prnObserved:false});
  expect(oxytocin?.doses).toContain("40 units");
  expect(oxytocin?.carrier).toContain("Sodium Chloride 0.9%");
 });
 it("preserves complex schedules instead of inventing intervals",()=>{
  expect(medicationCatalogueByName.get("Thyroxine Sodium")?.frequencies).toContain("Variable weekday schedule");
  expect(medicationCatalogueByName.get("Paracetamol")?.frequencies).toContain("On call to operating theatre");
 });
});
