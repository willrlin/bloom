import React from "react"
import { useFormContext } from "react-hook-form"
import { t, GridSection, Textarea } from "@bloom-housing/ui-components"

const AdditionalEligibility = () => {
  const formMethods = useFormContext()

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register } = formMethods

  return (
    <div>
      <GridSection grid={false} separator>
        <span className="form-section__title">
          {t("listings.sections.additionalEligibilityTitle")}
        </span>
        <span className="form-section__description">
          {t("listings.sections.additionalEligibilitySubtext")}
        </span>
        <GridSection columns={2}>
          <Textarea
            label={t("listings.creditHistory")}
            name={"creditHistory"}
            id={"creditHistory"}
            fullWidth={true}
            register={register}
          />
          <Textarea
            label={t("listings.rentalHistory")}
            name={"rentalHistory"}
            id={"rentalHistory"}
            fullWidth={true}
            register={register}
          />
        </GridSection>
        <GridSection columns={2}>
          <Textarea
            label={t("listings.criminalBackground")}
            name={"criminalBackground"}
            id={"criminalBackground"}
            fullWidth={true}
            register={register}
          />
          <Textarea
            label={t("listings.sections.rentalAssistanceTitle")}
            name={"rentalAssistance"}
            id={"rentalAssistance"}
            fullWidth={true}
            register={register}
          />
        </GridSection>
      </GridSection>
    </div>
  )
}

export default AdditionalEligibility
