/*
2.3.2 - Preferred Unit Size
Applicant can designate which unit sizes they prefer
*/
import { useContext, useMemo } from "react"
import Link from "next/link"
import { AlertBox, Button, Form, FormCard, ProgressNav, t } from "@bloom-housing/ui-components"
import FormsLayout from "../../../layouts/forms"
import { useForm } from "react-hook-form"
import { AppSubmissionContext } from "../../../lib/AppSubmissionContext"
import { CheckboxGroup } from "@bloom-housing/ui-components/src/forms/CheckboxGroup"
import { preferredUnit } from "@bloom-housing/ui-components/src/helpers/formOptions"
import FormBackLink from "../../../src/forms/applications/FormBackLink"

export default () => {
  const { conductor, application, listing } = useContext(AppSubmissionContext)
  const currentPageSection = 2

  conductor.stepTo("Preferred Unit Size")

  /* Form Handler */
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data) => {
    const { preferredUnit } = data

    application.preferredUnit = preferredUnit

    conductor.sync()
    conductor.routeToNextOrReturnUrl()
  }
  const onError = () => {
    window.scrollTo(0, 0)
  }

  const preferredUnitOptions = useMemo(() => {
    return preferredUnit?.map((item) => ({
      id: item.id,
      label: t(`application.household.preferredUnit.options.${item.id}`),
      defaultChecked: item.checked || application.preferredUnit.includes(item.id),
      register,
    }))
  }, [register, application.preferredUnit])

  return (
    <FormsLayout>
      <FormCard header={listing?.name}>
        <ProgressNav
          currentPageSection={currentPageSection}
          completedSections={application.completedSections}
          labels={conductor.config.sections}
        />
      </FormCard>

      <FormCard>
        <FormBackLink conductor={conductor} />

        <div className="form-card__lead border-b">
          <h2 className="form-card__title is-borderless">
            {t("application.household.preferredUnit.title")}
          </h2>
          <p className="mt-4 field-note">{t("application.household.preferredUnit.subTitle")}</p>
        </div>

        {Object.entries(errors).length > 0 && (
          <AlertBox type="alert" inverted closeable>
            {t("t.errorsToResolve")}
          </AlertBox>
        )}

        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="form-card__group is-borderless">
            <CheckboxGroup
              name="preferredUnit"
              groupLabel=""
              groupNote={t("application.household.preferredUnit.optionsLabel")}
              fields={preferredUnitOptions}
              error={errors.preferredUnit}
              errorMessage={t("application.form.errors.selectAtLeastOne")}
              required
            />
          </div>

          <div className="form-card__pager">
            <div className="form-card__pager-row primary">
              <Button
                filled={true}
                onClick={() => {
                  //
                }}
              >
                Next
              </Button>
            </div>
          </div>

          {/* <div className="p-8 text-center">
            <Link href="/">
              <a className="lined text-tiny">{t("application.form.general.saveAndFinishLater")}</a>
            </Link>
          </div> */}
        </Form>
      </FormCard>
    </FormsLayout>
  )
}
