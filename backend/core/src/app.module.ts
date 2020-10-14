import { INestApplication, Module, ValidationPipe } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from "./user/user.module"
// Use require because of the CommonJS/AMD style export.
// See https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require
import dbOptions = require("../ormconfig")
import { AuthModule } from "./auth/auth.module"

import { ListingsModule } from "./listings/listings.module"
import { ApplicationsModule } from "./applications/applications.module"
import { EntityNotFoundExceptionFilter } from "./filters/entity-not-found-exception.filter"
import { logger } from "./middleware/logger.middleware"
import { AssetsModule } from "./assets/assets.module"
import { PreferencesModule } from "./preferences/preferences.module"
import { ApplicationMethodsModule } from "./application-methods/application-methods.module"
import { UnitsModule } from "./units/units.module"
import { ListingEventsModule } from "./listing-events/listing-events.module"
import { ConfigModule } from "@nestjs/config"
import Joi from "@hapi/joi"

export function applicationSetup(app: INestApplication) {
  app.enableCors()
  app.use(logger)
  app.useGlobalFilters(new EntityNotFoundExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      // Only allow props through that have been specified in the appropriate DTO
      whitelist: true,
      // Automatically transform validated prop values into their specified types
      transform: true,
      forbidNonWhitelisted: true,
    })
  )
  return app
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      validationSchema: Joi.object({
        PORT: Joi.number().default(3100).required(),
        NODE_ENV: Joi.string().valid("development", "staging", "production").default("development"),
        APP_SECRET: Joi.string().required().min(16),
        EMAIL_API_KEY: Joi.string().required(),
        EMAIL_FROM_ADDRESS: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      ...dbOptions,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    ListingsModule,
    ApplicationsModule,
    AssetsModule,
    PreferencesModule,
    ApplicationMethodsModule,
    UnitsModule,
    ListingEventsModule,
  ],
})
export class AppModule {}
