import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerResolver } from './owner.resolver';
import { Owner, OwnerSchema } from './owner.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }])],
  providers: [OwnerService, OwnerResolver],
})
export class OwnerModule {}
