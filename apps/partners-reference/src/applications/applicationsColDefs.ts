import moment from "moment"
import { t, formatIncome } from "@bloom-housing/ui-components"
import { IncomePeriod } from "@bloom-housing/core"

export function getColDefs(maxHouseholdSize: number) {
  const defs = [
    {
      headerName: t("application.details.submittedDate"),
      field: "createdAt",
      sortable: true,
      filter: false,
      pinned: "left",
      width: 200,
      minWidth: 150,
      sort: "asc",
      valueFormatter: ({ value }) => {
        const date = moment(value).format("MM/DD/YYYY")
        const time = moment(value).format("HH:mm:ss A")

        return `${date} ${t("t.at")} ${time}`
      },
    },
    {
      headerName: t("application.details.number"),
      field: "id",
      sortable: false,
      filter: false,
      width: 150,
      minWidth: 120,
      pinned: "left",
      type: "rightAligned",
      cellRenderer: "formatLinkCell",
    },
    {
      headerName: t("application.name.firstName"),
      field: "application.applicant.firstName",
      sortable: true,
      filter: false,
      pinned: "left",
      width: 125,
      minWidth: 100,
    },
    {
      headerName: t("application.name.lastName"),
      field: "application.applicant.lastName",
      sortable: true,
      filter: "agTextColumnFilter",
      pinned: "left",
      width: 125,
      minWidth: 100,
    },
    {
      headerName: t("application.details.householdSize"),
      field: "application.householdSize",
      sortable: true,
      filter: false,
      width: 125,
      minWidth: 120,
      type: "rightAligned",
    },
    {
      headerName: t("applications.table.declaredAnnualIncome"),
      field: "application.income",
      sortable: true,
      filter: false,
      width: 180,
      minWidth: 150,
      type: "rightAligned",
      valueFormatter: ({ data, value }) =>
        formatIncome(value, data.application.incomePeriod, IncomePeriod.perYear),
    },
    {
      headerName: t("applications.table.declaredMonthlyIncome"),
      field: "application.income",
      sortable: true,
      filter: false,
      width: 180,
      minWidth: 150,
      type: "rightAligned",
      valueFormatter: ({ data, value }) =>
        formatIncome(value, data.application.incomePeriod, IncomePeriod.perMonth),
    },
    {
      headerName: t("applications.table.subsidyOrVoucher"),
      field: "application.incomeVouchers",
      sortable: true,
      filter: false,
      width: 120,
      minWidth: 100,
      valueFormatter: (data) => (data.value ? t("t.yes") : t("t.no")),
    },
    {
      headerName: t("applications.table.requestAda"),
      field: "application.accessibility",
      sortable: true,
      filter: false,
      width: 120,
      minWidth: 100,
      valueFormatter: (data) => {
        const posiviveValues = Object.entries(data.value).reduce((acc, curr) => {
          if (curr[1]) {
            acc.push(t(`application.ada.${curr[0]}`))
          }

          return acc
        }, [])

        return posiviveValues.length ? posiviveValues.join(", ") : t("t.none")
      },
    },
    {
      headerName: t("applications.table.preferenceClaimed"),
      field: "application.preferences",
      sortable: true,
      filter: false,
      width: 150,
      minWidth: 100,
      valueFormatter: (data) => {
        const posiviveValues = Object.entries(data.value).reduce((acc, curr) => {
          if (curr[0] !== "none" && curr[1]) {
            acc.push(t(`application.preferences.options.${curr[0]}`))
          }

          return acc
        }, [])

        return posiviveValues.length ? posiviveValues.join(", ") : t("t.none")
      },
    },
    {
      headerName: t("applications.table.primaryDob"),
      field: "application.applicant",
      sortable: false,
      filter: false,
      width: 150,
      minWidth: 100,
      valueFormatter: ({ value }) => `${value.birthMonth}/${value.birthDay}/${value.birthYear}`,
    },
    {
      headerName: t("t.email"),
      field: "application.applicant.emailAddress",
      sortable: false,
      filter: false,
      width: 150,
      minWidth: 100,
    },
    {
      headerName: t("t.phone"),
      field: "application.applicant.phoneNumber",
      sortable: false,
      filter: false,
      width: 150,
      minWidth: 100,
    },
    {
      headerName: t("applications.table.phoneType"),
      field: "application.applicant.phoneNumberType",
      sortable: false,
      filter: false,
      width: 150,
      minWidth: 100,
      valueFormatter: ({ value }) => t(`application.contact.phoneNumberTypes.${value}`),
    },
    {
      headerName: t("t.additionalPhone"),
      field: "application.additionalPhoneNumber",
      sortable: false,
      filter: false,
      width: 150,
      minWidth: 100,
      valueFormatter: ({ value }) => (value ? value : t("t.none")),
    },
    {
      headerName: t("applications.table.additionalPhoneType"),
      field: "application.additionalPhoneNumberType",
      sortable: false,
      filter: false,
      width: 150,
      minWidth: 100,
      valueFormatter: ({ value }) =>
        value ? t(`application.contact.phoneNumberTypes.${value}`) : t("t.none"),
    },
    {
      headerName: t("applications.table.residenceStreet"),
      field: "application.applicant.address.street",
      sortable: false,
      filter: false,
      width: 175,
      minWidth: 150,
    },
    {
      headerName: t("applications.table.residenceCity"),
      field: "application.applicant.address.city",
      sortable: false,
      filter: false,
      width: 150,
      minWidth: 120,
    },
    {
      headerName: t("applications.table.residenceState"),
      field: "application.applicant.address.state",
      sortable: false,
      filter: false,
      width: 120,
      minWidth: 100,
    },
    {
      headerName: t("applications.table.residenceZip"),
      field: "application.applicant.address.zipCode",
      sortable: false,
      filter: false,
      width: 120,
      minWidth: 100,
    },
    {
      headerName: t("applications.table.mailingStreet"),
      field: "application.mailingAddress.street",
      sortable: false,
      filter: false,
      width: 175,
      minWidth: 150,
      valueFormatter: function ({ data, value }) {
        return `${
          data.application.sendMailToMailingAddress
            ? value
            : data.application.applicant.address.street
        }`
      },
    },
    {
      headerName: t("applications.table.mailingCity"),
      field: "application.mailingAddress.city",
      sortable: false,
      filter: false,
      width: 150,
      minWidth: 120,
      valueFormatter: function ({ data, value }) {
        return `${
          data.application.sendMailToMailingAddress
            ? value
            : data.application.applicant.address.city
        }`
      },
    },
    {
      headerName: t("applications.table.mailingState"),
      field: "application.mailingAddress.state",
      sortable: false,
      filter: false,
      width: 120,
      minWidth: 100,
      valueFormatter: function ({ data, value }) {
        return `${
          data.application.sendMailToMailingAddress
            ? value
            : data.application.applicant.address.state
        }`
      },
    },
    {
      headerName: t("applications.table.mailingZip"),
      field: "application.mailingAddress.zipCode",
      sortable: false,
      filter: false,
      width: 120,
      minWidth: 100,
      valueFormatter: function ({ data, value }) {
        return `${
          data.application.sendMailToMailingAddress
            ? value
            : data.application.applicant.address.zipCode
        }`
      },
    },
    {
      headerName: t("applications.table.workStreet"),
      field: "application.applicant.workAddress.street",
      sortable: false,
      filter: false,
      width: 175,
      minWidth: 150,
    },
    {
      headerName: t("applications.table.workCity"),
      field: "application.applicant.workAddress.city",
      sortable: false,
      filter: false,
      width: 150,
      minWidth: 120,
    },
    {
      headerName: t("applications.table.workState"),
      field: "application.applicant.workAddress.state",
      sortable: false,
      filter: false,
      width: 120,
      minWidth: 100,
    },
    {
      headerName: t("applications.table.workZip"),
      field: "application.applicant.workAddress.zipCode",
      sortable: false,
      filter: false,
      width: 120,
      minWidth: 100,
    },
    {
      headerName: t("applications.table.altContactFirstName"),
      field: "application.alternateContact.firstName",
      sortable: false,
      filter: false,
      width: 125,
      minWidth: 100,
    },
    {
      headerName: t("applications.table.altContactLastName"),
      field: "application.alternateContact.lastName",
      sortable: false,
      filter: false,
      width: 125,
      minWidth: 100,
    },
    {
      headerName: t("applications.table.altContactRelationship"),
      field: "application.alternateContact.type",
      sortable: false,
      filter: false,
      width: 125,
      minWidth: 100,
      valueFormatter: ({ data, value }) =>
        value == "other"
          ? data.application.alternateContact.otherType
          : t(`application.alternateContact.type.options.${value}`),
    },
    {
      headerName: t("applications.table.altContactAgency"),
      field: "application.alternateContact.agency",
      sortable: false,
      filter: false,
      width: 125,
      minWidth: 100,
      valueFormatter: ({ value }) => (value?.length ? value : t("t.none")),
    },
    {
      headerName: t("applications.table.altContactEmail"),
      field: "application.alternateContact.emailAddress",
      sortable: false,
      filter: false,
      width: 150,
      minWidth: 100,
    },
    {
      headerName: t("applications.table.altContactPhone"),
      field: "application.alternateContact.phoneNumber",
      sortable: false,
      filter: false,
      width: 150,
      minWidth: 100,
    },

    {
      headerName: t("applications.table.altContactStreetAddress"),
      field: "application.alternateContact.mailingAddress.street",
      sortable: false,
      filter: false,
      width: 150,
      minWidth: 100,
    },
    {
      headerName: t("applications.table.altContactCity"),
      field: "application.alternateContact.mailingAddress.city",
      sortable: false,
      filter: false,
      width: 150,
      minWidth: 100,
    },
    {
      headerName: t("applications.table.altContactState"),
      field: "application.alternateContact.mailingAddress.state",
      sortable: false,
      filter: false,
      width: 150,
      minWidth: 100,
    },
    {
      headerName: t("applications.table.altContactZip"),
      field: "application.alternateContact.mailingAddress.zipCode",
      sortable: false,
      filter: false,
      width: 150,
      minWidth: 100,
    },
  ]

  const householdCols = []
  // householdSize property includes primary applicant, so we have to exclude it
  for (let i = 0; i < maxHouseholdSize - 1; i++) {
    const householdIndex = i + 1

    householdCols.push(
      {
        headerName: `${t("applications.table.householdFirstName")} ${householdIndex}`,
        field: "application.householdMembers",
        sortable: false,
        filter: false,
        width: 125,
        minWidth: 100,
        valueFormatter: ({ value }) => (value[i] ? value[i].firstName : ""),
      },
      {
        headerName: `${t("applications.table.householdLastName")} ${householdIndex}`,
        field: "application.householdMembers",
        sortable: false,
        filter: false,
        width: 125,
        minWidth: 100,
        valueFormatter: ({ value }) => (value[i] ? value[i].lastName : ""),
      },
      {
        headerName: `${t("applications.table.householdRelationship")} ${householdIndex}`,
        field: "application.householdMembers",
        sortable: false,
        filter: false,
        width: 125,
        minWidth: 100,
        valueFormatter: ({ value }) =>
          value[i] ? t(`application.form.options.relationship.${value[i].relationship}`) : "",
      },
      {
        headerName: `${t("applications.table.householdDob")} ${householdIndex}`,
        field: "application.householdMembers",
        sortable: false,
        filter: false,
        width: 125,
        minWidth: 100,
        valueFormatter: ({ value }) =>
          value[i] ? `${value[i].birthMonth}/${value[i].birthDay}/${value[i].birthYear}` : "",
      },
      {
        headerName: `${t("applications.table.householdStreetAddress")} ${householdIndex}`,
        field: "application.householdMembers",
        sortable: false,
        filter: false,
        width: 125,
        minWidth: 100,
        valueFormatter: ({ value }) => (value[i] ? value[i].address.street : ""),
      },
      {
        headerName: `${t("applications.table.householdCity")} ${householdIndex}`,
        field: "application.householdMembers",
        sortable: false,
        filter: false,
        width: 125,
        minWidth: 100,
        valueFormatter: ({ value }) => (value[i] ? value[i].address.city : ""),
      },
      {
        headerName: `${t("applications.table.householdState")} ${householdIndex}`,
        field: "application.householdMembers",
        sortable: false,
        filter: false,
        width: 125,
        minWidth: 100,
        valueFormatter: ({ value }) => (value[i] ? value[i].address.state : ""),
      },
      {
        headerName: `${t("applications.table.householdZip")} ${householdIndex}`,
        field: "application.householdMembers",
        sortable: false,
        filter: false,
        width: 125,
        minWidth: 100,
        valueFormatter: ({ value }) => (value[i] ? value[i].address.zipCode : ""),
      }
    )
  }

  return [...defs, ...householdCols]
}
