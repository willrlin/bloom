import React from "react"
import ApplicationConductor from "./ApplicationConductor"
import { blankApplication } from "@bloom-housing/ui-components"

export const retrieveApplicationConfig = () => {
  // Note: this whole function will eventually be replaced with one that reads this from the backend.
  return {
    sections: ["you", "household", "income", "preferences", "review"],
    languages: ["en", "es", "zh", "vi"],
    steps: [
      {
        name: "chooseLanguage",
      },
      {
        name: "whatToExpect",
      },
      {
        name: "primaryApplicantName",
      },
      {
        name: "primaryApplicantAddress",
      },
      {
        name: "alternateContactType",
      },
      {
        name: "alternateContactName",
      },
      {
        name: "alternateContactInfo",
      },
      {
        name: "liveAlone",
      },
      {
        name: "householdMemberInfo",
      },
      {
        name: "addMembers",
      },
      {
        name: "preferredUnitSize",
      },
      {
        name: "adaHouseholdMembers",
      },
      {
        name: "vouchersSubsidies",
      },
      {
        name: "income",
      },
      {
        name: "preferencesIntroduction",
      },
      {
        name: "generalPool",
      },
      {
        name: "demographics",
      },
      {
        name: "summary",
      },
      {
        name: "terms",
      },
    ],
  }
}

export const AppSubmissionContext = React.createContext({
  conductor: {} as ApplicationConductor,
  application: blankApplication(),
  listing: null,
  /* eslint-disable */
  syncApplication: (data) => {},
  syncListing: (data) => {},
})
