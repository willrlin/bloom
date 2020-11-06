import { Listing } from "../entity/listing.entity"
import { ListingsResponseStatus } from "./listings.service"
import { Exclude, Expose, Type } from "class-transformer"
import { IsDefined, IsEnum, IsUUID, ValidateNested } from "class-validator"

import { PreferenceDto } from "../preferences/preference.dto"
import { AssetDto } from "../assets/asset.dto"
import { ApplicationMethodDto } from "../application-methods/application-method.dto"
import { UnitDto } from "../units/unit.dto"
import { ApiHideProperty, ApiProperty, OmitType } from "@nestjs/swagger"
import { ListingEventDto } from "../listing-events/listing-events.dto"
import { IdDto } from "../lib/id.dto"
import { PropertyDto } from "../property/property.dto"

export class ListingDto extends OmitType(Listing, [
  "applicationMethods",
  "assets",
  "preferences",
  "property",
  "events",
  "applications",
] as const) {
  @Expose()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ApplicationMethodDto)
  applicationMethods: ApplicationMethodDto[]

  @Expose()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AssetDto)
  assets: AssetDto[]

  @Expose()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => PreferenceDto)
  preferences: PreferenceDto[]

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => PropertyDto)
  property: PropertyDto

  @Expose()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ListingEventDto)
  events: ListingEventDto[]

  @Exclude()
  @ApiHideProperty()
  applications
}

export class ListingExtendedDto {
  @Expose()
  @IsEnum(ListingsResponseStatus)
  @ApiProperty({ enum: ListingsResponseStatus, enumName: "ListingsResponseStatus" })
  status: ListingsResponseStatus
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => ListingDto)
  listings: ListingDto[]
  @Expose()
  amiCharts: any
}

export class ListingCreateDto extends OmitType(ListingDto, [
  "id",
  "createdAt",
  "updatedAt",
  "applicationMethods",
  "assets",
  "preferences",
  "property",
  "events",
  "applications",
] as const) {
  @Expose()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => IdDto)
  applicationMethods: IdDto[]
  @Expose()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => IdDto)
  assets: IdDto[]
  @Expose()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => IdDto)
  preferences: IdDto[]
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => IdDto)
  property: IdDto
  @Expose()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => IdDto)
  events: IdDto[]
}

export class ListingUpdateDto extends ListingCreateDto {
  @Expose()
  @IsUUID()
  id: string
}
